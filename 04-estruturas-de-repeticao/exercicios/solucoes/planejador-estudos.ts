const totalDeSemanas = 3;
const sessoesPorSemana = 4;
const metaDeSessoes = 8;
const semanaDePausa = 2;
const sessaoDePausa = 3;
let sessoesPlanejadas = 0;
let metaAtingida = false;

console.log(`=== PLANEJADOR DE ESTUDOS ===`);

for (let semana = 1; semana <= totalDeSemanas; semana ++) {
    for (let sessoes = 1; sessoes <= sessoesPorSemana; sessoes++) {
        if (sessoes === sessaoDePausa && semana === semanaDePausa) {
            console.log(`Semana ${semana}, sessão ${sessoes}: pausa`);
            continue;
        } else {
            console.log (`Semana ${semana}, sessão ${sessoes}: planejada`);
            sessoesPlanejadas++
            if (sessoesPlanejadas >= metaDeSessoes) {
                metaAtingida = true;
                break;
            }
        }
    }
    if (metaAtingida === true) {
        console.log(`Meta atingida!`);
        break;
    }
}
console.log(`Total planejado: ${sessoesPlanejadas}`);
console.log(`Objetivo concluído: ${metaAtingida}`);