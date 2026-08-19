const vibracaoAtual = 6.8;
let classificacao: string;
const margemAteCritica = 8 - vibracaoAtual;
const exigeInspecao = (vibracaoAtual >= 6) ? "sim" : "não";

if (vibracaoAtual > 8){
    classificacao = "CRÍTICA";
} else if(vibracaoAtual <= 6){
    classificacao = "ATENÇÃO";
} else {
    classificacao = "NORMAL"
}

console.log(`=== ANÁLISE DE VIBRAÇÃO ===`);
console.log(`Classificação: ${classificacao}`);
console.log(`Margem até crítica: ${margemAteCritica} mm/s`);
console.log(`Exige inspeção: ${exigeInspecao}`);





