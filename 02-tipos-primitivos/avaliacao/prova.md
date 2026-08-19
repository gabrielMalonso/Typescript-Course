# Prova — Capítulo 02: Tipos Primitivos

## Informações

- **Duração sugerida:** 45–60 minutos
- **Consulta:** Não permitida, exceto à documentação oficial do TypeScript
- **Pontuação:** 10 pontos no total
- **Aprovação:** Mínimo 7 pontos

## Orientações

- Use somente declarações, atribuição simples, `number`, `string`, `boolean`, `null`, `undefined`, operações matemáticas básicas, concatenação, template literals e `console.log`.
- Não use funções, condicionais, arrays, objetos ou union types.
- Use nomes descritivos em `camelCase`.
- Mantenha ponto e vírgula no final das instruções.
- Nas questões práticas, compile e execute exatamente o código que será entregue.
- Compare a saída caractere por caractere, incluindo espaços, acentos e pontuação.

---

## Parte 1: Questões Teóricas (4 pontos)

### Questão 1 — Números e notação científica (1 ponto)

Considere:

```typescript
const quantidadeDeCiclos = 6.4e2;
const metadeDosCiclos = quantidadeDeCiclos / 2;
```

Qual alternativa apresenta corretamente o tipo das duas constantes e o valor de `metadeDosCiclos`?

a) As duas são `number`, e `metadeDosCiclos` vale `320`.

b) `quantidadeDeCiclos` é `string`, e `metadeDosCiclos` vale `320`.

c) As duas são `number`, e `metadeDosCiclos` vale `3.2`.

d) `quantidadeDeCiclos` é `bigint`, e `metadeDosCiclos` vale `320n`.

Justifique sua escolha em uma frase.
Resposta: C. Ambas são tipadas, implicitamente, como number, por se tratar de números, sem aspas.

### Questão 2 — `null` e `undefined` (1 ponto)

Um técnico verificou um ensaio e registrou intencionalmente que não há restrição. O laboratório ainda não informou o número do certificado.

Qual representação comunica melhor essas duas situações, nessa ordem?

a) Restrição com `undefined` e número do certificado com `null`.

b) Restrição com `null` e número do certificado com `undefined`.

c) Restrição com a string `"null"` e número do certificado com a string `"undefined"`.

d) Restrição com `false` e número do certificado com `0`.

Justifique sua escolha em uma frase.
Resposta: B. Já que o técnico registrou intencionalmente que não há restrição para o ensaio, utiliza-se o null. Quando simplesmente uma informação não é dada, mantém-se undefined.

### Questão 3 — Verdadeiro ou falso (1 ponto)

Marque **V** ou **F**. Justifique todas as afirmações falsas.

1. (V) Um inteiro e um número decimal podem pertencer ao tipo `number`.
2. (F) O valor `"false"`, escrito entre aspas, pertence ao tipo `boolean`. JUSTIFICATIVA: Um valor atribuído utilizando aspas é considerado string.
3. (F) A expressão `"10" + 5` produz o número `15`. JUSTIFICATIVA: Conforme informado na alternativa anterior, um valor atribuído usando aspas é considerado string. Dito isso, o 10 não corresponde ao numeral 10, mas sim a uma string “10”. Ao usar o 10 entre aspas mais 5, estamos apenas concatenando e o resultado será outra string com valor `"105"`.
4. (V) Dois valores criados separadamente com `Symbol("sensor")` são identificadores diferentes, mesmo com a mesma descrição.

### Questão 4 — Inferência e validação (1 ponto)

Explique, em 2–3 frases, o que acontece quando o TypeScript infere `number` na declaração abaixo e depois analisa cada uma das atribuições apresentadas separadamente:

```typescript
let temperatura = 22.5; 
temperatura = 24;
temperatura = "alta";
```

Deixe claro que **validar o tipo** significa analisar a compatibilidade: uma atribuição compatível é aceita e uma incompatível é rejeitada.

RESPOSTA: Quando o TypeScript infere um number, em cada uma das atribuições posteriores, ele faz a validação dessas atribuições, conferindo a compatibilidade dos tipos. Ou seja, ao atribuir um outro number, o TypeScript aceita, mas ao atribuir uma string, o TypeScript rejeita, dando um erro na compilação. A validação do que o TypeScript faz significa fazer uma análise de compatibilidade de todas as atribuições posteriormente feitas a uma variável.
No exemplo dado acima, a atribuição feita já na declaração é aceita e a segunda atribuição feita com valor 24 também é aceita. Já a última atribuição tenta atribuir uma string à variável que já foi inferida como number. Isso causaria um erro na compilação.

---

## Parte 2: Questões Práticas (6 pontos)

### Questão 5 — Análise e correção de código (1,5 pontos)

O programa deveria registrar o volume total de quatro recipientes de `2.5` litros e informar que o sistema não está em alerta.

```typescript
const volumePorRecipiente: number = "2.5";
const quantidadeDeRecipientes = 4;
const volumeTotal = volumePorRecipiente * quantidadeDeRecipientes;
const sistemaEmAlerta: boolean = "false";

console.log("Volume total: ${volumeTotal} L");
console.log(`Sistema em alerta: ${sistemaEmAlerta}`);
```

Responda:

a) O código compila como está? Justifique.
RESPOSTA: não compila: Na declaração e atribuição de volumePorRecipiente, declara-se a constante como `number`, mas atribui-se uma string, caracterizada pelas aspas. O mesmo acontece com sistemaEmAlerta, que é declarado como `boolean`, mas declara-se, para essa constante, uma string, também caracterizado pelas aspas.

