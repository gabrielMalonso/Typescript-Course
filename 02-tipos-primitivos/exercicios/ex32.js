var primeiroTurno = 18.5; //kWh
var segundoTurno = 21.5; //kWh
var relatorioConcluido = true;
var observacaoAdicional = null;
var protocoloExterno = undefined;
var consumoTotal = primeiroTurno + segundoTurno;
var diferencaConsumo = segundoTurno - primeiroTurno;
console.log("=== RELAT\u00D3RIO DE CONSUMO ===");
console.log("Consumo total: ".concat(consumoTotal, " kWh"));
console.log("Diferen\u00E7a entre turnos: ".concat(diferencaConsumo, " kWh"));
console.log("Relat\u00F3rio conclu\u00EDdo: ".concat(relatorioConcluido));
console.log("Observa\u00E7\u00E3o adicional: ".concat(observacaoAdicional));
console.log("Protocolo externo: ".concat(protocoloExterno));
