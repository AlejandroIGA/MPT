const readline = require('readline');
const Fraction = require('fraction.js');


/*
Ecuación de prueba 
3x + 2y = 4
2x + y = 3

x=2 y=-1


2/3x + 7/2y = 2/4,
9/2x + 3/14y = 32/89

x=151/2047 y=791/6141
*/

let x1;
let x2;
let c1;

let y1;
let y2;
let c2;

let delta = 0;
let delta_x = 0;
let delta_y = 0;

let mensaje = '';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//Función para validar el tipo de dato de entrada
function inputValidation(input) {
    //1. Manejar una raiz
    let start = input.indexOf("^");
    let len = input.length
    if (start !== -1 && input.indexOf("/") !== -1) {
        //  x^(a/b) o x^a/b
        let raiz = input.slice(start + 1, len); // (a/b) o a/b
        let valor = input.slice(0, start);

        if (raiz.indexOf("(") !== -1 && raiz.indexOf(")") !== -1) {
            raiz = input.slice(start + 2, len - 1)
        }
        //a/b
        let middle = raiz.indexOf("/");
        let a = raiz.slice(0, middle);
        let b = raiz.slice(middle + 1, len - 1);

        //console.log(`Valor de raiz ${valor} ** ${a} / ${b} = ${valor ** (a / b)}`);
        let res = valor ** (a / b)
        return res == "Infinity" ? "Ingrese valores más pequeños para la raiz" : res;
    }
    //2. Manejar una potencia
    else if (start !== -1) {
        let potencia = input.slice(start + 1, len); // (a) o a
        let valor = input.slice(0, start);

        if (potencia.indexOf("(") !== -1 && potencia.indexOf(")") !== -1) {
            potencia = input.slice(start + 2, len - 1)
        }

        //console.log(`El valor de la potencia ${valor}^${potencia} = ${valor ** potencia}`);
        let res = valor ** potencia;
        return res == "Infinity" ? "Ingrese valores más pequeños para la potencia" : res;
    }
    //3. Si es un entero o decimal
    return input;
}

// Función para solicitar datos de forma secuencial
function askQuestions() {
    rl.question('Ingresa el valor de x1: ', (inputX1) => {
        x1 = new Fraction(inputX1)

        rl.question('Ingresa el valor de y1: ', (inputY1) => {
            y1 = new Fraction(inputY1)

            rl.question('Ingresa el valor de c1: ', (inputC1) => {
                c1 = new Fraction(inputC1)

                rl.question('Ingresa el valor de x2: ', (inputX2) => {
                    x2 = new Fraction(inputX2)

                    rl.question('Ingresa el valor de y2: ', (inputY2) => {
                        y2 = new Fraction(inputY2)

                        rl.question('Ingresa el valor de c2: ', (inputC2) => {
                            c2 = new Fraction(inputC2)

                            // Imprimir los valores ingresados
                            console.log('\nEcuaciones son:');
                            console.log(`${x1.toFraction()}x${y1 >= 0 ? '+' + y1.toFraction() : y1.toFraction()}y = ${c1.toFraction()}`);
                            console.log(`${x2.toFraction()}x${y2 >= 0 ? '+' + y2.toFraction() : y2.toFraction()}y = ${c2.toFraction()}`);

                            //Obtener delta y evaluar si tiene solucón el sistema de ecuaciones
                            delta = x1.mul(y2).sub(x2.mul(y1));
                            delta != 0 ? (mensaje = 'Tiene solución') : (mensaje = 'No tiene solución');

                            console.log(
                                `El valor de delta es: ${delta.toFraction()} por lo tanto  ${mensaje}`
                            );

                            if (delta != 0) {

                                delta_x = c1.mul(y2).sub(c2.mul(y1)).div(delta);
                                delta_y = x1.mul(c2).sub(x2.mul(c1)).div(delta);


                                console.log(`El valor de delta x es: ${delta_x.toFraction()}`);
                                console.log(`El valor de delta y es: ${delta_y.toFraction()}`);

                                let sol_x1 = delta_x.mul(x1);
                                let sol_y1 = delta_y.mul(y1);

                                let sol_x2 = delta_x.mul(x2);
                                let sol_y2 = delta_y.mul(y2);


                                console.log(
                                    `Solución ${sol_x1.toFraction()}${sol_y1 >= 0 ? ' +' + sol_y1.toFraction() : sol_y1.toFraction()} = ${sol_x1.add(sol_y1).toFraction()} = ${c1.toFraction()}`
                                );
                                console.log(
                                    `Solución ${sol_x2.toFraction()}${sol_y2 >= 0 ? ' +' + sol_y2.toFraction() : sol_y2.toFraction()} = ${sol_x2.add(sol_y2).toFraction()} = ${c2.toFraction()}`
                                );
                            }


                            rl.close();
                        });
                    });
                });
            });
        });
    });
}

//askQuestions();

console.log(inputValidation("234^15/3"));
console.log(inputValidation("234^150"));
console.log(inputValidation("234/150"));
console.log(inputValidation("23"));
console.log(inputValidation(".000023"));
