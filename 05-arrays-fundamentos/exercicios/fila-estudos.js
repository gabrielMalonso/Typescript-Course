var filaDeEstudos = [
    "Revisar capítulo 4",
    "Estudar arrays",
    "Anotar dúvidas",
];
console.log("=== FILA DE ESTUDOS ===");
console.log("Quantidade inicial: ".concat(filaDeEstudos.length));
filaDeEstudos.unshift("Resolver tarefa urgente");
filaDeEstudos.push("Fazer desafio rápido");
filaDeEstudos[1] = "Concluir prática do capítulo 4";
var proximaAtividade = filaDeEstudos.shift();
var atividadeAdiada = filaDeEstudos.pop();
console.log("Pr\u00F3xima atividade: ".concat(proximaAtividade));
console.log("Atividade adiada: ".concat(atividadeAdiada));
console.log("Item 1: ".concat(filaDeEstudos[0]));
console.log("Item 2: ".concat(filaDeEstudos[1]));
console.log("Item 3: ".concat(filaDeEstudos[2]));
/*
Também é possível utilizar o `for` para fazer a mesma tarefa.
for (let indice = 0; indice < filaDeEstudos.length; indice++) {
    console.log(`Item do índice ${indice}: ${filaDeEstudos[indice]}`);
} */
console.log("Quantidade final: ".concat(filaDeEstudos.length));
