# Exercícios — Capítulo 01: Variáveis e Constantes

## Instruções Gerais

- Resolva os exercícios na ordem apresentada.
- Crie um arquivo separado para cada exercício: `ex01.ts`, `ex02.ts`, ..., `ex10.ts`.
- Use somente os recursos estudados até aqui: declarações, atribuição simples, blocos, tipos básicos e `console.log`.
- Não use funções, condicionais, arrays ou objetos.
- Use nomes descritivos em `camelCase`.
- Termine todas as instruções com ponto e vírgula, conforme a convenção adotada no curso.
- Compile e execute cada arquivo. Compare a saída caractere por caractere, incluindo espaços, acentos e pontuação.
- Antes de entregar, confira se o código testado é exatamente o código salvo no arquivo.
- Não consulte soluções antes de tentar.

---

## Nível 1: Aquecimento

*Exercícios básicos para fixar a sintaxe.*

### Exercício 1.1: Etiquetas de uma Biblioteca

**Arquivo:** `ex01.ts`

**Objetivo:** Praticar `const`, inferência de tipo e nomes descritivos.

**Enunciado:**

Uma biblioteca quer exibir três informações que não mudarão durante a execução:

- título: `O Hobbit`;
- autor: `J. R. R. Tolkien`;
- ano de publicação: `1937`.

Declare uma constante para cada informação. Use inferência de tipo nas três declarações e exiba exatamente a saída abaixo.

**Saída esperada:**

```text
Livro: O Hobbit
Autor: J. R. R. Tolkien
Ano: 1937
```

**Dica:** Se o valor não será substituído, comece considerando `const`. Ao usar vírgula no `console.log`, não deixe um espaço depois dos dois-pontos dentro do texto.

### Exercício 1.2: Troca de Sala

**Arquivo:** `ex02.ts`

**Objetivo:** Praticar declaração com `let` e reatribuição sem redeclaração.

**Enunciado:**

Uma aula estava marcada inicialmente para a sala `12` e foi transferida para a sala `18`.

1. Declare uma variável chamada `numeroDaSala`, iniciada com `12`.
2. Exiba a sala inicial.
3. Atualize o valor para `18`, sem escrever `let` novamente.
4. Exiba a sala atual.

**Saída esperada:**

```text
Sala inicial: 12
Sala atual: 18
```

**Dica:** Declarar cria a variável; reatribuir apenas troca o valor guardado nela.

### Exercício 1.3: Oficina de Nomes

**Arquivo:** `ex03.ts`

**Objetivo:** Reconhecer nomes válidos, transformar `snake_case` em `camelCase` e melhorar nomes pouco descritivos.

**Enunciado:**

Crie quatro constantes com os valores indicados. Os nomes abaixo representam a forma recebida de outro sistema; no seu código, adapte todos para nomes descritivos em `camelCase`.

| Nome recebido | Valor | Ajuste necessário |
|---|---:|---|
| `nome_cliente` | `"Marina Costa"` | Converter de `snake_case` |
| `data_da_visita` | `"26/07/2026"` | Converter de `snake_case` |
| `qtd` | `3` | Substituir a abreviação |
| `2andar` | `2` | Corrigir o início inválido |

Exiba os valores no formato abaixo.

**Saída esperada:**

```text
Cliente: Marina Costa
Data da visita: 26/07/2026
Quantidade de visitantes: 3
Andar: 2
```

**Dica:** Um identificador não pode começar com número. A palavra seguinte à primeira começa com letra maiúscula em `camelCase`.

---

## Nível 2: Praticando

*Exercícios que combinam conceitos.*

### Exercício 2.1: Inferido ou Anotado?

**Arquivo:** `ex04.ts`

**Objetivo:** Praticar inferência e anotação explícita com `string`, `number` e `boolean`.

**Enunciado:**

Registre os dados de uma assinatura digital:

- nome do plano: `Essencial`;
- valor mensal: `29.9`;
- renovação automática: `true`;
- código da assinatura: `AS-104`.

