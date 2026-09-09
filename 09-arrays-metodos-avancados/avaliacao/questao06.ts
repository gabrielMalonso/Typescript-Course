const sensores: {
    codigo: string;
    valor: number;
    online: boolean;
}[] = [
        { codigo: "T1", valor: 42, online: true },
        { codigo: "T2", valor: -1, online: false },
        { codigo: "T3", valor: 75, online: true },
        { codigo: "T4", valor: 18, online: true },
    ];

const firstOnlineGreaterIqual50 = sensores
    .filter(sensor => sensor.online)
    .find(sensor => sensor.valor >= 50);
console.log(firstOnlineGreaterIqual50);

const indexOfFirstOnlineSensor = sensores.findIndex(sensor => sensor.online);
console.log(indexOfFirstOnlineSensor);

const onlineSensorWithNegativeValues = sensores
    .filter(sensor => sensor.online)
    .find(sensor => sensor.valor < 0);
console.log(onlineSensorWithNegativeValues ? "Sim" : "Não");

const ifAllOnlineSensorsHavePositiveValues = sensores
    .filter(sensor => sensor.online)
    .every(sensor => sensor.valor > 0);
console.log(ifAllOnlineSensorsHavePositiveValues ? "Sim" : "Não");

const findingCodeT9 = sensores.find(sensor => sensor.codigo === "T9");
if (findingCodeT9 === undefined) {
    console.log(`Código não encontrado`);
} else {
    console.log(findingCodeT9);
}