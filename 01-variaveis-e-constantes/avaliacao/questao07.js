var nomeDaEstacao = "Serra Azul";
var numeroDaLeitura = 1;
var statusAtual = "preparando";
console.log("=== TRANSMISSÃO METEOROLÓGICA ===");
console.log("Estação:", nomeDaEstacao);
console.log("Leitura inicial:", numeroDaLeitura);
{
    var canal = "Norte";
    console.log("Canal:", canal);
    console.log("Estação no canal:", nomeDaEstacao);
}
numeroDaLeitura = 2;
statusAtual = "enviada";
console.log("Leitura Final:", numeroDaLeitura);
console.log("Status:", statusAtual);
