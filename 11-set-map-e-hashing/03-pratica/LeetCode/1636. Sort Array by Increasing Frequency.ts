/*
1. Organizar em ordem crescente, baseado na FREQUÊNCIA com que os números aparecem
2. Se mais de um número tiver a mesma frequência, organizar esses em ordem decrescente.
*/

/*
PASSO A PASSO:
1. Criar Map com números x frequências
2. Organizão utilizando o sort. O sort será a parte mais complexa, onde vamos precisar trabalhar o callback da maneira certa. 
    2.1 Organizar primeiro os números, de forma geral, de acordo com as frequências.
    2.2 Organizar números cujas frequências são iguais.

*/

function frequencySort(nums: number[]): number[] {
    const frequencyMap = new Map<number, number>();
    for (let i = 0 ; i < nums.length ; i++) {
        const qtdNums = frequencyMap.get(nums[i]) ?? 0;
        frequencyMap.set(nums[i], qtdNums + 1);
    }
    
    const arrayFrequency: [number, number][] = [...frequencyMap];
    arrayFrequency.sort((a, b) => {
        if (a[1] === b[1]) return b[0] - a[0];
        return a[1] - b[1];
    });
    
    const arraySaida = [];
    for (const valor of arrayFrequency){
        for (let i = 0 ; i < valor[1] ; i++) {
            arraySaida.push(valor[0]);
        }
    }
    return arraySaida;
}


// Example 1:
let nums = [1,1,2,2,2,3];
frequencySort(nums);
// Output: [3,1,1,2,2,2]
// Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.

// // Example 2:
nums = [2,3,1,3,2];
frequencySort(nums);
// // Output: [1,3,3,2,2]
// // Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.

// // Example 3:
nums = [-1,1,-6,4,5,-6,1,4,1];
frequencySort(nums);
// // Output: [5,-1,4,4,-6,-6,1,1,1]
