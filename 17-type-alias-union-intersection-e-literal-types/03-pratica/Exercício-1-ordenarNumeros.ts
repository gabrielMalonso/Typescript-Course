type Direcao = "crescente" | "decrescente";
function ordenarNumeros(numeros: number[], direcao: Direcao): number[] {
    const output: number[] = [...numeros];
    if (direcao === "crescente") output.sort((a, b) => a - b);
    if (direcao === "decrescente") output.sort((a, b) => b - a);
    return output;
}

const numeros = [5, 2, 9, 1];

console.log(ordenarNumeros(numeros, "crescente"));
// [1, 2, 5, 9]

console.log(ordenarNumeros(numeros, "decrescente"));
// [9, 5, 2, 1]

console.log(numeros);
// [5, 2, 9, 1]
