function arrayRankTransform(arr: number[]): number[] {
    const arrOrdenadoSet = [...new Set<number>(arr)].sort((a, b) => a - b);
    // primeiro eu faço o Set, a partir do Array original, eliminando números duplicados. Só então eu faço a ordenação. Originalmente, eu tinha feito `const arrOrdenadoSet = new Set<number>([...arr].sort((a, b) => a - b));`. Isso ordena todos os números e só depois elimina as duplicatas (custo maior para ordenação).
    const arrOrdenadoMap = new Map<number, number>();
    const arrRanks: number[] = [];
    let cont = 1;
    for (const valor of arrOrdenadoSet) {
        arrOrdenadoMap.set(valor, cont);
        cont++;
    }

    for (let i = 0; i < arr.length; i++) {
        const rank = arrOrdenadoMap.get(arr[i]) ?? 0;
        arrRanks.push(rank);
    }
    return arrRanks;
}

// Example 1:
let arr = [40, 10, 20, 30];
console.log(arrayRankTransform(arr));
// Output: [4,1,2,3]
// Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.
// Example 2:

arr = [100, 100, 100];
console.log(arrayRankTransform(arr));
// Output: [1,1,1]
// Explanation: Same elements share the same rank.
// Example 3:

arr = [37, 12, 28, 9, 100, 56, 80, 5, 12];
console.log(arrayRankTransform(arr));
// Output: [5,3,4,2,8,6,7,1,3]
