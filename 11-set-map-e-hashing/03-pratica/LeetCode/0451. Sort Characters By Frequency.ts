function frequencySort(s: string): string {

    const frequencyMap = new Map<string, number>();
    for (let i = 0 ; i < s.length ; i++){
        const qtdLetra = frequencyMap.get(s[i]) ?? 0;
        frequencyMap.set(s[i], qtdLetra + 1);
    }

    const entradas = [...frequencyMap];
    entradas.sort( (a , b) => (b[1] - a[1]));
    const arraySaida: string[] = [];

    for (const [letra, qtd] of entradas) {
        for(let i = 0 ; i < qtd ; i++){
            arraySaida.push(letra);
        }
    }

    return arraySaida.join("");
}


// Example 1:
let s = "tree";
console.log(frequencySort(s));
// Output: "eert"
// Explanation: 'e' appears twice while 'r' and 't' both appear once.
// So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.

// Example 2:
s = "cccaaa";
console.log(frequencySort(s));
// Output: "aaaccc"
// Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
// Note that "cacaca" is incorrect, as the same characters must be together.

// Example 3:
s = "Aabb";
console.log(frequencySort(s));
// Output: "bbAa"
// Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
// Note that 'A' and 'a' are treated as two different characters.