const nomeDoEvento: string = "Feira de Ciências";
let totalDeParticipantes: number = 40;

console.log("Evento:", nomeDoEvento);

{
    const nomeDaSala: string = "Laboratório 2";

    console.log("Sala:", nomeDaSala);
    console.log("Total de Participantes:", totalDeParticipantes);

    totalDeParticipantes = 44;
    console.log("Participantes no bloco:", totalDeParticipantes);
}

console.log("Evento ao final:", nomeDoEvento);
console.log("Participantes ao final:", totalDeParticipantes);
