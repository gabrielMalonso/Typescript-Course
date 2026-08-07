const crachaValido = true;
const treinamentoConcluido = true;
const sistemaBloqueado = false;

const acessoLiberado = crachaValido && treinamentoConcluido && !sistemaBloqueado;

if (acessoLiberado){
    console.log(`Acesso liberado.`);
} else {
    console.log(`Acesso bloqueado.`);
}
