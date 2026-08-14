# Capítulo 05: Arrays — Fundamentos

## Módulo 2 — Estruturas de Dados e Funções

## Objetivos

Ao concluir este capítulo, você será capaz de:

- explicar por que um array é uma lista ordenada;
- criar arrays com tipos precisos;
- ler e alterar elementos por índice;
- relacionar os índices com a propriedade `length`;
- adicionar e remover elementos no início ou no fim;
- prever como cada operação transforma um array;
- reconhecer quando duas variáveis apontam para o mesmo array;
- identificar um array multidimensional;
- percorrer arrays com `for` e `for...of`;
- combinar percursos com acumuladores, condicionais, `continue` e `break`;
- percorrer arrays bidimensionais com loops aninhados.

## Modelo mental

Um array reúne vários valores relacionados em uma única estrutura e preserva a posição de cada um.

```text
índice       0             1            2
        ┌───────────┬───────────┬────────────┐
array   │ "projeto" │ "estudo" │ "descanso" │
        └───────────┴───────────┴────────────┘
posição     primeira      segunda       terceira
```

O primeiro índice é `0`. Em um array com três elementos, o último índice é `2`, isto é, `length - 1`.

## Organização do capítulo

O conteúdo foi dividido em duas etapas. A primeira consolida o modelo mental de arrays sem depender de repetição. A segunda combina arrays com os loops aprendidos no Capítulo 04.

```text
FUNDAMENTOS DO ARRAY → ARRAYS + LOOPS → PROVA
```

Essa ordem permite entender primeiro índices, `length` e mutações; depois, usar esses conceitos para percorrer listas completas.

## Conteúdo

### Aula

| Arquivo | Descrição |
|---------|-----------|
| [01-teoria.md](aula/01-teoria.md) | Modelo mental, ordem, índices e referência |
| [02-sintaxe.md](aula/02-sintaxe.md) | Tipagem, acesso, alteração e operações básicas |
| [03-exemplos.md](aula/03-exemplos.md) | Exemplos progressivos sem depender de loops |
| [04-mini-projeto.md](aula/04-mini-projeto.md) | Organizador de fila de estudos |
| [05-arrays-e-loops.md](aula/05-arrays-e-loops.md) | Percursos, acumuladores e arrays bidimensionais |

### Exercícios

| Arquivo | Descrição |
|---------|-----------|
| [lista.md](exercicios/lista.md) | Exercícios progressivos do capítulo |
| [lista-arrays-e-loops.md](exercicios/lista-arrays-e-loops.md) | Integração de arrays com estruturas de repetição |
| [solucoes/](exercicios/solucoes/) | Pasta para suas soluções |

### Avaliação

| Arquivo | Descrição |
|---------|-----------|
| [prova.md](avaliacao/prova.md) | Prova liberada no momento adequado do curso |
| `resposta.md` | Arquivo que você criará no dia da prova |
| `resultado.md` | Correção criada após a entrega |

### Extras

| Arquivo | Descrição |
|---------|-----------|
| [erros-comuns.md](extras/erros-comuns.md) | Armadilhas frequentes e como diagnosticá-las |
| [recursos.md](extras/recursos.md) | Documentação e roteiro de revisão |

## Fluxo de estudo

```text
ETAPA 1
TEORIA → SINTAXE → EXEMPLOS → MINI-PROJETO → LISTA FUNDAMENTAL

ETAPA 2
ARRAYS + LOOPS → LISTA DE INTEGRAÇÃO → PROVA
```

Se você já concluiu a lista fundamental, prossiga diretamente para `aula/05-arrays-e-loops.md` e depois faça os quatro exercícios da lista de integração.

## Pré-requisitos

- Capítulos 00 a 04 concluídos.
- Saber declarar variáveis e constantes.
- Conhecer os tipos `string`, `number` e `boolean`.
- Saber ler uma expressão e acompanhar mudanças de estado.
- Saber usar `for`, loops aninhados, `continue`, `break` e acumuladores.

## Depois deste capítulo

O Capítulo 06 mostrará métodos que percorrem, transformam, filtram e buscam dados, como `forEach`, `map`, `filter` e `find`. Aqui o foco continua sendo o percurso explícito, em que cada índice, valor e mudança de estado pode ser acompanhado.

*Tempo estimado para o capítulo completo: 5–7 horas de estudo e prática.*
