function topKFrequent(nums: number[], k: number): number[] {
    const frequencyMap = new Map<number, number>();
    const maioresKFrequenciasArray: number[] = [];

    // Montar o Map com as frequências de cada valor
    for (const num of nums) {
        const qtdNum = frequencyMap.get(num) ?? 0;
        frequencyMap.set(num, qtdNum + 1);
    }

    // percorrer o Map k vezes, buscando os k números mais frequêntes.
    let checks = 0;
    while (checks < k) {
        // só serve para forçar o código a percorrer o Map k vezes.
        let maiorFrequencia = 0;
        let valorComMaiorFrequencia = 0;
        for (const [num, freq] of frequencyMap) {
            // aqui sim o Map está sendo percorrido, de fato, buscando as maiores frequencias.
            if (freq > maiorFrequencia) {
                maiorFrequencia = freq;
                valorComMaiorFrequencia = num;
            }
        }
        // após localizar o número com maior frequência: fazer o push para a saída e zerar a frequência dele, pra ele não aparecer novamente.
        maioresKFrequenciasArray.push(valorComMaiorFrequencia);
        frequencyMap.set(valorComMaiorFrequencia, 0);
        checks++;
    }

    return maioresKFrequenciasArray;
}

// Example 1:
let nums = [1, 1, 1, 2, 2, 3];
let k = 2;
console.log(topKFrequent(nums, k));
// Output: [1,2]

// Example 2:
nums = [1];
k = 1;
console.log(topKFrequent(nums, k));
// Output: [1]

// Example 3:
nums = [1, 2, 1, 2, 1, 2, 3, 1, 3, 2];
k = 2;
console.log(topKFrequent(nums, k));
// Output: [1,2]