Use inferência no nome do plano e no valor mensal. Use anotação explícita nos outros dois dados. Todos os valores permanecerão fixos.

**Requisitos:**

- [ ] Usar `const` nas quatro declarações.
- [ ] Usar exatamente duas declarações com tipo explícito.
- [ ] Usar nomes descritivos em `camelCase`.
- [ ] Manter ponto e vírgula em todas as instruções.

**Saída esperada:**

```text
Plano: Essencial
Valor mensal: 29.9
Renovação automática: true
Código: AS-104
```

**Dica:** Quando o valor inicial já revela claramente o tipo, o TypeScript pode inferi-lo. A anotação explícita aparece depois do nome.

### Exercício 2.2: Formatação Sob Inspeção

**Arquivo:** `ex05.ts`

**Objetivo:** Produzir uma saída exata e perceber o efeito dos espaços no `console.log`.

**Enunciado:**

Declare constantes para o nome `Luna`, a espécie `Gato` e a idade `4`. Exiba a ficha exatamente como mostrada abaixo.

Em pelo menos uma linha, use dois argumentos separados por vírgula no `console.log`. Em outra linha, use concatenação com `+`. Não use template literal neste exercício.

**Requisitos:**

- [ ] Não deixar espaços duplicados.
- [ ] Preservar letras maiúsculas, acentos e pontuação.
- [ ] Usar uma linha com vírgula e outra com `+`.
- [ ] Conferir a saída executada, não apenas o código.

**Saída esperada:**

```text
=== FICHA DO ANIMAL ===
Nome: Luna
Espécie: Gato
Idade: 4 anos
```

**Dica:** Com vírgula, o console costuma inserir o separador. Com `+`, os espaços precisam estar dentro dos textos.

### Exercício 2.3: Dentro e Fora do Bloco

**Arquivo:** `ex06.ts`

**Objetivo:** Praticar escopo global e escopo de bloco com `let` e `const`.

**Enunciado:**

Declare fora de qualquer bloco:

- a constante `nomeDoEvento`, com o valor `Feira de Ciências`;
- a variável `totalDeParticipantes`, iniciada com `40`.

Exiba o evento. Depois, crie um bloco `{ }`. Dentro dele:

1. declare a constante `nomeDaSala` com o valor `Laboratório 2`;
2. exiba o nome da sala;
3. exiba o total inicial de participantes;
4. reatribua `totalDeParticipantes` para `44`;
5. exiba o total atualizado.

Fora do bloco, exiba novamente o evento e o total final. Não tente acessar `nomeDaSala` fora do bloco.

**Requisitos:**

- [ ] Um nome declarado fora do bloco deve ser usado dentro dele.
- [ ] Um nome criado no bloco deve ser usado somente no bloco.
- [ ] A atualização deve ocorrer sem redeclarar a variável.

**Saída esperada:**

```text
Evento: Feira de Ciências
Sala: Laboratório 2
Participantes iniciais: 40
Participantes no bloco: 44
Evento ao final: Feira de Ciências
Participantes ao final: 44
```

**Dica:** Um bloco limita nomes declarados dentro dele, mas consegue acessar nomes declarados na região externa.

### Exercício 2.4: Compilação ou Estilo?

**Arquivo:** `ex07.ts`

**Objetivo:** Diferenciar erros de compilação, problemas de estilo e código válido.

**Enunciado:**

Analise os cinco trechos sem executá-los todos juntos:

**Trecho A**

```typescript
const nomeDoCurso = "TypeScript"
```

**Trecho B**

```typescript
const totalDeAulas: number = "dez";
```

**Trecho C**

```typescript
let etapaAtual = 1;
etapaAtual = 2;
```

**Trecho D**

```typescript
const etapaAtual = 1;
etapaAtual = 2;
```

**Trecho E**

```typescript
const n = "Gabriel";
```

No arquivo `ex07.ts`, declare cinco constantes do tipo `string`, uma para cada trecho. Em cada texto, registre sua classificação e uma justificativa curta. Use somente uma destas classificações:

