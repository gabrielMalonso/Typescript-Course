// intercalar
function intercalar(numsEsq: number[], numsDir: number[]): number[] {
    const resposta: number[] = [];
    let i: number = 0;
    let j: number = 0;

    while (i < numsEsq.length && j < numsDir.length) {
        if (numsEsq[i] <= numsDir[j]) {
            resposta.push(numsEsq[i]);
            i++;
        } else {
            resposta.push(numsDir[j]);
            j++;
        }
    }

    while (i < numsEsq.length) {
        resposta.push(numsEsq[i]);
        i++;
    }
    while (j < numsDir.length) {
        resposta.push(numsDir[j]);
        j++;
    }
    return resposta;
}

function sortArray(nums: number[]): number[] {
    // caso base
    if (nums.length <= 1) return [...nums];

    // separar metades
    const meio = Math.floor(nums.length / 2);

    // calcular direita e esquerda
    let direita = nums.slice(meio);
    let esquerda = nums.slice(0, meio);

    // ordenar
    direita = sortArray(direita);
    esquerda = sortArray(esquerda);

    return intercalar(esquerda, direita);
}

// Example 1:
let nums = [5, 2, 3, 1];
console.log(sortArray(nums));
// Output: [1,2,3,5]
// Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).

// Example 2:
nums = [5, 1, 1, 2, 0, 0];
console.log(sortArray(nums));
// Output: [0,0,1,1,2,5]
// Explanation: Note that the values of nums are not necessarily unique.
