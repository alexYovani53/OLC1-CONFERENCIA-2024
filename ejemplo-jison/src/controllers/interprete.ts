

import { Ast } from "analizador/ast/Ast";
import e, { Request } from "express";
import { Context } from "../analizador/context/Context";
import analizador from "../analizador/gramatica/gramatica";
import { crearGrafico, createNode, save } from "./graphivz/graphviz";


export async function interpretar(request: Request, response: e.Response) {

    analizador.limpiarErrores();
    let text = request.body.text;

    crearGrafico()
    let raiz = createNode("Raiz")

    let result: Ast = await analizador.parse(text);
    let val = ""

    let context = new Context(null)

    try {
        console.log(JSON.stringify(result.instrucciones))
        if (analizador.obtenerErrores().lenght == 0) {

            for (const iterator of result.instrucciones) {
                let value = iterator.ejecutar(context)
                if (value)
                    val += value
            }
        }

        // for (const iterator of result.instrucciones) {
        //     iterator.crearGrafico(raiz)
        // }

        save()
    } catch (error) {
        console.log(error)
    }

    response.status(200).json({
        errores: analizador.obtenerErrores(),
        result,
        val: val,
    })

}