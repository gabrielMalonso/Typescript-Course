function sortPeople(names: string[], heights: number[]): string[] {
    const relacoes: {
        name: string;
        height: number;
    }[] = [];

    for (let i = 0; i < names.length; i++) {
        relacoes.push({
            name: names[i],
            height: heights[i],
        });
    }

    const nomes = relacoes
        .sort((a, b) => b.height - a.height)
        .map((pessoas) => pessoas.name);

    return nomes;
}

// Example 1:
let names = ["Mary", "John", "Emma"];
let heights = [180, 165, 170];
console.log(sortPeople(names, heights));
// Output: ["Mary","Emma","John"]
// Explanation: Mary is the tallest, followed by Emma and John.

// Example 2:
names = ["Alice", "Bob", "Bob"];
heights = [155, 185, 150];
console.log(sortPeople(names, heights));
// Output: ["Bob","Alice","Bob"]
// Explanation: The first Bob is the tallest, followed by Alice and the second Bob.
