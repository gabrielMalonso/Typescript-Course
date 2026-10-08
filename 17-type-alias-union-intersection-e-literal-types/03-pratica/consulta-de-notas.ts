const alunos = [
    { id: 1, nome: "Ana", nota: 8 },
    { id: 2, nome: "Bruno", nota: 0 },
    { id: 3, nome: "Carla", nota: 6 },
];

type Aluno = {
    id: number;
    nome: string;
    nota: number;
};

type ResultadoBusca = readonly [nomeAluno: string, notaAluno: number] | null;

function consultarNota(alunos: Aluno[], id: number): ResultadoBusca {
    const encontrado = alunos.find((value) => value.id === id);

    if (encontrado === undefined) return null;
    return [encontrado.nome, encontrado.nota];
}

function descreverNota(resultado: ResultadoBusca): string {
    if (resultado === null) return "Aluno não encontrado";
    const [nome, nota] = resultado;
    return `${nome} - nota ${nota}`;
}

console.log(descreverNota(consultarNota(alunos, 1)));
// "Ana — nota 8"

console.log(descreverNota(consultarNota(alunos, 2)));
// "Bruno — nota 0"

console.log(descreverNota(consultarNota(alunos, 99)));
// "Aluno não encontrado"
