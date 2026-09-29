function search(nums: number[], target: number): number {
    let inicio = 0;
    let fim = nums.length - 1;

    while (inicio <= fim) {
        const meio = inicio + Math.floor((fim - inicio) / 2);
        const valorMeio = nums[meio];
        console.log(valorMeio);

        if (valorMeio === target) {
            return meio;
        }

        if (valorMeio < target) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }
    console.log(".");
    return -1;
}

// Example 1:
let nums = [-1, 0, 3, 5, 9, 12];
let target = 9;
// console.log(search(nums, target));
// Output: 4
// Explanation: 9 exists in nums and its index is 4

// Example 2:
nums = [-1, 0, 3, 5, 9, 12];
target = 2;
console.log(search(nums, target));
// Output: -1
// Explanation: 2 does not exist in nums so return -1
