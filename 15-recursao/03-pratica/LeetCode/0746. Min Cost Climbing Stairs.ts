function minCostClimbingStairs(cost: number[]): number {
    const memo = new Map<number, number>();

    function calculos(i: number): number {
        // base case
        if (i === 0) return cost[0];
        if (i === 1) return cost[1];

        // recursion
        const resultadoSalvo = memo.get(i);

        if (resultadoSalvo !== undefined) {
            return resultadoSalvo;
        } else {
            const resultado =
                cost[i] + Math.min(calculos(i - 1), calculos(i - 2));
            memo.set(i, resultado);
            return resultado;
        }
    }
    return Math.min(calculos(cost.length - 1), calculos(cost.length - 2));
    // “Qual é o menor custo entre chegar ao último degrau e chegar ao penúltimo?”
}

// Example 1:
let cost = [10, 15, 20];
console.log(minCostClimbingStairs(cost));
// Output: 15
// Explanation: You will start at index 1.
// - Pay 15 and climb two steps to reach the top.
// The total cost is 15.

// Example 2:
cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1];
console.log(minCostClimbingStairs(cost));
// Output: 6
// Explanation: You will start at index 0.
// - Pay 1 and climb two steps to reach index 2.
// - Pay 1 and climb two steps to reach index 4.
// - Pay 1 and climb two steps to reach index 6.
// - Pay 1 and climb one step to reach index 7.
// - Pay 1 and climb two steps to reach index 9.
// - Pay 1 and climb one step to reach the top.
// The total cost is 6.
