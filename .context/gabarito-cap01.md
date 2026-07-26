# Gabarito — Prova Capítulo 01: Variáveis e Constantes

**DOCUMENTO CONFIDENCIAL — APENAS PARA CORREÇÃO**

---

## Parte 1: Questões Teóricas (4 pontos)

### Questão 1 — Escolha entre `let` e `const` (1 ponto)

**Resposta:** b)

```typescript
const nomeDoExperimento = "Teste de Vibração";
let amostrasAnalisadas = 0;
```

O nome permanece fixo, portanto deve usar `const`. A quantidade será reatribuída, portanto deve usar `let`.

**Critérios:**

| Item | Pontos |
|------|--------|
| Marca a alternativa b | 0,50 |
| Justifica corretamente o uso de `const` | 0,25 |
| Justifica corretamente o uso de `let` | 0,25 |
| **Total** | **1,00** |

### Questão 2 — Por que evitar `var`? (1 ponto)

**Resposta:** c)

`var` possui escopo de função, mas não escopo de bloco, e permite certas redeclarações. Em código moderno, `let` e `const` tornam a intenção e o alcance dos nomes mais previsíveis.

**Critério:** 1 ponto para a alternativa correta; 0 ponto para outra alternativa.

### Questão 3 — Verdadeiro ou falso (1 ponto)

| Item | Resposta | Justificativa |
|------|----------|---------------|
| 1 | V | `const` precisa ser inicializada e não aceita reatribuição. |
| 2 | F | `_` é permitido. `temperatura_do_motor` é válido, embora o curso adote `camelCase`. |
| 3 | V | A inferência registra o tipo `number`, e atribuições incompatíveis continuam sendo rejeitadas. |
| 4 | F | `let` respeita escopo de bloco; o nome deixa de estar acessível depois de `}`. |

**Critérios:**

- 0,15 ponto por classificação correta: 0,60 ponto.
- 0,20 ponto por justificativa correta das afirmações falsas: 0,40 ponto.

### Questão 4 — Escopos (1 ponto)

**Resposta esperada:**

Em um script simples, um nome declarado fora de blocos e funções fica disponível no restante do arquivo. Um nome declarado com `let` ou `const` dentro de `{ }` possui escopo de bloco e só pode ser acessado naquela região. Uma função também cria uma região própria, e nomes declarados internamente não ficam automaticamente disponíveis fora dela.

**Critérios:**

| Item | Pontos |
|------|--------|
| Explica escopo global no contexto introdutório do script | 0,30 |
| Explica escopo de bloco e o limite das chaves | 0,35 |
| Explica conceitualmente o escopo de função | 0,35 |
| **Total** | **1,00** |

---

## Parte 2: Questões Práticas (6 pontos)

### Questão 5 — Análise e correção de código (1,5 pontos)

**a)** Não compila. A última linha tenta acessar `localDaMedicao` fora do bloco onde a constante foi declarada.

**b)** `const`, assim como `let`, respeita escopo de bloco. O nome só existe entre as chaves que delimitam aquela região.

**c) Código corrigido:**

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
```

**Saída exata:**

```text
Local: Câmara A
Lote: LT-31
Temperatura: 24 °C
```

**Critérios:**

| Item | Pontos |
|------|--------|
| Afirma que o código não compila | 0,20 |
| Identifica a última linha como o acesso inválido | 0,25 |
| Explica corretamente o escopo de bloco | 0,30 |
| Entrega uma correção que compila | 0,35 |
| Preserva exatamente as três linhas de saída pedidas | 0,30 |
| Mantém o restante do código correto e consistente | 0,10 |
| **Total** | **1,50** |

### Questão 6 — Registro de manutenção (2 pontos)

**Código esperado:**

```typescript
const codigoDaOrdem: string = "MN-204";
const nomeDaTecnica = "Aline";
const manutencaoPrioritaria: boolean = true;
let statusDaManutencao = "agendada";

console.log("Ordem:", codigoDaOrdem);
console.log("Técnica:", nomeDaTecnica);
console.log("Prioridade:", manutencaoPrioritaria);
console.log("Status inicial:", statusDaManutencao);

statusDaManutencao = "concluída";

