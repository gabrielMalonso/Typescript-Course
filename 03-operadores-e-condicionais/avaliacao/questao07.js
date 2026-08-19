var codigoDaLinha = "L-04";
var temperaturaAtual = 73;
var temperaturaMaxima = 75;
var pressaoAtual = 8.2;
var pressaoMinima = 5;
var pressaoMaxima = 8.5;
var protecaoFechada = true;
var paradaDeEmergencia = false;
var turno = "N";
var nomeDoSupervisor = undefined;
var temperaturaSegura = temperaturaAtual <= temperaturaMaxima;
var pressaoSegura = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
var linhaLiberada = temperaturaSegura && pressaoSegura && protecaoFechada && !paradaDeEmergencia;
var estado;
if (linhaLiberada) {
    estado = "LINHA LIBERADA";
}
else {
    estado = "LINHA BLOQUEADA";
}
var mensagemTurno;
switch (turno) {
    case "M":
        mensagemTurno = "Manhã";
        break;
    case "T":
        mensagemTurno = "Tarde";
        break;
    case "N":
        mensagemTurno = "Noite";
        break;
    default:
        mensagemTurno = "Inválido";
}
var margemDeTemperatura = temperaturaMaxima - temperaturaAtual;
var supervisor = nomeDoSupervisor !== null && nomeDoSupervisor !== void 0 ? nomeDoSupervisor : "Não Informado";
console.log("=== LINHA ".concat(codigoDaLinha, " ==="));
console.log("Estado: ".concat(estado));
console.log("Turno: ".concat(mensagemTurno));
console.log("Margem de temperatura: ".concat(margemDeTemperatura, " \u00BAC"));
console.log("Supervisor: ".concat(supervisor));
