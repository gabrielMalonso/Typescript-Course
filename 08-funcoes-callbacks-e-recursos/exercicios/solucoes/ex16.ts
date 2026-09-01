const missoes: {
    titulo: string;
    pontos: number;
    concluida: boolean;
    categoria: string;
}[] = [
        { titulo: "Mapa antigo", pontos: 40, concluida: true, categoria: "exploração" },
        { titulo: "Sinal perdido", pontos: 70, concluida: false, categoria: "resgate" },
        { titulo: "Cristal raro", pontos: 100, concluida: true, categoria: "exploração" },
        { titulo: "Defesa da base", pontos: 55, concluida: false, categoria: "defesa" },
    ];

function painelReutilizavel(
    missoes: {
        titulo: string;
        pontos: number;
        concluida: boolean;
        categoria: string;
    }[],
    tomadaDeDecisao: (criterio: {
        titulo: string;
        pontos: number;
        concluida: boolean;
        categoria: string;
    }) => boolean,
    formatacaoAprovadas: (aprovadas: {
        titulo: string;
        pontos: number;
        concluida: boolean;
        categoria: string;
    }) => string,
    titulo = "Painel de missões",
): string[] {
    const saida: string[] = [titulo];

    for (const item of missoes) {
        if (tomadaDeDecisao(item)) {
            saida.push(formatacaoAprovadas(item));
        }
    }

    return saida;
}

// 1. missões concluídas, com título explícito e linhas contendo título e pontos;
const missoesConcluidas = painelReutilizavel(
    missoes,
    (criterio) => criterio.concluida,
    (aprovadas) => `Título: ${aprovadas.titulo} | Pontos: ${aprovadas.pontos}`,
    "Missões concluídas",
);

console.log(missoesConcluidas);


// 2. missões com pelo menos 60 pontos, usando o título padrão;
// const missoesMaiorIgual60Pts = painelReutilizavel(
//     missoes,
//     (criterio) => criterio.pontos >= 60,
//     (aprovadas) => `Título: ${aprovadas.titulo} | Pontos: ${aprovadas.pontos}`,
// );

// console.log(missoesMaiorIgual60Pts);

// 3. missões da categoria exploração, usando uma função nomeada como critério;
function criterioExploracao(criterio: {
        titulo: string;
        pontos: number;
        concluida: boolean;
        categoria: string;
    }): boolean {
        return criterio.categoria === "exploração";
    }
const missoesExploracao = painelReutilizavel(
    missoes,
    criterioExploracao,
    (aprovadas) => `Título: ${aprovadas.titulo} | Pontos: ${aprovadas.pontos}`,
    "Missões da categoria exploração",
);

console.log(missoesExploracao);

// 4. Painel vazi usando um critério que rejeita todas as missões.
const rejeitaTodasAsMissoes = painelReutilizavel(
    missoes,
    (criterio) => false,
    (aprovadas) => `Título: ${aprovadas.titulo} | Pontos: ${aprovadas.pontos}`,
    "Todas as missões rejeitadas",
);

console.log(rejeitaTodasAsMissoes);

// Crie também uma closure que receba uma pontuação mínima e retorne um critério compatível com o painel. Use-a no item 2.
function criarLimiteDePontos(
  minimo: number,
): (missao: {
  titulo: string;
  pontos: number;
  concluida: boolean;
  categoria: string;
}) => boolean {
  return (missao) => missao.pontos >= minimo;
}

const peloMenos60 = criarLimiteDePontos(60);

const missoesMaiorIgual60PtsClosure = painelReutilizavel(
  missoes,
  peloMenos60,
  (aprovadas) => `Título: ${aprovadas.titulo} | Pontos: ${aprovadas.pontos}`,
);

console.log(missoesMaiorIgual60PtsClosure);

// onde cada callback é recebido: Cada callback é recebida como argumento da função painelReutilizavel, permitindo que o comportamento do painel seja personalizado de acordo com os critérios e formatações desejadas.

// onde cada callback é chamado: Cada callback é chamado dentro do loop que percorre as missões. O callback de tomada de decisão é chamado para cada missão para determinar se ela deve ser incluída no painel, e o callback de formatação é chamado para formatar a saída das missões aprovadas antes de adicioná-las ao array de saída.

// qual retorno de callback é usado na decisão: O retorno do callback de tomada de decisão é um valor booleano (true ou false). Se o retorno for true, a missão é incluída no painel; se for false, a missão é ignorada. O callback de formatação retorna uma string que representa a missão aprovada no formato desejado, que é então adicionada ao array de saída do painel.

//qual retorno é usado para montar as linhas: O retorno do callback de formatação é usado para montar as linhas do painel. Cada missão aprovada é formatada como uma string (por exemplo, "Título: Mapa antigo | Pontos: 40") e adicionada ao array de saída, que representa o conteúdo final do painel.

// qual valor a closure preserva: A closure criada pela função criarLimiteDePontos preserva o valor do parâmetro minimo passado para ela. Esse valor é mantido no escopo da função retornada, permitindo que a função de critério resultante utilize esse valor para comparar a pontuação das missões, mesmo após a execução da função criarLimiteDePontos ter terminado.

// por que passar o critério sem () é diferente de chamá-lo antes da entrega: Passar o critério sem os parênteses significa que você está passando a referência da função (ou closure) para ser chamada posteriormente dentro da função painelReutilizavel. Isso permite que a função painelReutilizavel chame o critério para cada missão individualmente, avaliando se ela atende ao critério definido.