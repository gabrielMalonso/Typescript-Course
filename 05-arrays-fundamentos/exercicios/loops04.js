var mapa = [
    ["A1", "A2"],
    ["B1", "B2", "B3"],
];
var totalDePosicoes = 0;
for (var linha = 0; linha < mapa.length; linha++) {
    for (var coluna = 0; coluna < mapa[linha].length; coluna++) {
        console.log("Linha ".concat(linha + 1, ", coluna ").concat(coluna + 1, ": ").concat(mapa[linha][coluna]));
        totalDePosicoes++;
    }
}
console.log("Total de posi\u00E7\u00F5es: ".concat(totalDePosicoes));
