# Exercícios — Capítulo 02: Tipos Primitivos

## Instruções Gerais

- Resolva os exercícios na ordem apresentada.
- Crie um arquivo separado para cada exercício: `ex01.ts`, `ex02.ts`, ..., `ex10.ts`.
- Use somente os recursos estudados até aqui: declarações, atribuição simples, `number`, `string`, `boolean`, `null`, `undefined`, operações matemáticas básicas, concatenação, template literals e `console.log`.
- Não use condicionais, funções, arrays, objetos ou union types.
- Use nomes descritivos em `camelCase`.
- Termine todas as instruções com ponto e vírgula.
- Compile e execute cada arquivo. Compare a saída caractere por caractere, incluindo espaços, acentos, letras maiúsculas e pontuação.
- Antes de entregar, confira se o código salvo atende a todos os requisitos, não apenas se ele compila.
- Não consulte soluções antes de tentar.

---

## Nível 1: Aquecimento

*Exercícios básicos para reconhecer e representar os tipos primitivos.*

### Exercício 1.1: Leituras Numéricas

**Arquivo:** `ex01.ts`

**Objetivo:** Praticar `number` com inteiro, decimal e notação científica.

**Enunciado:**

Declare três constantes com anotação explícita `: number`:

- `quantidadeDeAmostras`, com o inteiro `18`;
- `temperaturaDaAmostra`, com o decimal `36.5`;
- `frequenciaEmHertz`, com a notação científica `2.5e3`.

Exiba cada valor com um template literal.

**Saída esperada:**

```text
Amostras: 18
Temperatura: 36.5 °C
Frequência: 2500 Hz
```

**Dica:** A notação `2.5e3` representa `2.5 × 1000`, mas o valor exibido será sua forma decimal.

### Exercício 1.2: Identificação por Concatenação

**Arquivo:** `ex02.ts`

**Objetivo:** Praticar `string` e concatenação com `+`.

**Enunciado:**

Declare, com inferência, as constantes abaixo:

- `fabricante`, com o texto `Atlas`;
- `modelo`, com o texto `X20`;
- `numeroDeSerie`, com o número `84`.

Crie uma quarta constante chamada `identificacaoCompleta` usando concatenação com `+`. Exiba somente essa constante.

**Requisitos:**

- [ ] Usar aspas simples ou duplas nas duas strings iniciais.
- [ ] Usar concatenação com `+`, sem template literal.
- [ ] Incluir os separadores e espaços necessários na própria concatenação.

**Saída esperada:**

```text
Equipamento: Atlas - X20 - Série 84
```

**Dica:** Quando uma string participa da expressão com `+`, o número é convertido em texto para formar a mensagem.

### Exercício 1.3: Estado e Ausências

**Arquivo:** `ex03.ts`

**Objetivo:** Diferenciar `boolean`, `null` e `undefined` de strings com nomes parecidos.

**Enunciado:**

Declare as constantes abaixo com as anotações explícitas indicadas:

- `inspecaoConcluida: boolean`, com o valor `false`;
- `motivoDaRejeicao: null`, com o valor `null`;
- `numeroDoCertificado: undefined`, com o valor `undefined`.

Exiba as três linhas usando template literals.

**Requisitos:**

- [ ] Escrever `false`, `null` e `undefined` sem aspas.
- [ ] Não substituir nenhum deles por um texto.
- [ ] Preservar exatamente os rótulos da saída.

**Saída esperada:**

```text
Inspeção concluída: false
Motivo da rejeição: null
Número do certificado: undefined
```

**Dica:** As strings `"false"`, `"null"` e `"undefined"` são textos, não os valores primitivos pedidos.

---

## Nível 2: Praticando

*Exercícios que combinam tipos, cálculos e análise de código.*

### Exercício 2.1: Validar Não Significa Aceitar

**Arquivo:** `ex04.ts`

**Objetivo:** Explicar como a inferência orienta a validação de atribuições posteriores.

**Enunciado:**

Analise separadamente os quatro trechos abaixo, sem copiá-los diretamente para o arquivo:

**Trecho A**

```typescript
let pressaoAtual = 8.2;
pressaoAtual = 8.7;
```

**Trecho B**

```typescript
let pressaoAtual = 8.2;
pressaoAtual = "alta";
```

**Trecho C**

```typescript
let setorAtual = "Montagem";
setorAtual = "Inspeção";
```

**Trecho D**

```typescript
let setorAtual = "Montagem";
setorAtual = false;
```

No `ex04.ts`, crie uma constante `string` para cada trecho. Em cada texto, registre:

1. o tipo inferido na primeira linha;
2. se a atribuição posterior é aceita ou rejeitada pelo TypeScript;
3. por que os tipos são compatíveis ou incompatíveis.

Depois, crie uma quinta constante `string` que complete com suas palavras: `Validar uma atribuição significa...`. Exiba somente a mensagem de confirmação abaixo.

**Saída esperada:**

```text
Análise de validação registrada.
```

