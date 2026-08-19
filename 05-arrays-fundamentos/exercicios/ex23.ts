const notificacoes: string[] = [];

const retornoDoPop = notificacoes.pop();
const retornoDoShift = notificacoes.shift();

console.log(`Retorno do pop: ${retornoDoPop}`);
console.log(`Retorno do shift: ${retornoDoShift}`);
console.log(`Quantidade final: ${notificacoes.length}`);

const explicacao: string = "pop e shift podem retornar undefined quando o array não possui um elemento para remover.";
