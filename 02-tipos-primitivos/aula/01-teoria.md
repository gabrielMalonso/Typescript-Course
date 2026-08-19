# Capítulo 02 — Tipos Primitivos: Teoria

## Objetivos de Aprendizagem

Ao final desta aula, você será capaz de:

- representar números, textos e estados lógicos com `number`, `string` e `boolean`;
- reconhecer inteiros, decimais e notação científica;
- usar operações matemáticas básicas sem misturar tipos;
- diferenciar concatenação de template literals;
- explicar a diferença entre `null` e `undefined`;
- reconhecer `bigint` e `symbol` como tipos primitivos especiais.

## Pré-requisitos

- Criar, compilar e executar um arquivo `.ts`.
- Declarar valores com `const` e `let`.
- Entender inferência e anotação explícita.
- Saber que o TypeScript valida atribuições posteriores conforme o tipo já definido.

## Introdução

Em engenharia, uma grandeza não é descrita apenas por seu nome. Também precisamos saber que espécie de dado ela representa: uma temperatura é numérica, a identificação de um equipamento é textual e o estado de uma válvula pode ser verdadeiro ou falso.

Em TypeScript, os **tipos primitivos** representam os valores mais básicos da linguagem. Eles são os blocos fundamentais usados para formar estruturas maiores nos capítulos futuros.

```typescript
const temperaturaDoFluido: number = 72.5;
const codigoDoSensor: string = "ST-04";
const sensorAtivo: boolean = true;
```

O tipo funciona como uma especificação técnica: informa quais valores são compatíveis com aquele nome. Quando o TypeScript valida uma atribuição, isso não significa que ele aceita qualquer valor. Significa que ele analisa o valor e:

- aceita quando o tipo é compatível;
- rejeita durante a compilação quando o tipo é incompatível.

## O tipo `number`

### O que é?

`number` representa números usados em cálculos. Em TypeScript, inteiros e decimais pertencem ao mesmo tipo.

```typescript
const quantidadeDePecas: number = 40;
const temperaturaAmbiente: number = 23.7;
const velocidadeDaLuz: number = 3e8;
```

- `40` é um inteiro;
- `23.7` é um decimal;
- `3e8` usa notação científica e representa `3 × 10⁸`, ou `300000000`.

Também podemos usar expoente negativo:

```typescript
const espessuraEmMetros = 2.5e-3;
```

O valor `2.5e-3` representa `2,5 × 10⁻³`, ou `0.0025`. No código, o separador decimal é sempre o ponto.

### Por que existe?

O tipo `number` permite representar medidas, quantidades, índices, preços e resultados matemáticos. O TypeScript verifica se os valores atribuídos continuam sendo numéricos.

```typescript
let pressaoAtual = 8.2;
pressaoAtual = 8.6;
```

Uma atribuição como `pressaoAtual = "alta"` seria rejeitada. A validação continua acontecendo depois da declaração.

### Como funciona por baixo dos panos?

Em JavaScript, e portanto no código gerado pelo TypeScript, a maioria dos números usa um único formato de ponto flutuante de 64 bits. Isso permite armazenar inteiros e decimais no mesmo tipo.

Essa representação possui limites de precisão. Por exemplo, alguns decimais não podem ser representados de forma binária exata:

```typescript
const resultado = 0.1 + 0.2;
console.log(resultado);
```

A saída é próxima de `0.3`, mas pode aparecer como `0.30000000000000004`. Isso não é um erro do TypeScript; é uma característica comum da representação de ponto flutuante.

### Operações matemáticas básicas

Podemos usar números em operações introdutórias:

```typescript
const comprimento = 12;
const largura = 5;

const soma = comprimento + largura;
const diferenca = comprimento - largura;
const area = comprimento * largura;
const metade = comprimento / 2;
```

Neste capítulo, o objetivo é observar que entradas e resultados são `number`. Precedência, operadores de atribuição e outros detalhes serão estudados no Capítulo 03.

## O tipo `string`

### O que é?

`string` representa texto. O valor deve ficar entre aspas simples, aspas duplas ou crases.

```typescript
const material: string = "Aço carbono";
const setor = 'Laboratório';
const mensagem = `Ensaio iniciado`;
```

As três declarações armazenam strings.

### Por que existe?

Programas precisam representar nomes, códigos, mensagens, descrições e qualquer outro conteúdo textual. Mesmo quando um texto contém algarismos, ele continua sendo texto:

```typescript
const quantidade = 25;
const codigoDaPeca = "25";
```

`quantidade` é `number`; `codigoDaPeca` é `string`. O significado no problema ajuda a escolher o tipo correto.

### Como funciona por baixo dos panos?

Uma string é uma sequência ordenada de caracteres. O TypeScript acompanha esse tipo e rejeita uma atribuição numérica posterior:

```typescript
let nomeDoEquipamento = "Prensa";
nomeDoEquipamento = "Torno";
```

Trocar o valor por outra string é permitido. Tentar atribuir `42` seria rejeitado pelo compilador.

