function criarDesconto(percentual: number): (valor: number) => number {
    const desconto = percentual/100;

    return (valor: number):number => valor - (valor * desconto);
}

const aplicar10 = criarDesconto(10);
console.log(`Valor após desconto 1: ${aplicar10(200)}`);

const aplicar25 = criarDesconto(25);
console.log(`Valor após desconto 2: ${aplicar25(200)}`);

/*

1. Externa: criarDesconto

2. Interna: (valor) => valor - valor * desconto
   Cada uma preserva o próprio desconto:
   aplicar10 preserva 0.10
   aplicar25 preserva 0.25
   (não preserva o preço final)

3. Esse desconto é definido quando a externa roda:
   criarDesconto(10) e criarDesconto(25)

4. Volta a ser usado quando a interna roda:
   aplicar10(200) e aplicar25(200)

*/