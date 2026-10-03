function maiorDigito(n: number): number {
    if (n < 10) return n;

    const meuDigito = n % 10;
    const maiorDoRestante = maiorDigito(Math.floor(n / 10));

    if (meuDigito < maiorDoRestante) {
        return maiorDoRestante;
    } else {
        return meuDigito;
    }
}

// Test Case 1: zero
console.log(maiorDigito(0));
// Output: 0

// Test Case 2: um único dígito
console.log(maiorDigito(7));
// Output: 7

// Test Case 3: maior dígito no início
console.log(maiorDigito(42));
// Output: 4

// Test Case 4: maior dígito no meio
console.log(maiorDigito(5831));
// Output: 8

// Test Case 5: dígitos repetidos
console.log(maiorDigito(9992));
// Output: 9

// Test Case 6: maior dígito no final
console.log(maiorDigito(1239));
// Output: 9

// Test Case 7: contém zero no meio
console.log(maiorDigito(50703));
// Output: 7

// Test Case 8: todos iguais
console.log(maiorDigito(4444));
// Output: 4

// Test Case 9: número maior
console.log(maiorDigito(18362547));
// Output: 8

// Test Case 10: vários zeros
console.log(maiorDigito(100000));
// Output: 1