b) Identifique todos os problemas de tipo e de formação da saída.
- Linha 1: tipo declarado como number, mas uma string atribuida à constante.
- Linha 3: Uma vez que a linha 1 se encontra com o erro, devido à string atribuída a uma constante declarada como number, a linha 3 não faz sentido, pois um cálculo de multiplicação nessa linha não seria lógico.
- Linha 4: tipo declarado como boolean, mas atribuiu-se uma string, de forma incorreta.
- Linha 6: Misturou-se o template literals com as aspas. O resultado é que, no console, iria ser exposto o `${volumeTotal}` ao invés do valor desejado pela constante `volumeTotal`.

c) Entregue o código completo corrigido para que compile e produza exatamente:

```text
Volume total: 10 L
Sistema em alerta: false
```
RESPOSTA:

```typescript
const volumePorRecipiente: number = 2.5;
const quantidadeDeRecipientes = 4;
const volumeTotal = volumePorRecipiente * quantidadeDeRecipientes;
const sistemaEmAlerta: boolean = false;

console.log(`Volume total: ${volumeTotal} L`);
console.log(`Sistema em alerta: ${sistemaEmAlerta}`);
// (O exercício também foi feito em um arquivo em paralelo e corretamente compilado @questao05.ts)
```


### Questão 6 — Registro de ensaio acústico (2 pontos)

Crie um programa com estes dados:

- duração do ensaio: `2.4e2` segundos;
- nível inicial: `68.5` decibéis;
- nível final: `73.5` decibéis;
- nome do ensaio: `Ruído de bancada`;
- ensaio aprovado: `false`.

**Requisitos:**

- Declare `duracaoEmSegundos` com anotação explícita `: number` e preserve o valor em notação científica no código.
- Declare `nivelInicial` e `nivelFinal` com anotação explícita `: number`.
- Calcule `aumentoDoNivel` por subtração; não escreva diretamente `5` como seu valor.
- Use inferência em `nomeDoEnsaio` e `ensaioAprovado`; `false` deve ficar sem aspas.
- Crie `identificacaoDoEnsaio` por concatenação com `+` e use essa constante na primeira linha.
- Use template literals nas outras três linhas.
- Produza exatamente:

```text
Ensaio: Ruído de bancada
Duração: 240 s
Aumento do nível: 5 dB
Aprovado: false
```

**Espaço para resposta:**

```typescript
const duracaoEmSegundos: number = 2.4e2; //segundos
const nivelInicial: number = 68.5; //dB
const nivelFinal: number = 73.5; //dB
const nomeDoEnsaio = "Ruído de bancada";
const ensaioAprovado = false;

const aumentoDoNivel = nivelFinal - nivelInicial;
const identificacaoDoEnsaio = "Ensaio: " + nomeDoEnsaio;

console.log(identificacaoDoEnsaio);
console.log(`Duração: ${duracaoEmSegundos} s`);
console.log(`Aumento do nível: ${aumentoDoNivel} dB`);
console.log(`Aprovado: ${ensaioAprovado}`);
// (O exercício também foi feito em um arquivo em paralelo e corretamente compilado @questao06.ts)
```


### Questão 7 — Balanço hidráulico (2,5 pontos)

Uma bancada hidráulica registrou `18.75` litros na entrada e `6.25` litros na saída. O teste foi concluído, o responsável confirmou que não há observação final e o sistema externo ainda não definiu o número do registro.

**Requisitos:**

- Declare `codigoDaBancada` com a string `H-12` e use inferência.
- Declare `volumeDeEntrada` como `18.75` e `volumeDeSaida` como `6.25`, ambos com anotação explícita `: number`.
- Calcule `saldoDeVolume` subtraindo a saída da entrada; não escreva diretamente `12.5` como seu valor.
- Calcule `volumeMovimentado` somando a entrada e a saída; não escreva diretamente `25` como seu valor.
- Declare `testeConcluido` como o booleano `true`, sem aspas.
- Declare `observacaoFinal` com anotação `: null` e valor `null`.
- Declare `numeroDoRegistro` com anotação `: undefined` e valor `undefined`.
- Exiba todas as nove linhas usando template literals.
- Produza exatamente:

```text
=== BALANÇO HIDRÁULICO ===
Bancada: H-12
Volume de entrada: 18.75 L
Volume de saída: 6.25 L
Saldo de volume: 12.5 L
Volume movimentado: 25 L
Teste concluído: true
Observação final: null
Número do registro: undefined
```

**Espaço para resposta:**

```typescript
const codigoDaBancada = "H-12";
const volumeDeEntrada: number = 18.75; // Litros
const volumeDeSaida: number = 6.25; // Litros
const saldoDeVolume = volumeDeEntrada - volumeDeSaida;
const volumeMovimentado: number = volumeDeSaida + volumeDeEntrada;
const testeConcluido: boolean = true;
const observacaoFinal: null = null;
const numeroDoRegistro: undefined = undefined;

console.log(`=== BALANÇO HIDRÁULICO ===`);
console.log(`Volume de entrada: ${volumeDeEntrada} L`);
console.log(`Volume de saída: ${volumeDeSaida} L`);
console.log(`Saldo de voluma: ${saldoDeVolume} L`);
console.log(`Volume movimentado: ${volumeMovimentado} L`);
console.log(`Teste concluído: ${testeConcluido}`);
console.log(`Observação final: ${observacaoFinal}`);
console.log(`Numero do registro: ${numeroDoRegistro}`);
// (O exercício também foi feito em um arquivo em paralelo e corretamente compilado @questao07.ts)
```

---

## Entrega

Crie o arquivo `resposta.md` com:

1. as respostas das questões teóricas;
2. o código completo das questões práticas;
3. as justificativas solicitadas;
4. uma confirmação de que o código entregue foi compilado, executado e comparado com a saída esperada.

*Boa prova!*
