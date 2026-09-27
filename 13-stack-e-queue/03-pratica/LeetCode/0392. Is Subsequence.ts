function isSubsequence(s: string, t: string): boolean {
    if (s.length > t.length) return false;
    let inicio = 0;

    for (let i = 0; i < s.length; i++) {
        let found = false;

        for (let j = inicio; j < t.length; j++) {
            if (s[i] === t[j]) {
                inicio = j + 1;
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}

// Example 1:
let s = "abc";
let t = "ahbgdc";
console.log(isSubsequence(s, t));
// Output: true

// Example 2:
s = "axc";
t = "ahbgdc";
console.log(isSubsequence(s, t));
// Output: false

// Example 2:
s = "ab";
t = "ba";
console.log(isSubsequence(s, t));
// Output: false
