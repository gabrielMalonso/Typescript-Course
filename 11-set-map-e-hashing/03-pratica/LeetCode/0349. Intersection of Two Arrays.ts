function intersection(nums1: number[], nums2: number[]): number[] {
    const saida: number[] = [];
    const menorArray: number[] = [];

    if (nums1.length >= nums2.length) {
        const mapNums1 = new Set<number>(nums1); // maior array → set
        const menorArray = nums2;
    } else {
        const mapNums2 = new Set<number>(nums2); // maior array → set
        const menorArray = nums1;
    }

    for (const num of menorArray) {

    }
    

    return[0,0]; // só para satisfazer a função enquanto eu trabalho.
}

const nums1 = [1,2,2,1];
const nums2 = [2,2];

intersection(nums1, nums2);