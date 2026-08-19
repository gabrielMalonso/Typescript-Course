//entrada de dados
const alunos = [
  { nome: "Ana", nota: 8.5, faltas: 2 },
  { nome: "Bruno", nota: 5, faltas: 3 },
  { nome: "Carla", nota: 7, faltas: 8 },
  { nome: "Diego", nota: 9, faltas: 1 },
];

// funções
function estaAprovado ( lista: { nota: number; faltas: number;}): boolean {
    return lista.nota >= 7 && lista.faltas <=5;
}

function quantidadesAprovadosEReprovados (lista: { nota: number; faltas: number }[]): {aprovacoes: number; reprovacoes: number} {
    let contAprovados = 0;
    let contReprovados = 0;

    for (const aluno of lista) {
        if (estaAprovado(aluno)) {
            contAprovados++;
        } else {
            contReprovados++;
        }
    }
    return {
        aprovacoes: contAprovados,
        reprovacoes: contReprovados,
    }
}

function mediaAlunos (lista: {nota: number}[]): number {
    let total = 0;
    let cont = 0;

    for (const aluno of lista) {
        total += aluno.nota;
        cont++;
    }
    return total / cont;
}

function formatacaoFinal (lista: { nome: string; nota:number; faltas: number }): string {
    let textoFormatado: string = "";
    if (estaAprovado(lista)) {
        textoFormatado = `${lista.nome} | nota ${lista.nota} | Aprovado`;
    } else {
        textoFormatado = (`${lista.nome} | nota ${lista.nota} | Reprovado`);
    }
    return textoFormatado;
} 


const quantidades = quantidadesAprovadosEReprovados(alunos); // Executa a função uma vez e guarda o objeto retornado. Assim, não precisamos percorrer o array novamente para acessar cada resultado.

// saídas
console.log(`Quantidade de alunos aprovados: ${quantidades.aprovacoes}`);
console.log(`Quantidade de alunos reprovados: ${quantidades.reprovacoes}`);
console.log(`Média das notas da turma: ${mediaAlunos(alunos)}`);

for (const aluno of alunos) {
    console.log(formatacaoFinal(aluno));
}