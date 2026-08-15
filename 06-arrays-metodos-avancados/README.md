# Capítulo 06: Arrays — Métodos Avançados

## Módulo 2 — Estruturas de Dados e Funções

## Objetivos

Ao concluir este capítulo, você será capaz de:

- ler callbacks curtos usados por métodos de array;
- distinguir percorrer, transformar, filtrar, buscar e verificar;
- escolher entre `forEach`, `map`, `filter`, `find`, `findIndex`, `some` e `every`;
- acumular valores com `reduce` sem perder o estado intermediário;
- encadear métodos quando cada etapa permanece clara;
- criar novos arrays com o spread operator (`...`);
- prever o retorno e a mutação de cada operação.

## Modelo mental

Cada método responde a uma pergunta diferente:

```text
Quero...
├─ executar uma ação para cada valor → forEach
├─ criar um valor correspondente para cada item → map
├─ manter apenas parte dos itens → filter
├─ encontrar o primeiro item → find
├─ encontrar a posição do primeiro item → findIndex
├─ saber se pelo menos um atende à regra → some
├─ saber se todos atendem à regra → every
└─ combinar a lista em um resultado → reduce
```

## Organização do capítulo

| Etapa | Arquivo | Foco |
|---|---|---|
| 1 | [01-teoria.md](aula/01-teoria.md) | Intenção, callbacks, retorno e mutação |
| 2 | [02-sintaxe.md](aula/02-sintaxe.md) | Contrato e sintaxe de cada método |
| 3 | [03-exemplos.md](aula/03-exemplos.md) | Exemplos progressivos e testes de limite |
| 4 | [04-mini-projeto.md](aula/04-mini-projeto.md) | Painel de desempenho de treinos |
| 5 | [lista.md](exercicios/lista.md) | Exercícios progressivos |
| 6 | [prova.md](avaliacao/prova.md) | Avaliação após a liberação |

Os extras ficam em [erros-comuns.md](extras/erros-comuns.md) e [recursos.md](extras/recursos.md).

## Fluxo de estudo

```text
TEORIA → SINTAXE → EXEMPLOS → MINI-PROJETO → EXERCÍCIOS → PROVA
```

## Pré-requisitos

- Capítulo 05 concluído.
- Saber percorrer arrays com `for` e `for...of`.
- Entender índices, `length`, tipos de arrays e arrays vazios.
- Saber usar comparações, condicionais e acumuladores.

## Limite deste capítulo

Você aprenderá a **ler e escrever callbacks curtos** porque os métodos precisam deles. O estudo completo de funções, parâmetros, retornos e callbacks virá nos Capítulos 08 e 09. Aqui, trate a arrow function como uma pequena regra entregue ao método.

## Compilação dos exercícios

Ao compilar um arquivo isoladamente pelo terminal, use um alvo moderno para disponibilizar os métodos deste capítulo:

```bash
npx tsc --strict --noEmit --target ES2022 caminho/do/arquivo.ts
```

## Depois deste capítulo

O Capítulo 07 apresentará tuples: estruturas parecidas com arrays, mas com posições, tipos e tamanho conhecidos.

*Tempo estimado: 6–8 horas de estudo e prática.*
