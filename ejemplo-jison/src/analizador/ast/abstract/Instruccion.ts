import { Context } from "../../../analizador/context/Context";
import { NodoAst } from "./NodoAst";


export abstract class Instruccion extends NodoAst {

    constructor(line: number, columna: number) {
        super(line, columna);
    }

    public abstract ejecutar(context: Context): any;

    public abstract crearGrafico(parent: any): any
}