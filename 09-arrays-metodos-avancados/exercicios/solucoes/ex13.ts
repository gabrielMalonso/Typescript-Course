const numeros: number[] = [12, -1, 0, 25, -3, 8];

const maiorIgualAZero: number[] = numeros.filter(numero => numero >= 0);

console.log(maiorIgualAZero);

console.log(`Quantidade removida: ${numeros.length - maiorIgualAZero.length}`);
console.log(`Quantidade original: ${numeros.length}`);

const numerosNegativos: number[] = [-1, -2];
const filtrarNegativos = numerosNegativos.filter(numero => numero >= 0);
console.log(filtrarNegativos);
console.log(`Quantidade removida: ${numerosNegativos.length - filtrarNegativos.length}`);
console.log(`Quantidade original: ${numerosNegativos.length}`); 