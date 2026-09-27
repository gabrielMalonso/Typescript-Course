function intersection(nums1: number[], nums2: number[]): number[] {
    const saida: number[] = [];
    const setNums1 = new Set<number>(nums1);
    const setNums2 = new Set<number>(nums2);

    for (const one of setNums1) {
        if(setNums2.has(one)){
            saida.push(one);            
        }
    }
    

    return saida;
}

const nums1 = [1,2,2,1];
const nums2 = [2,2];

console.log(intersection(nums1, nums2));