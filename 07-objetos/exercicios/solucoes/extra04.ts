// dados originais
const funcionarios = [
    { nome: "Amanda", salario: 3000, setor: "TI", ativo: true },
    { nome: "Lucas", salario: 2200, setor: "Vendas", ativo: true },
    { nome: "Renata", salario: 4500, setor: "TI", ativo: false },
    { nome: "João", salario: 2800, setor: "Financeiro", ativo: true },
];

// função que recria a lista, filtrando somente os funcionários ativos.
// A saída da função é um array de objetos, assim como a entrada. A diferença é que filtramos os funcionários ativos.
function filtroAtivos(lista: { nome: string; salario: number, setor: string, ativo: boolean }[]): ({
    nome: string; salario: number, setor: string, ativo: boolean
}[]) {

    // Iniciamos uma variável com o array vazio, então, inicialmente, dentro dessa função, o array começa vazio.
    const funcionariosAtivos: {
        nome: string;
        salario: number;
        setor: string;
        ativo: boolean;
    }[] = [];

    // À medida que avançamos no for...of, populamos o novo array utilizando o `.push`, sempre que um funcionário é ativo. E também atualizamos o salário
    for (const funcionario of lista) {
        if (funcionario.ativo) {
            funcionariosAtivos.push({
                ...funcionario,
                salario: funcionario.salario * 1.08,
            });
        }
    }

    // retornamos o array final, filtrado
    return funcionariosAtivos;
}

const ativos = filtroAtivos (funcionarios);

console.log(`SALÁRIOS REAJUSTADOS:`);
for (const funcionario of ativos) {
    console.log(`${funcionario.nome}: ${funcionario.salario}`);
}

console.log();

console.log(`SALÁRIOS ORIGINAIS`);
for (const funcionario of funcionarios) {
    console.log(`${funcionario.nome}: ${funcionario.salario}`);
}