**Dica:** O compilador verifica toda atribuição posterior. O resultado dessa verificação pode ser aceitação ou rejeição.

### Exercício 2.2: Conversão de Comprimento

**Arquivo:** `ex05.ts`

**Objetivo:** Praticar multiplicação, divisão e template literals com valores numéricos.

**Enunciado:**

Uma barra possui `3.75` metros. Declare esse valor com anotação explícita `: number`. Declare também, usando notação científica, que um metro possui `1e3` milímetros.

Calcule:

- o comprimento total em milímetros, usando multiplicação;
- a metade do comprimento em metros, usando divisão por `2`.

Não escreva diretamente os resultados `3750` ou `1.875` nas constantes calculadas.

**Saída esperada:**

```text
Comprimento: 3.75 m
Comprimento: 3750 mm
Metade do comprimento: 1.875 m
```

**Dica:** Os valores usados nas operações e seus resultados pertencem ao tipo `number`.

### Exercício 2.3: Ficha de uma Peça

**Arquivo:** `ex06.ts`

**Objetivo:** Combinar strings, números, booleano, concatenação e template literals.

**Enunciado:**

Registre os dados de uma peça:

- material: `Aço carbono`;
- código: `AC-42`;
- massa em quilogramas: `12.5`;
- peça aprovada: `true`.

Crie `identificacaoDaPeca` concatenando o material e o código no formato exigido pela primeira linha. Para as outras duas linhas, use template literals.

**Requisitos:**

- [ ] Usar inferência nas quatro declarações iniciais.
- [ ] Criar `identificacaoDaPeca` com concatenação usando `+`.
- [ ] Manter `massaEmQuilogramas` como `number`.
- [ ] Manter `pecaAprovada` como `boolean`, sem aspas.

**Saída esperada:**

```text
Peça: Aço carbono | Código: AC-42
Massa: 12.5 kg
Aprovada: true
```

**Dica:** Formar uma mensagem de texto para exibição não altera o tipo das constantes inseridas nela.

### Exercício 2.4: Compilação, Resultado ou Estilo?

**Arquivo:** `ex07.ts`

**Objetivo:** Diferenciar erro de compilação, saída incorreta e problema de estilo.

**Enunciado:**

Considere que a saída solicitada para cada trecho deveria ser `Área: 50 cm²`. Analise os trechos sem executá-los todos juntos:

**Trecho A**

```typescript
const largura: number = "10";
const altura = 5;
const area = largura * altura;
console.log(`Área: ${area} cm²`);
```

**Trecho B**

```typescript
const largura = "10";
const altura = 5;
const area = largura + altura;
console.log(`Área: ${area} cm²`);
```

**Trecho C**

```typescript
const l = 10
const a = 5
const resultado = l * a
console.log(`Área: ${resultado} cm²`)
```

No `ex07.ts`, crie três constantes do tipo `string`, uma para cada análise. Use cada classificação exatamente uma vez:

- `erro de compilação`;
- `compila, mas produz saída incorreta`;
- `produz a saída correta, mas tem problemas de estilo`.

Em cada texto, inclua a classificação e uma justificativa curta. Depois, exiba somente a mensagem abaixo.

**Saída esperada:**

```text
Diagnóstico dos três trechos registrado.
```

**Dica:** Verifique separadamente compatibilidade de tipos, resultado executado e convenções de nomes e ponto e vírgula.

---

## Nível 3: Desafios

*Exercícios que exigem leitura cuidadosa e integração dos conceitos.*

### Exercício 3.1: Reconhecimento de Tipos Especiais

**Arquivo:** `ex08.ts`

**Objetivo:** Reconhecer `bigint` e `symbol` sem usá-los em operações.

**Contexto:**

Os exemplos abaixo são apenas para análise. Não os copie para o arquivo, pois a configuração atual do curso pode não compilar o literal `bigint`.

```typescript
const contadorMuitoGrande: bigint = 9007199254740993n;
const identificadorInterno: symbol = Symbol("sensor");
```

**Enunciado:**

No `ex08.ts`, declare quatro constantes do tipo `string` contendo respostas curtas para:

1. qual tipo aparece no primeiro trecho;
2. qual detalhe visual identifica seu literal;
3. qual tipo aparece no segundo trecho;
4. qual é a finalidade geral desse segundo tipo.

Exiba somente a mensagem de confirmação abaixo.

**Requisitos:**

- [ ] Não realizar cálculos com `bigint`.
- [ ] Não criar um `symbol` no arquivo.
- [ ] Não usar recursos além dos estudados.

**Saída esperada:**

```text
Reconhecimento de bigint e symbol registrado.
```

**Dica:** Um desses tipos representa inteiros muito grandes; o outro cria identificadores únicos.

### Exercício 3.2: Relatório de Consumo Elétrico

**Arquivo:** `ex09.ts`

**Objetivo:** Integrar operações com `number`, strings, booleano, `null` e `undefined`.

**Contexto:**

