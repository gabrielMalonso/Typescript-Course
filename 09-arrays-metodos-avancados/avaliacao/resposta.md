# RESPOSTAS AVALIAÇÃO - CAPÍTULO 09
## Questão 01:
1.  O array de objetos `produtos`
2.  Em cada callback, `produto` representa um dos objetos do array de objetos `produtos`.
3.  Espera um retorno tipo `boolean`
4.  É um array de objetos, filtrado pelo `produto.ativo`.
```typescript
produtos: { nome: string; ativo: boolean }[] = [
{ nome: "Broca", ativo: true },
];
```
5. tipo: string[]. Valor: [ "Broca" ].

## Questão 02: 
1.  forEach
2.  map
3.  filter
4.  find e some
5.  Porque forEach retorna void. return dentro de forEach encerra apenas a chamada atual de callback

## Questão 03:
Porque trata-se de um objeto. Nessa arrow concisa, ao utilizar apenas as chaves, o typescript iria inferir que se trata das chaves da função. Utiliza-se os parêntesis para diferenciar o componente da função do objeto. 

## Questão 04: 
| Acumulador recebido | Pedido atual | Acumulador devolvido |
| ------------------: | -----------: | -------------------: |
|                   0 |            0 |                   20 |
|                  20 |            1 |                   20 |
|                  20 |            2 |                   35 |

total = 35
O zero é o valor total do acumulador.