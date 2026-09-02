function percorrerAlertas(
    alertas: string[],
    visitar: (alerta: string, indice: number) => void,
): void {
    for (let index = 0; index < alertas.length; index++) {
        visitar(alertas[index], index);
    }
}

const alertas: string[] = ["temperatura", "pressão", "energia"];

percorrerAlertas(alertas, (alerta, indice) => {
    console.log(`${indice + 1}. ${alerta}`);
});

let chamadasNoVazio = 0;
const alertasVazios: string[] = [];
percorrerAlertas(alertasVazios, () => {
    chamadasNoVazio++;
});
console.log(`Chamadas no vazio: ${chamadasNoVazio}`);
