import { Context } from "../../../analizador/context/Context";
import { createEdge, createNodeColor } from "../../../controllers/graphivz/graphviz";
import { Expresion } from "../abstract/Expresion";
import { Retorno, tipo } from "../abstract/Retorno";

export class Primitivo extends Expresion {

  valor: Object
  type: tipo

  constructor(valor: Object, tipo: tipo, linea: number, columna: number) {
    super(linea, columna);
    this.valor = valor;
    this.type = tipo;
  }

  public getValorImplicito(context: Context): Retorno {
    return {
      value: this.valor,
      type: this.type
    }
  }
  public crearGrafico(parent: any) {
    let color = ""
    switch (this.type) {
      case tipo.BOOLEAN:
        color = "gold"
        break;

      case tipo.FLOAT:
        color = "cornflowerblue"
        break;


      case tipo.INTEGER:
        color = "yellowgreen"
        break;

      case tipo.STRING:
        color = "darkcyan"
        break;
      default:
        break;
    }
    createEdge(parent, createNodeColor(`${this.valor}`, color))
  }
}