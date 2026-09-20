function groupAnagrams(strs: string[]): string[][] {
    const tagsMap = new Map<string, string[]>();

    for (let i = 0 ; i < strs.length ; i++){
        const tag = strs[i].split("").sort().join("");
        if (tagsMap.has(tag)){
            tagsMap.get(tag)!.push(strs[i]);
        } else {
            tagsMap.set(tag, [strs[i]]);
        }
    }
    return [...tagsMap.values()];
}




// Example 1:
let strs = ["eat","tea","tan","ate","nat","bat"];
groupAnagrams(strs);
// Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
// Explanation:
// There is no string in strs that can be rearranged to form "bat".
// The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
// The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

// Example 2:
strs = [""];
groupAnagrams(strs);
// Output: [[""]]

// Example 3:
strs = ["a"]
groupAnagrams(strs);
// Output: [["a"]]