# Capítulo 09: Arrays — Métodos Avançados

## Módulo 2 — Estruturas de Dados e Funções

## Objetivos

Ao concluir este capítulo, você será capaz de:

- relacionar percursos manuais e controladoras do Capítulo 08 aos métodos de array;
- escolher entre `forEach`, `map`, `filter`, `find`, `findIndex`, `some` e `every` pela intenção e pelo retorno;
- aplicar callbacks a arrays de valores e de objetos;
- acumular valores com `reduce`, acompanhando o estado intermediário;
- usar callbacks inline, nomeados e produzidos por uma closure;
- reconhecer quais métodos podem encerrar a busca antes do fim;
- encadear métodos sem perder o tipo e o valor de cada etapa;
- criar novas coleções com spread e distinguir cópia do array de cópia dos objetos internos;
- prever retorno, quantidade, ausência e mutação em casos normais e vazios.

## Modelo mental

Os métodos fazem internamente o percurso que antes ficava explícito:

```text
coleção plural: produtos
        │
        ├── método controla o percurso
        │
        └── callback recebe um item singular: produto
                         │
                         └── decide, transforma ou acumula
```

Cada método responde a uma pergunta diferente:

```text
Quero...
├─ executar uma ação para cada item → forEach
├─ criar um resultado para cada item → map
├─ manter parte dos itens            → filter
├─ encontrar o primeiro item         → find
├─ encontrar a primeira posição      → findIndex
├─ saber se pelo menos um passa      → some
├─ saber se todos passam             → every
└─ combinar a coleção em um resultado→ reduce
```

## Organização do capítulo

| Etapa | Arquivo | Foco |
|---|---|---|
| 1 | [01-teoria.md](aula/01-teoria.md) | Ponte entre loops, callbacks e métodos |
| 2 | [02-sintaxe.md](aula/02-sintaxe.md) | Contratos e sintaxe com valores e objetos |
| 3 | [03-exemplos.md](aula/03-exemplos.md) | Progressão prática e casos de limite |
| 4 | [04-mini-projeto.md](aula/04-mini-projeto.md) | Painel de treinos modelado com objetos |
| 5 | [05-leitura-de-codigo-real.md](aula/05-leitura-de-codigo-real.md) | Quatro recortes dos projetos reais |
| 6 | [lista.md](exercicios/lista.md) | Exercícios progressivos em `solucoes/` |
| 7 | [prova.md](avaliacao/prova.md) | Avaliação após a liberação |

Os extras ficam em [erros-comuns.md](extras/erros-comuns.md) e [recursos.md](extras/recursos.md).

## Fluxo de estudo

```text
TEORIA → SINTAXE → EXEMPLOS → MINI-PROJETO → LEITURA REAL → EXERCÍCIOS → PROVA
```

## Pré-requisitos

- Capítulos 05 a 08 concluídos.
- Saber percorrer arrays de valores e objetos com `for` e `for...of`.
- Entender índices, `length`, arrays vazios e referência compartilhada.
- Saber acessar e copiar propriedades de objetos.
- Saber definir, tipar e passar callbacks por referência.
- Distinguir retorno reutilizável de efeito `void`.

## Limites deste capítulo

Objetos e callbacks não serão ensinados novamente do zero. Eles serão combinados com os métodos de array. `type`, interfaces, generics, métodos assíncronos e recursos como `sort` ficam fora da avaliação.

## Compilação dos exercícios

```bash
npx tsc --strict --noEmit --target ES2022 caminho/do/arquivo.ts
```

## Depois deste capítulo

O Capítulo 10 apresentará tuples e discutirá quando uma estrutura posicional é mais adequada que um objeto.

*Tempo estimado: 8–10 horas de estudo e prática, mais 30–45 minutos de leitura de código real.*
