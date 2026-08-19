# Erros Comuns — Capítulo 02: Tipos Primitivos

## Sobre Este Documento

Antes de corrigir um problema, classifique-o:

| Categoria | O que acontece |
|---|---|
| Erro de compilação | O TypeScript rejeita o código. |
| Saída ou resultado incorreto | O código compila, mas calcula ou exibe algo diferente do pedido. |
| Problema de estilo | O código funciona, mas fica menos claro ou não segue a convenção do curso. |

Validar uma atribuição significa verificar sua compatibilidade. Uma atribuição compatível é aceita; uma incompatível é rejeitada.

---

## 1. Erros de compilação

### Erro 1: Atribuir uma `string` a um `number`

#### Código com erro

```typescript
let temperaturaAtual = 22.5;
temperaturaAtual = "alta";
```

#### Por que está errado

O valor inicial fez o TypeScript inferir `number`. A atribuição posterior é analisada e rejeitada por ser incompatível:

```text
TS2322: Type 'string' is not assignable to type 'number'.
```

#### Código corrigido

```typescript
let temperaturaAtual = 22.5;
temperaturaAtual = 24;
```

#### Como evitar

Observe o tipo declarado ou inferido antes de reatribuir. Inferência não desativa a verificação de tipos.

### Erro 2: Colocar aspas em `boolean`, `null` ou `undefined`

#### Código com erro

```typescript
const ensaioAprovado: boolean = "false";
const observacao: null = "null";
const numeroDoLaudo: undefined = "undefined";
```

#### Por que está errado

Tudo que está entre aspas é `string`. As palavras podem parecer iguais quando exibidas, mas os tipos são diferentes. O compilador informa erros como:

```text
TS2322: Type 'string' is not assignable to type 'boolean'.
TS2322: Type '"null"' is not assignable to type 'null'.
TS2322: Type '"undefined"' is not assignable to type 'undefined'.
```

#### Código corrigido

```typescript
const ensaioAprovado: boolean = false;
const observacao: null = null;
const numeroDoLaudo: undefined = undefined;
```

#### Como evitar

Escreva `true`, `false`, `null` e `undefined` sem aspas quando quiser os valores primitivos.

### Erro 3: Esquecer as aspas de uma `string`

#### Código com erro

```typescript
const material = Aco;
```

#### Por que está errado

Sem aspas, `Aco` é interpretado como um identificador. Como esse nome não foi declarado, o TypeScript informa:

```text
TS2304: Cannot find name 'Aco'.
```

#### Código corrigido

```typescript
const material = "Aço";
```

#### Como evitar

Delimite textos com aspas simples, aspas duplas ou crases.

### Erro 4: Misturar `bigint` e `number` em um cálculo

#### Código com erro

```typescript
const contadorMuitoGrande = 100n;
const incremento = 1;
const total = contadorMuitoGrande + incremento;
```

#### Por que está errado

`bigint` e `number` são tipos numéricos diferentes e não podem ser misturados diretamente:

```text
TS2365: Operator '+' cannot be applied to types 'bigint' and 'number'.
```

Além disso, um literal `bigint` exige alvo ES2020 ou posterior. Em uma configuração anterior, pode aparecer:

```text
TS2737: BigInt literals are not available when targeting lower than ES2020.
```

#### Código corrigido para o nível atual

```typescript
const contador = 100;
const incremento = 1;
const total = contador + incremento;
```

#### Como evitar

Neste capítulo, apenas reconheça `bigint` pelo sufixo `n`. Use `number` nos cálculos propostos e não altere a configuração do curso para experimentar esse tipo.

---

## 2. Saídas ou resultados incorretos

### Erro 5: Confundir soma com concatenação

#### Código com problema

```typescript
const largura = "10";
const altura = 5;
const resultado = largura + altura;

console.log(resultado);
```

#### Saída obtida

```text
105
```

#### Por que o resultado está incorreto

O código compila. Como um dos valores é `string`, o operador `+` forma texto em vez de calcular a soma.

#### Código corrigido

```typescript
const largura = 10;
const altura = 5;
const resultado = largura + altura;

console.log(resultado);
```

#### Como evitar

Antes de usar `+`, confirme se o objetivo é calcular números ou unir textos.

### Erro 6: Usar aspas em uma interpolação

#### Código com problema

```typescript
const temperatura = 25;
console.log("Temperatura: ${temperatura} °C");
```

#### Saída obtida

```text
Temperatura: ${temperatura} °C
```

#### Por que a saída está incorreta

`${...}` só interpola valores dentro de crases. Com aspas, esses caracteres são exibidos literalmente.

#### Código corrigido

```typescript
const temperatura = 25;
console.log(`Temperatura: ${temperatura} °C`);
```

#### Como evitar

Procure pelo par completo: crases envolvendo o texto e `${...}` envolvendo o valor.

### Erro 7: Trocar `null` por `undefined` sem considerar o significado

#### Código com problema

```typescript
const observacaoConfirmada: undefined = undefined;
const protocoloAindaNaoInformado: null = null;
```

#### Por que o resultado comunica a situação errada

O código pode compilar, mas inverte a intenção adotada no capítulo:

- `null`: a ausência foi registrada intencionalmente;
- `undefined`: o valor ainda não foi definido.

#### Código corrigido

```typescript
const observacaoConfirmada: null = null;
const protocoloAindaNaoInformado: undefined = undefined;
```

#### Como evitar

Pergunte se a ausência foi confirmada ou se o dado ainda não chegou.

