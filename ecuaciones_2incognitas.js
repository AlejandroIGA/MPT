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

askQuestions();
