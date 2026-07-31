const codigoDaOrdem:string = "MN-204";
const nomeDaTecnica= "Aline";
const manutencaoPrioritaria:boolean = true;
let statusAtual1 = "agenada";

console.log("Ordem:", codigoDaOrdem);
console.log("Técnica:", nomeDaTecnica);
console.log("Prioridade:", manutencaoPrioritaria);
console.log("Status inicial:", statusAtual1);

statusAtual1 = "concluída";
console.log("Status final:", statusAtual1);