const mapa: string[][] = [
  ["A1", "A2"],
  ["B1", "B2", "B3"],
];

let totalDePosicoes = 0;

for(let linha = 0; linha < mapa.length; linha++) {
    for (let coluna = 0; coluna < mapa[linha].length; coluna++) {
        console.log(`Linha ${linha + 1}, coluna ${coluna + 1}: ${mapa[linha][coluna]}`);
        totalDePosicoes++;
    }
}
console.log(`Total de posições: ${totalDePosicoes}`);