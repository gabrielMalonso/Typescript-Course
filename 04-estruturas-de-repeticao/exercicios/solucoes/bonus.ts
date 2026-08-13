const numeroDeSetores = 3;
const numeroDeLugares = 4; // por setor
const numeroMaximoDeConvites = 7;
let numeroDeConvites = 0;
let numeroMaxDeConvitesAtingido = false;

for (let setor = 1; setor <= numeroDeSetores; setor++) {
    for (let lugar = 1; lugar <= numeroDeLugares; lugar++) {
        if (setor === 2 && lugar === 2) {
            console.log(`S${setor}-L${lugar} bloqueado`)
            continue;
        } else {
            numeroDeConvites++;
            console.log (`Convite S${setor}-L${lugar}`);
            if (numeroDeConvites >= numeroMaximoDeConvites) {
                numeroMaxDeConvitesAtingido = true;
                break;
            }
        }
    }
    if (numeroMaxDeConvitesAtingido) {
        console.log(`Limite de convites atingido.`);
        break;
    }
}

console.log(`Total emitido: ${numeroDeConvites}`);