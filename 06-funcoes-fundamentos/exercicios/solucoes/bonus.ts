const dobro = (valor: number): number => valor * 2;
const acrescimoDez = (valor: number): number => valor + 10;

let transformar: (valor: number) => number;
const usarDobro:boolean = true;

if (usarDobro) {
    transformar = dobro;
} else {
    transformar = acrescimoDez;
}

console.log(transformar(8));

// Ambas as funções possuem o mesmo contrato. Por isso, a variável acomoda corretamente as funções.