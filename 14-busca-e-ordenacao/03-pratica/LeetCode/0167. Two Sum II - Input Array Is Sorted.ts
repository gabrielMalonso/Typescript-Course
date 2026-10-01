function twoSum(numbers: number[], target: number): number[] {
    let esq = 0;
    let dir = numbers.length - 1;

    while (esq < dir) {
        const soma = numbers[esq] + numbers[dir];
        if (soma === target) return [esq + 1, dir + 1];
        if (soma > target) {
            dir--;
        } else {
            esq++;
        }
    }
    throw new Error("Soma não encontrada!");
}

// Example 1:
let numbers = [2, 7, 11, 15];
let target = 9;
console.log(twoSum(numbers, target));
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

// Example 2:
numbers = [2, 3, 4];
target = 6;
console.log(twoSum(numbers, target));
// Output: [1,3]
// Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

// Example 3:
numbers = [-1, 0];
target = -1;
console.log(twoSum(numbers, target));
// Output: [1,2]
// Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
