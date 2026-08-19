var sequencia = ["B", "C"];
var tamanhoDepoisDoPush = sequencia.push("D");
var tamanhoDepoisdoUnshift = sequencia.unshift("A");
console.log("Depois do push: ".concat(tamanhoDepoisDoPush));
console.log("Depois do unshift: ".concat(tamanhoDepoisdoUnshift));
console.log(sequencia);
console.log("Quantidade final: ".concat(sequencia.length));
// 
