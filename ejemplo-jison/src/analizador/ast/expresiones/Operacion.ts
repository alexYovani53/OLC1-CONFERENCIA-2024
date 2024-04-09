import { Context } from '../../../analizador/context/Context';
import { createEdge, createNode } from '../../../controllers/graphivz/graphviz';
import { Expresion } from "../abstract/Expresion";
import { Retorno, tipo } from '../abstract/Retorno';



export enum operador {
  MAS = "+",
  MENOS = "-",
  POR = "*",
  DIV = "/"
}

/**
 *     operando    int    float    string   boolean    null
 * int          [      |       |         |         |       ]
 * float        [      |       |         |         |       ]
 * string       [      |       |         |         |       ]
 * boolean      [      |       |         |         |       ]
 * null         [      |       |         |         |       ]
 */

const sumaDominante = [
  [tipo.INTEGER, tipo.FLOAT, tipo.STRING, tipo.NULL, tipo.NULL],
  [tipo.FLOAT, tipo.FLOAT, tipo.STRING, tipo.NULL, tipo.NULL],
  [tipo.STRING, tipo.STRING, tipo.STRING, tipo.STRING, tipo.NULL],
  [tipo.NULL, tipo.NULL, tipo.STRING, tipo.NULL, tipo.NULL],
  [tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL],
]


const multi_division_Dominante: tipo[][] = [
  [tipo.INTEGER, tipo.FLOAT, tipo.NULL, tipo.NULL, tipo.NULL],
  [tipo.FLOAT, tipo.FLOAT, tipo.NULL, tipo.NULL, tipo.NULL],
  [tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL],
  [tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL],
  [tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL],
]

const restaDominante: tipo[][] = [
  [tipo.INTEGER, tipo.FLOAT, tipo.NULL, tipo.NULL, tipo.NULL],
  [tipo.FLOAT, tipo.FLOAT, tipo.NULL, tipo.NULL, tipo.NULL],
  [tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL],
  [tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL],
  [tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL, tipo.NULL],
]
export class Operacion extends Expresion {


  operandoIz: Expresion;
  operandoDe: Expresion;
  operador: operador;
  unario: boolean;

  constructor(opIz: Expresion, opDer: Expresion, unario: boolean, operador: operador, linea: number, columna: number) {
    super(linea, columna);

    this.operandoIz = opIz;
    this.operandoDe = opDer;
    this.operador = operador;
    this.unario = unario;
  }

  public crearGrafico(parent: any) {
    const node = createNode(`Operacion ${this.operador}`)
    if (this.unario) {
      this.operandoIz.crearGrafico(node)
    } else {
      this.operandoIz.crearGrafico(node)
      this.operandoDe.crearGrafico(node)
    }
    createEdge(parent, node)
  }

  public getValorImplicito(context: Context): Retorno {

    let valorIz: Retorno;
    let valorDer: Retorno;
    let valorUn: Retorno;

    if (this.unario) {
      valorUn = this.operandoIz.getValorImplicito(context);

    } else {
      valorIz = this.operandoIz.getValorImplicito(context);
      valorDer = this.operandoDe.getValorImplicito(context);
    }


    let dominante: tipo;


    switch (this.operador) {

      case operador.MAS: {

        dominante = sumaDominante[valorIz.type][valorDer.type];
        if (dominante == tipo.INTEGER) return { value: (valorIz.value + valorDer.value), type: tipo.INTEGER }
        else if (dominante == tipo.FLOAT) return { value: (valorIz.value + valorDer.value), type: tipo.FLOAT };
        else if (dominante == tipo.STRING) return { value: (valorIz.value.toString() + valorDer.value.toString()), type: tipo.STRING };
        else if (dominante == tipo.NULL) return { value: null, type: tipo.NULL }

        break;
      }


      case operador.POR: {

        dominante = multi_division_Dominante[valorIz.type][valorDer.type];

        if (dominante == tipo.INTEGER) return { value: (valorIz.value * valorDer.value), type: tipo.INTEGER };
        else if (dominante == tipo.FLOAT) return { value: (valorIz.value * valorDer.value), type: tipo.FLOAT };
        else if (dominante == tipo.NULL) return { value: null, type: tipo.NULL }
        break;
      }


      case operador.DIV:
        {

          dominante = multi_division_Dominante[valorIz.type][valorDer.type];
          if (dominante == tipo.NULL) return { value: null, type: tipo.NULL }

          if (!valorDer.value || valorDer.value == 0) return { value: null, type: tipo.NULL }

          if (dominante == tipo.INTEGER) return { value: (valorIz.value / valorDer.value), type: tipo.INTEGER };
          else if (dominante == tipo.FLOAT) return { value: (valorIz.value / valorDer.value), type: tipo.FLOAT };

          break;
        }

      case operador.MENOS:
        {
          if (this.unario) {
            if (valorUn.type != tipo.INTEGER && valorUn.type != tipo.FLOAT) return { value: null, type: tipo.NULL }

            let value = valorUn.value * -1;
            return {
              value: value,
              type: valorUn.type
            }
          }

          dominante = restaDominante[valorIz.type][valorDer.type];
          if (dominante == tipo.NULL) return { value: null, type: tipo.NULL }

          if (!valorDer.value || valorDer.value == 0) return { value: null, type: tipo.NULL }

          if (dominante == tipo.INTEGER) return { value: (valorIz.value - valorDer.value), type: tipo.INTEGER };
          else if (dominante == tipo.FLOAT) return { value: (valorIz.value - valorDer.value), type: tipo.FLOAT };

          break;
        }

    }

    return null;
  }


}