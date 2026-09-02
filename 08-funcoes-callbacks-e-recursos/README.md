# Capítulo 08: Funções — Callbacks e Recursos

## Módulo 2 — Estruturas de Dados e Funções

## Objetivos

Ao concluir este capítulo, você será capaz de:

- usar parâmetros opcionais, valores padrão e rest parameters;
- reconhecer e escrever funções anônimas;
- passar uma função como argumento de outra função;
- explicar quando e por que um callback é executado;
- tipar o contrato completo de um callback, incluindo seu retorno;
- combinar callbacks com arrays de objetos usando `for...of`;
- criar closures simples e identificar o valor preservado;
- reconhecer uma IIFE sem tratá-la como padrão obrigatório.

## Modelo mental

Uma função comum recebe dados. Uma função de ordem superior também pode receber uma regra:

```text
dados: [objetos] ──────┐
                      ├──► função controladora ───► resultado
regra: (objeto) => ... ┘             │
                                     └── chama o callback
```

O callback é uma função entregue agora para ser chamada no ponto decidido por outra função.

## Conteúdo

| Arquivo | Descrição |
|---|---|
| [01-teoria.md](aula/01-teoria.md) | Modelo mental, contrato completo, callbacks e closures |
| [02-sintaxe.md](aula/02-sintaxe.md) | Sintaxe de opcionais, defaults, rest e callbacks tipados |
| [03-exemplos.md](aula/03-exemplos.md) | Exemplos progressivos com arrays de objetos e `for...of` |
| [04-mini-projeto.md](aula/04-mini-projeto.md) | Processador configurável de inspeções |
| [05-leitura-de-codigo-real.md](aula/05-leitura-de-codigo-real.md) | Quatro recortes de callbacks em projetos reais |

### Exercícios

| Arquivo | Descrição |
|---|---|
| [lista.md](exercicios/lista.md) | 16 exercícios progressivos, incluindo integração final |
| `solucoes/` | Pasta para seus arquivos `ex01.ts` a `ex16.ts` |

### Avaliação

| Arquivo | Descrição |
|---|---|
| [prova.md](avaliacao/prova.md) | Prova concluída em 02/09/2026 |
| [resposta.md](avaliacao/resposta.md) | Respostas teóricas entregues |
| [resultado.md](avaliacao/resultado.md) | Correção — nota 9,2 |

### Extras

| Arquivo | Descrição |
|---|---|
| [erros-comuns.md](extras/erros-comuns.md) | Diagnóstico das armadilhas mais frequentes |
| [recursos.md](extras/recursos.md) | Documentação oficial e roteiro curto de revisão |

## Fluxo de estudo

```text
TEORIA → SINTAXE → EXEMPLOS → MINI-PROJETO → LEITURA REAL → EXERCÍCIOS → PROVA
```

## Pré-requisitos

- Capítulos 00 a 07 concluídos.
- Saber declarar, guardar e chamar funções.
- Distinguir o tipo da função do tipo de seu retorno.
- Saber percorrer arrays de objetos com `for...of`.

## Limites deste capítulo

Os arrays aparecem para exercitar a mistura **função + array + objeto**, mas ainda serão percorridos com loops conhecidos. Métodos que recebem callbacks, como `forEach`, `map`, `filter`, `find`, `some`, `every` e `reduce`, pertencem ao Capítulo 09.

`type`, interfaces, generics, Promises e detalhes internos de React podem aparecer em código real somente como contexto isolado; não serão cobrados aqui.

## Depois deste capítulo

No Capítulo 09, os callbacks estudados aqui serão usados pelos métodos avançados de arrays.

*Tempo estimado: 5–7 horas de estudo e prática, mais 30–45 minutos de leitura de código real.*
