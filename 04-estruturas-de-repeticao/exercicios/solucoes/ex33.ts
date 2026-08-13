const diasDisponiveis = 7;
const metaDePublicacoes = 4;
const diaSemPublicacao = 3;
let publicacoesFeitas = 0;
let metaAtingida = false;

for (let dia = 1; dia <= diasDisponiveis; dia++) {
    if(dia === diaSemPublicacao) {
        console.log(`Dia 3: pausa`);
        continue;
    } else {
        publicacoesFeitas++;
        console.log(`Dia ${dia} - Total de Publicações: ${publicacoesFeitas}`);
        if (publicacoesFeitas >= metaDePublicacoes) {
            metaAtingida = true;
            console.log(`Meta atingida no dia ${dia}`);
            break;
        }
    }
}

console.log(`Publicações: ${publicacoesFeitas}`);
console.log(`Meta atingida: ${metaAtingida}`);