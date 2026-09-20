function canConstruct(ransomNote: string, magazine: string): boolean {
    const magazineMap = new Map<string, number>();

    for (let i = 0 ; i < magazine.length ; i++){
        const qtdLetras = magazineMap.get(magazine[i]) ??  0;
        magazineMap.set(magazine[i], qtdLetras + 1);
    }
    for (let i = 0 ; i < ransomNote.length ; i++){
        const qtdLetras = magazineMap.get(ransomNote[i]) ?? 0;
        if (qtdLetras === 0) return false;
        magazineMap.set(ransomNote[i], qtdLetras - 1);
        }
    
    return true;
}

let ransomNote = "a";
let magazine = "b";
console.log(canConstruct(ransomNote, magazine)); // false

ransomNote = "aa";
magazine = "ab";
console.log(canConstruct(ransomNote, magazine)); // false

ransomNote = "aa";
magazine = "aab";
console.log(canConstruct(ransomNote, magazine)); // true

ransomNote = "aaa";
magazine = "aaaa";
console.log(canConstruct(ransomNote, magazine)); // true