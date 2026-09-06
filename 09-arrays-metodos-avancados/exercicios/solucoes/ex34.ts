const valores: number[] = [10, 20, 40];

// const valoresMaioresIguaisA20ComDesconto = valores
//     .filter (valor => valor >= 20)
//     .map (valor => valor / 2);
// console.log(valoresMaioresIguaisA20ComDesconto);

// const valoresComDescontoMaioresIguaisA20 = valores
//     .map (valor => valor / 2)
//     .filter (valor => valor >= 20);
// console.log(valoresComDescontoMaioresIguaisA20);

const valoresMaioresIguaisA20 = valores.filter(valor => valor >= 20);
console.log(valoresMaioresIguaisA20);

const descontoAplicado = valoresMaioresIguaisA20.map(valor => valor / 2);
console.log(descontoAplicado);

const descontoTodosOsValores = valores.map(valor => valor / 2);
console.log(descontoTodosOsValores);

const valoresMaioresIguaisA20AposDesconto = descontoTodosOsValores.filter(valor => valor >= 20);
console.log(valoresMaioresIguaisA20AposDesconto);

// Os resultados diferem porque a ordem dos métodos altera quais valores são avaliados pelo filter. No primeiro caso, o filter avalia os valores originais. No segundo, avalia os valores após a aplicação do desconto.