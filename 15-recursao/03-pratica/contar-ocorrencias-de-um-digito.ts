function contarDigito(n: number, alvo: number): number {
    if (n < 10) {
        return n === alvo ? 1 : 0;
    }

    const digito = n % 10;
    if (digito === alvo) {
        return 1 + contarDigito(Math.floor(n / 10), alvo);
    } else {
        return contarDigito(Math.floor(n / 10), alvo);
    }
}

console.log(contarDigito(5831, 8));
// Output: 1

console.log(contarDigito(5858, 8));
// Output: 2

console.log(contarDigito(7777, 7));
// Output: 4

console.log(contarDigito(1234, 9));
// Output: 0

console.log(contarDigito(50505, 5));
// Output: 3
