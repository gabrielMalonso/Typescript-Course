function intersect(nums1: number[], nums2: number[]): number[] {
    const nums2Map = new Map<number, number>();
    const intersectionArray: number[] = [];

    for (let i = 0; i < nums2.length; i++) {
        const qtdNum = nums2Map.get(nums2[i]) ?? 0;
        nums2Map.set(nums2[i], qtdNum + 1);
    }
    for (let i = 0; i < nums1.length; i++) {
        const qtdDisponivel = nums2Map.get(nums1[i]) ?? 0;

        if (qtdDisponivel !== 0) {
            intersectionArray.push(nums1[i]);
            nums2Map.set(nums1[i], qtdDisponivel - 1);
        }
    }

    return intersectionArray;
}

// Example 1:
let nums1 = [1, 2, 2, 1];
let nums2 = [2, 2];
console.log(intersect(nums1, nums2));
// Output: [2,2]

// Example 2:
nums1 = [4, 9, 5];
nums2 = [9, 4, 9, 8, 4];
console.log(intersect(nums1, nums2));
// Output: [4,9]
// Explanation: [9,4] is also accepted.

// Example 3:
nums1 = [2, 2, 2];
nums2 = [2];
console.log(intersect(nums1, nums2));
// Output: [2]

// Example 4:
nums1 = [1, 1, 1, 2, 2];
nums2 = [1, 1, 2];
console.log(intersect(nums1, nums2));
// Output: [1, 1, 2]
