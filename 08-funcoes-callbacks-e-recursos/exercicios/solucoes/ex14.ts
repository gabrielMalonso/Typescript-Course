const tarefas = [
  { nome: "Responder mensagens", minutos: 15 },
  { nome: "Revisar projeto", minutos: 50 },
  { nome: "Organizar arquivos", minutos: 30 },
];

function criarLimiteDeDuracao(
  maximo: number,
): (tarefa: { nome: string; minutos: number }) => boolean {
  return (tarefa) => tarefa.minutos <= maximo;
}

const ate30 = criarLimiteDeDuracao(30);
const ate10 = criarLimiteDeDuracao(10);

console.log("Até 30:");
for (const tarefa of tarefas) {
  if (ate30(tarefa)) {
    console.log(`${tarefa.nome} | ${tarefa.minutos}`);
  }
}

console.log("Até 10:");
for (const tarefa of tarefas) {
  if (ate10(tarefa)) {
    console.log(`${tarefa.nome} | ${tarefa.minutos}`);
  }
}

const exatamente30 = { nome: "Prova do limite", minutos: 30 };
console.log(ate30(exatamente30)); // true
console.log(ate10(exatamente30)); // false