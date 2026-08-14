const sequencia: string[] = ["B", "C"];

const tamanhoDepoisDoPush = sequencia.push("D");
const tamanhoDepoisdoUnshift = sequencia.unshift("A");

console.log(`Depois do push: ${tamanhoDepoisDoPush}`);
console.log(`Depois do unshift: ${tamanhoDepoisdoUnshift}`);
console.log(sequencia);
console.log(`Quantidade final: ${sequencia.length}`);

// Os retornos de push e unshift são os novos tamanhos.
// Os retornos de pop e shift representam os elementos removidos.