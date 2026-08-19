const fila: string[] = ["Ana", "Breno", "Cecília", "Diego"];

const primeiraPessoa = fila.shift();
const ultimaPessoa = fila.pop();

console.log(`Primeira Pessoa (removida): ${primeiraPessoa}`);
console.log(`Última pessoa (removida): ${ultimaPessoa}`);
console.log(`Array restante: ${fila}`);
console.log(`Primeiro elemento: ${fila[0]}`);
console.log(`Último elemento: ${fila[fila.length - 1]}`);
console.log(`Quantidade final: ${fila.length}`);
