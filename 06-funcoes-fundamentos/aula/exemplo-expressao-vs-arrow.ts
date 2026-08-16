// Funções:
const dobro = function (numero: number) {
    return numero * 2;
};

const arrowDobro = (numero: number) => numero * 2;

// Cálculos usando as funções:
const resultadoDobro = dobro(2);
const resultadoArrowDobro = arrowDobro(2);

// Comparando resultados das funções:
const iguais = resultadoDobro === resultadoArrowDobro ? "Sim" : "Não";

// Saída - Mostrando que as funções representam o mesmo cálculo
console.log(`São iguais? Resposta: ${iguais}`);