# Capítulo 04: Estruturas de Repetição

## Módulo 1 — Fundamentos Absolutos

## Objetivos

Ao concluir este capítulo, você será capaz de:

- reconhecer quando uma tarefa realmente precisa de repetição;
- controlar loops com condição, contador e atualização;
- escolher entre `while`, `do...while` e `for`;
- interromper uma repetição com `break`;
- pular apenas a iteração atual com `continue`;
- combinar loops sem perder o controle de cada contador;
- evitar loops infinitos;
- testar início, limite, término e caminhos alternativos.

## Modelo mental

Um loop executa o mesmo bloco várias vezes, mas cada repetição deve aproximar o programa de um ponto de parada.

```text
ESTADO INICIAL → TESTE → EXECUÇÃO → ATUALIZAÇÃO
                       ↑              ↓
                       └──── REPETE ──┘
```

Se a atualização não puder tornar o teste falso, o loop pode nunca terminar.

## Conteúdo

### Aula

| Arquivo | Descrição |
|---------|-----------|
| [01-teoria.md](aula/01-teoria.md) | Modelo mental, escolhas e riscos dos loops |
| [02-sintaxe.md](aula/02-sintaxe.md) | Sintaxe de `while`, `do...while`, `for`, `break` e `continue` |
| [03-exemplos.md](aula/03-exemplos.md) | Exemplos progressivos com diferentes contextos |
| [04-mini-projeto.md](aula/04-mini-projeto.md) | Simulador de sessões de estudo |

### Exercícios

| Arquivo | Descrição |
|---------|-----------|
| [lista.md](exercicios/lista.md) | 12 exercícios progressivos e 1 bônus |
| [solucoes/](exercicios/solucoes/) | Pasta para suas soluções |

### Avaliação

| Arquivo | Descrição |
|---------|-----------|
| [prova.md](avaliacao/prova.md) | Prova liberada após a correção dos exercícios |
| `resposta.md` | Arquivo que você criará no dia da prova |
| `resultado.md` | Correção criada após a entrega |

### Extras

| Arquivo | Descrição |
|---------|-----------|
| [erros-comuns.md](extras/erros-comuns.md) | Armadilhas frequentes e como diagnosticá-las |
| [recursos.md](extras/recursos.md) | Documentação e roteiro de revisão |

## Fluxo de estudo

```text
AULA → MINI-PROJETO → 12 EXERCÍCIOS → CORREÇÃO → PROVA → PROJETO 1
```

1. Leia os quatro arquivos da aula na ordem.
2. Faça o mini-projeto e teste mais de um caminho.
3. Registre seus aprendizados no `DIARIO.md`.
4. Resolva os exercícios em arquivos separados.
5. Peça a correção antes da prova.

## Pré-requisitos

- Capítulos 00 a 03 concluídos.
- Saber declarar e atualizar variáveis.
- Entender comparações e operadores lógicos.
- Saber escolher caminhos com estruturas condicionais.

## Depois deste capítulo

Após a aprovação, você fará o Projeto 1 — Calculadora de Terminal. O projeto será adaptado para repetir operações até que o usuário escolha encerrar. Depois dele, começaremos o Capítulo 05 — Arrays: Fundamentos.

*Tempo estimado: 6–8 horas de estudo.*
