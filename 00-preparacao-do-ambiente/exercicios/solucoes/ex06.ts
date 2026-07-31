//Código errado:

/* console.log("Verificando ambiente...")

let versao: number = "1.0"
let ativo: boolean = "sim"

console.log("Versão: " + versao)
console.log("Sistema ativo: " + ativo)*/


//Reescrita, corrigindo erros:

console.log("Verificando ambiente...");

let versao: number = 1.0;
let ativo: boolean = true;

console.log("Versão: " + versao);

if (ativo) {
    console.log("Sistema ativo: Sim");
}
else {
    console.log("Sistema ativo: Não");
}


//Erros que encontrei: 
// 1. Falta de ponto e vírgula no final das linhas.
// 2. Na linha de versao, a variável do tipo number está sendo declarada como string.
// 3. Na linha de ativo, a variável tipo boolean esta sendo declarada como string. O correto é declarar como true ou false.

//Transcrição do console:
// ❯ node ex06.ts
// Verificando ambiente...
// Versão: 1
// Sistema ativo: Sim