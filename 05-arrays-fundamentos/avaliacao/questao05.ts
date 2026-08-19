const codigos: string[] = [];

const tamanhoDepoisDoPush = codigos.push("M-20");
const tamanhoDepoisDoUnshift = codigos.unshift("A-10");
const retiradoDoInicio = codigos.shift();
const retiradoDoFim = codigos.pop();
const retiradaExtra = codigos.pop();

console.log(`Tamanho depois do push: ${tamanhoDepoisDoPush}`);
console.log(`Tamanho depois do unshift: ${tamanhoDepoisDoUnshift}`);
console.log(`Retirado do inicio: ${retiradoDoInicio}`);
console.log(`Retirado do fim: ${retiradoDoFim}`);
console.log(`Retirado extra: ${retiradaExtra}`);
console.log(codigos);
console.log(`Quantidade final: ${codigos.length}`);



