# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

```javascript
x = 1;
var a = 5;
var b = 10;
var c = function (a, b, c) {
  var x = 10;
  console.log(x); // 10
  console.log(a); // 8
  var f = function (a, b, c) {
    b = a;
    console.log(b); //8
    b = c;
    var x = 5;
  };
  f(a, b, c);
  console.log(b); //10
};
c(8, 9, 10);
console.log(b); //10
console.log(x); //1
```

```javascript
console.log(bar); //undefined
console.log(baz); //2
foo();
function foo() {
  console.log("Hola!");//Hola!
}
var bar = 1;
baz = 2;
```

```javascript
var instructor = "Tony";
if (true) {
  var instructor = "Franco";
}
console.log(instructor);//Franco
```

```javascript
var instructor = "Tony";
console.log(instructor);//Tony
(function () {
  if (true) {
    var instructor = "Franco";
    console.log(instructor);//Franco
  }
})();
console.log(instructor);//Tony
```

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
  var instructor = "The Flash";
  let pm = "Reverse Flash";
  console.log(instructor);//The flash
  console.log(pm);//reverse flash
}
console.log(instructor);//The Flash
console.log(pm);//Franco
```

### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3" //2
"2" * "3" //6
4 + 5 + "px" //9px
"$" + 4 + 5 //$45
"4" - 2 //2
"4px" - 2 //NaN
7 / 0 //Infinity
{}[0] //undefined
parseInt("09") // 9
5 && 2 //2
2 && 5 //5
5 || 0 //5
0 || 5 //5
[3]+[3]-[10]//23
3>2>1 //false
[] == ![] //true
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).

### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

```javascript
function test() {
   console.log(a);
   console.log(foo());
|
   var a = 1;
   function foo() {
      return 2;
   }
}

test();
//  undefined
//  2

La razón por la cual obtenemos esta salida es debido a la forma en que las variables y funciones son declaradas y ejecutadas en JavaScript.

Cuando se ejecuta la función test(), ocurre lo siguiente:

La primera línea console.log(a) imprime el valor de a. Sin embargo, en este punto, la variable a aún no ha sido inicializada, por lo que su valor es undefined.

La siguiente línea console.log(foo()) llama a la función foo() e imprime su valor de retorno, que es 2. A diferencia de las variables, las funciones en JavaScript pueden ser invocadas antes de su declaración, por lo que la función foo() está disponible en este punto.

Luego, se declara la variable a y se le asigna el valor 1.

En resumen, al imprimir el valor de a antes de su declaración, obtenemos undefined, ya que JavaScript eleva las declaraciones de variables al comienzo del ámbito, pero no las inicializa hasta que se llega a su línea de declaración. Por otro lado, la función foo() se puede invocar antes de su declaración porque JavaScript también eleva las declaraciones de funciones al comienzo del ámbito.
```

Y el de este código? :

```javascript
var snack = "Meow Mix";

function getFood(food) {
  if (food) {
    var snack = "Friskies";
    return snack;
  }
  return snack;
}

getFood(false);//undefined


Se declara una variable global snack y se le asigna el valor "Meow Mix".
Se define una función getFood que toma un parámetro food.
Dentro de la función getFood, se declara una variable local snack y se le asigna el valor "Friskies" solo si el parámetro food es verdadero.
Si el parámetro food es falso, la función devuelve el valor de la variable global snack.
Se llama a la función getFood pasando false como argumento.
Debido a que el parámetro food es falso, el código dentro del bloque if no se ejecuta.
Como resultado, la función devuelve el valor de la variable global snack, que es "Meow Mix".
Sin embargo, como no se declara una variable snack en el ámbito local de la función antes de su uso en el bloque if, la referencia a snack dentro de la función se considera una variable no inicializada, lo que resulta en undefined como salida.
```

### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

```javascript
var fullname = "Juan Perez";
var obj = {
  fullname: "Natalia Nerea",
  prop: {
    fullname: "Aurelio De Rosa",
    getFullname: function () {
      return this.fullname;
    },
  },
};

console.log(obj.prop.getFullname());//Aurelio De Rosa

var test = obj.prop.getFullname; //

console.log(test());//juan perez No entiendo porque me da como salida juan perez, cuando deberia de ser aurelio de rosa
```

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

```javascript
function printing() {
  console.log(1);//PRIMERO
  setTimeout(function () {
    console.log(2);//CUARTO
  }, 1000);
  setTimeout(function () {
    console.log(3);//TERCERO
  }, 0);
  console.log(4);//SEGUNDO
}

printing();
Explicación:

Se llama a la función printing().
Se muestra en la consola el número 1.
Se ejecuta el primer setTimeout con un retraso de 1000 milisegundos (1 segundo). Este código se colocará en la cola de tareas y se ejecutará después de que haya pasado el tiempo especificado.
Se ejecuta el segundo setTimeout con un retraso de 0 milisegundos. Aunque el retraso se establece en 0, este código se coloca en la cola de tareas y se ejecutará después de que se haya completado la ejecución actual.
Se muestra en la consola el número 4.
La ejecución actual de printing() ha terminado y el contexto de ejecución se libera.
En este punto, el primer setTimeout ha pasado 1 segundo y se ejecuta su callback, mostrando en la consola el número 2.
El segundo setTimeout ha pasado por la cola de tareas y se ejecuta su callback, mostrando en la consola el número 3.
La razón por la que el número 3 se muestra antes del número 2 es porque los callbacks de los setTimeout se colocan en la cola de tareas y se ejecutan después de que se haya completado la ejecución actual del programa, incluso si tienen un retraso de 0 milisegundos. El orden de ejecución depende de cómo se manejan las tareas en la cola, lo que puede variar en función de la implementación del entorno de ejecución.

```

</br >

---

## **✅ FEEDBACK**

### Usa este [**formulario**](https://docs.google.com/forms/d/e/1FAIpQLSe1MybH_Y-xcp1RP0jKPLndLdJYg8cwyHkSb9MwSrEjoxyzWg/viewform) para reportar tus observaciones de mejora o errores. Tu feedback es muy importante para seguir mejorando el modelo educativo.
