const filaDeEstudos: string[] = [
  "Revisar capítulo 4",
  "Estudar arrays",
  "Anotar dúvidas",
];

console.log(`=== FILA DE ESTUDOS ===`);
console.log(`Quantidade inicial: ${filaDeEstudos.length}`);
filaDeEstudos.unshift("Resolver tarefa urgente");
filaDeEstudos.push("Fazer desafio rápido");

filaDeEstudos[1] = "Concluir prática do capítulo 4";

const proximaAtividade = filaDeEstudos.shift();
const atividadeAdiada = filaDeEstudos.pop();

console.log(`Próxima atividade: ${proximaAtividade}`);
console.log(`Atividade adiada: ${atividadeAdiada}`);

console.log(`Item 1: ${filaDeEstudos[0]}`);
console.log(`Item 2: ${filaDeEstudos[1]}`);
console.log(`Item 3: ${filaDeEstudos[2]}`);

/*
Também é possível utilizar o `for` para fazer a mesma tarefa.
for (let indice = 0; indice < filaDeEstudos.length; indice++) {
    console.log(`Item do índice ${indice}: ${filaDeEstudos[indice]}`);
} */

console.log(`Quantidade final: ${filaDeEstudos.length}`);
