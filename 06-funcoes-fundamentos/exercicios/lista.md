# Exercícios — Capítulo 06: Funções — Fundamentos

## Orientações

- Crie cada solução em `exercicios/solucoes/` com o nome indicado.
- Declare os tipos de todos os parâmetros e retornos.
- Registre em comentário a previsão das saídas antes de executar.
- Teste pelo menos o caso principal e o caso alternativo solicitado.
- Use apenas fundamentos, condicionais, loops, arrays e funções deste capítulo.
- Não use callbacks nem métodos avançados de arrays.

## Bloco 1 — Definição, chamada e retorno

### Exercício 1.1 — Definir e chamar (`ex11.ts`)

Crie uma declaração de função `criarSaudacao` que:

- receba `nome: string`;
- retorne `string`;
- produza `Olá, Gabriel!` quando receber `"Gabriel"`.

Chame a função duas vezes, com nomes diferentes, guarde os retornos e exiba-os. Em comentário, identifique o parâmetro e os dois argumentos.

### Exercício 1.2 — Conversão (`ex12.ts`)

Crie `converterMetrosParaCentimetros`, recebendo `metros: number` e retornando `number`. Exiba os resultados para `2.5` e `0`.

Saídas conceituais: `250` e `0`.

### Exercício 1.3 — Retorno booleano (`ex13.ts`)

Crie `atingiuMeta`, que recebe `realizado: number` e `meta: number`, e retorna `boolean`. A meta é atingida quando `realizado >= meta`.

Teste:

- `atingiuMeta(8, 10)` → `false`;
- `atingiuMeta(10, 10)` → `true`;
- `atingiuMeta(12, 10)` → `true`.

### Exercício 1.4 — Retorno em todos os caminhos (`ex14.ts`)

Crie `classificarPressao(pressao: number): string`:

- abaixo de `90`: `"baixa"`;
- de `90` até `120`, inclusive: `"normal"`;
- acima de `120`: `"alta"`.

Teste `80`, `90`, `120` e `135`.

## Bloco 2 — `void` e formas de definição

### Exercício 2.1 — Função `void` (`ex21.ts`)

Crie `exibirStatus`, que recebe `sistema: string` e `online: boolean`, não retorna valor útil e exibe:

```text
API: online
Banco: offline
```

Use uma condicional para escolher o texto. Chame a função para os dois exemplos.

### Exercício 2.2 — Expressão de função (`ex22.ts`)

Crie uma expressão de função guardada em `calcularAreaRetangulo`. Ela recebe largura e altura numéricas e retorna a área.

Teste `5 × 3` e `2.5 × 4`. Explique em comentário por que os parênteses em `calcularAreaRetangulo(5, 3)` são necessários.

### Exercício 2.3 — Arrow function (`ex23.ts`)

Crie uma arrow function concisa `calcularTriplo`, com parâmetro e retorno `number`. Teste `7` e `-2`.

Depois, reescreva em comentário a forma equivalente com bloco e `return`.

### Exercício 2.4 — Retorno versus exibição (`ex24.ts`)

Crie:

```typescript
function calcularDesconto(preco: number, percentual: number): number
```

e:

```typescript
function exibirPrecoFinal(precoFinal: number): void
```

Para preço `200` e percentual `15`, a primeira deve retornar `170`; a segunda deve exibir `Preço final: 170`.

Em comentário, explique por que `calcularDesconto` não deve apenas usar `console.log`.

## Bloco 3 — Funções como valores e arrays

### Exercício 3.1 — Guardar a função (`ex31.ts`)

Use:

```typescript
function elevarAoQuadrado(valor: number): number {
  return valor * valor;
}
```

1. Crie `operacao` com o tipo explícito `(valor: number) => number`.
2. Guarde `elevarAoQuadrado` em `operacao` sem executá-la.
3. Chame `operacao(6)` e exiba o resultado.
4. Exiba `operacao === elevarAoQuadrado`.
5. Explique por que `const operacao = elevarAoQuadrado()` seria diferente e inválido sem argumento.

### Exercício 3.2 — Somar array (`ex32.ts`)

Crie `somarValores(valores: number[]): number`. Use `for...of`, retorne a soma e não modifique o array.

Teste:

```typescript
[4, 6, 10] // 20
[] // 0
```

Exiba também os arrays depois das chamadas para comprovar que permaneceram iguais.

### Exercício 3.3 — Buscar maior com loop (`ex33.ts`)

Crie `obterMaior(valores: number[]): number`. Para manter o contrato simples neste capítulo:

- se o array estiver vazio, retorne `0`;
- caso contrário, comece com o elemento de índice `0` e percorra os demais;
- retorne o maior valor.

Teste `[12, 7, 31, 18]`, `[-8, -3, -12]` e `[]`. Não use `Math.max`.

### Exercício 3.4 — Pipeline manual (`ex34.ts`)

Crie três funções:

```typescript
function contarValidos(valores: number[]): number
function somarValidos(valores: number[]): number
const calcularMedia = (total: number, quantidade: number): number => ...
```

Considere válidos os valores maiores que `0`. Use:

```typescript
const medicoes: number[] = [18, 0, 24, 30, 0];
```

Chame as funções em etapas e exiba:

```text
Total: 72
Quantidade: 3
Média: 24
```

Teste também um array vazio. `calcularMedia` deve retornar `0` quando a quantidade for `0`.

## Bônus — Alternar uma regra (`bonus.ts`)

Crie duas funções compatíveis:

```typescript
const dobro = (valor: number): number => valor * 2;
const acrescimoDez = (valor: number): number => valor + 10;
```

Depois:

1. declare `let transformar: (valor: number) => number`;
2. use um booleano `usarDobro` para decidir qual função guardar;
3. chame `transformar(8)` e exiba o resultado;
4. troque o booleano e confirme o outro resultado;
5. explique por que as duas funções podem ocupar a mesma variável.

Não use uma função como parâmetro. Esse assunto pertence ao Capítulo 08.

## Checklist de entrega

- [ ] Entreguei os 12 arquivos obrigatórios.
- [ ] Tipos dos parâmetros e retornos estão explícitos.
- [ ] Diferenciei retorno de `console.log`.
- [ ] Não confundi guardar uma função com chamá-la.
- [ ] Testei limites e arrays vazios quando solicitado.
- [ ] Não usei conteúdo dos capítulos 08 ou 09.