### Erro 8: Esperar precisão decimal exata em todo cálculo

#### Código com resultado surpreendente

```typescript
const resultado = 0.1 + 0.2;
console.log(resultado);
```

#### Saída obtida

```text
0.30000000000000004
```

#### Por que acontece

O tipo `number` usa representação binária de ponto flutuante. Alguns decimais não possuem representação binária exata. Não é um erro de tipo nem de compilação.

#### Como evitar

Por enquanto, apenas reconheça esse comportamento. Técnicas de arredondamento serão estudadas quando forem necessárias.

### Erro 9: Conferir apenas se compilou

#### Código que compila

```typescript
const pressao = 8.5;
console.log(`Pressao atual: ${pressao}bar`);
```

#### Saída obtida

```text
Pressao atual: 8.5bar
```

#### Por que ainda está incorreto

Se o pedido era `Pressão atual: 8.5 bar`, faltam o acento e o espaço antes da unidade. O compilador verifica tipos e sintaxe, não fidelidade ao enunciado.

#### Código corrigido

```typescript
const pressao = 8.5;
console.log(`Pressão atual: ${pressao} bar`);
```

#### Como evitar

Faça duas revisões: primeiro compile; depois compare a saída caractere por caractere e confira os requisitos não visíveis no terminal.

---

## 3. Problemas de estilo

### Erro 10: Usar nomes primitivos com inicial maiúscula

#### Código que pode compilar

```typescript
const material: String = "Aço";
const quantidade: Number = 12;
const aprovado: Boolean = true;
```

#### Por que é um problema

`String`, `Number` e `Boolean` se referem a tipos de objetos incorporados. Para valores primitivos, a convenção e a recomendação oficial são os nomes minúsculos.

#### Código melhorado

```typescript
const material: string = "Aço";
const quantidade: number = 12;
const aprovado: boolean = true;
```

#### Como evitar

Use sempre `string`, `number` e `boolean` em minúsculas nas anotações deste curso.

### Erro 11: Usar nomes abreviados e omitir o estilo combinado

#### Código válido, mas pouco claro

```typescript
const t = 22.5
const f = 78.5
const d = f - t
```

#### Por que é um problema

O código pode compilar, mas os nomes escondem o significado e a ausência de ponto e vírgula contraria a convenção adotada no curso.

#### Código melhorado

```typescript
const temperaturaInicial = 22.5;
const temperaturaFinal = 78.5;
const variacaoDeTemperatura = temperaturaFinal - temperaturaInicial;
```

#### Como evitar

Use nomes descritivos em `camelCase` e finalize as instruções com `;`. Classifique isso como estilo, não como erro obrigatório de compilação.

---

## Reconhecimento de `symbol`

```typescript
const identificadorA: symbol = Symbol("sensor");
const identificadorB: symbol = Symbol("sensor");
```

As descrições iguais não tornam os símbolos iguais: cada chamada cria um identificador único. Neste capítulo, basta reconhecer essa finalidade; não é necessário usar `symbol` nos exercícios.

## Checklist Anti-Erros

Antes de finalizar seu código, verifique:

- [ ] Mantive valores usados em cálculos como `number`.
- [ ] Usei ponto, e não vírgula, como separador decimal.
- [ ] Delimitei strings e usei crases quando havia `${...}`.
- [ ] Escrevi `true`, `false`, `null` e `undefined` sem aspas.
- [ ] Escolhi `null` para ausência intencional e `undefined` para valor ainda não definido.
- [ ] Não misturei `bigint` e `number` nem usei tipos especiais além do solicitado.
- [ ] Usei nomes primitivos em minúsculas.
- [ ] Mantive nomes descritivos, `camelCase` e ponto e vírgula.
- [ ] Calculei os resultados em vez de escrevê-los diretamente quando o enunciado exigia.
- [ ] Comparei a saída real com o modelo, incluindo rótulos, espaços, acentos, unidades e pontuação.
- [ ] Conferi se o arquivo salvo é exatamente o que compilei e executei.

## Mensagens de Erro do Compilador

As mensagens abaixo correspondem ao TypeScript 5.9.3. O texto pode variar conforme a versão, o trecho e a configuração.

| Mensagem | Significado | Solução |
|---|---|---|
| `TS2322: Type 'string' is not assignable to type 'number'.` | Uma string foi atribuída a um nome do tipo `number`. | Use um valor numérico. |
| `TS2322: Type 'string' is not assignable to type 'boolean'.` | Uma string como `"false"` foi usada no lugar de um booleano. | Remova as aspas. |
| `TS2322: Type '"null"' is not assignable to type 'null'.` | O texto `"null"` foi usado no lugar do valor `null`. | Use `null` sem aspas. |
| `TS2322: Type '"undefined"' is not assignable to type 'undefined'.` | O texto `"undefined"` foi usado no lugar do valor `undefined`. | Use `undefined` sem aspas. |
| `TS2304: Cannot find name 'Aco'.` | Um texto sem aspas foi interpretado como nome não declarado. | Coloque o texto entre aspas. |
| `TS2365: Operator '+' cannot be applied to types 'bigint' and 'number'.` | Uma operação tentou misturar dois tipos numéricos diferentes. | Não misture `bigint` e `number`. |
| `TS2737: BigInt literals are not available when targeting lower than ES2020.` | O alvo de compilação não oferece suporte ao literal `bigint`. | Neste capítulo, não compile o exemplo; ele é apenas para reconhecimento. |
