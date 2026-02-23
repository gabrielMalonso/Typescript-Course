# Prova - Capítulo 00: Preparação do Ambiente

**Aluno:** Gabriel Alonso
**Data:** ___/___/______
**Duração:** 45-60 minutos
**Pontuação Total:** 10 pontos
**Nota para Aprovação:** 6 pontos (60%)

---

## Parte 1: Questões Teóricas (4 pontos)

### Questão 1 - Múltipla Escolha (1 ponto)

**O TypeScript é uma linguagem que:**

a) Substitui completamente o JavaScript e roda diretamente no navegador
b) É um superset do JavaScript que adiciona tipagem estática e precisa ser compilado para JS
c) É uma versão mais antiga do JavaScript usada em sistemas legados
d) Funciona apenas no servidor e não pode ser usado em aplicações web

**Resposta:** [b]

---

### Questão 2 - Múltipla Escolha (1 ponto)

**Qual é a sequência correta de comandos para criar, compilar e executar um arquivo TypeScript chamado `app.ts`?**

a) `node app.ts` → `tsc app.js`
b) `tsc app.ts` → `node app.js`
c) `node app.js` → `tsc app.ts`
d) `tsc app.js` → `node app.ts`

**Resposta:** [b]

---

### Questão 3 - Verdadeiro ou Falso (1 ponto)

**Marque (V) para verdadeiro ou (F) para falso em cada afirmação:**

(V) O comando `tsc --watch` recompila automaticamente o arquivo TypeScript sempre que ele é salvo.

(V) O Node.js é necessário para executar arquivos JavaScript gerados pelo compilador TypeScript.

(F) Arquivos TypeScript têm a extensão `.js` e arquivos JavaScript têm a extensão `.ts`.

(V) O TypeScript detecta erros de tipo durante a compilação, antes do código ser executado.

---

### Questão 4 - Resposta Curta (1 ponto)

**Explique em 2-3 frases: qual é a principal vantagem de usar TypeScript em vez de JavaScript puro?**

_______________________________________________________________________________

_______________________________________________________________________________

_______________________________________________________________________________

---

## Parte 2: Questões Práticas (6 pontos)

### Questão 5 - Análise de Código (1,5 pontos)

**Analise o código abaixo e responda:**

```typescript
let nome: string = "Gabriel";
let idade: number = "25";
let ativo: boolean = true;

console.log(nome + " tem " + idade + " anos");
```

**a) Este código irá compilar com sucesso? Justifique sua resposta. (0,5 ponto)**
Não irá compilar. A idade foi declarada como number, mas foi atribuída a ela um valor do tipo string. 


**b) Se houver erro, identifique a linha problemática e explique o que está errado. (0,5 ponto)**
A linha problemática é a linha 2. O erro é que a variável idade foi declarada como number, mas foi atribuída a ela um valor do tipo string.

**c) Escreva a correção necessária para que o código funcione corretamente. (0,5 ponto)**

``` typescript
let nome: string = "Gabriel";
let idade: number = "25";
let ativo: boolean = true;

console.log(nome + " tem " + idade + " anos");
```

---

### Questão 6 - Implementação (2 pontos)

**Crie um programa TypeScript completo que:**

1. Declare uma variável `produto` do tipo `string` com o valor `"Caderno"`
2. Declare uma variável `preco` do tipo `number` com o valor `15.90`
3. Declare uma variável `quantidade` do tipo `number` com o valor `3`
4. Calcule o total (preço × quantidade) e armazene em uma variável `total` tipada
5. Exiba no console a mensagem: `"O total de 3 Caderno(s) é R$ 47.70"`

**Escreva o código completo abaixo:**

```typescript
let produto : string = "Caderno";
let preco : number = 15.90;
let quantidade : number = 3;
let total : number = preco * quantidade;

console.log("O total de " + quantidade + " " + produto + "(s) é R$ " + total);
```

---

### Questão 7 - Desafio (2,5 pontos)

**Você recebeu o seguinte código com TRÊS erros. Identifique todos os erros, explique cada um deles e reescreva o código corrigido.**

```typescript
let cidade: string = "São Paulo"
let populacao: string = 12000000;
let capital: boolean = "true";

console.log(cidade + " tem " + populacao + " habitantes");
console.log("É capital: " + capital);
```

**a) Liste os 3 erros encontrados e explique por que cada um está incorreto: (1,5 pontos)**

Erro 1: ________________________________________________________________________

Explicação: ____________________________________________________________________

Erro 2: ________________________________________________________________________

Explicação: ____________________________________________________________________

Erro 3: ________________________________________________________________________

Explicação: ____________________________________________________________________

**b) Reescreva o código completo e corrigido: (1 ponto)**

```typescript
// Código corrigido:





```

---

## Instruções de Entrega

1. **Formato:** Salve suas respostas em um arquivo chamado `respostas-prova-cap00.md`
2. **Código:** Para as questões práticas, certifique-se de que seu código compila sem erros
3. **Teste:** Antes de entregar, compile e execute seus códigos para verificar se funcionam
4. **Prazo:** Conforme definido pelo instrutor

---

**Boa prova!** 🎯

*Lembre-se: O objetivo desta avaliação é verificar seu entendimento sobre a preparação do ambiente TypeScript. Leia cada questão com atenção e responda com calma.*
