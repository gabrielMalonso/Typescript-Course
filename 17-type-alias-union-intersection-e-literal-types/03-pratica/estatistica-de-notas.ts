const notas = [8, 5, 10, 7, 4];

type Estatisticas = readonly [menor: number, maior: number] | null;

function calcularEstatisticas(notas: number[]): Estatisticas {
    if (notas.length === 0) return null;
    let menor = notas[0];
    let maior = notas[0];

    for (let i = 1; i < notas.length; i++) {
        if (notas[i] < menor) {
            menor = notas[i];
        } else if (notas[i] > maior) {
            maior = notas[i];
        }
    }
    return [menor, maior];
}

function descreverEstatisticas(resultado: Estatisticas): string {
    if (resultado === null) return `Nenhuma nota disponivel`;
    const [menor, maior] = resultado;
    return `Menor nota: ${menor} - Maior resultado: ${maior}`;
}

console.log(descreverEstatisticas(calcularEstatisticas([8, 5, 10, 7, 4])));
// "Menor nota: 4 — Maior nota: 10"

console.log(descreverEstatisticas(calcularEstatisticas([])));
// "Nenhuma nota disponível"
