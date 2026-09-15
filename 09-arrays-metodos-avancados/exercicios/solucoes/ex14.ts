const numeros = [3, 8, 11];

const par: boolean[] = numeros.map((numero) => numero % 2 === 0);

console.log(par);

// No map, o tipo do array resultante depende do tipo retornado pelo callback. O map executa o callback uma vez para cada elemento e cria um novo array com a mesma quantidade de elementos do array original.