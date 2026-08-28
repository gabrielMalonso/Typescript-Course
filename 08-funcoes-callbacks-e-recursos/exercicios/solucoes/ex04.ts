// Declaração de função:
function quadrado1 (valor: number): number {
    return valor * valor;
}

// uma expressão com function anônima guardada em variável;
const quadrado2: (valor: number) => number = function (valor) {
    return valor * valor;
};

// uma arrow function guardada em variável.
const quadrado3: (valor: number) => number = (valor) => valor * valor;

console.log(quadrado1(4));
console.log(quadrado2(4));
console.log(quadrado3(4));
