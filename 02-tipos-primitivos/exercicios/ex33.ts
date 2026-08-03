const codigoDoSensor = "SP-09";
const pressaoMinima: number = 2.5; // bar
const pressaoMaxima: number = 8.5; // bar
const faixaDeOperacao = pressaoMaxima - pressaoMinima;
const pressaoMedia = (pressaoMaxima + pressaoMinima) / 2;
const calibracaoValida = true;
const observacaoTecnica: null = null;
const dataDoCertificado: undefined = undefined;
const tituloDoPainel = "=== CALIBRAÇÃO DO SENSOR "+ codigoDoSensor + " ===";

console.log(tituloDoPainel);
console.log(`Pressão mínima: ${pressaoMinima} bar`);
console.log(`Pressão máxima: ${pressaoMaxima} bar`);
console.log(`Faixa de operação: ${faixaDeOperacao} bar`);
console.log(`Pressão média: ${pressaoMedia} bar`);
console.log(`Calibração válida: ${calibracaoValida}`);
console.log(`Observação técnica: ${observacaoTecnica}`);
console.log(`Data do certificado: ${dataDoCertificado}`);

