import express from "express";
import { interpretar } from "../controllers/interprete";

const rutas = express.Router();


rutas.get("/",(request,response)=>{
    return response.status(200).json({
        hola:"hola mundo"
    })
});

rutas.post("/interpretar",function (request,response){
    interpretar(request,response);
});

export = rutas;