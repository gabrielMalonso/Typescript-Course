function searchInsert(nums: number[], target: number): number {
    let inicio = 0;
    let fim = nums.length - 1;

    while (inicio <= fim) {
        const meio = inicio + Math.floor((fim - inicio) / 2);
        const valorMeio = nums[meio];

        if (valorMeio === target) return meio;

        if (valorMeio < target) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
        if (inicio > fim) return inicio;
    }
    return inicio;
}

// Example 1:
let nums = [1, 3, 5, 6];
let target = 5;
console.log(searchInsert(nums, target));
// Output: 2

// Example 2:
nums = [1, 3, 5, 6];
target = 2;
console.log(searchInsert(nums, target));
// Output: 1

// Example 3:
nums = [1, 3, 5, 6];
target = 7;
console.log(searchInsert(nums, target));
// Output: 4
