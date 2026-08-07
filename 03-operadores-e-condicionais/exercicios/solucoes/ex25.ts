const codigoDoTurno: string = "N";

switch (codigoDoTurno){
    case "M":
        console.log(`Turno da manhã`);
        break;
    case "T":
        console.log(`Turno da tarde`);
        break;
    case "N":
        console.log(`Turno da noite`);
        break;
    default:
        console.log(`Turno inválido`);
}
