function numberOfSteps(num: number): number {
    // base
    if (num === 0) return 0;

    // recursion
    if (num % 2 === 0) {
        return 1 + numberOfSteps(num / 2);
    } else {
        return 1 + numberOfSteps(num - 1);
    }
}

// Example 1:
let num = 14;
console.log(numberOfSteps(num));
// Output: 6
// Explanation:
// Step 1) 14 is even; divide by 2 and obtain 7.
// Step 2) 7 is odd; subtract 1 and obtain 6.
// Step 3) 6 is even; divide by 2 and obtain 3.
// Step 4) 3 is odd; subtract 1 and obtain 2.
// Step 5) 2 is even; divide by 2 and obtain 1.
// Step 6) 1 is odd; subtract 1 and obtain 0.

// Example 2:
num = 8;
console.log(numberOfSteps(num));
// Output: 4
// Explanation:
// Step 1) 8 is even; divide by 2 and obtain 4.
// Step 2) 4 is even; divide by 2 and obtain 2.
// Step 3) 2 is even; divide by 2 and obtain 1.
// Step 4) 1 is odd; subtract 1 and obtain 0.

// Example 3:
num = 123;
console.log(numberOfSteps(num));
// Output: 12
