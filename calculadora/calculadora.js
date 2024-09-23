// Asegúrate de incluir fraction.js en tu HTML: 
// <script src="https://cdn.jsdelivr.net/npm/fraction.js/fraction.min.js"></script>

function inputValidation(input) {
    // Validar y procesar el input para manejar fracciones, potencias y otros formatos
    let start = input.indexOf("^");
    let len = input.length;
    let res = 0;
    
    // Manejo de potencias fraccionarias
    if (start !== -1 && input.indexOf("/") !== -1) {
        let raiz = input.slice(start + 1, len);
        let valor = input.slice(0, start);

        if (raiz.indexOf("(") !== -1 && raiz.indexOf(")") !== -1) {
            raiz = input.slice(start + 2, len - 1);
            let middle = raiz.indexOf("/");
            let a = raiz.slice(0, middle);
            let b = raiz.slice(middle + 1, len - 1);

            res = valor ** (a / b);
            res = res.toFixed(6);
        } else {
            let middle = raiz.indexOf("/");
            let a = raiz.slice(0, middle);
            let b = raiz.slice(middle + 1, len - 1);
            res = (valor ** a) / b;
            res = res.toFixed(6);
        }
        return res == "Infinity" ? "Ingresa un número más pequeño para la raíz" : res;
    }
    // Manejo de potencias simples
    else if (start !== -1) {
        let potencia = input.slice(start + 1, len);
        let valor = input.slice(0, start);

        if (potencia.indexOf("(") !== -1 && potencia.indexOf(")") !== -1) {
            potencia = input.slice(start + 2, len - 1);
        }
        res = valor ** potencia;
        return res == "Infinity" ? "Ingresa un número más pequeño para la potencia" : res;
    }
    // Retorno de valores normales
    return input;
}

function fractionConversor(input) {
    try {
        let res = new Fraction(input);
        res.simplify();
        return res;
    } catch (e) {
        return "Error en conversión: " + input;
    }
}

function resolverEcuaciones() {
    let resultado ="";
    // Obtener valores del formulario
    let x1 = document.getElementById('x1').value;
    let y1 = document.getElementById('y1').value;
    let c1 = document.getElementById('c1').value;
    let x2 = document.getElementById('x2').value;
    let y2 = document.getElementById('y2').value;
    let c2 = document.getElementById('c2').value;

    // Validación y conversión a fracciones
    x1 = fractionConversor(inputValidation(x1));
    y1 = fractionConversor(inputValidation(y1));
    c1 = fractionConversor(inputValidation(c1));
    x2 = fractionConversor(inputValidation(x2));
    y2 = fractionConversor(inputValidation(y2));
    c2 = fractionConversor(inputValidation(c2));

    // Verificar si hay algún error en la conversión
    if (typeof x1 === "string" || typeof y1 === "string" || typeof c1 === "string" || typeof x2 === "string" || typeof y2 === "string" || typeof c2 === "string") {
        document.getElementById('resultado').textContent = `Error en los valores ingresados. Verifique los siguientes: \n ${x1}\n${y1}\n${c1}\n${x2}\n${y2}\n${c2}`;
        return;
    }

    // Calcular delta y verificar si tiene solución
    let delta = x1.mul(y2).sub(x2.mul(y1));
    //let resultado = `El valor de delta es: ${delta.toFraction()}\n`;
    delta != 0 ? (resultado += `Tiene solución el valor de delta es: ${delta.toFraction()} = ${delta.valueOf()} \n\n`) : (resultado += `No tiene solución el valor de delta es ${delta.toFraction()} \n\n`);

    if (delta.valueOf() != 0) {
        let delta_x = c1.mul(y2).sub(c2.mul(y1)).div(delta);
        let delta_y = x1.mul(c2).sub(x2.mul(c1)).div(delta);

        resultado += `El valor de delta_x es: ${delta_x.toFraction()}\n`;
        resultado += `El valor de delta_y es: ${delta_y.toFraction()}\n`;

        // Soluciones finales para las ecuaciones
        let sol_x1 = delta_x.mul(x1);
        let sol_y1 = delta_y.mul(y1);
        let sol_x2 = delta_x.mul(x2);
        let sol_y2 = delta_y.mul(y2);

        resultado += `\nSolución 1: ${sol_x1.toFraction()} ${sol_y1 >= 0 ? '+' + sol_y1.toFraction() : sol_y1.toFraction()} = ${c1.toFraction()}\n`;
        resultado += `Solución 2: ${sol_x2.toFraction()} ${sol_y2 >= 0 ? '+' + sol_y2.toFraction() : sol_y2.toFraction()} = ${c2.toFraction()}\n`;
    } else {
        resultado += "No tiene solución\n";
    }

    // Mostrar el resultado en el HTML
    document.getElementById('resultado').textContent = resultado;
}
