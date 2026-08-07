const observacao:null = null;
const quantidadeDeFalhas = 0;

const observacaoExibida = observacao ?? "Sem observação";

console.log(`Observação: ${observacaoExibida}`);
console.log(`Falhas: ${quantidadeDeFalhas}`);

const explicacao:string = "Utilizar `??` para exibir a quantidade de falhas apenas retornaria zero, pois, a funcionalidade `??` fornece um valor alternativo apenas quando o valor da esquerda é `null` ou `undefined`";