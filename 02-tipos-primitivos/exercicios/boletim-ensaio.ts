const numeroDoEnsaio = 27;
const materialDaAmostra = "Liga de alumínio";
const temperaturaInicial:number = 22.5;
const temperaturaFinal:number = 78.5;
const variacaoDeTemperatura:number = temperaturaFinal-temperaturaInicial;
const temperaturaMedia:number = (temperaturaInicial+temperaturaFinal)/2;
const ensaioConcluido: boolean = true;
const observacaoDoInspetor:null = null;
const codigoDeFalha:undefined = undefined;

// Desafios de Expansao - Declarações
const duracaoDoEnsaioEmSegundos:number = 1.8e3;
const laboratorioAcreditado:boolean = false;
const resumoDoEnsaio:string = (`Ensaio: ET-${numeroDoEnsaio}
Material: ${materialDaAmostra}
Temperatura média: ${temperaturaMedia}ºC`);

console.log(`=== BOLETIM DE ENSAIO TÉRMICO ===`);
console.log(`Ensaio: ET-${numeroDoEnsaio}`);
console.log(`Material: ${materialDaAmostra}`);
console.log(`Temperatura inicial: ${temperaturaInicial} ºC`);
console.log(`Temperatura final: ${temperaturaFinal} ºC`);
console.log(`Variação: ${variacaoDeTemperatura} ºC`);
console.log(`Temperatura média: ${temperaturaMedia} ºC`);
console.log(`Concluído: ${ensaioConcluido}`);
console.log(`Observação do inspetor: ${observacaoDoInspetor}`);
console.log(`Código de falha: ${codigoDeFalha}`);

// Desafios de Expansao - Outputs
console.log(`=== DESAFIOS DE EXPANSÃO ===`);
console.log(`Duração: ${duracaoDoEnsaioEmSegundos} s`);
console.log(`Laboratório acreditado: ${laboratorioAcreditado}`);
console.log(`Resumo: ${resumoDoEnsaio}`);


