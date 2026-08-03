const comprimentoDaBarra: number = 3.75; // em metros
const valorDeUmMetro: number = 1e3; // em milímetros
const comprimentoEmMilimetros: number = comprimentoDaBarra * valorDeUmMetro;
const metadeDoComprimento:number = comprimentoDaBarra / 2;

console.log(`Comprimento: ${comprimentoDaBarra} m`);
console.log(`Comprimento: ${comprimentoEmMilimetros} mm`);
console.log(`Metade do comprimento: ${metadeDoComprimento} m`);