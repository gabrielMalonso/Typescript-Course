var fila = ["Ana", "Breno", "Cecília", "Diego"];
var primeiraPessoa = fila.shift();
var ultimaPessoa = fila.pop();
console.log("Primeira Pessoa (removida): ".concat(primeiraPessoa));
console.log("\u00DAltima pessoa (removida): ".concat(ultimaPessoa));
console.log("Array restante: ".concat(fila));
console.log("Primeiro elemento: ".concat(fila[0]));
console.log("\u00DAltimo elemento: ".concat(fila[fila.length - 1]));
console.log("Quantidade final: ".concat(fila.length));
