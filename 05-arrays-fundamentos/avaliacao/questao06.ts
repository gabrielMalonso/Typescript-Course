const entrega: string[] = ["briefing", "design", "teste"];

entrega.push("publicação");
entrega.unshift("planejamento");
entrega[2] = "implementação";

const etapaAdiada = entrega.pop();
const etapaConcluida = entrega.shift();
const ultimoIndice = entrega.length - 1;

console.log(`Etapa adiada: ${etapaAdiada}`);
console.log(`Etapa concluída: ${etapaConcluida}`);
console.log(`Primeira restante: ${entrega[0]}`);
console.log(`Última restante: ${entrega[ultimoIndice]}`);
console.log(entrega);
console.log(`Quantidade final: ${entrega.length}`);