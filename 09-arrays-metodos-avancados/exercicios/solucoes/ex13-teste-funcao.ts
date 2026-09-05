const numeros: number[] = [12, -1, 0, 25, -3, 8];

function filtrarNegativos(numeros: number[]): number[] {
    const numerosFiltrados: number[] = numeros.filter(numero => numero >= 0);
    return numerosFiltrados;
}

let filtrados: number[] = filtrarNegativos(numeros);

console.log(filtrados);
console.log(`Quantidade removida: ${numeros.length - filtrados.length}`);
console.log(`Quantidade original: ${numeros.length}`);


const numerosNegativos: number[] = [-1, -2];
filtrados = filtrarNegativos(numerosNegativos);

console.log(filtrados);
console.log(`Quantidade removida: ${numerosNegativos.length - filtrados.length}`);
console.log(`Quantidade original: ${numerosNegativos.length}`);