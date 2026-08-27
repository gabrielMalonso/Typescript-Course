const alunos = [
    { nome: "Lia", nota: 8, presente: true },
    { nome: "Ruy", nota: 5, presente: false },
    { nome: "Nia", nota: 9, presente: true },
];

function montarRelatorio(
    alunos: { nome: string; nota: number; presente: boolean }[],
    linha: (aluno: { nome: string; nota: number; presente: boolean }) => string,
): string[] {
    const saida: string[] = [];

    for (const aluno of alunos) {
        saida.push(linha(aluno));
    }
    return saida;
}

const relatorioDeAlunos = montarRelatorio(alunos, (aluno) => `${aluno.nome} — nota ${aluno.nota}`);

for (let index = 0; index < relatorioDeAlunos.length; index++) {
    console.log(relatorioDeAlunos[index]);
}

const relatorioDePresenca = montarRelatorio(alunos, (aluno) => `${aluno.nome}: ${aluno.presente ? "presente" : "falta"}`);

for (let index = 0; index < relatorioDePresenca.length; index++) {
    console.log(relatorioDePresenca[index]);
}

console.log(alunos);
console.log(`O array original continua com ${alunos.length} alunos.`);
