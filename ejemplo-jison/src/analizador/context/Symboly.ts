import { tipo } from "analizador/ast/abstract/Retorno"

export class Symboly {

  value: Object
  type: tipo
  id: string

  constructor(value: Object, type: tipo, id: string) {
    this.value = value
    this.type = type
    this.id = id
  }

}