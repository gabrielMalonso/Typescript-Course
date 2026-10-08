type Valores = {
    readonly valorPorPessoa: number;
    readonly valorRestante: number;
} | null;

function dividirPagamento(total: number, pessoas: number): Valores {
    if (total < 0) return null;
    if (pessoas <= 0) return null;
    return {
        valorPorPessoa: Math.floor(total / pessoas),
        valorRestante: total % pessoas,
    };
}

function descreverDivisao(resultado: Valores): string {
    if (resultado === null) return "Divisão inválida";
    return `Cada pessoa paga ${resultado.valorPorPessoa} centavos - sobre ${resultado.valorRestante} centavo(s)`;
}

console.log(descreverDivisao(dividirPagamento(1000, 3)));
// "Cada pessoa paga 333 centavos — sobra 1 centavo(s)"

console.log(descreverDivisao(dividirPagamento(500, 0)));
// "Divisão inválida"
