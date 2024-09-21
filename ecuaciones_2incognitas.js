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
    let res = 0;
    if (start !== -1 && input.indexOf("/") !== -1) {
        // x^(a/b)
        let raiz = input.slice(start + 1, len); //(a/b)
        let valor = input.slice(0, start);

        if (raiz.indexOf("(") !== -1 && raiz.indexOf(")") !== -1) {
            raiz = input.slice(start + 2, len - 1)
            //a/b
            let middle = raiz.indexOf("/");
            let a = raiz.slice(0, middle);
            let b = raiz.slice(middle + 1, len - 1);

            //console.log(`Valor de raiz ${valor} ** ${a} / ${b} = ${valor ** (a / b)}`);
            res = valor ** (a / b)
        } else {
            let middle = raiz.indexOf("/");
            let a = raiz.slice(0, middle);
            let b = raiz.slice(middle + 1, len - 1);
            res = (valor ** a) / b
        }

        return res == "Infinity" ? "Ingresa un numero más pequeño para la raiz" : res;
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
        return res == "Infinity" ? "Ingresa un numero más pequeño para la potencia" : res;
    }
    //3. Si es un entero o decimal
    return input;
}

function fractionConversor(input) {
    //Este if mandaria un mensaje de erro enviado por el inputValidator
    console.log(input);
    if (typeof (input) == "string" && input.includes("Ingresa")) {
        return input;
    }
    else {
        /*
        Al parecer la libreía para fracciones soporta cierto numero de decimale en potencias de -10
        por lo que aquí también se van a manejar mensajes de error.
        */
        let res = new Fraction(input);
        if (input !== 0 && res == 0) {
            return "Ingrese un valor que genere menos decimales";
        }
        res.simplify();
        return res;
    }
}


