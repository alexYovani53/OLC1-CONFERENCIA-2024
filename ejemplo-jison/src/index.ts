import { close, inicializar } from "./services/app";

const iniciar = async () => {
    try {
        await inicializar();
    }
    catch (err) {
        console.log(err)
        console.log("no se iniciaron correctamente los servicios")
    }
}

const apagar = async () => {
    console.log("apagando")
    let err: any;
    try {
        await close();
    } catch (error) {
        console.log(error)
        err = error;
    }

    if (err) process.exit(1);
    process.exit(0);

}

iniciar();


process.on('SIGTERM', () => apagar())
process.on('SIGINT', () => apagar())
// process.on('uncaughtException',(err)=>{
//     console.log(err)
//     apagar();
// })