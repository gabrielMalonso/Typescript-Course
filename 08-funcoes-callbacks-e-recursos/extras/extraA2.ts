const tarefas = [
    { titulo: "Backup", urgente: true, horas: 2 },
    { titulo: "Reunião", urgente: false, horas: 1 },
    { titulo: "Deploy", urgente: true, horas: 4 },
    { titulo: "Documentar", urgente: false, horas: 3 },
];

function selecionarTarefas(lista: {
    titulo: string;
    urgente: boolean;
    horas: number;
}[],
    atende: (tarefa: {
        titulo: string;
        urgente: boolean;
        horas: number;
    }) => boolean,
): { titulo: string; urgente: boolean; horas: number; }[] {
    const tarefasAprovadas: { titulo: string; urgente: boolean; horas: number; }[] = [];

    for (const tarefa of lista) {
        if (atende(tarefa)) {
            tarefasAprovadas.push(tarefa);
        }
    }
    return tarefasAprovadas;
}

// TESTES:
// urgentes:
console.log("URGENTES:");
const urgentes = selecionarTarefas(tarefas, (tarefa) => tarefa.urgente);
for (const item of urgentes){
    console.log(`Título: ${item.titulo} | Urgente: ${item.urgente} | Horas: ${item.horas}`)
}

// horas >= 3:
console.log("");
console.log("HORAS >= 3");
const horaMaiorIgual3 = selecionarTarefas(tarefas, (tarefa) => tarefa.horas >= 3);
for (const item of horaMaiorIgual3){
    console.log(`Título: ${item.titulo} | Urgente: ${item.urgente} | Horas: ${item.horas}`)
}

// regra que rejeita todas
console.log("");
console.log("REGRA QUE REJEITA TODAS");
const rejeitaTodas = selecionarTarefas(tarefas, (tarefa) => false);
for (const item of rejeitaTodas){
    console.log(`Título: ${item.titulo} | Urgente: ${item.urgente} | Horas: ${item.horas}`)
}

// array vazio
console.log("");
console.log("ARRAY VAZIO:");
const arrayVazio: { titulo: string; urgente: boolean; horas: number }[] = [];

let testeArrayVazio = selecionarTarefas(arrayVazio, (tarefa) => true);
console.log((testeArrayVazio.length === 0) ? "Array Vazio!": testeArrayVazio);

for (const item of testeArrayVazio){
    console.log(`Título: ${item.titulo} | Urgente: ${item.urgente} | Horas: ${item.horas}`)
}

testeArrayVazio = selecionarTarefas(tarefas, (tarefa) => true);

console.log("");
console.log("ARRAY COMUM:");

for (const item of testeArrayVazio){
    console.log(`Título: ${item.titulo} | Urgente: ${item.urgente} | Horas: ${item.horas}`)
}

// tarefas.length continua 4
console.log("");
console.log("tarefas.length continua 4:");
console.log(tarefas.length);
