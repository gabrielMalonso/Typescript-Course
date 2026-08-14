const niveis: string[] = ["baixo", "médio", "alto"];

const quantidade = niveis.length;
const ultimoIndiceValido = niveis.length - 1;
const ultimoNivel = niveis[ultimoIndiceValido];
const valorForaDoArray = niveis[quantidade];

console.log(`Quantidade: ${quantidade}`);
console.log(`Último índice válido: ${ultimoIndiceValido}`);
console.log(`Último nível: ${ultimoNivel}`);
console.log(`Fora do array: ${valorForaDoArray}`);

const explicacao = `O índice 3 não existe nesse array apesar de length valer 3 devido ao fato de que os índices começam sua contagem a partir do 0. Portanto, ele vai de 0 a 2, somando 3 índices.`;
