var nome = "Gabriel";
var idade = 30;
var estudando = true;
console.log(nome, idade, estudando);
console.log("Oi, meu nome é", nome, "eu tenho", idade, "anos", "e estou estudando?", estudando);
//teste de quebra de tipo:
//idade = "trinta";
//não é necessário declarar o tipo toda vez, o typescript infere:
var cidade = "Vila Velha"; // TypeScript sabe que é string
var ano = 2026; // TypeScript sabe que é number
//cidade = 123; //quebra o código
//ano = "dois mil vinte e seis"; //quebra o código
console.log(cidade);
console.log(ano);
//O Que Aprendemos:
// : string significa "esta variável guarda texto"
// : number significa "esta variável guarda número"
// : boolean significa "esta variável guarda verdadeiro ou falso"
// TypeScript infere tipos quando você atribui um valor inicial
// Se você tentar atribuir um tipo diferente, TypeScript avisa com erro
