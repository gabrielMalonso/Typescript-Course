const consulta: { 
    paciente: string;
    horario: { data: string; hora: string},
} = {
    paciente: "Helena",
    horario: {data: "2026-08-17", hora: "09:30"},
};

console.log(`Horário da consulta: ${consulta.horario.hora}`);

consulta.horario.hora = "10:15";
console.log(`Horário da consulta: ${consulta.horario.hora}`);

