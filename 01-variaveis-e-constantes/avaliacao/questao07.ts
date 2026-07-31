const nomeDaEstacao:string = "Serra Azul";
let numeroDaLeitura:number = 1;
let statusAtual2 = "preparando";

console.log("=== TRANSMISSÃO METEOROLÓGICA ===");
console.log("Estação:", nomeDaEstacao);
console.log("Leitura inicial:", numeroDaLeitura);

{
    const canal:string = "Norte";
    console.log("Canal:", canal);
    console.log("Estação no canal:", nomeDaEstacao);
}

numeroDaLeitura = 2;
statusAtual2 = "enviada";

console.log("Leitura Final:", numeroDaLeitura);
console.log("Status:", statusAtual2);