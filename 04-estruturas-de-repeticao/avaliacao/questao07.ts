const totalDeSetores = 3;
const assentosPorSetor = 4;
const setorBloqueado = 2;
const assentoBloqueado = 2;
const limiteDeIngressos = 6;

let somaDeIngressos = 0;
let limiteDeIngressosAtingido = false;

 for (let setor = 1; setor <= totalDeSetores; setor++) {
    for (let assento = 1; assento <= assentosPorSetor; assento++) {
        if(setor === setorBloqueado && assento === assentoBloqueado) {
            console.log(`S${setor}-A${assento} bloqueado`);
            continue;
        } else {
            console.log(`Ingresso S${setor}-A${assento}`);
            somaDeIngressos++;
            if (somaDeIngressos >= limiteDeIngressos) {
                limiteDeIngressosAtingido = true; 
                break;
            }
        }
    }
    if (limiteDeIngressosAtingido) {
        console.log(`Limite atingido.`);
        break;
    }
 }


 console.log (`Total emitido: ${somaDeIngressos}`);
 console.log (`Emissão encerrada: ${limiteDeIngressosAtingido}`);
 