# Gabarito - Prova Capítulo 00: Preparação do Ambiente

**DOCUMENTO CONFIDENCIAL - APENAS PARA CORREÇÃO**

---

## Parte 1: Questões Teóricas (4 pontos)

### Questão 1 - Múltipla Escolha (1 ponto)

**Resposta Correta:** B

**Justificativa:** O TypeScript é de fato um superset (superconjunto) do JavaScript, ou seja, todo código JavaScript válido também é TypeScript válido. A principal característica é a adição de tipagem estática, e o código precisa ser compilado (transpilado) para JavaScript antes de ser executado.

**Critério:** 1 ponto para resposta correta, 0 pontos para resposta incorreta.

---

### Questão 2 - Múltipla Escolha (1 ponto)

**Resposta Correta:** B

**Justificativa:** A sequência correta é:
1. `tsc app.ts` - compila o TypeScript gerando o arquivo `app.js`
2. `node app.js` - executa o JavaScript gerado pelo Node.js

**Critério:** 1 ponto para resposta correta, 0 pontos para resposta incorreta.

---

### Questão 3 - Verdadeiro ou Falso (1 ponto)

**Respostas Corretas:**

| Afirmação | Resposta | Justificativa |
|-----------|----------|---------------|
| O comando `tsc --watch` recompila automaticamente... | **(V)** | O watch mode monitora alterações e recompila automaticamente |
| O Node.js é necessário para executar arquivos JavaScript... | **(V)** | O Node.js é o runtime que executa JS fora do navegador |
| Arquivos TypeScript têm a extensão `.js`... | **(F)** | É o contrário: TS usa `.ts` e JS usa `.js` |
| O TypeScript detecta erros de tipo durante a compilação... | **(V)** | Essa é a principal vantagem da tipagem estática |

**Critério:** 0,25 pontos por item correto. Total: 1 ponto.

---

### Questão 4 - Resposta Curta (1 ponto)

**Resposta Esperada (elementos-chave):**

O aluno deve mencionar pelo menos dois dos seguintes pontos:
- TypeScript adiciona **tipagem estática** ao JavaScript
- Erros são detectados **durante a compilação** (antes da execução)
- Maior **segurança** e **confiabilidade** no código
- Melhor **autocompletar** e **suporte da IDE** (VS Code)
- Facilita a **manutenção** de código, especialmente em projetos maiores
- Código mais **legível** e **documentado** (tipos funcionam como documentação)

**Exemplo de resposta completa:**
"A principal vantagem do TypeScript é a tipagem estática, que permite detectar erros de tipo durante a compilação, antes do código ser executado. Isso torna o código mais seguro e ajuda a evitar bugs que só apareceriam em tempo de execução."

**Critério de Avaliação:**
- 1 ponto: Resposta clara mencionando tipagem estática E detecção de erros em tempo de compilação
- 0,5 pontos: Resposta parcial ou confusa, mas demonstrando entendimento básico
- 0 pontos: Resposta incorreta ou em branco

---

## Parte 2: Questões Práticas (6 pontos)

### Questão 5 - Análise de Código (1,5 pontos)

**a) Este código irá compilar com sucesso? (0,5 ponto)**

**Resposta:** NÃO, o código não compilará.

**Justificativa:** Há um erro de tipo na linha 2 onde uma string ("25") está sendo atribuída a uma variável declarada como number.

**Critério:** 0,5 pontos para resposta correta com justificativa; 0,25 pontos para resposta correta sem justificativa.

---

**b) Identificação do erro (0,5 ponto)**

**Resposta:**
- **Linha problemática:** Linha 2: `let idade: number = "25";`
- **Explicação:** A variável `idade` foi declarada com tipo `number`, mas recebeu uma string `"25"` (com aspas). Em TypeScript, isso gera um erro de tipo porque string e number são tipos incompatíveis.

**Critério:** 0,5 pontos para identificação correta da linha E explicação adequada; 0,25 pontos para identificação correta sem explicação.

---

**c) Correção necessária (0,5 ponto)**

**Resposta Correta:**
```typescript
let idade: number = 25;
```

**Alternativa também aceita:**
```typescript
let idade: string = "25";
```
(Neste caso, a correção está no tipo, não no valor)

**Critério:** 0,5 pontos para correção válida; 0 pontos para correção incorreta ou ausente.

---

### Questão 6 - Implementação (2 pontos)

**Resposta Esperada:**

