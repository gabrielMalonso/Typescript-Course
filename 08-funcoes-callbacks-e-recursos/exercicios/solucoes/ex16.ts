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
const missoesMaiorIgual60Pts = painelReutilizavel(
    missoes,
    (criterio) => criterio.pontos >= 60,
    (aprovadas) => `Título: ${aprovadas.titulo} | Pontos: ${aprovadas.pontos}`,
    "Missões com 60 pontos ou mais",
);

console.log(missoesMaiorIgual60Pts);

// 3. missões da categoria exploração, usando uma função nomeada como critério;
const missoesExploracao = painelReutilizavel(
    missoes,
    (criterio) => criterio.categoria === "exploração",
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
  "Missões com 60 pontos ou mais (usando closure)",
);