var totalDeSetores = 3;
var assentosPorSetor = 4;
var setorBloqueado = 2;
var assentoBloqueado = 2;
var limiteDeIngressos = 6;
var somaDeIngressos = 0;
var limiteDeIngressosAtingido = false;
for (var setor = 1; setor <= totalDeSetores; setor++) {
    for (var assento = 1; assento <= assentosPorSetor; assento++) {
        if (setor === setorBloqueado && assento === assentoBloqueado) {
            console.log("S".concat(setor, "-A").concat(assento, " bloqueado"));
            continue;
        }
        else {
            console.log("Ingresso S".concat(setor, "-A").concat(assento));
            somaDeIngressos++;
            if (somaDeIngressos >= limiteDeIngressos) {
                limiteDeIngressosAtingido = true;
                break;
            }
        }
    }
    if (limiteDeIngressosAtingido) {
        console.log("Limite atingido.");
        break;
    }
}
console.log("Total emitido: ".concat(somaDeIngressos));
console.log("Emiss\u00E3o encerrada: ".concat(limiteDeIngressosAtingido));
