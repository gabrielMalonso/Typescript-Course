const codigoDaBancada = "H-12";
const volumeDeEntrada: number = 18.75; // Litros
const volumeDeSaida: number = 6.25; // Litros
const saldoDeVolume = volumeDeEntrada - volumeDeSaida;
const volumeMovimentado: number = volumeDeSaida + volumeDeEntrada;
const testeConcluido: boolean = true;
const observacaoFinal: null = null;
const numeroDoRegistro: undefined = undefined;

console.log(`=== BALANÇO HIDRÁULICO ===`);
console.log(`Volume de entrada: ${volumeDeEntrada} L`);
console.log(`Volume de saída: ${volumeDeSaida} L`);
console.log(`Saldo de voluma: ${saldoDeVolume} L`);
console.log(`Volume movimentado: ${volumeMovimentado} L`);
console.log(`Teste concluído: ${testeConcluido}`);
console.log(`Observação final: ${observacaoFinal}`);
console.log(`Numero do registro: ${numeroDoRegistro}`);