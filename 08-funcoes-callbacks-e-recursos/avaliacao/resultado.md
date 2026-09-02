# Resultado da Prova — Capítulo 08: Funções — Callbacks e Recursos

**Data:** 02/09/2026  
**Nota final:** **9,2 / 10,0**  
**Resultado:** ✅ Aprovado

## Resumo

Gabriel demonstrou domínio sólido de parâmetros configuráveis, contratos de callbacks, referência versus chamada, callbacks com retorno e `void`, closures e IIFE. Os quatro arquivos práticos compilam isoladamente em modo estrito e executam sem erros. O principal desconto ficou na Questão 7, porque a função percorre a variável global `pedidos` em vez do parâmetro `itens`.

| Questão | Valor | Nota | Feedback |
|---|---:|---:|---|
| 1 | 1,0 | 0,85 | Contrato, referência e tipos corretos. Faltou informar que `preco` guarda o valor `11`. |
| 2 | 1,0 | 1,0 | Opcional, default, conteúdo do rest e diferença entre argumentos separados e `number[]` explicados corretamente. |
| 3 | 1,25 | 1,25 | Contratos, chamadas, argumentos, retorno reutilizado, efeito, referência e saída todos corretos. |
| 4 | 0,75 | 0,75 | Valor preservado, tipos, chamada imediata e retorno da IIFE identificados corretamente. |
| 5 | 1,25 | 1,05 | Contrato, soma manual, três chamadas e explicação de `undefined` corretos. A saída diverge do texto pedido (`sem responsavel` e `soma: N`), e o teste por valor verdadeiro trata `""` como ausência. |
| 6 | 1,25 | 1,20 | Percurso, índice iniciado em `0`, callback inline e teste vazio corretos. A numeração usa `:` em vez do ponto solicitado. |
| 7 | 1,75 | 1,30 | Cálculos, callbacks nomeados/inline, rejeição total e comprovação de preservação corretos. A controladora usa `for (const pedido of pedidos)` em vez de percorrer `itens`; assim, ignora o array recebido. |
| 8 | 1,75 | 1,75 | Closure, limites inclusivos, atividade, seleção manual, casos vazios e explicações completos. |
| **Total bruto** | **10,0** | **9,15** | |

**Nota arredondada:** **9,2 / 10,0**

## Ajuste principal

Na Questão 7, a origem do percurso deve ser o parâmetro da função:

```typescript
for (const pedido of itens) {
  if (incluir(pedido)) {
    total += calcular(pedido);
  }
}
```

Do jeito entregue, passar `arrayVazio` não torna o percurso vazio: a função continua percorrendo os quatro objetos globais de `pedidos`. O resultado `0` aparece apenas porque o callback desse teste rejeita todos. Um teste mais revelador seria usar um array diferente e um critério que aceite seus elementos.

Na Questão 5, para representar especificamente a ausência do responsável sem rejeitar uma string vazia válida, a leitura mais precisa é:

```typescript
const textoResponsavel = responsavel ?? "sem responsável";
```

## Validação técnica da entrega original

- Os quatro arquivos compilam isoladamente com `tsc --strict --noEmit`.
- Os quatro arquivos executam diretamente no Node.js 24 sem erros.
- Questão 5: cálculos `10`, `5` e `0` corretos; há diferenças literais nos textos.
- Questão 6: três chamadas no array preenchido e `Chamadas no vazio: 0`.
- Questão 7: saídas visíveis `84`, `3`, `0`, `0`, `4` e `2`; o caso vazio não valida o parâmetro `itens` devido ao uso da variável global.
- Questão 8: `Ana` e `Clara` para mínimo 70, somente `Clara` para 85 e `nenhum aprovado` nos dois casos vazios de resultado.

## Pontos consolidados

- descrever o tipo completo de uma função e diferenciá-lo do tipo de seu retorno;
- passar callbacks por referência e localizar o momento em que a controladora os executa;
- separar callbacks que decidem, calculam e produzem efeitos;
- criar closures independentes e explicar quando o valor preservado é reutilizado;
- reconhecer que uma IIFE guarda o retorno da chamada, não a função.

## Próximo reforço

Ao escrever uma função reutilizável, confira se o corpo usa os parâmetros recebidos, não uma variável externa com dados parecidos. Para testes de array vazio, use callbacks que tornariam o resultado diferente caso a função percorresse acidentalmente outra coleção.

## Conclusão

Capítulo 08 concluído com aprovação. O domínio conceitual de callbacks e closures está forte; a única falha funcional relevante foi a dependência indevida da variável global na Questão 7.

## Correção pós-prova — 02/09/2026

Com autorização do aluno, a prova foi preservada em uma versão final corrigida:

- Questão 1 agora registra o valor `11` e descreve explicitamente o que `operacao` guarda;
- respostas teóricas receberam contratos e regras mais precisos;
- Questão 5 usa `??`, acentuação e formato de saída exatos;
- Questão 6 usa a numeração com ponto solicitada;
- Questão 7 percorre `itens`, usa nomes coerentes e testa o array vazio com um critério que aceitaria qualquer elemento;
- comentários da Questão 8 distinguem com precisão a fábrica da função retornada.

Os quatro arquivos corrigidos compilam isoladamente em modo estrito e executam com todas as saídas esperadas. A nota permanece **9,2**, pois registra a entrega original; os ajustes ficam registrados como consolidação do aprendizado.
