const modulos: string[] = ["tipos", "condições"];

modulos.push("loops"); // Estado Previsto: ["tipos", "condições", "loops"];
modulos.unshift("introdução"); // Estado Previsto: ["introducao", "tipos", "condições", "loops"]; 
modulos[2] = "decisões"; // Estado Previsto: ["introducao", "tipos", "decisões", "loops"]; 
const moduloRemovidoDoFim = modulos.pop(); // Estado Previsto: ["introducao", "tipos", "decisões"]; 
const moduloRemovidoDoInicio = modulos.shift(); // Estado Previsto: ["tipos", "decisões"]; 

console.log(`Removido do fim: ${moduloRemovidoDoFim}`);
console.log(`Removido do início: ${moduloRemovidoDoInicio}`);
console.log(modulos);
console.log(`Quantidade: ${modulos.length}`);

/*
-> tsc ex24.ts && node ex24.js
Removido do fim: loops
Removido do início: introdução
[ 'tipos', 'decisões' ]
Quantidade: 2
*/