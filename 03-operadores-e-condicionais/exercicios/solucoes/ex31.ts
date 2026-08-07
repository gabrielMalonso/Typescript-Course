const lote = 48;
const divisivelPorTres = lote%3 === 0;
const divisivelPorQuatro = lote%4 === 0;
const divisivelPorDoze = divisivelPorTres && divisivelPorQuatro;

console.log(`Divisível por 3: ${divisivelPorTres}`);
console.log(`Divisível por 4: ${divisivelPorQuatro}`);
console.log(`Divisível por 12: ${divisivelPorDoze}`);