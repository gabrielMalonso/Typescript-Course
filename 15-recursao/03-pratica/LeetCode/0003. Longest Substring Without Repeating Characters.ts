function lengthOfLongestSubstring(s: string): number {
    let max = 0;
    let inicio = 0;
    const map = new Map<string, number>();

    for (let i = 0; i < s.length; i++) {
        const index = map.get(s[i]);

        if (index !== undefined && index >= inicio) {
            inicio = index + 1;
        }

        map.set(s[i], i);

        const cont = i - inicio + 1;

        if (cont > max) {
            max = cont;
        }
    }

    return max;
}

// Example 1:
let s = "abcabcbb";
console.log(lengthOfLongestSubstring(s));
// Output: 3
// Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

// Example 2:
s = "bbbbb";
console.log(lengthOfLongestSubstring(s));
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Example 3:
s = "pwwkew";
console.log(lengthOfLongestSubstring(s));
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
