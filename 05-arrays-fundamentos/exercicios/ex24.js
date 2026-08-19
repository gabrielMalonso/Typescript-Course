var modulos = ["tipos", "condições"];
modulos.push("loops"); // Estado Previsto: ["tipos", "condições", "loops"];
modulos.unshift("introdução"); // Estado Previsto: ["introducao", "tipos", "condições", "loops"]; 
modulos[2] = "decisões"; // Estado Previsto: ["introducao", "tipos", "decisões", "loops"]; 
var moduloRemovidoDoFim = modulos.pop(); // Estado Previsto: ["introducao", "tipos", "decisões"]; 
var moduloRemovidoDoInicio = modulos.shift(); // Estado Previsto: ["tipos", "decisões"]; 
console.log("Removido do fim: ".concat(moduloRemovidoDoFim));
console.log("Removido do in\u00EDcio: ".concat(moduloRemovidoDoInicio));
console.log(modulos);
console.log("Quantidade: ".concat(modulos.length));
/*
-> tsc ex24.ts && node ex24.js
Removido do fim: loops
Removido do início: introdução
[ 'tipos', 'decisões' ]
Quantidade: 2
*/ 
