const temperaturas: number[] = [0, 20, 30];
const temperaturasConvertidas = temperaturas.map(temperatura => temperatura * 1.8 + 32);

console.log(temperaturas);
console.log(temperaturasConvertidas);
console.log(temperaturas === temperaturasConvertidas);

const temperaturaEspecifica: number[] = [-40];
const temperaturasEspecificasConvertidas = temperaturaEspecifica.map(temperatura => temperatura * 1.8 + 32);

console.log(temperaturasEspecificasConvertidas);