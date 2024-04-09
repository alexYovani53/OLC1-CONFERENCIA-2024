import { Symboly } from "./Symboly"

export class Context {

  tabla: {
    [id: string]: Symboly
  } = {}

  parent: Context

  constructor(parent: Context) {
    this.parent = parent
  }

  addSymboly(symbol: Symboly) {
    this.tabla[symbol.id] = symbol
  }

  searchSymboly(id: string): boolean {

    let contextAux: Context = this;
    while (contextAux != null) {
      for (let key in contextAux.tabla) {
        if (key == id) return true;
      }
      contextAux = contextAux.parent
    }
    return false;
  }


  getSymboly(id: string): Symboly {

    let contextAux: Context = this;
    while (contextAux != null) {
      for (let key in contextAux.tabla) {
        if (key == id) return contextAux.tabla[key];
      }
      contextAux = contextAux.parent
    }
    return null;
  }

}