- `erro de compilação`;
- `problema de estilo`;
- `código válido sem ressalvas`.

Ao final, exiba apenas a mensagem de confirmação abaixo.

**Saída esperada:**

```text
Análise dos cinco trechos registrada.
```

**Dica:** Pergunte separadamente: “O compilador rejeita?”, “o código segue a convenção do curso?” e “o nome comunica seu significado?”. Ausência de ponto e vírgula nem sempre impede a compilação.

---

## Nível 3: Desafios

*Exercícios que exigem análise e combinação dos conceitos.*

### Exercício 3.1: Revisão de Código Antigo

**Arquivo:** `ex08.ts`

**Objetivo:** Analisar `var` sem incentivar seu uso e escolher conscientemente entre `let` e `const`.

**Contexto:**

Você encontrou este trecho em um arquivo antigo:

```typescript
var nomeLoja = "Papelaria Horizonte";
var numeroDoCaixa = 3;

{
  var operadorAtual = "Rafael";
}

console.log(operadorAtual);
```

**Enunciado:**

Crie uma versão moderna que produza a mesma saída solicitada abaixo, seguindo estas regras:

1. não use `var`;
2. use `const` nos valores que não mudam;
3. mantenha o operador restrito a um bloco;
4. exiba o operador somente dentro desse bloco;
5. use os outros dois dados fora do bloco.

Depois do código, declare uma constante `explicacaoSobreVar` do tipo `string`. Escreva nela, com suas palavras, por que `operadorAtual` fica acessível fora do bloco no trecho antigo e por que isso pode surpreender o leitor. Não exiba essa explicação.

**Saída esperada:**

```text
Loja: Papelaria Horizonte
Caixa: 3
Operador: Rafael
```

**Dica:** `var` possui escopo de função, mas não escopo de bloco. `let` e `const` respeitam as chaves.

### Exercício 3.2: Diagnóstico Antes do Conserto

**Arquivo:** `ex09.ts`

**Objetivo:** Identificar problemas de reatribuição, tipos, nomes e escopo antes de produzir código válido.

**Contexto:**

Um cadastro foi entregue assim:

```typescript
const numeroDeVagas = 20;
numeroDeVagas = 18;

let nomeTurma = "Introdução";
nomeTurma = 2;

{
  const turnoAtual = "Noite";
}

console.log("Turno:", turnoAtual);
const nome-aluno = "Bianca";
```

**Enunciado:**

Primeiro, diagnostique cada problema em constantes `string` próprias. Não copie o código inválido para a parte executável do arquivo.

Depois, escreva uma versão corrigida com estas decisões:

- o número de vagas deve poder mudar de `20` para `18`;
- o nome da turma deve permanecer como texto e mudar de `Introdução` para `Fundamentos`;
- o turno deve poder ser exibido na última linha;
- o nome da aluna deve usar um identificador válido e descritivo.

**Requisitos:**

- [ ] Corrigir a escolha entre `let` e `const`.
- [ ] Manter tipos compatíveis nas reatribuições.
- [ ] Corrigir o problema de escopo.
- [ ] Corrigir o identificador inválido.
- [ ] Não usar `var`.

**Saída esperada:**

```text
Vagas iniciais: 20
Vagas atuais: 18
Turma inicial: Introdução
Turma atual: Fundamentos
Aluna: Bianca
Turno: Noite
```

**Dica:** Resolva uma categoria por vez: reatribuição, compatibilidade de tipo, alcance do nome e validade do identificador.

### Exercício 3.3: Mapa de Escopos

**Arquivo:** `ex10.ts`

**Objetivo:** Consolidar escopo global, de bloco e de função apenas no nível conceitual.

**Contexto:**

Considere este mapa:

```text
Arquivo
├── nome declarado fora de blocos → escopo global neste script simples
├── { nome declarado com let ou const } → escopo de bloco
└── função
    └── nome declarado dentro dela → escopo de função
```

