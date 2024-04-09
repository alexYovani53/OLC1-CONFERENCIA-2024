import { Context } from "analizador/context/Context";
import { createEdge, createNode } from "../../../controllers/graphivz/graphviz";
import { Expresion } from "../abstract/Expresion";
import { Instruccion } from "../abstract/Instruccion";
import { Retorno } from "../abstract/Retorno";

export class Print extends Instruccion {

  expresion: Expresion;

  constructor(expresion: Expresion, linea: number, columna: number) {
    super(linea, columna)
    this.expresion = expresion;
  }

  public ejecutar(context: Context): any {

    let val: Retorno = this.expresion.getValorImplicito(context);

    return val.value + "\n";
  }


  public crearGrafico(parent: any) {
    var n1 = createNode("imprimir")
    this.expresion.crearGrafico(n1)
    createEdge(parent, n1)
  }
}