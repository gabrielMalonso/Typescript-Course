const livro: {
    titulo: string;
    autor: string;
    paginas: number;
} = {
    titulo: "O hobbit",
    autor: "Tolkien",
    paginas: 310,
};

console.log(`O livro ${livro.titulo} foi escrito por ${livro.autor} e possui ${livro.paginas} páginas.`);

// livro é um objeto.
// livro.titulo, isoladamente, é do tipo string.