// Función para solicitar datos de forma secuencial
function askQuestions() {
    rl.question('Ingresa el valor de x1: ', (inputX1) => {
        x1 = new Fraction(inputValidation(inputX1))

        rl.question('Ingresa el valor de y1: ', (inputY1) => {
            y1 = new Fraction(inputValidation(inputY1))

            rl.question('Ingresa el valor de c1: ', (inputC1) => {
                c1 = new Fraction(inputValidation(inputC1))

                rl.question('Ingresa el valor de x2: ', (inputX2) => {
                    x2 = new Fraction(inputValidation(inputX2))

                    rl.question('Ingresa el valor de y2: ', (inputY2) => {
                        y2 = new Fraction(inputValidation(inputY2))

                        rl.question('Ingresa el valor de c2: ', (inputC2) => {
                            c2 = new Fraction(inputValidation(inputC2))

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

function test() {
    /* let x1 = "234^150";
    let y1 = "234";
    let c1 = "1/2";
    let x2 = "234^-15/3"
    let y2 = "3";
    let c2 = ".5" */

    let x1 = "2/3";
    let y1 = ".074";
    let c1 = "2/4";
    let x2 = "33"
    let y2 = "2^(1/2)";
    let c2 = "1/2"

    /* let x1 = "3";
    let y1 = "2";
    let c1 = "4";
    let x2 = "2"
    let y2 = "1";
    let c2 = "3" */

    let bandera = false; //no existen errores
    let msg = "";

    //1.Validar los datos de entrada
    x1Validated = fractionConversor(inputValidation(x1));
    y1Validated = fractionConversor(inputValidation(y1));
    c1Validated = fractionConversor(inputValidation(c1));
    x2Validated = fractionConversor(inputValidation(x2));
    y2Validated = fractionConversor(inputValidation(y2));
    c2Validated = fractionConversor(inputValidation(c2));

    console.log(x1Validated.toFraction());
    console.log();

    //2.Ver si existe algun error
    if (typeof (x1Validated) == "string") {
        msg = msg + x1Validated + ". Valor ingresado: " + x1 + "\n";
        bandera = true;
    }
    if (typeof (y1Validated) == "string") {
        msg = msg + y1Validated + ". Valor ingresado: " + y1 + "\n";
        bandera = true;
    }
    if (typeof (c1Validated) == "string") {
        msg = msg + c1Validated + ". Valor ingresado: " + c1 + "\n";
        bandera = true;
    }
    if (typeof (x2Validated) == "string") {
        msg = msg + x2Validated + ". Valor ingresado: " + x2 + "\n";
        bandera = true;
    }
    if (typeof (y2Validated) == "string") {
        msg = msg + y2Validated + ". Valor ingresado: " + y2 + "\n";
        bandera = true;
    }
    if (typeof (c2Validated) == "string") {
        msg = msg + c2Validated + ". Valor ingresado: " + c2 + "\n";
        bandera = true;
    }

    if (bandera) { //evitamos que se causen errores en las operaciones
        return msg;
    }

    //Si no hay errores se procede a realizar las operaciones necesarias.
    msg = msg + "Ecuaciones son: \n";
    msg = msg + `${x1Validated.toFraction()}x${y1 >= 0 ? '+' + y1Validated.toFraction() : y1Validated.toFraction()}y = ${c1Validated.toFraction()} \n`;
    msg = msg + `${x2Validated.toFraction()}x${y2 >= 0 ? '+' + y2Validated.toFraction() : y2Validated.toFraction()}y = ${c2Validated.toFraction()} \n \n`;

    //imprimir en valores decimales, se le daria el formato en el front
    msg = msg + `${x1Validated.valueOf()}x${y1 >= 0 ? '+' + y1Validated.valueOf() : y1Validated.valueOf()}y = ${c1Validated.valueOf()} \n`;
    msg = msg + `${x2Validated.valueOf()}x${y2 >= 0 ? '+' + y2Validated.valueOf() : y2Validated.valueOf()}y = ${c2Validated.valueOf()} \n`;

    //Obtener delta y evaluar si tiene solucón el sistema de ecuaciones
    let delta = x1Validated.mul(y2Validated).sub(x2Validated.mul(y1Validated));
    delta != 0 ? (msg = msg + `Tiene solución el valor de delta es: ${delta.toFraction()} = ${delta.valueOf()} \n\n`) : (msg = msg + `No tiene solución el valor de delta es ${delta.toFraction()} \n\n`);

    //Obtener los deltas de x y
    if (delta != 0) {

        delta_x = c1Validated.mul(y2Validated).sub(c2Validated.mul(y1Validated)).div(delta.toFraction());
        delta_y = x1Validated.mul(c2Validated).sub(x2Validated.mul(c1Validated)).div(delta.toFraction());


        msg = msg + `El valor de delta x es: ${delta_x.toFraction()}  ${delta_x.valueOf()}\n`;
        msg = msg + `El valor de delta y es: ${delta_y.toFraction()}  ${delta_y.valueOf()} \n`;

        let sol_x1 = delta_x.mul(x1Validated);
        let sol_y1 = delta_y.mul(y1Validated);

        let sol_x2 = delta_x.mul(x2Validated);
        let sol_y2 = delta_y.mul(y2Validated);


        msg = msg +
            `Solución ${sol_x1.toFraction()}${sol_y1 >= 0 ? ' +' + sol_y1.toFraction() : sol_y1.toFraction()} = ${sol_x1.add(sol_y1).toFraction()} = ${c1Validated.toFraction()} \n`
            ;
        msg = msg +
            `Solución ${sol_x2.toFraction()}${sol_y2 >= 0 ? ' +' + sol_y2.toFraction() : sol_y2.toFraction()} = ${sol_x2.add(sol_y2).toFraction()} = ${c2Validated.toFraction()} \n`
            ;
    }

    return msg;

}

//askQuestions();

/* console.log(inputValidation("234^(-15/3)"));
console.log(inputValidation("234^-15/3"));
console.log(inputValidation("234^150"));
console.log(inputValidation("234/150"));
console.log(inputValidation("23"));
console.log(inputValidation(".000023"));

console.log(fractionConversor(inputValidation("234^(-15/3)")));
console.log(fractionConversor(inputValidation("234^-15/3")));
console.log(fractionConversor(inputValidation("234^150")))
console.log(fractionConversor(inputValidation("234/150"))) */

console.log(test());

