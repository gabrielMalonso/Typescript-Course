var medicoes = [14, 0, 22, 18, 0, 26];
var medicaoZero = [];
function somarMedicoesValidas(valores) {
    var soma = 0;
    for (var _i = 0, valores_1 = valores; _i < valores_1.length; _i++) {
        var valor = valores_1[_i];
        if (valor === 0) {
            continue;
        }
        else {
            soma += valor;
        }
    }
    return soma;
}
function contarMedicoesValidas(valores) {
    var cont = 0;
    for (var _i = 0, valores_2 = valores; _i < valores_2.length; _i++) {
        var valor = valores_2[_i];
        if (valor === 0) {
            continue;
        }
        else {
            cont++;
        }
    }
    return cont;
}
var calcularMedia = function (total, quantidade) {
    if (quantidade === 0) {
        return 0;
    }
    else {
        return total / quantidade;
    }
};
var criarResumo = function (total, quantidade, media) {
    return "Total: ".concat(total, " | Quantidade: ").concat(quantidade, " | M\u00E9dia: ").concat(media);
};
// Medições:
var soma = somarMedicoesValidas(medicoes);
var cont = contarMedicoesValidas(medicoes);
var mediaMedicoes = calcularMedia(soma, cont);
var resumo = criarResumo(soma, cont, mediaMedicoes);
console.log(resumo);
// Medições zeradas:
var somaZero = somarMedicoesValidas(medicaoZero);
var contZero = contarMedicoesValidas(medicaoZero);
var mediaMedicoesZero = calcularMedia(somaZero, contZero);
var resumoZero = criarResumo(somaZero, contZero, mediaMedicoesZero);
console.log(resumoZero);
