
import axios from "axios";
import React, { useRef } from 'react';
import './css/editor.css';
import Editor from "./view/Editor";

export default function App() {

  const [code, _] = React.useState(`
      public class Main
      {
          public static void main(String args[]) {
              System.out.println("Ejemplo1 " + (5+6--9 + 1));
          }
      }
      
    `);
  const [errores, setErrores] = React.useState([])
  const editor1 = useRef();
  const editor2 = useRef();


  const setFocus = () => {
    editor1.current.focus();
  }

  const enviarDatos = () => {
    axios.post("http://localhost:3000/interpretar", {
      text: editor1.current.getCode()
    })
      .then(result => {
        console.log(result)
        editor2.current.establecerCodigo(result.data.val);
        setErrores(result.data.errores)
        console.log(errores)
      })
      .catch(err => {
        console.log(err);
        editor2.current.establecerCodigo("");
      })
  }


  return (
    <div className="pagina" >
      <button className="enviar" onClick={enviarDatos}> Interpretar</button>
      <div className="container" >
        <Editor className="editorT" ref={editor1} cod={code} onClick={setFocus}></Editor>
        <Editor className="editorT" ref={editor2} cod={""}></Editor>
      </div>

      <div className="bottom-container">
        {
          errores.length > 0 && <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Numero</th>
                  <th>Linea</th>
                  <th>Columna</th>
                  <th>Mensaje</th>
                </tr>
              </thead>

              {
                errores.map((err, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{err.linea}</td>
                    <td>{err.columna}</td>
                    <td>{err.mensaje}</td>
                  </tr>
                ))
              }
            </table>
          </div>
        }

      </div>
    </div>

  );
}