### Concatenação

Concatenação é a união de strings com `+`:

```typescript
const fabricante = "Atlas";
const modelo = "X10";
const identificacao = fabricante + " - " + modelo;
```

O resultado é `Atlas - X10`.

Quando uma string participa da expressão, `+` pode converter um número em texto:

```typescript
const temperatura = 72;
const leitura = "Temperatura: " + temperatura + " °C";
```

Aqui, `leitura` é uma `string`, não um `number`.

### Template literals

Template literals usam crases e inserem valores com `${...}`:

```typescript
const temperatura = 72;
const leitura = `Temperatura: ${temperatura} °C`;
```

Essa forma costuma ser mais legível do que várias concatenações. Tudo que está entre as crases, incluindo os espaços, faz parte da saída.

Template literals também podem ocupar mais de uma linha:

```typescript
const equipamento = "Compressor";
const ficha = `Equipamento: ${equipamento}
Estado: em operação`;
```

## O tipo `boolean`

### O que é?

`boolean` representa apenas dois valores: `true` e `false`.

```typescript
const equipamentoLigado: boolean = true;
const manutencaoPendente = false;
```

As palavras `true` e `false` são escritas sem aspas. `"true"` seria uma string.

### Por que existe?

Muitos estados possuem duas possibilidades: ligado ou desligado, válido ou inválido, disponível ou indisponível. Um boolean representa isso diretamente, sem depender de textos sujeitos a variações.

```typescript
const inspecaoConcluida = true;
```

Esse valor expressa melhor a ideia do que strings como `"sim"`, `"Sim"` ou `"concluída"` quando precisamos apenas de um estado lógico.

### Como funciona por baixo dos panos?

O TypeScript registra que o nome aceita um valor booleano. Uma atribuição posterior de `"false"` seria rejeitada porque texto e booleano são tipos diferentes, mesmo que as palavras pareçam semelhantes.

```typescript
let sistemaAtivo = true;
sistemaAtivo = false;
```

## `null` e `undefined`

### O que são?

Os dois representam ausência de um valor, mas comunicam situações diferentes.

```typescript
const observacaoDoInspetor: null = null;
const codigoDeFalha: undefined = undefined;
```

`null` costuma indicar uma ausência **intencional**: o programa registrou deliberadamente que não há valor.

`undefined` costuma indicar que um valor **ainda não foi definido** ou não está disponível.

### Por que existem?

Em um formulário de inspeção:

- `observacaoDoInspetor = null` pode significar “o inspetor confirmou que não há observação”;
- `observacaoDoInspetor` como `undefined` pode significar “esse campo ainda não foi preenchido”.

| Valor | Ideia principal | Exemplo de significado |
|-------|-----------------|------------------------|
| `null` | ausência intencional | campo verificado e deixado vazio |
| `undefined` | valor não definido | campo ainda não preenchido |

### Como funcionam por baixo dos panos?

`null` é um valor escrito explicitamente pelo programador. `undefined` é um valor da linguagem que também pode aparecer quando algo não recebeu valor.

Em projetos TypeScript modernos, normalmente usamos a opção `strictNullChecks`. Com ela, `null` e `undefined` não são aceitos automaticamente onde se espera `string`, `number` ou `boolean`. Quando um dado puder ter mais de um tipo, aprenderemos a declarar essa possibilidade com **union types** em um capítulo posterior.

Por enquanto, guarde a regra: ausência também precisa ser representada de forma consciente e compatível com o tipo declarado.

## Menção a `bigint` e `symbol`

### `bigint`

`bigint` representa números inteiros maiores do que o intervalo inteiro seguro de `number`. Um literal termina com `n`:

```typescript
const contadorMuitoGrande: bigint = 9007199254740993n;
```

Ele não representa decimais e não pode ser misturado diretamente com `number` em operações. Seu uso exige uma configuração de compilação compatível com ES2020 ou posterior.

### `symbol`

`symbol` cria identificadores únicos, mesmo quando recebem a mesma descrição:

```typescript
const identificadorA: symbol = Symbol("sensor");
const identificadorB: symbol = Symbol("sensor");
```

Esses dois símbolos são diferentes. Esse recurso aparece principalmente em usos avançados com objetos e bibliotecas. Neste momento, basta reconhecer seu nome e sua finalidade geral.

## Resumo

- `number` representa inteiros, decimais e notação científica.
- Operações matemáticas com números produzem valores numéricos.
- `string` representa textos entre aspas ou crases.
- Concatenação usa `+`; template literals usam crases e `${...}`.
- `boolean` aceita somente `true` ou `false`, sem aspas.
- `null` costuma indicar ausência intencional; `undefined`, valor ainda não definido.
- Validar um tipo significa analisar e rejeitar valores incompatíveis, não aceitá-los.
- `bigint` e `symbol` são tipos primitivos especiais para necessidades específicas.

## Próximo Passo

Agora você verá a sintaxe de cada tipo, as formas de combinar textos e os erros mais comuns ao declarar valores primitivos.
