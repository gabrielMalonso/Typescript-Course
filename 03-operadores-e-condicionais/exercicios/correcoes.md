# Correção dos Exercícios — Capítulo 03

## Resultado geral

Os 14 exercícios obrigatórios compilam em modo estrito, executam sem erros e estão aprovados. O bônus também está aprovado.

Não foram tratadas como pendências diferenças cosméticas de capitalização, grafia, pontuação ou unidades que não alteram o raciocínio.

| Situação | Exercícios |
|----------|------------|
| Aprovados | Todos os 14 exercícios obrigatórios |
| Precisam de ajuste | Nenhum |
| Arquivos ausentes | Nenhum |
| Bônus | Aprovado |

## Sugestão opcional

### Exercício 3.2 — Preservar o booleano

O exercício está aprovado. A solução usa corretamente as duas comparações inclusivas, `&&` e o ternário, produzindo o texto esperado.

Como alternativa de modelagem, seria possível separar a condição da mensagem:

```typescript
const pressaoDentroDaFaixa =
    pressaoAtual >= pressaoMinima && pressaoAtual <= pressaoMaxima;
const textoFinal = pressaoDentroDaFaixa ? "dentro da faixa" : "fora da faixa";
```

Essa separação permitiria reutilizar a condição em outras decisões, mas o enunciado não exige explicitamente que `pressaoDentroDaFaixa` seja um `boolean` nem que exista uma segunda constante. Portanto, isso não é uma pendência.

## Ajustes concluídos

### Exercício 3.3 — Limites exclusivos

As comparações foram corrigidas de `>=` para `>`, respeitando os limites exclusivos indicados por **acima de**. Exercício aprovado.

### Exercício 3.4 — Comportamento do `??` com zero

A explicação agora reconhece que usar `??` com a quantidade de falhas preservaria o valor `0`, pois ele não é `null` nem `undefined`. Exercício aprovado.

### Exercício 3.5 — Guardar a mensagem decidida

A lógica de `partidaLiberada` já estava correta. Agora o `if/else` também define `mensagemDePartida`, que é exibida depois da decisão. Exercício aprovado.

## Exercícios 2.3 e 2.5

- `ex23.ts`: combina corretamente `&&` e `!` para formar `acessoLiberado` e usa `if/else`.
- `ex25.ts`: usa corretamente `switch`, `break` e `default` para classificar o turno.

Os dois arquivos compilam em modo estrito e produzem as saídas esperadas.

## Próximo passo

Lista concluída e aprovada. O aluno está liberado para fazer a prova do Capítulo 03.
