function wordPattern(pattern: string, s: string): boolean {
    const palavras = s.split(" ");
    const patternMap = new Map<string, string>();
    const palavrasSet = new Set<string>();

    if(pattern.length !== palavras.length) return false;

    for (let i = 0 ; i < pattern.length ; i++) {
        if(patternMap.has(pattern[i]) && patternMap.get(pattern[i]) !== palavras[i]){
            return false;
        }
        if(palavrasSet.has(palavras[i]) && patternMap.get(pattern[i]) !== palavras[i]) {
            return false;
        }
        patternMap.set(pattern[i], palavras[i]);
        palavrasSet.add(palavras[i]);
    }    
    return true;
}


// testes preliminares
let pattern = "abba"
let s = "dog cat cat dog"

console.log(wordPattern(pattern, s)); // Output: true


pattern = "abba"
s = "dog cat cat fish"

console.log(wordPattern(pattern, s)); // Output: false

pattern = "aaaa"
s = "dog cat cat dog"

console.log(wordPattern(pattern, s)); // Output: false