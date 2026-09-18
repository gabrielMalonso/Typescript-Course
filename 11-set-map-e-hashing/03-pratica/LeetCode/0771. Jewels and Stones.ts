function numJewelsInStones(jewels: string, stones: string): number {
    let sumOfJewels = 0;

    const setJewels = new Set<string>(jewels);

    for (const stone of stones) {
        if (setJewels.has(stone)){
            sumOfJewels++;
        }
    }
return sumOfJewels;
}

const jewels = "aA";
const stones = "aAAbbbb";

console.log(numJewelsInStones(jewels, stones));