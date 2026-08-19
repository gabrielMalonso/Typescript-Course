# Recursos Adicionais — Capítulo 04: Estruturas de Repetição

## Documentação

- [MDN — Loops and iteration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) — visão geral de `for`, `while`, `do...while`, `break` e `continue`.
- [MDN — `for`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) — ordem de execução das três partes do cabeçalho.
- [MDN — `while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while) — repetição com teste anterior.
- [MDN — `do...while`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while) — repetição com teste posterior.
- [MDN — `break`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break) — encerramento do loop mais próximo.
- [MDN — `continue`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue) — salto para a próxima iteração.

As estruturas de repetição vêm do JavaScript e são verificadas pelo TypeScript junto com o restante do código.

## Ferramentas

- [TypeScript Playground](https://www.typescriptlang.org/play) — execute pequenos loops sem criar arquivos locais.
- Terminal e compilador local — prefira-os para exercícios que precisam confirmar término e saída completa.

## Roteiro de experimentação

Ao estudar um exemplo, altere somente uma parte por vez:

1. valor inicial;
2. operador da condição;
3. valor limite;
4. direção da atualização;
5. posição de `break` ou `continue`.

Antes de executar, escreva sua previsão. Se o comportamento for diferente, compare cada iteração até encontrar o primeiro ponto de divergência.

## Exercícios extras

### Extra 1: Potências de dois

Comece com `valor = 1`. Use `while` para exibir e multiplicar o valor por `2` até chegar a `128`, incluindo esse limite.

### Extra 2: Moldura de texto

Use loops aninhados para representar `3` linhas com `5` posições. Exiba cada posição como `L1-C1`, `L1-C2` e assim por diante.

### Extra 3: Intervalo com exceções

Percorra os números de `10` a `30`. Ignore múltiplos de `4`, some os demais e interrompa quando a soma ultrapassar `100`.

## Prévia dos próximos conteúdos

- **Projeto 1 — Calculadora de Terminal:** um loop manterá a calculadora ativa até o comando de saída.
- **Arrays — Fundamentos:** loops poderão percorrer posições de uma lista, embora os métodos avançados venham depois.
- **Funções:** blocos de repetição poderão ser organizados em operações reutilizáveis.

## Glossário

| Termo | Significado |
|-------|-------------|
| Loop | Estrutura que repete um bloco |
| Iteração | Uma execução do corpo do loop |
| Contador | Variável que acompanha uma sequência de passos |
| Acumulador | Variável que reúne resultados ao longo das iterações |
| Condição de parada | Regra que permite encerrar a repetição |
| Loop infinito | Repetição que não alcança o término |
| `break` | Comando que encerra o loop mais próximo |
| `continue` | Comando que pula o restante da iteração atual |
