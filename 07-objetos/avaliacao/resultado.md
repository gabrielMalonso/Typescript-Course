# Resultado da Prova — Capítulo 07: Objetos

**Data:** 21/08/2026  
**Nota final:** **9,5 / 10,0**  
**Resultado:** ✅ Aprovado

## Resumo

Gabriel demonstrou domínio sólido de objetos: literal tipado, `const` com mutação, referência compartilhada, ponto versus colchetes, opcional com `??`, spread, destructuring aninhado, método com `this` e array de objetos com funções. Os quatro arquivos práticos compilam isoladamente em modo estrito e executam sem erros. Os descontos ficaram na leitura do índice do array, num escorregão de origem no destructuring e numa condição extra no abastecimento.

| Questão | Valor | Nota | Feedback |
|---|---:|---:|---|
| 1 | 1,0 | 0,75 | Organização por posição versus nome correta, e `ficha.codigo` também. O código do equipamento no array está em `lista[1]` (`17`), não em `lista[2]` (`true`). |
| 2 | 1,0 | 1,0 | `const` prende a referência; `outro` e `sensor` são o mesmo objeto; `valor` vira `25`; reatribuir `sensor` seria rejeitado. |
| 3 | 1,0 | 1,0 | `codigo` ausente, ponto e colchetes lendo `"mensagem"`, `.campo` procurando a chave literal, e `??` para o opcional. |
| 4 | 1,0 | 0,90 | Original preservado e spread pela direita corretos. `nome` é a string extraída; `promocao` é o objeto. No item 4, a extração sai de `produto`, não de `promocao`. |
| 5 | 1,0 | 1,0 | Tipo, valores, mutação de `pago` e comentário objeto versus `pedido.total: number`. |
| 6 | 1,5 | 1,5 | Destructuring aninhado, `??` para nota ausente e as duas saídas pedidas. O spread no segundo teste é extra válido. |
| 7 | 1,5 | 1,30 | Saídas `40`, `40` e `50`. Negativos ignorados e teto de volume presentes. A condição extra `litros <= 50` rejeitaria um abastecimento grande que deveria só encher até `50`. |
| 8 | 2,0 | 2,0 | Filtro `ativa` e `quantidade > 0`, total `21` sem mutar, expressão de função e array vazio. Falta o rótulo `Total:` no resumo; tratado como cosmética. |

**Pontuação bruta:** 9,45 / 10,0  
**Nota arredondada:** **9,5 / 10,0**

## Validação técnica

- `questao05.ts`: compila; exibe Marina, `85`, `false` e depois `true`.
- `questao06.ts`: compila; `Reunião | Sala 2 | sem nota` e `Reunião | Sala 2 | levar cabo`.
- `questao07.ts`: compila; `40`, `40` e `50` nos três testes pedidos.
- `questao08.ts`: compila; quantidades `12` e `21`, depois `0` e `0` no vazio. O resumo sai `Peças: 12 | 21` e `Peças: 0 | 0`.

No teste extra mental da Questão 7, `abastecer(51)` com volume `10` ficaria em `10` por causa de `litros <= 50`. A regra pede somar e cortar o volume em `50`.

## Pontos para reforçar

1. No array, o código `17` está no índice `1`. O índice `2` é o booleano `ativo`.
2. O teto vale para o **volume acumulado**, não para o tamanho de cada abastecimento.
3. No destructuring `const { nome } = produto`, a variável sai de `produto`.

## Organização da entrega

Os cinco arquivos obrigatórios estão em `07-objetos/avaliacao/`. `prova.md` não foi alterado.

## Conclusão

Capítulo 07 concluído com aprovação. O domínio prático de objetos, cópia, destructuring e lista de fichas está consolidado.

## Correção pós-prova — 21/08/2026

Ajustes aplicados na entrega original:

- Questão 1: leitura do código em `lista[1]`.
- Questão 4: extração de `nome` descrita a partir de `produto`.
- Questão 7: condição reduzida a `litros > 0`; o teto continua no volume.
- Questão 8: resumo com o rótulo `Total:`.

As questões 7 e 8 recompilam em modo estrito. Saídas conferidas: `40` / `40` / `50`; `Peças: 12 | Total: 21` e `Peças: 0 | Total: 0`.

**Pendências conceituais resolvidas.** A nota permanece **9,5**, registrando o desempenho da entrega original.
