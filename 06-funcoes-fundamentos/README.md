# Capítulo 06: Funções — Fundamentos

## Módulo 2 — Estruturas de Dados e Funções

## Objetivos

Ao concluir este capítulo, você será capaz de:

- explicar a diferença entre definir e executar uma função;
- criar funções com declaração, expressão e arrow function;
- distinguir parâmetros de argumentos;
- tipar entradas e retornos;
- reconhecer funções que retornam valores e funções `void`;
- guardar funções em variáveis sem executá-las;
- escolher nomes e contratos que deixem o código previsível;
- dividir uma tarefa maior em funções pequenas e reutilizáveis.

## Modelo mental

Uma função é uma regra reutilizável. Sua definição descreve o que fazer; a chamada executa essa regra com valores concretos.

```text
DEFINIÇÃO                         CHAMADA
function somar(a, b) {           somar(4, 7)
  return a + b;         +        argumentos: 4 e 7
}                                resultado: 11
parâmetros: a e b
```

O tipo da função forma um contrato:

```text
(number, number) → number
      entradas       saída
```

## Conteúdo

### Aula

| Arquivo | Descrição |
|---|---|
| [01-teoria.md](aula/01-teoria.md) | Modelo mental, contrato, definição e execução |
| [02-sintaxe.md](aula/02-sintaxe.md) | Declaração, expressão, arrow, parâmetros, retorno e `void` |
| [03-exemplos.md](aula/03-exemplos.md) | Exemplos progressivos e comparação entre formas |
| [04-mini-projeto.md](aula/04-mini-projeto.md) | Analisador de uma semana de estudos |
| [05-leitura-de-codigo-real.md](aula/05-leitura-de-codigo-real.md) | Definição, chamada e fluxo de funções em dois projetos reais |

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
| [erros-comuns.md](extras/erros-comuns.md) | Diagnóstico das armadilhas mais frequentes |
| [recursos.md](extras/recursos.md) | Documentação oficial e roteiro de revisão |

## Fluxo de estudo

```text
TEORIA → SINTAXE → EXEMPLOS → MINI-PROJETO → LEITURA REAL → EXERCÍCIOS → PROVA
```

## Pré-requisitos

- Capítulos 00 a 05 concluídos.
- Saber declarar constantes e variáveis com tipos primitivos.
- Conhecer condicionais, loops e arrays fundamentais.
- Conseguir acompanhar o valor de uma expressão e o estado de um array.

## Limites deste capítulo

Aqui, funções já podem ser guardadas em variáveis e chamadas por outro nome. Funções recebidas como parâmetros, callbacks, parâmetros opcionais, valores padrão, rest parameters e closures ficam para o Capítulo 08.

## Depois deste capítulo

O Capítulo 07 usará funções junto a objetos. Depois, o Capítulo 08 aprofundará funções como parâmetros e callbacks, preparando o uso consciente dos métodos avançados de arrays no Capítulo 09.

*Tempo estimado: 5–7 horas de estudo e prática, mais 30–45 minutos de leitura de código real.*
