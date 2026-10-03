/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1;
    let j = n - 1;
    let k = nums1.length - 1;

    while (j >= 0) {
        if (i >= 0 && nums1[i] > nums2[j]) {
            nums1[k] = nums1[i];
            i--;
        } else {
            nums1[k] = nums2[j];
            j--;
        }

        k--;
    }
}

// Test 1 — padrão
let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [1, 2, 2, 3, 5, 6]

// Test 2 — nums2 vazio
nums1 = [1];
m = 1;
nums2 = [];
n = 0;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [1]

// Test 3 — nums1 não possui elementos válidos
nums1 = [0];
m = 0;
nums2 = [1];
n = 1;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [1]

// Test 4 — todos de nums2 vêm depois
nums1 = [1, 2, 3, 0, 0, 0];
m = 3;
nums2 = [4, 5, 6];
n = 3;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [1, 2, 3, 4, 5, 6]

// Test 5 — todos de nums2 vêm antes
nums1 = [4, 5, 6, 0, 0, 0];
m = 3;
nums2 = [1, 2, 3];
n = 3;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [1, 2, 3, 4, 5, 6]

// Test 6 — vários duplicados
nums1 = [1, 2, 2, 0, 0, 0];
m = 3;
nums2 = [2, 2, 3];
n = 3;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [1, 2, 2, 2, 2, 3]

// Test 7 — negativos
nums1 = [-5, -2, 0, 0, 0];
m = 2;
nums2 = [-4, -1, 3];
n = 3;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [-5, -4, -2, -1, 3]

// Test 8 — um elemento de cada lado
nums1 = [2, 0];
m = 1;
nums2 = [1];
n = 1;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [1, 2]

// Test 9 — zeros são valores válidos
nums1 = [0, 0, 0, 0];
m = 2;
nums2 = [0, 0];
n = 2;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [0, 0, 0, 0]

// Test 10 — tamanhos bem diferentes
nums1 = [2, 0, 0, 0, 0];
m = 1;
nums2 = [1, 3, 4, 5];
n = 4;

merge(nums1, m, nums2, n);
console.log(nums1);
// Expected: [1, 2, 3, 4, 5]
