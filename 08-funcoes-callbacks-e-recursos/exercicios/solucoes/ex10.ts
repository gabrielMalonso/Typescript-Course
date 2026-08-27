const livros: { titulo: string; paginas: number; disponivel: boolean }[] = [
    { titulo: "Horizonte", paginas: 180, disponivel: true },
    { titulo: "Órbita", paginas: 320, disponivel: false },
    { titulo: "Maré", paginas: 95, disponivel: true },
];

function criarDescricoes(
    itens: { titulo: string; paginas: number; disponivel: boolean }[],
    descrever: (livro: {
        titulo: string;
        paginas: number;
        disponivel: boolean;
    }) => string,
): string[] {
    let textoDeSaida: string [] = [];

    for (const item of itens) {
        textoDeSaida.push(descrever(item));
    }
    return textoDeSaida;
}

// chamada que produza "Título — N páginas"
const chamada1 = criarDescricoes(livros, (livro) => `${livro.titulo} - ${livro.paginas} páginas`);

for (let index = 0; index < chamada1.length; index ++) {
    console.log (chamada1[index]);
}


// outra que produza Título: disponível ou Título: emprestado

const chamada2 = criarDescricoes(livros, (livro) => `${livro.titulo}: ${livro.disponivel ? "disponível" : "emprestado"}`);

for (let index = 0; index < chamada2.length; index ++) {
    console.log (chamada2[index]);
}

for (let index = 0; index < livros.length; index ++) {
    console.log (`Título: ${livros[index].titulo}, Número de páginas: ${livros[index].paginas}, Disponibilidade: ${livros[index].disponivel}.`);
}