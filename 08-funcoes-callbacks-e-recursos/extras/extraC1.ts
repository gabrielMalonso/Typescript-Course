function aplicarRegra(
    pecas: { codigo: string; peso: number; aprovada: boolean }[],
    regra: (peca: { codigo: string; peso: number; aprovada: boolean }) => boolean,
): { codigo: string; peso: number; aprovada: boolean }[] {
    const resultado = [];
    for (const peca of pecas) {
        if (regra(peca)) {
            resultado.push(peca);
        }
    }
    return resultado;
}

const pecas = [
    { codigo: "A-1", peso: 12, aprovada: true },
    { codigo: "A-2", peso: 7, aprovada: false },
    { codigo: "A-3", peso: 19, aprovada: true },
    { codigo: "A-4", peso: 4, aprovada: false },
];

// 1. peças aprovadas
const pecasAprovadas = aplicarRegra(pecas, (peca) => peca.aprovada);
console.log(pecasAprovadas);

// 2. peso >= 10
const pesoMaiorIgual10 = aplicarRegra(pecas, (peca) => peca.peso >= 10);
console.log(pesoMaiorIgual10);

// 3. reprovadas com peso < 5
const reprovadasComPesoMenorQue5 = aplicarRegra(pecas, (peca) => peca.peso < 5 && !peca.aprovada);
console.log(reprovadasComPesoMenorQue5);

// 4. rejeitar todas
const rejeitarTodas = aplicarRegra(pecas, (_peca) => false);
console.log(rejeitarTodas);

// 5. passar [] e comprovar que o callback não precisa “encontrar” peça nenhuma
const arrayVazio: { codigo: string; peso: number; aprovada: boolean }[] = [];

const testeArrayVazio = aplicarRegra(arrayVazio, (_peca) => true);
console.log(testeArrayVazio);

// não formatei a saída pela falta de necessidade dessa vez, pra andar mais rápido com o conteúdo.
