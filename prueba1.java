
void main(){
    int a = 5;
    int b = 10;
    string saludo = "hola mundo"
    int resultado = calcularSuma(a,b);
    print(resultado);

    boolean op1 = true
    boolean op2 = false;
    boolean op3 = false;
    boolean op4 = true

    if (op1 && op2){
        print("If correcto");
    }else if(op3 && op4) {
        print("Else");
    }else if(op1 && op4) {
        print("Else verdadero");
    }else {
        print("Ninguna opción");
    }

    crearObjeto();
}


int calcularSuma(* int a, int b){
    return a + b
}

void crearObjeto(){
    Curso compiladores = new Curso("Compiladores","N",10);
    print(compiladores.nombre);

    int [][][] array = [
        [
            [5,77],[1,21],[1,5]
        ],
        [
            [89,5],[5,75],[4,6]
        ]
     ];

    int [][][] array2 = new int[5][10][10]
    print(array[0][0][0]);
    print(array[0][0][1]);
    print(array[0][1][0]);
    print(array[0][1][1]);
    print(array[1][0][0]);
    print(array[1][0][1]);
    print(array[1][1][0]);
    print(array[1][1][1]);
    print(array2[0][1][9]);
}



class Curso {
    string nombre;
    string seccion;
    int valor;
}













