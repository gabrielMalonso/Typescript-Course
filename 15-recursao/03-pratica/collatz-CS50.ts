function collatz(n: number): number {
    // base case
    if (n === 1) {
        return 0;
    } else if (n % 2 === 0) {
        // se for par
        return 1 + collatz(n / 2);
    } else {
        return 1 + collatz(3 * n + 1);
    }
}

let n = 1;
console.log(collatz(n));

n = 2;
console.log(collatz(n));

n = 3;
console.log(collatz(n));

n = 4;
console.log(collatz(n));

n = 5;
console.log(collatz(n));

n = 6;
console.log(collatz(n));

n = 7;
console.log(collatz(n));

n = 8;
console.log(collatz(n));

n = 15;
console.log(collatz(n));

n = 27;
console.log(collatz(n));

n = 50;
console.log(collatz(n));
