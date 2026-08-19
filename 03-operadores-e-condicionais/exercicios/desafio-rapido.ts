const carga: number = 82; // kg
const cargaLimite: number = 100; // kg
const margem: number = cargaLimite - carga;
const cargaSegura: boolean = carga <= cargaLimite; // true

const resultado: string = cargaSegura ? "Dentro do limite" : "Acima do limite";

console.log(`Margem ${margem} kg`);
console.log(`Estado: ${resultado}`);
