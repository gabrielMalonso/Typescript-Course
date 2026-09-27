function removeDuplicates(s: string): string {
    const arrOut: string[] = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === arrOut[arrOut.length - 1]) {
            arrOut.pop();
            continue;
        }
        arrOut.push(s[i]);
    }
    return arrOut.join("");
}

// Example 1:
// let s = "abbaca";
// console.log(removeDuplicates(s));
// Output: "ca"
// Explanation:
// For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".

// Example 2:
let s = "azxxzy";
console.log(removeDuplicates(s));
// Output: "ay"
