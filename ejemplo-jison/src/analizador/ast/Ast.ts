import { Instruccion } from "./abstract/Instruccion";


export class Ast {


    public instrucciones: Instruccion[];

    constructor(instrucciones: Instruccion[]) {
        this.instrucciones = instrucciones;
    }


}