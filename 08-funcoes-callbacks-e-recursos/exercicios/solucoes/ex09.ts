const entregas: {
    codigo: string;
    distancia: number;
    concluida: boolean;
}[] = [
        { codigo: "E-10", distancia: 8, concluida: true },
        { codigo: "E-11", distancia: 22, concluida: false },
        { codigo: "E-12", distancia: 15, concluida: true },
        { codigo: "E-13", distancia: 0, concluida: false },
    ];

function contarEntregas(
    entregas: {
        codigo: string;
        distancia: number;
        concluida: boolean;
    }[],
    criterio: (
        entrega: {
            codigo: string,
            distancia: number,
            concluida: boolean,
        }
    ) => boolean,
): number {
    let cont = 0;

    for (const entrega of entregas) {
        if (criterio(entrega)) {
            cont++;
        }
    }
    return cont;

}

// entregas concluídas
const concluidas = contarEntregas(entregas, (entrega) => entrega.concluida);
console.log(concluidas);

// entregas com distância maior ou igual a 15
const distanciaMaiorIgualA15 = contarEntregas(entregas, (entrega) => entrega.distancia >= 15);
console.log(distanciaMaiorIgualA15);

// entregas pendentes com distância igual a 0
const pendentesComDistanciaIgualA0 = contarEntregas(entregas, (entrega) => (!entrega.concluida && entrega.distancia === 0));
console.log(pendentesComDistanciaIgualA0);