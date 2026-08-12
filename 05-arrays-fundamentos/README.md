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
- identificar, sem aprofundamento, um array multidimensional.

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

## Por que este capítulo pode ser estudado agora?

Você ainda concluirá a parte prática do Capítulo 04. Mesmo assim, esta introdução foi preparada para não depender do domínio de loops: todos os exemplos principais acessam posições diretamente e usam apenas arrays básicos, variáveis, tipos e condicionais já conhecidos.

Loops aparecerão somente como uma conexão opcional. Estudar este capítulo agora não substitui a prática pendente do Capítulo 04 nem altera a ordem das avaliações.

## Conteúdo

### Aula

| Arquivo | Descrição |
|---------|-----------|
| [01-teoria.md](aula/01-teoria.md) | Modelo mental, ordem, índices e referência |
| [02-sintaxe.md](aula/02-sintaxe.md) | Tipagem, acesso, alteração e operações básicas |
| [03-exemplos.md](aula/03-exemplos.md) | Exemplos progressivos sem depender de loops |
| [04-mini-projeto.md](aula/04-mini-projeto.md) | Organizador de fila de estudos |

### Exercícios

| Arquivo | Descrição |
|---------|-----------|
| [lista.md](exercicios/lista.md) | Exercícios progressivos do capítulo |
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

## Fluxo sugerido para hoje

```text
TEORIA → SINTAXE → EXEMPLOS → DESAFIO RÁPIDO → MINI-PROJETO
```

1. Leia os quatro arquivos da aula na ordem.
2. Execute e altere os exemplos pequenos.
3. Faça o desafio rápido sem consultar a resposta.
4. Monte o mini-projeto primeiro pelos requisitos e só depois compare com o código completo.
5. Retorne à parte prática do Capítulo 04 antes de seguir para as avaliações formais.

## Pré-requisitos

- Capítulos 00 a 03 concluídos.
- Saber declarar variáveis e constantes.
- Conhecer os tipos `string`, `number` e `boolean`.
- Saber ler uma expressão e acompanhar mudanças de estado.
- Loops não são necessários para a parte principal desta aula.

## Depois deste capítulo

O Capítulo 06 mostrará métodos que percorrem, transformam, filtram e buscam dados. Aqui o foco é anterior a isso: entender a estrutura, suas posições e suas operações fundamentais.

*Tempo estimado para esta introdução: 3–5 horas de estudo e prática.*
