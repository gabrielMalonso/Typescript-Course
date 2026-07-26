# Prova — Capítulo 01: Variáveis e Constantes

## Informações

- **Duração sugerida:** 45–60 minutos
- **Consulta:** Não permitida, exceto à documentação oficial do TypeScript
- **Pontuação:** 10 pontos no total
- **Aprovação:** Mínimo 7 pontos

## Orientações

- Use somente declarações, atribuição simples, blocos, tipos básicos e `console.log`.
- Não use funções, condicionais, objetos ou arrays.
- Use nomes descritivos em `camelCase`.
- Mantenha ponto e vírgula no final das instruções.
- Nas questões práticas, compile e execute exatamente o código que será entregue.
- Compare a saída caractere por caractere, incluindo espaços, acentos e pontuação.

---

## Parte 1: Questões Teóricas (4 pontos)

### Questão 1 — Escolha entre `let` e `const` (1 ponto)

Um experimento possui um nome que não mudará durante a execução e uma quantidade de amostras que começa em `0` e depois será atualizada para `3`.

Qual opção representa melhor essa intenção?

a)

```typescript
let nomeDoExperimento = "Teste de Vibração";
const amostrasAnalisadas = 0;
```

b)

```typescript
const nomeDoExperimento = "Teste de Vibração";
let amostrasAnalisadas = 0;
```

c)

```typescript
var nomeDoExperimento = "Teste de Vibração";
var amostrasAnalisadas = 0;
```

d)

```typescript
const nomeDoExperimento = "Teste de Vibração";
const amostrasAnalisadas = 0;
```

Justifique sua escolha em uma frase.

### Questão 2 — Por que evitar `var`? (1 ponto)

Qual alternativa explica corretamente por que `var` deve ser evitado em código TypeScript moderno?

a) Porque `var` aceita apenas valores do tipo `string`.

b) Porque `var` não pode receber um valor inicial.

c) Porque `var` não respeita escopo de bloco e permite comportamentos menos previsíveis, como certas redeclarações.

d) Porque `var` só pode ser usado dentro de funções.

### Questão 3 — Verdadeiro ou falso (1 ponto)

Marque **V** ou **F**. Justifique todas as afirmações falsas.

1. ( ) Uma variável declarada como `const` deve receber um valor inicial e não pode ser reatribuída.
2. ( ) `temperatura_do_motor` é um identificador inválido em TypeScript porque contém `_`.
3. ( ) Quando o TypeScript infere `number` a partir de um valor inicial, ele ainda verifica atribuições posteriores.
4. ( ) Um nome declarado com `let` dentro de um bloco `{ }` pode ser acessado normalmente depois do fechamento desse bloco.

### Questão 4 — Escopos (1 ponto)

Explique, em 3–5 frases, a diferença entre:

- escopo global em um script simples;
- escopo de bloco;
- escopo de função.

Não escreva nenhuma função. Descreva o escopo de função apenas conceitualmente.

---

## Parte 2: Questões Práticas (6 pontos)

### Questão 5 — Análise e correção de código (1,5 pontos)

Considere:

```typescript
const codigoDoLote = "LT-31";
let temperaturaAtual = 20;

{
  const localDaMedicao = "Câmara A";
  temperaturaAtual = 24;
  console.log("Local:", localDaMedicao);
}

console.log("Lote:", codigoDoLote);
console.log("Temperatura: " + temperaturaAtual + " °C");
console.log("Local final:", localDaMedicao);
```

Responda:

a) O código compila como está? Justifique.  
b) Qual regra de escopo explica o problema?  
c) Faça a menor correção possível para que o código compile e produza exatamente:

```text
Local: Câmara A
Lote: LT-31
Temperatura: 24 °C
```

Entregue o código corrigido completo.

### Questão 6 — Registro de manutenção (2 pontos)

Crie um programa com estes dados:

- código da ordem: `MN-204`;
- nome da técnica: `Aline`;
- manutenção prioritária: `true`;
- status inicial: `agendada`;
- status final: `concluída`.

**Requisitos:**

- Use `const` nos três dados que permanecem fixos.
- Use `let` apenas no status, pois ele será reatribuído.
- Use anotação explícita em exatamente duas declarações: no código da ordem e na manutenção prioritária.
- Use inferência nas outras duas declarações.
- Produza exatamente:

```text
Ordem: MN-204
Técnica: Aline
Prioridade: true
Status inicial: agendada
Status final: concluída
```

**Espaço para resposta:**

```typescript
// Sua solução aqui
```

### Questão 7 — Transmissão meteorológica (2,5 pontos)

Crie um painel de terminal para registrar uma transmissão.

**Dados:**

- nome da estação: `Serra Azul`;
- número inicial da leitura: `1`;
- número final da leitura: `2`;
- status inicial: `preparando`;
- status final: `enviada`;
- canal usado apenas em uma etapa interna: `Norte`.

**Requisitos:**

- Declare o nome da estação com `const` e inferência.
- Declare o número da leitura com `let` e anotação explícita `number`.
- Declare o status com `let` e inferência.
- Dentro de um bloco, declare o canal com `const` e anotação explícita `string`.
- Use o nome externo da estação dentro do bloco.
- Não acesse o canal depois do fechamento do bloco.
- Atualize o número da leitura e o status sem redeclarar as variáveis.
- Não use `var`.
- Produza exatamente:

```text
=== TRANSMISSÃO METEOROLÓGICA ===
Estação: Serra Azul
Leitura inicial: 1
Canal: Norte
Estação no canal: Serra Azul
Leitura final: 2
Status: enviada
```

Depois do código, explique em 2–3 frases:

1. por que cada declaração recebeu `let` ou `const`;
2. por que o canal não pode ser acessado fora do bloco e por que `var` não seria adequado nesse caso.

**Espaço para resposta:**

```typescript
// Sua solução aqui
```

---

## Entrega

Crie o arquivo `resposta.md` com:

1. as respostas das questões teóricas;
2. o código completo das questões práticas;
3. as justificativas solicitadas;
4. uma confirmação de que o código entregue foi compilado, executado e comparado com a saída esperada.

*Boa prova!*
