function formatarLeitura (valor: number, unidade?: string): string {
    return unidade === undefined ? `${valor}` : `${valor} ${unidade}`
    // if (unidade === undefined) {
    //     return `${valor}`;
    // }
    // return `${valor} ${unidade}`;
}

console.log(formatarLeitura(25));
console.log(formatarLeitura(25, "ºC"));

function maiorValor (inicial: number, ...outros: number[]): number {
    let maior = inicial;

    for (const valor of outros) {
        if (valor > maior) {
            maior = valor;
        }
    }
    return maior;
}

const maior = maiorValor(1, 4, 16, 55, 5, 22, 32, 7);

console.log(maior);

// maiorValor(8, 3, 12, 5)
//            │  └───────┘
//        inicial   outros = [3, 12, 5]


const converter: (valor: number) => string = (
    valor: number,
): string => `${valor} kg`;

console.log(converter(2));


function executarAviso (
    mensagem: string,
    avisar: (mensagem: string) => void,
): void {
    avisar (mensagem);
}

executarAviso("Pressão Alta", (mensagem) => {
    console.log(`ALERTA: ${mensagem}`);
});

function decidirAcesso(
    usuario: { nome: string; ativo: boolean },
    permitir: (usuario: { nome: string; ativo: boolean }) => boolean,
): string {
    if (permitir(usuario)) {
        return `Acesso liberado para ${usuario.nome}`;
    }

    return `Acesso negado para ${usuario.nome}`;
}

const acessoLiberado = decidirAcesso(
    {nome: "Gabriel", ativo: false},
    (usuario) => usuario.ativo,
);

console.log(acessoLiberado);

function percorrerMedicoes(
  medicoes: number[],
  visitar: (valor: number, indice: number) => void,
): void {
  for (let indice = 0; indice < medicoes.length; indice += 1) {
    visitar(medicoes[indice], indice);
  }
}

percorrerMedicoes([12, 18], (valor, indice): void => {
  console.log(`${indice}: ${valor}`);
});