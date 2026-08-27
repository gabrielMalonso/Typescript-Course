const jogos = [
    { nome: "Nebulosa", jogadores: 4, cooperativo: true },
    { nome: "Duelo", jogadores: 2, cooperativo: false },
    { nome: "Expedição", jogadores: 1, cooperativo: true },
    { nome: "Arena", jogadores: 6, cooperativo: false },
];

function listaDeJogos(jogos: {
    nome: string;
    jogadores: number;
    cooperativo: boolean;
}[],
    funcaoCallback: (jogoRecebido: {
        nome: string;
        jogadores: number;
        cooperativo: boolean;
    }) => boolean,
): { nome: string; jogadores: number; cooperativo: boolean }[] {

    let referenciasDesejadas: { nome: string; jogadores: number; cooperativo: boolean }[] = [];

    for (const jogo of jogos) {
        if (funcaoCallback(jogo)) {
            referenciasDesejadas.push(jogo);
        }
    }
    return (referenciasDesejadas);
}

// selecionar jogos cooperativos
console.log(`JOGOS COOPERATIVOS:`);
const jogosCooperativos = listaDeJogos(jogos, (jogoRecebido) => jogoRecebido.cooperativo);

for (const jogo of jogosCooperativos) {
    console.log(`Nome: ${jogo.nome} | Número de jogadores: ${jogo.jogadores} | cooperativo: ${jogo.cooperativo ? "sim" : "não"}`);
}


// selecionar jogos para pelo menos quatro jogadores
console.log("");
console.log(`JOGOS PARA PELO MENOS QUATRO JOGADORES:`);
const jogosQuatroJogadores = listaDeJogos(jogos, (jogoRecebido) => jogoRecebido.jogadores >= 4);

for (const jogo of jogosQuatroJogadores) {
    console.log(`Nome: ${jogo.nome} | Número de jogadores: ${jogo.jogadores} | cooperativo: ${jogo.cooperativo ? "sim" : "não"}`);
}


// usar uma regra que rejeita todos
console.log("");
console.log(`REGRA QUE REJEITA TODOS:`);
const rejeitaTodos = listaDeJogos(jogos, (jogoRecebido) => false)

if (rejeitaTodos.length !== 0) {
    for (const jogo of rejeitaTodos) {
        console.log(`Nome: ${jogo.nome} | Número de jogadores: ${jogo.jogadores} | cooperativo: ${jogo.cooperativo ? "sim" : "não"}`);
    }
} else {
    console.log("Nenhum jogo encontrado");
}

// passar um array vazio
console.log("");
console.log(`PASSAR ARRAY VAZIO:`);
const arrayVazio: [] = [];
const passarArrayVazio = listaDeJogos(arrayVazio, (jogoRecebido) => jogoRecebido.cooperativo);

if (passarArrayVazio.length !== 0) {
    for (const jogo of passarArrayVazio) {
        console.log(`Nome: ${jogo.nome} | Número de jogadores: ${jogo.jogadores} | cooperativo: ${jogo.cooperativo ? "sim" : "não"}`);
    }
} else {
    console.log("Array vazio!");
}

// comprovar que o array original continua com quatro elementos
console.log("");
console.log(`ARRAY ORIGINAL:`);
for (const jogo of jogos) {
    console.log(`Nome: ${jogo.nome} | Número de jogadores: ${jogo.jogadores} | cooperativo: ${jogo.cooperativo ? "sim" : "não"}`);
}