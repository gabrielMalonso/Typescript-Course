function aplicarDesconto (
    produto: { nome: string, preco: number }, 
    percentual: number,
): { nome: string; preco: number} {
    return {
        ... produto,
        preco: produto.preco * (1 - percentual /100),
    };
}

const original = { nome: "Broca", preco: 20 };
const comDesconto = aplicarDesconto(original, 10);

console.log(original.preco);
console.log(comDesconto.preco);

/*
Raciocinando por partes:

PARÂMETROS DA FUNÇÃO:
- `produto`: objeto com `nome` string e `preco` number.
- `percentual`: number.

TIPO DE RETORNO:
A função retorna um objeto com `nome` string e `preco` number.

RETORNO:
É criado um novo objeto.
O spread `...produto` copia as propriedades do objeto recebido.
Depois, a propriedade `preco` é sobrescrita com o preço calculado
de acordo com o percentual de desconto.

O objeto original não é alterado.

CHAMADA:
`original` é passado como primeiro argumento.
`10` é passado como segundo argumento.

O resultado retornado pela função é armazenado em `comDesconto`.

Por fim, exibimos o preço do objeto original e o preço
do novo objeto com desconto.
*/