const candidatos: {
    nome: string;
    pontuacao: number;
    ativo: boolean;
}[] = [
        { nome: "Ana", pontuacao: 70, ativo: true },
        { nome: "Bruno", pontuacao: 85, ativo: false },
        { nome: "Clara", pontuacao: 85, ativo: true },
        { nome: "Davi", pontuacao: 40, ativo: true },
    ];

function criarCriterioDeAprovacao(
    minima: number,
): (candidato: { nome: string; pontuacao: number; ativo: boolean }) => boolean {
    return (candidato: { nome: string; pontuacao: number; ativo: boolean }) => {
        return candidato.ativo && candidato.pontuacao >= minima;
    };
}

function selecionarNomes(
    itens: { nome: string; pontuacao: number; ativo: boolean }[],
    criterio: (candidato: {
        nome: string;
        pontuacao: number;
        ativo: boolean;
    }) => boolean,
): string[] {
    const listaAprovados: string[] = [];

    for (const item of itens) {
        if (criterio(item)) {
            listaAprovados.push(item.nome);
        }
    }
    return listaAprovados;
}

// minimo70, gerado por criarCriterioDeAprovacao(70): deve produzir ['Ana', 'Clara'];
const minimo70 = criarCriterioDeAprovacao(70);
const exibirMinimo70 = selecionarNomes(candidatos, minimo70);
console.log("Mínimo 70:");
if (exibirMinimo70.length > 0) {
    for (let index = 0; index < exibirMinimo70.length; index++) {
        console.log(exibirMinimo70[index]);
    }
} else {
    console.log("nenhum aprovado");
}

// minimo85, gerado por criarCriterioDeAprovacao(85): deve produzir ['Clara'];
console.log("");
console.log("Mínimo 85:");
const minimo85 = criarCriterioDeAprovacao(85);
const exibirMinimo85 = selecionarNomes(candidatos, minimo85);
if (exibirMinimo85.length > 0) {
    for (let index = 0; index < exibirMinimo85.length; index++) {
        console.log(exibirMinimo85[index]);
    }
} else {
    console.log("nenhum aprovado");
}

// minimo100, gerado por criarCriterioDeAprovacao(100): deve produzir [];
console.log("");
console.log("Mínimo 100:");
const minimo100 = criarCriterioDeAprovacao(100);
const exibirMinimo100 = selecionarNomes(candidatos, minimo100);
if (exibirMinimo100.length > 0) {
    for (let index = 0; index < exibirMinimo100.length; index++) {
        console.log(exibirMinimo100[index]);
    }
} else {
    console.log("nenhum aprovado");
}

// minimo70 com um array vazio: deve produzir [].
console.log("");
console.log("Array vazio:");
const arrayVazio: { nome: string; pontuacao: number; ativo: boolean }[] = [];
const exibirArrayVazio = selecionarNomes(arrayVazio, minimo70);
if (exibirArrayVazio.length > 0) {
    for (let index = 0; index < exibirArrayVazio.length; index++) {
        console.log(exibirArrayVazio[index]);
    }
} else {
    console.log("nenhum aprovado");
}

/*
1. Qual valor cada critério preserva:
minimo70   → 70
minimo85   → 85
minimo100  → 100

2. Quando esse valor foi definido e quando foi reutilizado:
O valor é definido na chamada da fábrica, por exemplo
`criarCriterioDeAprovacao(70)`, e reutilizado quando `selecionarNomes` chama
o critério para cada candidato. A mesma sequência ocorre com 85 e 100.

3. Por que selecionarNomes(candidatos, minimo70) passa uma referência válida:
`minimo70` guarda a função retornada por `criarCriterioDeAprovacao`. Seu contrato
é o mesmo exigido pelo parâmetro `criterio`, então a referência pode ser passada
para `selecionarNomes`.

4. Por que selecionarNomes(candidatos, minimo70(candidatos[0])) entregaria um
boolean em vez do callback esperado:

O contrato de `minimo70` é:
(candidato: { nome: string; pontuacao: number; ativo: boolean }) => boolean.

A chamada `minimo70(candidatos[0])` executa a função e produz um `boolean`.
`selecionarNomes` espera receber a própria função, não o resultado de uma chamada.

*/
