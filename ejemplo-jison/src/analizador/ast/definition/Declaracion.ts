import { Context } from "../../../analizador/context/Context";
import { Symboly } from "../../../analizador/context/Symboly";
import { Expresion } from "../abstract/Expresion";
import { Instruccion } from "../abstract/Instruccion";
import { tipo } from "../abstract/Retorno";

export class Declaracion extends Instruccion {


  exp: Expresion
  type: tipo
  id: string

  constructor(exp: Expresion, type: tipo, id: string) {
    super(0, 0);
    this.exp = exp;
    this.type = type;
    this.id = id;
  }
  public ejecutar(context: Context) {

    if (context.searchSymboly(this.id)) {

      //Manejo de error semantico

      return;
    }


    let result = this.exp.getValorImplicito(context);

    let symbol = new Symboly(result.value, result.type, this.id);

    context.addSymboly(symbol)

  }

  public crearGrafico(parent: any) {
  }
}