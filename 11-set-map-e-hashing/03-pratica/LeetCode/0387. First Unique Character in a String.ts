function firstUniqChar(s: string): number {
    const sMap = new Map<string, number>();

    for (let i = 0; i < s.length; i++) {
        const quantidade = sMap.get(s[i]) ?? 0;
        sMap.set(s[i], quantidade + 1);
    }
    for (let i = 0; i < s.length; i++) {
        if (sMap.get(s[i]) === 1) {
            return i;
        }
    }
    return -1;
}

let s = "leetcode";
firstUniqChar(s);

s = "loveleetcode";
firstUniqChar(s);

s = "aabb";
firstUniqChar(s);