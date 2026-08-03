const primeiroTurno: number = 18.5; //kWh
const segundoTurno: number = 21.5; //kWh
const relatorioConcluido: boolean = true;
const observacaoAdicional: null = null;
const protocoloExterno: undefined = undefined;

const consumoTotal: number = primeiroTurno + segundoTurno;
const diferencaConsumo: number = segundoTurno - primeiroTurno;

console.log(`=== RELATÓRIO DE CONSUMO ===`);
console.log(`Consumo total: ${consumoTotal} kWh`);
console.log(`Diferença entre turnos: ${diferencaConsumo} kWh`);
console.log(`Relatório concluído: ${relatorioConcluido}`);
console.log(`Observação adicional: ${observacaoAdicional}`);
console.log(`Protocolo externo: ${protocoloExterno}`);
