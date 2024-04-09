import { Context } from "analizador/context/Context";
import { Expresion } from "../abstract/Expresion";
import { Retorno, tipo } from "../abstract/Retorno";

export class Identificador extends Expresion {

  id: string
  constructor(id: string) {
    super(0, 0);
    this.id = id;
  }

  public getValorImplicito(context: Context): Retorno {
    if (!context.searchSymboly(this.id)) {
      return {
        type: tipo.STRING,
        value: null
      }
    }

    let symbol = context.getSymboly(this.id)

    return {
      type: symbol.type,
      value: symbol.value
    }

  }
  public crearGrafico(parent: any) {
  }


}