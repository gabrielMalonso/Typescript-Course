let comTipo: string = "Olá";
let semTipo = "Mundo";

console.log(comTipo);
console.log(semTipo);

//Resposta: 
// Funciona! O TypeScript infere o tipo da variável semTipo como string.
// Ao substituir o valor de semTipo por um número, o TypeScript não permite, pois o tipo da variável é string.
// O TypeScript não permite que uma variável do tipo string receba um valor do tipo number.

