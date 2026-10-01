function minimumAbsDifference(arr: number[]): number[][] {
    const arrSorted = [...arr].sort((a, b) => a - b);
    let minimumDifference: number = arrSorted[1] - arrSorted[0];

    // Defindo a diferença mínima no Array
    for (let i = 1; i < arrSorted.length; i++) {
        const valorAtual = arrSorted[i];
        const valorAnterior = arrSorted[i - 1];
        let difference = valorAtual - valorAnterior;
        if (difference === 1) {
            minimumDifference = difference;
            break;
        }
        if (difference < minimumDifference) {
            minimumDifference = difference;
        }
    }
    // criando o array de saída
    const arrayAnswer: [number, number][] = [];
    for (let i = 1; i < arrSorted.length; i++) {
        const valorAtual = arrSorted[i];
        const valorAnterior = arrSorted[i - 1];
        let difference = valorAtual - valorAnterior;

        if (difference === minimumDifference) {
            arrayAnswer.push([valorAnterior, valorAtual]);
        }
    }
    return arrayAnswer;
}

// Example 1:
let arr = [4, 2, 1, 3];
console.log(minimumAbsDifference(arr));
// Output: [[1,2],[2,3],[3,4]]
// Explanation: The minimum absolute difference is 1. List all pairs with difference equal to 1 in ascending order.

// Example 2:
arr = [1, 3, 6, 10, 15];
console.log(minimumAbsDifference(arr));
// Output: [[1,3]]

// Example 3:
arr = [3, 8, -10, 23, 19, -4, -14, 27];
console.log(minimumAbsDifference(arr));
// Output: [[-14,-10],[19,23],[23,27]]
