// Importamos el módulo "readline" de Node.js que permite leer y escribir en la consola
const rl = require("readline").createInterface({
    input: process.stdin, // lo que el usuario escribe con el teclado
    output: process.stdout, // lo que mostramos en pantalla
});
// esta parte funciona para que se muestre una pregunta y espera la respuesta
const preguntar = (pregunta) => {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => resolve(respuesta));
    });
};

// menu principal
const menu = async () => {

    console.log("\n===== CALCULADORA BÁSICA =====");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Potencia");
    console.log("6. Factorial");
    console.log("7. Raíz cuadrada");
    console.log("8. Porcentaje");
    console.log("9. Salir\n");

// aqui se lee la opción que el usuario quiere realizar   
    const opcion = await preguntar("Selecciona una opción: ");

// si el usuario elige el 9 y lo escribe se cierra la calculadora 
    if (opcion === "9") {
        console.log("Hasta luego"); //imprime el mensaje de hasta luego
        rl.close(); // esta parte cierra la interfaz con la consola
        return;
    }

// esta parte son las variable que se van a usar en las operaciones
    let num1, num2, resultado;
// esto es por que no todas las operaciones se necesitan dos numeros, por lo menos en factorial y raiz solo se pide un numero
    if (["6", "7"].includes(opcion)) {
        num1 = Number(await preguntar("Ingrese el número: "));
// aqui en estas operaciones se pide dos numeros porque son necesarios para poder hacer las operaciones 
    } else if (["1", "2", "3", "4", "5", "8"].includes(opcion)) {
        num1 = Number(await preguntar("Ingrese el primer número: "));
        num2 = Number(await preguntar("Ingrese el segundo número: "));
    } else {
// si el usuario ingresa una opcion que no es valida se muestra error y se vuelve al menu
        console.log("Opción no válida");
        return menu();
    }

    switch (opcion) {
//suma
        case "1":
            resultado = num1 + num2;
            console.log(`Resultado: ${num1} + ${num2} = ${resultado}`);
            break;
// resta
        case "2":
            resultado = num1 - num2;
            console.log(`Resultado: ${num1} - ${num2} = ${resultado}`);
            break;
// multiplicacion
        case "3":
            resultado = num1 * num2;
            console.log(`Resultado: ${num1} × ${num2} = ${resultado}`);
            break;
// division
        case "4":
            if (num2 !== 0) {
                resultado = num1 / num2;
                console.log(`Resultado: ${num1} ÷ ${num2} = ${resultado}`);
            } else {
                console.log("Error: No se puede dividir entre 0");
            }
            break;
// potencia
// Potencia (num1 elevado a num2)
// la potencia consiste en multiplicar un número (base) por si mismo tantas veces como indique el exponente
// un ejemplo: 2^3 = 2 × 2 × 2 = 8

        case "5":
            resultado = Math.pow(num1, num2); // se usa math.pow por que permite directamente calcular la potencia sin necesidad de de hacer un bucle con for que multiplique varias veces
            console.log(`Resultado: ${num1} ^ ${num2} = ${resultado}`);
            break;
// factorial
// el factorial de un numero entero positivo (incluyendo 0) se obtiene multiplicando todos los numeros desde 1 hasta ese numero
// un ejemplo: 5! = 1 × 2 × 3 × 4 × 5 = 120
// se usa un bucle for que empieza en 1 y va hasta num1, multiplicando el resultado en cada paso

        case "6":
// esta parte num1 < 0 evita que se pueda calcular el factorial de numeros negativos
// esta parte !Number.isInteger(num1) evita que se pueda calcular el factorial de numeros no enteros
            if (num1 < 0 || !Number.isInteger(num1)) {
                console.log("Error: No existe factorial de números negativos ni de números no enteros");
            } else {
                resultado = 1;
                for (let i = 1; i <= num1; i++) {
                    resultado *= i; // resultado = resultado × i
                }
                console.log(`Resultado: ${num1}! = ${resultado}`);
            }
            break;
// raiz cuadrada
// la raiz cuadrada de un numero es el valor que multiplicado por si mismo da ese numero
// un ejemplo: √16 = 4 porque 4 × 4 = 16
        case "7":
            if (num1 < 0) {
                console.log("Error: No se puede calcular la raíz de un número negativo");
            } else {
                resultado = Math.sqrt(num1); // se usa math.sqrt que calcula directamente la raiz cuadrada
                console.log(`Resultado: √${num1} = ${resultado}`);
            }
            break;

// porcentaje
// calcula el porcentaje de un numero: num1 = cantidad base, num2 = porcentaje
// un ejemplo: 20% de 150 = 150 × (20 / 100) = 30
        case "8":
            if (num2 < 0) {
                console.log("Error: El porcentaje no puede ser negativo");
            } else {
                resultado = (num1 * num2) / 100;
                console.log(`Resultado: ${num2}% de ${num1} = ${resultado}`);
            }
            break;

        default:
            console.log("Opción no válida");
    }
// esta parte es para que despues de que se muestre el resultado la consola espere a que el usuario presione enter, y luego limpia la pantalla y deja el menu principal
    await preguntar("\nPresiona ENTER para continuar...");
    console.clear();
    menu();
};

menu();
