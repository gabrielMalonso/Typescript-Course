function isIsomorphic(s: string, t: string): boolean {
    const decriptMap = new Map<string, string>();
    const tSet = new Set<string>();

    for(let i = 0 ; i < s.length ; i++) { // t.length == s.length
        // comparando a partir de `s`: se um valor já existia no Map, ele deve continuar relacionado ao mesmo valor. Se não for assim, retorna false.
        if (decriptMap.has(s[i])) { // verificando se um valor já foi relacionado em s.
            if(decriptMap.get(s[i]) !== t[i]){
                return false;
            }
        }
        // comparando a partir de `t`: Se um valor já existia no Set (ou já estava relacionado no Map), ele deve continuar relacionado ao mesmo valor. Se não for assim, retorna false.
        if(tSet.has(t[i]) && decriptMap.get(s[i]) !== t[i]){
            return false;
        }
        decriptMap.set(s[i],t[i]);
        tSet.add(t[i]);
    }
    return true;    
}

// Testes preliminares:
let s = "egg";
let t = "add";

isIsomorphic(s, t); // true

s = "f11";
t = "b23";

isIsomorphic(s, t); // false

s = "paper";
t = "title";

isIsomorphic(s, t); // true

s = "egg";
t = "dad";

isIsomorphic(s, t); // false

s = "badc"
t = "baba"

isIsomorphic(s, t); //false - Não basta verificar apenas se um valor já foi relacionado previamente em S. É necessário verificar também em T.
