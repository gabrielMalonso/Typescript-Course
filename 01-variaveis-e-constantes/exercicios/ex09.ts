//Trecho 1
const problema1:string = "No trecho original havia a reatribuição de uma const";
let numeroDeVagas = 20;
console.log ("Vagas iniciais:", numeroDeVagas);

numeroDeVagas = 18;
console.log ("Vagas atuais:", numeroDeVagas);


//Trecho 2
const problema2:string = "No trecho original houve a declaração implícita de um string e uma reatribuição para um number.";
let nomeTurma = "Introdução";
console.log ("Turma inicial:", nomeTurma);

nomeTurma = "Fundamentos";
console.log ("Turma atual:", nomeTurma);

//Trecho 3
const problema3:string = "No trecho original, estava sendo utilizada uma constante atribuída dentro de um bloco, fora do bloco.";
const nomeAluno = "Bianca";
console.log ("Aluna:", nomeAluno);

{
    const turnoAtual = "Noite";
    console.log("Turno:", turnoAtual);
}
const problema4:string = "No trecho original, nome-aluno é inválido porque identificadores não podem conter hífen.";