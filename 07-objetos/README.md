# Capítulo 07: Objetos

## Módulo 2 — Estruturas de Dados e Funções

## Objetivos

Ao concluir este capítulo, você será capaz de:

- explicar a diferença entre um array e um objeto;
- criar objetos literais com propriedades nomeadas;
- ler e alterar propriedades com ponto e com colchetes;
- tipar objetos inline, inclusive com campos opcionais e aninhados;
- guardar funções como métodos e chamá-las a partir do objeto;
- copiar e atualizar objetos com spread, sem confundir cópia com mutação;
- extrair propriedades com destructuring;
- percorrer arrays de objetos com os loops já conhecidos.

## Modelo mental

Um array organiza valores pela posição. Um objeto organiza valores pelo nome.

```text
ARRAY                              OBJETO
índice 0 → "Gabriel"               nome     → "Gabriel"
índice 1 → 34                      idade    → 34
índice 2 → true                    ativo    → true
```

O objeto funciona como uma ficha: cada campo tem um rótulo. Você não pergunta “qual é o item 1?”, e sim “qual é o `nome`?”.

```text
┌─────────────────────────┐
│ equipamento             │
│  nome: "Paquímetro"     │
│  codigo: "EQ-17"        │
│  horasDeUso: 120        │
│  local ───────────────┐ │
│                       │ laboratorio: "Metrologia"
│                       │ bancada: 3
└───────────────────────┴─┘
```

## Conteúdo

### Aula

| Arquivo | Descrição |
|---|---|
| [01-teoria.md](aula/01-teoria.md) | Modelo mental, propriedades, referência e cópia |
| [02-sintaxe.md](aula/02-sintaxe.md) | Literal, tipagem, opcionais, métodos, spread e destructuring |
| [03-exemplos.md](aula/03-exemplos.md) | Exemplos progressivos com previsão de saída |
| [04-mini-projeto.md](aula/04-mini-projeto.md) | Ficha de equipamento de laboratório |
| [05-leitura-de-codigo-real.md](aula/05-leitura-de-codigo-real.md) | Quatro recortes de objetos em projetos reais |

### Exercícios

| Arquivo | Descrição |
|---|---|
| [lista.md](exercicios/lista.md) | 12 exercícios progressivos e um bônus |
| `solucoes/` | Pasta para seus arquivos `.ts` |

### Avaliação

| Arquivo | Descrição |
|---|---|
| [prova.md](avaliacao/prova.md) | Prova com 40% de teoria e 60% de prática |
| `resposta.md` | Arquivo que você criará no dia da prova |
| `resultado.md` | Correção criada depois da entrega |

### Extras

| Arquivo | Descrição |
|---|---|
| [erros-comuns.md](extras/erros-comuns.md) | Armadilhas frequentes com objetos |
| [recursos.md](extras/recursos.md) | Documentação oficial e roteiro de revisão |

## Fluxo de estudo

```text
TEORIA → SINTAXE → EXEMPLOS → MINI-PROJETO → LEITURA REAL → EXERCÍCIOS → PROVA
```

## Pré-requisitos

- Capítulos 00 a 06 concluídos.
- Saber usar tipos primitivos, condicionais, loops, arrays e funções.
- Distinguir valor de referência, já visto em arrays.
- Distinguir o tipo de uma função do tipo do valor que ela retorna.

## Limites deste capítulo

Aqui, o tipo do objeto é escrito junto da variável, no próprio código. `type`, `interface` e classes ficam para capítulos posteriores. Callbacks, parâmetros opcionais de função e métodos avançados de arrays (`map`, `filter`, `find`) permanecem nos Capítulos 08 e 09.

## Depois deste capítulo

O Capítulo 08 aprofundará funções como parâmetros e callbacks. O Capítulo 09 aplicará esses callbacks a arrays de valores e a arrays de objetos.

*Tempo estimado: 5–7 horas de estudo e prática, mais 30–45 minutos de leitura de código real.*
