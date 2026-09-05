const produtos: {
  nome: string;
  preco: number;
  ativo: boolean;
}[] = [
    { nome: "Broca", preco: 20, ativo: true },
    { nome: "Serra", preco: 80, ativo: false },
    { nome: "Lixa", preco: 5, ativo: true },
  ];

const ativos = produtos.filter((produto) => produto.ativo);
// mesmo tipo dos elementos, quantidade possivelmente menor

const nomes = produtos.map((produto) => produto.nome);
// string[], mesma quantidade de produtos

const serra = produtos.find((produto) => produto.nome === "Serra");
// objeto encontrado ou undefined

const indexSerra = produtos.findIndex ((produto) => produto.nome === "Serra");
// índice (number) do primeiro elemento aprovado

const algumAprovado = produtos.some((produto) => produto.nome === "Serra");
// boolean - quando se quer saber se existe algum elemento que passa no critério

const todosAprovados = produtos.every((produto) => produto.nome === "Serra");
// boolean - quando se quer saber se existe algum elemento que passa no critério

const total = produtos.reduce(
  (acumulador, produto) => acumulador + produto.preco,
  0,
);
// number

const totalAtivos = ativos.reduce(
  (acumulador, ativo) => acumulador + ativo.preco,
  0,
);
// number

const totalAtivosEncadeamento = produtos
  .filter((produto) => produto.ativo)
  .reduce((acumulador, produto) => acumulador + produto.preco,
  0,
);
// number

const formatar = produtos.map (produto => `Nome: ${produto.nome} | Preço: ${produto.preco} | Ativo: ${produto.ativo ? "Sim" : "Não"}`);
// novo array com N resultados. O tipo pode mudar.

const testeMap = produtos.map ((produto) => ({ ...produto }));

console.log(formatar);

produtos.forEach((produto, indice) => {
  console.log(`${indice + 1}. ${produto.nome}`);
});

console.log(serra);