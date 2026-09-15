const tarefas: { titulo: string; concluida: boolean }[] = [
    { titulo: "Teoria", concluida: true },
    { titulo: "Exercícios", concluida: false },
];

const copiaDoArray: { titulo: string; concluida: boolean }[] = [ ...tarefas ];
const copiaDosObjetos: { titulo: string; concluida: boolean }[]= tarefas.map (tarefa => ({
    ... tarefa
}));

console.log(tarefas === copiaDoArray);
console.log(tarefas[0] === copiaDoArray[0]);
console.log(tarefas[0] === copiaDosObjetos[0]);