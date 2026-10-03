function somarDigitos(n: number): number {
    // base case
    if (n < 10) return n;

    // recursion
    const ultimoDigito = n % 10;
    return ultimoDigito + somarDigitos(Math.floor(n / 10));
}

console.log(somarDigitos(0)); // 0
console.log(somarDigitos(7)); // 7
console.log(somarDigitos(42)); // 6
console.log(somarDigitos(5831)); // 17
