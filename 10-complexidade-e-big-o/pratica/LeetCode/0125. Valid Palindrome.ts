function isPalindrome(s: string): boolean {
    const desejados: string[] = [];
    let palidromeCheck = true;

    for(let i = 0 ; i < s.length ; i++) {
        const char = s[i].toLowerCase();
        const ehNumero = char >= "0" && char <= "9";
        const ehLetra = char >= "a" && char <= "z";

        if (!ehNumero && !ehLetra) continue;
     desejados.push(char);
    }

    // Agora, com um array contendo somente os caracteres desejados, verificar se é um palíndromo.
    for (let i = 0 ; i < Math.floor(desejados.length/2) ; i++) {
        if(desejados[i] !== desejados[(desejados.length - 1) - i]) {
            palidromeCheck = false;
            return false;
        }
    }
    return palidromeCheck;
}