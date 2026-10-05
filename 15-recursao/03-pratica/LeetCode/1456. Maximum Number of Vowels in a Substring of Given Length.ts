function maxVowels(s: string, k: number): number {
    let maxVogais: number = 0;
    function isVowel(char: string): boolean {
        return (
            char === "a" ||
            char === "e" ||
            char === "i" ||
            char === "o" ||
            char === "u"
        );
    }

    // primeiros k caracteres
    let cont = 0;
    let index = k - 1;
    while (index >= 0) {
        if (isVowel(s[index])) cont++;
        index--;
    }
    if (maxVogais < cont) maxVogais = cont;

    // sliding window
    for (let i = 1; i <= s.length - k; i++) {
        const j = i + k - 1;
        if (isVowel(s[i - 1])) cont--;
        if (isVowel(s[j])) cont++;
        if (maxVogais < cont) maxVogais = cont;
    }

    return maxVogais;
}

// Example 1:
let s = "abciiidef";
let k = 3;
console.log(maxVowels(s, k));
// Output: 3
// Explanation: The substring "iii" contains 3 vowel letters.

// Example 2:
s = "aeiou";
k = 2;
console.log(maxVowels(s, k));
// Output: 2
// Explanation: Any substring of length 2 contains 2 vowels.

// Example 3:
s = "leetcode";
k = 3;
console.log(maxVowels(s, k));
// Output: 2
// Explanation: "lee", "eet" and "ode" contain 2 vowels.
