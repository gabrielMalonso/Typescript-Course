const temperaturas: number[] = [0, 20, 30];

function converterTemperaturas(temperaturas: number[]): number[] {
    const converter = temperaturas.map(temperatura => temperatura * 1.8 + 32);
    return converter;
}

const temperaturasConvertidas = converterTemperaturas(temperaturas);
console.log(temperaturas);
console.log(temperaturasConvertidas);
console.log(temperaturas === temperaturasConvertidas);

// Temperatura [-40]:
const temperaturaMenos40 = [-40];
console.log(converterTemperaturas(temperaturaMenos40));
