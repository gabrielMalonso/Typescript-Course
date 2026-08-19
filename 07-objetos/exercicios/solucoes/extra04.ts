const funcionarios = [
    { nome: "Amanda", salario: 3000, setor: "TI", ativo: true },
    { nome: "Lucas", salario: 2200, setor: "Vendas", ativo: true },
    { nome: "Renata", salario: 4500, setor: "TI", ativo: false },
    { nome: "João", salario: 2800, setor: "Financeiro", ativo: true },
];

function filtroAtivos(lista: { nome: string; salario: number, setor: string, ativo: boolean }[]): ({
    nome: string; salario: number, setor: string, ativo: boolean
}[]) {

    const funcionariosAtivos: {
        nome: string;
        salario: number;
        setor: string;
        ativo: boolean;
    }[] = [];

    for (const funcionario of lista) {
        if (funcionario.ativo) {
            funcionariosAtivos.push({
                ...funcionario,
                salario: funcionario.salario * 1.08,
            });
        }
    }
    return funcionariosAtivos;
}

console.log(filtroAtivos(funcionarios));
console.log(funcionarios);