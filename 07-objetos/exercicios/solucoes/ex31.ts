const original = {
  nome: "Motor",
  potencia: 120,
};

const alias = original;
alias.potencia = 80;

console.log(original.potencia);
console.log(alias === original);

const originalParaCopia = {
    nome: "Motor",
    potencia: 120,
};

const copia = {
    ...originalParaCopia,
};

copia.potencia = 150;

console.log(originalParaCopia.potencia);
console.log(copia.potencia);
console.log(copia === originalParaCopia);

// A diferença entre os dois casos é que, no primeiro, não estamos criando um objeto separado. Pelo contrário, apenas damos outro nome ao mesmo objeto, outra forma de acessá‑lo. Já no segundo, estamos criando objetos separados.