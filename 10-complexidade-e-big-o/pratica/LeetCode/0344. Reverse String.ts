/**
 Do not return anything, modify s in-place instead.
 */
 function reverseString(s: string[]): void {
    const n = s.length - 1;
    for(let i = 0 ; i < Math.floor(s.length/2) ; i++) {
        const hold: string = s[n - i];
        s[n - i] = s[i];
        s[i] = hold;
    }
};