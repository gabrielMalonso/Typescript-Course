const sensores = [
    { id: "S1", temperatura: 18, ativo: true },
    { id: "S2", temperatura: 31, ativo: true },
    { id: "S3", temperatura: 27, ativo: false },
    { id: "S4", temperatura: 42, ativo: true },
];

function contarSensores(lista: {
    id: string;
    temperatura: number;
    ativo: boolean;
}[],
    criterio: (sensor: {
        id: string;
        temperatura: number;
        ativo: boolean;
    }) => boolean): number {
        let cont = 0;
        
        for (const sensor of lista) {
            if (criterio(sensor)) {
                cont++;
            }
        }
        return cont;
}

// sensores ativos
const sensoresAtivos = contarSensores (sensores, (sensor) => sensor.ativo);
console.log(sensoresAtivos);

// temperatura maior que 30
const temperaturaMaiorQue30 = contarSensores (sensores, (sensor) => sensor.temperatura > 30);
console.log(temperaturaMaiorQue30);

// inativos com temperatura menor que 20
const inativosTemperaturaMenorQue20 = contarSensores (sensores, (sensor) => sensor.temperatura < 20 && !sensor.ativo);
console.log(inativosTemperaturaMenorQue20);