```typescript
let produto: string = "Caderno";
let preco: number = 15.90;
let quantidade: number = 3;
let total: number = preco * quantidade;

console.log("O total de " + quantidade + " " + produto + "(s) é R$ " + total);
```

**Alternativas Aceitas:**

```typescript
// Com template literals (se o aluno conhecer)
console.log(`O total de ${quantidade} ${produto}(s) é R$ ${total}`);

// Com toFixed para formatação
console.log("O total de " + quantidade + " " + produto + "(s) é R$ " + total.toFixed(2));
```

**Critério de Avaliação:**

| Item | Pontos |
|------|--------|
| Declaração correta de `produto` (string) | 0,25 |
| Declaração correta de `preco` (number) | 0,25 |
| Declaração correta de `quantidade` (number) | 0,25 |
| Cálculo correto do `total` com tipo | 0,5 |
| console.log com mensagem correta | 0,5 |
| Código compila sem erros | 0,25 |
| **Total** | **2,0** |

**Observações:**
- Aceitar pequenas variações na mensagem do console.log
- O importante é que os tipos estejam corretos e o cálculo funcione
- Descontar 0,25 se usar inferência de tipos em vez de tipagem explícita (como pedido)

---

### Questão 7 - Desafio (2,5 pontos)

**a) Os 3 erros (1,5 pontos - 0,5 por erro)**

**Erro 1:**
- **Linha:** `let populacao: string = 12000000;`
- **Problema:** O tipo declarado é `string`, mas o valor atribuído é um número (12000000 sem aspas).
- **Explicação:** Inconsistência de tipos - o valor deveria ser uma string entre aspas OU o tipo deveria ser `number`.

**Erro 2:**
- **Linha:** `let capital: boolean = "true";`
- **Problema:** O tipo declarado é `boolean`, mas o valor atribuído é a string `"true"` (com aspas).
- **Explicação:** Em TypeScript, `"true"` (string) é diferente de `true` (boolean). Valores booleanos não usam aspas.

**Erro 3:**
- **Linha:** `let cidade: string = "São Paulo"`
- **Problema:** Falta o ponto e vírgula no final da linha.
- **Explicação:** Embora JavaScript/TypeScript permita omitir ponto e vírgula em muitos casos, é uma boa prática incluí-lo e pode causar problemas em determinadas situações.

**Nota:** Se o aluno identificar apenas os erros de tipo (erros 1 e 2) e não mencionar o ponto e vírgula, aceitar como resposta parcial (1,0 ponto para os dois erros de tipo).

**Critério:** 0,5 pontos por erro corretamente identificado E explicado.

---

**b) Código corrigido (1 ponto)**

**Resposta Correta:**

```typescript
let cidade: string = "São Paulo";
let populacao: number = 12000000;
let capital: boolean = true;

console.log(cidade + " tem " + populacao + " habitantes");
console.log("É capital: " + capital);
```

**Critério de Avaliação:**

| Item | Pontos |
|------|--------|
| Ponto e vírgula na linha 1 | 0,25 |
| Tipo `number` para populacao OU valor como string | 0,25 |
| Valor `true` sem aspas para capital | 0,25 |
| Código compila corretamente | 0,25 |
| **Total** | **1,0** |

---

## Resumo da Pontuação

| Questão | Pontuação Máxima |
|---------|------------------|
| Q1 - Múltipla Escolha | 1,0 |
| Q2 - Múltipla Escolha | 1,0 |
| Q3 - V ou F | 1,0 |
| Q4 - Resposta Curta | 1,0 |
| **Subtotal Teoria** | **4,0** |
| Q5 - Análise de Código | 1,5 |
| Q6 - Implementação | 2,0 |
| Q7 - Desafio | 2,5 |
| **Subtotal Prática** | **6,0** |
| **TOTAL GERAL** | **10,0** |

---

## Critérios Gerais de Correção

1. **Erros de digitação:** Não descontar pontos por pequenos erros de digitação que não afetem a lógica
2. **Nomes de variáveis:** Aceitar variações razoáveis nos nomes (ex: `prod` em vez de `produto`)
3. **Ponto e vírgula:** Ser flexível, mas valorizar quando usado corretamente
4. **Formatação:** Não descontar por indentação diferente
5. **Respostas parciais:** Sempre buscar dar crédito parcial quando houver entendimento demonstrado

---

## Nota para Aprovação

- **Mínimo para aprovação:** 6,0 pontos (60%)
- **Recomendação:** Se o aluno atingir entre 5,0 e 5,9, considerar uma reavaliação focada nos pontos fracos identificados.