Uma máquina consumiu `18.5` kWh no primeiro turno e `21.5` kWh no segundo. O relatório foi concluído, não houve observação adicional e o protocolo externo ainda não foi definido.

**Enunciado:**

Declare os dois consumos com anotação explícita `: number`. Calcule o consumo total com soma e a diferença entre o segundo e o primeiro turno com subtração.

Declare também:

- `relatorioConcluido: boolean` com `true`;
- `observacaoAdicional: null` com `null`;
- `protocoloExterno: undefined` com `undefined`.

Exiba exatamente as seis linhas abaixo usando template literals.

**Requisitos:**

- [ ] Calcular o total; não escrever diretamente `40` como seu valor.
- [ ] Calcular a diferença; não escrever diretamente `3` como seu valor.
- [ ] Usar as anotações explícitas exigidas.
- [ ] Escrever `true`, `null` e `undefined` sem aspas.
- [ ] Conferir todas as seis linhas literalmente.

**Saída esperada:**

```text
=== RELATÓRIO DE CONSUMO ===
Consumo total: 40 kWh
Diferença entre turnos: 3 kWh
Relatório concluído: true
Observação adicional: null
Protocolo externo: undefined
```

**Dica:** Compilar confirma a compatibilidade dos tipos; somente sua conferência confirma os cálculos, rótulos e caracteres da saída.

### Exercício 3.3: Painel de Calibração

**Arquivo:** `ex10.ts`

**Objetivo:** Construir uma saída completa seguindo requisitos literais de implementação e formatação.

**Contexto:**

Um laboratório precisa exibir o resumo da calibração de um sensor de pressão.

**Enunciado:**

Crie o painel usando os dados e as regras abaixo.

**Requisitos:**

- [ ] `codigoDoSensor` deve ser a string `SP-09` e usar inferência.
- [ ] `pressaoMinima` deve ser `2.5`, com anotação explícita `: number`.
- [ ] `pressaoMaxima` deve ser `8.5`, com anotação explícita `: number`.
- [ ] `faixaDeOperacao` deve ser calculada por subtração.
- [ ] `pressaoMedia` deve ser calculada somando as pressões e dividindo o resultado por `2`.
- [ ] `calibracaoValida` deve ser o booleano `true`, sem aspas.
- [ ] `observacaoTecnica` deve ter anotação `: null` e valor `null`.
- [ ] `dataDoCertificado` deve ter anotação `: undefined` e valor `undefined`.
- [ ] `tituloDoPainel` deve ser formado por concatenação com `+` e exibido na primeira linha.
- [ ] As outras sete linhas devem usar template literals.
- [ ] Nenhum resultado calculado pode ser escrito diretamente.
- [ ] A saída deve corresponder exatamente ao modelo abaixo.

**Saída esperada:**

```text
=== CALIBRAÇÃO DO SENSOR SP-09 ===
Pressão mínima: 2.5 bar
Pressão máxima: 8.5 bar
Faixa de operação: 6 bar
Pressão média: 5.5 bar
Calibração válida: true
Observação técnica: null
Data do certificado: undefined
```

**Dica:** Faça duas revisões independentes: uma dos requisitos de implementação e outra da saída executada.

---

## Exercício Bônus (Opcional)

### Duas Formas, Uma Saída

**Arquivo:** `bonus.ts`

**Objetivo:** Comparar concatenação e template literal ao produzir o mesmo texto.

**Enunciado:**

Declare `nomeDoExperimento` com o texto `Teste de tração`, `forcaEmNewtons` com o valor científico `1.25e4` e `experimentoConcluido` com o booleano `false`.

Crie duas strings completas com o mesmo conteúdo:

1. `resumoConcatenado`, usando somente concatenação com `+`;
2. `resumoComTemplate`, usando somente um template literal.

Exiba primeiro `resumoConcatenado` e depois `resumoComTemplate`.

**Requisitos:**

- [ ] As duas constantes devem possuir exatamente o mesmo texto.
- [ ] `forcaEmNewtons` deve continuar sendo `number`.
- [ ] `experimentoConcluido` deve continuar sendo `boolean`.
- [ ] A saída deve conter exatamente duas linhas idênticas.

**Saída esperada:**

```text
Experimento: Teste de tração | Força: 12500 N | Concluído: false
Experimento: Teste de tração | Força: 12500 N | Concluído: false
```

**Dica:** O método usado para formar a string muda, mas o conteúdo final não precisa mudar.

---

## Checklist de Entrega

- [ ] Criei `ex01.ts` até `ex10.ts` na pasta `exercicios/solucoes/`.
- [ ] Compilei e executei todos os arquivos práticos.
- [ ] Registrei as análises pedidas nos exercícios 2.1, 2.4 e 3.1.
- [ ] Comparei cada saída esperada caractere por caractere.
- [ ] Revisei tipos, valores, cálculos e requisitos de implementação.
- [ ] Não usei conteúdo de capítulos futuros.
- [ ] Se fiz o bônus, criei também `bonus.ts`.
