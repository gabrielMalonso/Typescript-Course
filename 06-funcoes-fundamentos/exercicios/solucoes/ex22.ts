function calcularAreaRetangulo (largura: number, altura: number): number {
    return largura * altura;
}

const teste1 = calcularAreaRetangulo(5,3);
const teste2 = calcularAreaRetangulo(2.5,4);

console.log(teste1);
console.log(teste2);

// Os parênteses são necessários porque eles englobam os argumentos da função. Eles executam a função passando os argumentos.