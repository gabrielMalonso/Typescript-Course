function selectionSort(nums: number[]): number[] {
    for (let inicio = 0; inicio < nums.length - 1; inicio++) {
        let indiceDoMenor = inicio;

        for (let indice = inicio + 1; indice < nums.length; indice++) {
            if (nums[indiceDoMenor] > nums[indice]) {
                indiceDoMenor = indice;
            }
        }
        if (indiceDoMenor !== inicio) {
            [nums[inicio], nums[indiceDoMenor]] = [
                nums[indiceDoMenor],
                nums[inicio],
            ];
        }
    }
    return nums;
}

let nums = [5, 2, 4, 1, 3]; //  → [1, 2, 3, 4, 5]
console.log(selectionSort(nums));

nums = [1, 2, 3, 4]; //         → [1, 2, 3, 4]
console.log(selectionSort(nums));

nums = [4, 4, 2, 1, 2]; //      → [1, 2, 2, 4, 4]
console.log(selectionSort(nums));

nums = []; //                   → []
console.log(selectionSort(nums));
