# Correção dos Exercícios — Capítulo 01

> Data: 2026-07-30  
> Aluno: Gabriel Alonso

---

## Resultado geral

Os dez exercícios e o bônus compilam e executam sem erros. Você demonstrou boa compreensão de `let`, `const`, tipos, inferência, reatribuição e escopo de bloco.

| Exercício | Resultado | Ajuste principal |
|---|---|---|
| 1.1 | Correto com ajustes | Valor do autor e saída exata |
| 1.2 | Correto com ajuste | Nome obrigatório da variável |
| 1.3 | Correto com ajustes | `dataDaVisita` e saída exata |
| 2.1 | Correto com ajustes | Nome descritivo e rótulos |
| 2.2 | Correto com ajuste | Acrescentar `anos` |
| 2.3 | Correto com ajuste | Rótulo do total inicial |
| 2.4 | Correto com ajuste | Justificativa do trecho C |
| 3.1 | Parcialmente correto | Usar `const` e corrigir a saída |
| 3.2 | Parcialmente correto | Faltaram os diagnósticos textuais |
| 3.3 | Precisa de revisão | Escopo de função e exemplos |
| Bônus | Parcialmente correto | Mutabilidade, nome e saída |

---

## Correções detalhadas

### Exercício 1.1

A escolha de `const` e a inferência estão corretas. Ajuste:

- `"J.R.R. Tolkien"` para `"J. R. R. Tolkien"`;
- `"Ano de Publicação:"` para `"Ano:"`.

Os parênteses em `("O Hobbit")` são válidos, mas desnecessários.

### Exercício 1.2

A reatribuição está correta. O enunciado exige o identificador `numeroDaSala`; `numSala` funciona, mas é uma abreviação e não atende ao nome solicitado.

### Exercício 1.3

Os quatro identificadores são válidos e os tipos estão corretos. Ajuste:

- `dataVisita` para `dataDaVisita`, preservando todas as palavras de `data_da_visita`;
- `"Quantidade de pessoas:"` para `"Quantidade de visitantes:"`.

### Exercício 2.1

Você usou exatamente duas anotações explícitas e duas inferências, como pedido. Ajuste:

- `codDaAssinatura` para `codigoDaAssinatura`;
- `"Nome do plano:"` para `"Plano:"`;
- `"Código da assinatura:"` para `"Código:"`.

### Exercício 2.2

O uso de vírgula e concatenação está correto, sem espaços duplicados. Falta apenas produzir `Idade: 4 anos`.

### Exercício 2.3

O escopo e a reatribuição foram aplicados corretamente. Troque `"Total de Participantes:"` por `"Participantes iniciais:"` para reproduzir a saída pedida.

### Exercício 2.4

As cinco classificações estão corretas. No trecho C, acrescente a justificativa curta exigida, por exemplo: o valor foi declarado com `let` e pode ser reatribuído com outro `number`.

No trecho D, a ideia fica mais precisa assim: a constante não permite reatribuir o identificador.

### Exercício 3.1

A explicação sobre `var` está correta no ponto central: ele não respeita escopo de bloco. Como `operadorAtual` não muda, o requisito manda usar `const`, não `let`.

Também troque `"Número do Caixa:"` por `"Caixa:"`.

### Exercício 3.2

A versão executável está correta e gera exatamente a saída pedida. Porém, faltou a primeira parte do exercício: declarar constantes `string` diagnosticando os quatro problemas do código antigo:

1. reatribuição de uma `const`;
2. atribuição de `number` a uma variável inferida como `string`;
3. acesso a `turnoAtual` fora do bloco;
4. hífen em um identificador.

Essas explicações devem permanecer no arquivo sem serem exibidas.

### Exercício 3.3

O teste executável está correto e sua saída é exata. As três explicações precisam conter também um exemplo de uso.

A explicação de escopo de função está invertida. Um nome declarado dentro de uma função fica acessível dentro dela, não globalmente fora dela.

Uma formulação conceitual possível:

```typescript
const explicacaoEscopoDeFuncao: string = "Um nome declarado dentro de uma função só pode ser usado nela; isso faz sentido para guardar um resultado temporário usado apenas naquele cálculo.";
```

### Bônus

A estrutura geral está boa, mas há três ajustes:

- `"Gabriel ALonso"` deve ser `"Gabriel Alonso"`;
- somente o portão muda, então `embarqueLiberado` deve nascer como `const` com valor `true`;
- `"Setor do Terminal:"` deve ser `"Setor do terminal:"`.

A observação sobre ponto e vírgula está correta.

---

## Síntese

### Pontos fortes

- Todos os arquivos compilam.
- Boa escolha entre `let` e `const` na maioria dos casos.
- Tipos explícitos e inferidos foram usados conscientemente.
- Reatribuição e escopo de bloco estão bem compreendidos.
- As cinco classificações do exercício 2.4 estão corretas.

### Pontos para reforçar

- Comparar a saída executada caractere por caractere com o modelo.
- Cumprir todas as partes do enunciado, inclusive textos que não aparecem na saída.
- Diferenciar escopo global, de bloco e de função.
- Usar nomes completos quando o enunciado fornece um identificador obrigatório.

## Próximo passo

Corrija os pontos indicados nos arquivos e me avise. Depois de uma conferência rápida, você estará pronto para a prova do Capítulo 01.

---

## Conferência após a primeira revisão — 2026-07-30

As correções dos exercícios 1 a 7 e 10 foram validadas. Todos os arquivos continuam compilando.

Restam três ajustes:

1. No `ex08.ts`, trocar `let operadorAtual` por `const operadorAtual`, pois o valor não muda.
2. No `ex09.ts`, acrescentar uma quarta constante `string` diagnosticando o identificador inválido `nome-aluno`.
3. No `bonus.ts`, trocar `"Setor do Terminal:"` por `"Setor do terminal:"`.

Limpeza opcional: no comentário final do `ex01.ts`, atualizar `Ano de Publicação: 1937` para `Ano: 1937`, de modo que a transcrição corresponda à saída atual.

### Esclarecimentos da segunda revisão

- `operadorAtual` descreve qual operador está ativo, mas não significa que o identificador será reatribuído nesta execução. Como o exercício diz para usar `const` nos valores que não mudam e Rafael permanece o mesmo dentro do bloco, a declaração deve usar `const`. Se uma futura versão realmente reatribuir o operador, nesse momento ela passará a usar `let`.
- No `ex09.ts`, o novo diagnóstico repetiu `problema3`, causando erro de compilação. Renomeie-o para `problema4` e registre que o hífen torna `nome-aluno` um identificador sintaticamente inválido.
- No bônus, não é para trocar o setor `B`. A única mudança é a capitalização do rótulo: `Terminal` → `terminal`.
