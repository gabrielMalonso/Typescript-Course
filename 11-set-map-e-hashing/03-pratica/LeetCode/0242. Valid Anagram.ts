function isAnagram(s: string, t: string): boolean {
    // Pensando em trabalhar todas as letras e suas quantidades, utilizarei o MAP para identificar cada letra e a quantidade de cada letra em cada uma das streams, e depois comparar.

    if (s.length !== t.length) {
        return false;
    }

    const frequencias = new Map<string, number>();

    for (let i = 0 ;  i < s.length ; i++) {
        let saldoAtual = frequencias.get(s[i]) ?? 0;
        frequencias.set(s[i], saldoAtual + 1);
        
        saldoAtual = frequencias.get(t[i]) ?? 0;
        frequencias.set(t[i], saldoAtual - 1);
    }
    for (const saldo of frequencias.values()) {
        if(saldo !== 0) return false;
    };



return true;
}

const s = "anagram";
const t = "nagaram";

console.log(isAnagram(s, t));