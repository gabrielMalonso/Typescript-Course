function topKFrequent(nums: number[], k: number): number[] {
    const frequencyMap = new Map<number, number>();
    const maioresKFrequenciasArray: number[] = [];

    // Montar o Map com as frequências de cada valor
    for (const num of nums) {
        const qtdNum = frequencyMap.get(num) ?? 0;
        frequencyMap.set(num, qtdNum + 1);
    }

    // Organizar em ordem de frequências

    const organizandoMap = [...frequencyMap];
    organizandoMap.sort((a, b) => b[1] - a[1]);

    for (let i = 0; i < k; i++) {
        const maiorFrequencia = organizandoMap[i][0];
        maioresKFrequenciasArray.push(maiorFrequencia);
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
