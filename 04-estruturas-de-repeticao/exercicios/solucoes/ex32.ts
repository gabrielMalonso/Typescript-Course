const numeroDePaginas = 3;
const numeroDeBlocos = 4; // por página
let blocosRevisados = 0; // valor inicial

for (let pagina = 1; pagina <= numeroDePaginas; pagina++) {
    for (let bloco = 1; bloco <= numeroDeBlocos; bloco++) {
        if (pagina === 2 && bloco === 3) {
            console.log(`Página ${pagina}, bloco ${bloco}: indisponível`);
            continue;
        } else {
            console.log(`Página ${pagina}, bloco ${bloco}: revisado`);
            blocosRevisados++;
        }
    }
}

console.log(`Blocos revisados: ${blocosRevisados}`);