console.log("Status final:", statusDaManutencao);
```

**Saída exata:**

```text
Ordem: MN-204
Técnica: Aline
Prioridade: true
Status inicial: agendada
Status final: concluída
```

**Critérios:**

| Item | Pontos |
|------|--------|
| Declara os três dados fixos com `const` | 0,30 |
| Declara e reatribui somente o status com `let` | 0,35 |
| Anota explicitamente o código como `string` | 0,20 |
| Anota explicitamente a prioridade como `boolean` | 0,20 |
| Usa inferência nas outras duas declarações | 0,20 |
| Usa nomes descritivos em `camelCase` | 0,15 |
| Código compila e executa | 0,25 |
| Saída corresponde exatamente às cinco linhas | 0,35 |
| **Total** | **2,00** |

Descontar 0,10 por declaração explícita adicional, até o limite do item de inferência. Não descontar por uma forma diferente de `console.log` se a saída for idêntica.

### Questão 7 — Transmissão meteorológica (2,5 pontos)

**Código esperado:**

```typescript
const nomeDaEstacao = "Serra Azul";
let numeroDaLeitura: number = 1;
let statusDaTransmissao = "preparando";

console.log("=== TRANSMISSÃO METEOROLÓGICA ===");
console.log("Estação:", nomeDaEstacao);
console.log("Leitura inicial:", numeroDaLeitura);

{
  const canalDaTransmissao: string = "Norte";

  console.log("Canal:", canalDaTransmissao);
  console.log("Estação no canal:", nomeDaEstacao);
}

numeroDaLeitura = 2;
statusDaTransmissao = "enviada";

console.log("Leitura final:", numeroDaLeitura);
console.log("Status:", statusDaTransmissao);
```

**Saída exata:**

```text
=== TRANSMISSÃO METEOROLÓGICA ===
Estação: Serra Azul
Leitura inicial: 1
Canal: Norte
Estação no canal: Serra Azul
Leitura final: 2
Status: enviada
```

**Exemplo de explicação:**

O nome da estação e o canal usam `const` porque não são reatribuídos, enquanto o número da leitura e o status usam `let` porque mudam. O canal usa escopo de bloco e não existe depois de `}`; usar `var` contrariaria essa intenção porque ele não respeita o limite do bloco.

**Critérios:**

| Item | Pontos |
|------|--------|
| Estação usa `const` com inferência | 0,20 |
| Número usa `let` com anotação `number` e é reatribuído | 0,30 |
| Status usa `let` com inferência e é reatribuído | 0,30 |
| Canal usa `const` com anotação `string` dentro do bloco | 0,25 |
| Usa a estação externa dentro do bloco | 0,15 |
| Não acessa o canal fora do bloco e não usa `var` | 0,20 |
| Código compila e executa | 0,25 |
| Produz exatamente as sete linhas solicitadas | 0,35 |
| Explica adequadamente as escolhas entre `let` e `const` | 0,25 |
| Explica escopo de bloco e o problema de `var` | 0,25 |
| **Total** | **2,50** |

---

## Resumo da Pontuação

| Questão | Pontuação Máxima |
|---------|------------------|
| Q1 — `let` e `const` | 1,0 |
| Q2 — `var` | 1,0 |
| Q3 — Inferência, nomes e bloco | 1,0 |
| Q4 — Escopos | 1,0 |
| **Subtotal Teoria** | **4,0** |
| Q5 — Análise e correção | 1,5 |
| Q6 — Registro de manutenção | 2,0 |
| Q7 — Transmissão meteorológica | 2,5 |
| **Subtotal Prática** | **6,0** |
| **Total Geral** | **10,0** |

## Critérios Gerais de Correção

1. Não descontar por pequenas diferenças nos nomes se continuarem descritivos e em `camelCase`, exceto quando o nome exato fizer parte do requisito.
2. Não tratar a ausência de ponto e vírgula como erro de compilação; se for recorrente, registrar como inconsistência com a convenção do curso.
3. Dar crédito parcial quando o conceito estiver correto, seguindo as tabelas granulares.
4. Descontar pontos de saída exata quando houver espaços duplicados, acentos ausentes, pontuação diferente ou linhas fora da ordem.
5. Avaliar o código efetivamente entregue. Um relato de que outra versão foi testada não substitui a compilação da versão presente em `resposta.md`.
6. Se forem usados recursos ainda não estudados, avaliar primeiro se os requisitos foram atendidos, mas orientar a reescrita com os recursos permitidos.

## Nota para Aprovação

- **Aprovação:** mínimo de 7,0 pontos.
- **Abaixo de 7,0:** revisão obrigatória antes de avançar.
