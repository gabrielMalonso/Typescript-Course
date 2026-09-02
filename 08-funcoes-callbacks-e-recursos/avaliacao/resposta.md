# RESPOSTAS DA AVALIAÇÃO DO CAPÍTULO 08
## Questão 01:
1.  `function calcularFrete(peso: number, distancia: number): number`
2.  `operacao` guarda uma referência à função `calcularFrete`, sem executá-la. Seu tipo é `(peso: number, distancia: number) => number`.
3.  `preco` guarda o resultado da execução de `calcularFrete(10, 30)`: `11`. Seu tipo é `number`.
4.  Porque são valores de tipos diferentes:

```text
`calcularFrete` é uma função
tipo: `(peso: number, distancia: number) => number`

`calcularFrete(10, 30)` é o resultado da chamada
tipo: `number`
```

Se um parâmetro espera uma função, devemos passar `calcularFrete`. Se espera o número calculado, devemos passar `calcularFrete(10, 30)`.

## Questão 02:
1.  `setor`
2.  `string`
3.  `[6, 8]`.
4.  Porque o contrato pede números separados. `[6, 8]` seria um único argumento do tipo `number[]`, enquanto o rest parameter reúne vários argumentos `number` em um array dentro da função.
5.  Um parâmetro opcional pode ser omitido e, dentro da função, inclui `undefined` em seu tipo. Um rest parameter deve ser o último parâmetro, pode receber zero ou mais argumentos e só pode haver um por função.

## Questão 03:
1.  `aceitar: (entrada: number) => boolean` e `registrar: (entrada: number, aceita: boolean) => void`.
2.  O callback `aceitar` é chamado na linha `const resultado = aceitar(valor);`. O argumento recebido é `valor`.
    Callback `registrar` é chamado na linha `registrar(valor, resultado);`. Os argumentos recebidos são `valor` e `resultado`.
3.  O retorno do callback `aceitar` é reutilizado pela controladora, na linha `return resultado;`. O callback `registrar` é utilizado pelo efeito.
4.  Porque o segundo argumento pede uma função com o contrato `(entrada: number) => boolean`. Ao utilizar `positivo(-3)`, entregaríamos um `boolean`, não uma função. A referência `positivo` possui exatamente o contrato exigido pela controladora.
5.  Saída exibida: `-3: false`. Valor final de `aprovado`: `false`.

## Questão 04:
1.  O valor preservado é `2.5`, recebido pelo parâmetro `fator` quando `criarConversor(2.5)` é executada. Ele volta a ser usado toda vez que a função guardada em `converter` recebe um valor.
2.  Tipos:
    - `criarConversor`: `(fator: number) => (valor: number) => number`
    - `converter`: `(valor: number) => number`
    - `converter(4)`: `number`
3.  Os últimos parênteses `()`, logo após `}`, executam imediatamente a função entre parênteses.
4.  `identificador` guarda o retorno da chamada da função. O valor é `CAP08-PROVA`.
