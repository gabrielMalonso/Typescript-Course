function isPowerOfTwo(n: number): boolean {
    // base
    if (n === 1) return true;
    if (n === 0) return false;

    // caso seja negativo
    if (n % 2 !== 0) return false;

    // recursion caso seja negativo
    return isPowerOfTwo(n / 2);
}

// Example 1:
let n = 1;
console.log(isPowerOfTwo(n));
// Output: true
// Explanation: 20 = 1

// Example 2:
n = 16;
console.log(isPowerOfTwo(n));
// Output: true
// Explanation: 24 = 16

// Example 3:
n = 3;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 1: menor potência possível
n = 1;
console.log(isPowerOfTwo(n));
// Output: true

// Test Case 2
n = 2;
console.log(isPowerOfTwo(n));
// Output: true

// Test Case 3
n = 4;
console.log(isPowerOfTwo(n));
// Output: true

// Test Case 4
n = 8;
console.log(isPowerOfTwo(n));
// Output: true

// Test Case 5
n = 64;
console.log(isPowerOfTwo(n));
// Output: true

// Test Case 6: ímpar
n = 3;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 7: par, mas não potência de 2
n = 6;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 8: outro par enganoso
n = 12;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 9
n = 18;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 10: zero
n = 0;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 11: negativo
n = -2;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 12: negativo que "parece" potência
n = -16;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 13: potência maior
n = 1024;
console.log(isPowerOfTwo(n));
// Output: true

// Test Case 14: quase uma potência
n = 1023;
console.log(isPowerOfTwo(n));
// Output: false

// Test Case 15: logo depois de uma potência
n = 1025;
console.log(isPowerOfTwo(n));
// Output: false
