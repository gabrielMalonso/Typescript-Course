const rotas = [
    { destino: "Lisboa", km: 120, ativa: true },
    { destino: "Porto", km: 80, ativa: false },
    { destino: "Faro", km: 220, ativa: true },
];

function listarRotas(
    lista: { destino: string; km: number; ativa: boolean }[],
    incluir: (rota: { destino: string; km: number; ativa: boolean }) => boolean,
    formatar: (destino: string, km: number) => string,
): string[] {
    const listaDeSaida: string[] = [];

    for (const rota of lista) {
        if (incluir(rota)) {
            listaDeSaida.push(formatar(rota.destino, rota.km));
        }
    }
    return listaDeSaida;
}

const rotasAtivas = listarRotas(rotas, (rota) => rota.ativa, (destino, distancia) => `${destino} (${distancia} km)`);

console.log(rotasAtivas);

const distanciaMaiorIgual100 = listarRotas(rotas, (rota) => rota.km >= 100, (destino, distancia) => `${destino} — ${distancia}`);

console.log(distanciaMaiorIgual100);
