%{
	// IMPORTAR INTERFACES / CLASES
	const {Primitivo} = require("../ast/expresiones/Primitivo")
	const {Operacion, operador} = require("../ast/expresiones/Operacion")
	const {tipo} = require("../ast/abstract/Retorno")
	const {NodoAst} = require("../ast/abstract/NodoAst")
	const {Ast} = require("../ast/AST")
	const {CustomError} = require("../Error")
	const {Print} = require("../ast/basicos/Print")
	const {Declaracion} = require("../ast/definition/Declaracion")
	const {Identificador} = require("../ast/expresiones/Identificador")

	// DEFINIR VARIABLES

	let errores = []

	exports.limpiarErrores =  function limpiarErrores(){
		errores = [];
	}

	exports.obtenerErrores = function obtenerErrores(){
		return errores ;
	}
%}

/**
* Definición léxica
*
*/
%lex 
%options case-sensitive 

// EXPRESIONES REGULARES

integer 	[0-9]+\b
decimal 	[0-9]+("."[0-9]+)?\b
string		(\"[^"]*\")

// TOKENS
%%
\s+
{integer}		return 'INT';
{decimal}		return 'FLOAT';
{string}		return 'STRING';
";"				return 'PTCOMA';
"."				return '.';
"{"				return '{';
"}"				return '}';
"["				return '[';
")"				return 'PDER';
"("				return 'PIZQ';
"]"				return ']';


"+"				return 'MAS';
"-"				return 'MENOS';
"*"				return 'POR';
"/"				return 'DIV';
"="				return 'IGUAL';

//PALABRAS RESERVADAS
"println"				return 'PRINTLN';
"public"				return 'PUBLIC';
"static"				return 'STATIC';
"class"					return 'CLASS';
"int"					return 'INT_TYPE';
"boolean"				return 'BOOL_TYPE';
"float"					return 'FLOAT_TYPE';
"String"				return 'STRING_TYPE';
"system"				return 'SYSTEM';
"out"					return 'OUT';
"void"					return 'VOID';
"main"					return 'MAIN';
"args"					return 'ARGS';

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';

[ \t\s]+  		{}

.				{}

<<EOF>>			return 'EOF'


/lex



/* Asociación de operadores - precedencia*/
%left 'MAS' 'MENOS'
%left POR DIV
%left UMENOS

/* Nodo de inicio*/
%start ini   

%%  /* Definición de la gramática */

ini
	: instrucciones EOF			{return new Ast($1)} 
;

block
	: '{' instrucciones '}' 	{ $$ = $2}
	| '{''}'					{$$ = []}
;

instrucciones
	: instrucciones instruccion			{$1.push($2);  $$ = $1}
	| instruccion						{$$ = [$1]}	
;

instruccion
	: imprimir							{$$ = $1}
	| declaracion 						{$$ = $1}
	| error PTCOMA						{errores.push(new CustomError(this._$.first_line,  @0.first_column, 'Sintactico' ,`Error sintactico en '${yytext}' `)); }
	| error								{errores.push(new CustomError(this._$.first_line,  @0.first_column, 'Sintactico' ,`Error sintactico en '${yytext}' `)); }
;

imprimir
	: SYSTEM '.' OUT '.' PRINTLN PIZQ expresion PDER PTCOMA			{$$ =  new Print($7)}
;

declaracion
	: INT_TYPE ID IGUAL expresion PTCOMA 			{$$ = new Declaracion( $4,$1, $2 ); }
;

tipodato
	: INT_TYPE			{$$ = tipo.INTEGER}
	| BOOL_TYPE			{$$ = tipo.BOOLEAN}
	| FLOAT_TYPE			{$$ = tipo.FLOAT}
	| STRING_TYPE			{$$ = tipo.STRING}
;


expresion
	: MENOS expresion %prec UMENOS 		{ $$ = new Operacion($2,null,true, operador.MENOS)}
	| expresion MAS expresion 			{ $$ = new Operacion($1,$3,false, operador.MAS)}
	| expresion MENOS expresion 		{ $$ = new Operacion($1,$3,false, operador.MENOS)}
	| expresion POR expresion 			{ $$ = new Operacion($1,$3,false, operador.POR)}
	| expresion DIV expresion 			{ $$ = new Operacion($1,$3,false, operador.DIV)}
	| INT 								{ $$ = new Primitivo(Number($1), tipo.INTEGER, @1.fist_line, @1.first_column)}
	| FLOAT 							{ $$ = new Primitivo(Number($1), tipo.FLOAT, @1.fist_line, @1.first_column)}
	| STRING 							{ $$ = new Primitivo($1.substring(1,$1.length-1), tipo.STRING, @1.fist_line, @1.first_column)}
	| ID								{ $$ = new Identificador($1)}
	| PIZQ expresion PDER				{ $$ = $2}
;