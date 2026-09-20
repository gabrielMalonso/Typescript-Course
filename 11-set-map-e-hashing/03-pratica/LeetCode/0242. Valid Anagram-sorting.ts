function isAnagram(s: string, t: string): boolean {
    // Objetivo: melhorar o algoritmo, utilizando a nova técnica aprendida de fazer a reorganização em ordem alfabética das letras. Se as palavras formadas forem iguais, é um anagrama. 

    const sSorted = s.split("").sort().join("");
    const tSorted = t.split("").sort().join("");

    return sSorted === tSorted;
}

const s = "anagram";
const t = "nagaram";

console.log(isAnagram(s, t));


// Essa solução utiliza o `.sort()`. Essa ferramenta custa aproximadamente: O(nlogn). Sendo assim, a estratégia anterior era mais vantajosa para esse exercício, embora essa solução seja, de fato, mais limpa e direta.
