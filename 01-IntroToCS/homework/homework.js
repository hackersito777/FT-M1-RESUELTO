"use strict";

function BinarioADecimal(num) {
  let decimal = 0; // Variable para almacenar el número decimal resultante
  const longitud = num.length; // Longitud del número binario
console.log(longitud)
  // Recorremos cada dígito del número binario de izquierda a derecha
  for (let i = 0; i < longitud; i++) {
    const bit = parseInt(num.charAt(i)); // Convertimos el dígito actual a entero
    const exponente = longitud - i - 1; // Calculamos el exponente correspondiente al dígito
    decimal += bit * Math.pow(2, exponente); // Sumamos el valor del dígito multiplicado por 2 elevado al exponente
  }

  return decimal; // Devolvemos el número decimal resultante
  
}


// Ejemplo de uso:
 // Mostramos el resultado en la consola (Salida: 42)














function DecimalABinario(num) {
  if (num === 0) {
    return '0'; // Caso especial: el número decimal es 0, por lo que el binario también es 0
  }

  let binario = ''; // Variable para almacenar el número binario resultante

  while (num > 0) {
    binario = (num % 2) + binario; // Agregar el residuo binario a la izquierda del número binario
    num = Math.floor(num / 2); // Actualizar el número decimal dividiéndolo entre 2
  }

  return binario;
}


// Ejemplo de uso:
 // Salida: "101010"

module.exports = {
  BinarioADecimal,
  DecimalABinario,
};
