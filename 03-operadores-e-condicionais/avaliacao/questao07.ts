const codigoDaLinha: string = "L-04";
const temperaturaAtual: number = 73;
const temperaturaMaxima = 75;
const pressaoAtual = 8.2;
const pressaoMinima = 5;
const pressaoMaxima = 8.5;
const protecaoFechada: boolean = true;
const paradaDeEmergencia = false;
const turno: string = "N";
const nomeDoSupervisor: undefined = undefined;

const temperaturaSegura = temperaturaAtual <= temperaturaMaxima;
const pressaoSegura = pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
const linhaLiberada = temperaturaSegura && pressaoSegura && protecaoFechada && !paradaDeEmergencia;

let estado;
if (linhaLiberada){ 
    estado = "LINHA LIBERADA";
} else {
    estado = "LINHA BLOQUEADA";
}

let mensagemTurno;
switch (turno){
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

const margemDeTemperatura = temperaturaMaxima - temperaturaAtual;

const supervisor = nomeDoSupervisor ?? "Não Informado";

console.log(`=== LINHA ${codigoDaLinha} ===`);
console.log(`Estado: ${estado}`);
console.log(`Turno: ${mensagemTurno}`);
console.log(`Margem de temperatura: ${margemDeTemperatura} ºC`);
console.log(`Supervisor: ${supervisor}`);