**Enunciado:**

Sem criar nenhuma função, declare três constantes do tipo `string`:

- `explicacaoEscopoGlobal`;
- `explicacaoEscopoDeBloco`;
- `explicacaoEscopoDeFuncao`.

Escreva em cada uma uma explicação com suas próprias palavras e um exemplo de situação em que aquele alcance faria sentido. Para o escopo de função, descreva apenas a ideia: funções serão estudadas depois.

Em seguida, crie um pequeno teste executável:

1. declare `nomeDoArquivo` fora de um bloco com o valor `mapa.ts`;
2. exiba esse nome;
3. dentro de um bloco, declare `nomeDaSecao` com o valor `Escopos`;
4. exiba `nomeDaSecao` e `nomeDoArquivo` dentro do bloco;
5. fora do bloco, exiba apenas `nomeDoArquivo` novamente;
6. finalize com a mensagem de confirmação.

**Requisitos:**

- [ ] Não criar ou chamar funções.
- [ ] Não acessar o nome interno fora do bloco.
- [ ] Usar `const` em todos os valores.
- [ ] Manter as explicações no arquivo, mas não as exibir.

**Saída esperada:**

```text
Arquivo: mapa.ts
Seção: Escopos
Arquivo dentro do bloco: mapa.ts
Arquivo ao final: mapa.ts
Mapa de escopos concluído.
```

**Dica:** As chaves formam uma região menor. Um nome externo entra no bloco; um nome interno não sai dele.

---

## Exercício Bônus (Opcional): Auditoria de um Cartão de Embarque

**Arquivo sugerido:** `bonus.ts`

**Objetivo:** Integrar nomenclatura, tipos, mutabilidade, escopo, análise de estilo e formatação exata.

**Enunciado:**

Crie um cartão de embarque de terminal com os seguintes dados:

- passageiro: `Gabriel Alonso`;
- voo: `TS-101`;
- portão inicial: `7`;
- portão atualizado: `9`;
- embarque liberado: `true`.

Regras:

1. use inferência em pelo menos duas declarações;
2. use anotação explícita em pelo menos duas declarações;
3. use `let` somente no dado que muda;
4. dentro de um bloco, declare a constante `setorDoTerminal` com o valor `B`;
5. exiba o setor somente dentro do bloco;
6. não use `var`;
7. use nomes descritivos em `camelCase`;
8. mantenha ponto e vírgula de forma consistente.

Depois, declare uma constante `observacaoDeEstilo` do tipo `string` e explique por que omitir um ponto e vírgula em uma das declarações normalmente seria uma questão de estilo neste exemplo, não necessariamente um erro de compilação. Não exiba essa observação.

**Saída esperada:**

```text
=== CARTÃO DE EMBARQUE ===
Passageiro: Gabriel Alonso
Voo: TS-101
Portão inicial: 7
Setor do terminal: B
Portão atualizado: 9
Embarque liberado: true
```

**Dica:** Defina primeiro quais dados permanecem fixos e qual será reatribuído. Só depois escolha entre `const` e `let`.

---

## Checklist de Entrega

- [ ] Criei todos os arquivos de `ex01.ts` até `ex10.ts`.
- [ ] Resolvi os exercícios na ordem.
- [ ] Compilei todos os arquivos sem erros.
- [ ] Executei todos os arquivos e comparei cada saída com o modelo.
- [ ] Conferi espaços, acentos, letras maiúsculas e pontuação.
- [ ] Usei nomes descritivos em `camelCase`.
- [ ] Usei `const` por padrão e `let` somente quando houve reatribuição.
- [ ] Não usei `var`, funções, condicionais, arrays ou objetos.
- [ ] Mantive ponto e vírgula de forma consistente.
- [ ] Diferenciei erros de compilação de problemas de estilo nas análises.
- [ ] Confirmei que o código salvo é exatamente a versão que testei.
- [ ] Não incluí soluções de outros exercícios nos arquivos.
