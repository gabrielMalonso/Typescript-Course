# Exercícios — Funções: Callbacks e Recursos

## Como trabalhar

Crie um arquivo para cada exercício dentro de `exercicios/solucoes/`:

```text
ex01.ts
ex02.ts
...
ex16.ts
```

Antes de considerar um exercício concluído:

1. confira o contrato completo de cada função;
2. confirme se você passou uma **referência** ou realizou uma **chamada**;
3. execute todos os testes obrigatórios, inclusive os casos alternativos;
4. compare a saída real com o comportamento pedido.

Use apenas recursos estudados até este capítulo. Para percorrer arrays, use `for`, `for...of` ou `while`. **Não use** `forEach`, `map`, `filter`, `find`, `some`, `every` ou `reduce`.

---

## Parte 1 — Parâmetros e formas de função

### Exercício 1 — Identificação opcional

Crie a função:

```typescript
function identificarVisitante(nome: string, cracha?: number): string
```

Regras:

- com crachá, retorne `Nome | crachá N`;
- sem crachá, retorne `Nome | visitante sem crachá`;
- o número `0` é um crachá existente e não deve ser tratado como ausência.

Testes obrigatórios:

```typescript
console.log(identificarVisitante("Marina", 42));
console.log(identificarVisitante("Ravi"));
console.log(identificarVisitante("Bia", 0));
```

### Exercício 2 — Valor padrão

Crie a função:

```typescript
function montarMensagem(texto: string, prioridade = "normal"): string
```

Ela deve retornar `[prioridade] texto`.

Faça duas chamadas:

- uma omitindo o segundo argumento, para comprovar o valor padrão;
- outra informando a prioridade `urgente`.

Depois responda em um comentário: qual é o tipo de `prioridade` dentro da função? Por que ele não precisa ser tratado como `undefined`?

### Exercício 3 — Rest parameter

Crie a função:

```typescript
function calcularTotalComTaxa(taxa: number, ...valores: number[]): number
```

Some todos os valores e acrescente a taxa **uma única vez**. Não altere o array `valores`.

Testes obrigatórios:

```typescript
console.log(calcularTotalComTaxa(5, 10, 20, 30)); // 65
console.log(calcularTotalComTaxa(5));             // 5
console.log(calcularTotalComTaxa(0, -2, 2));      // 0
```

Em um comentário, explique por que a chamada `calcularTotalComTaxa(5, [10, 20])` não respeitaria o contrato.

### Exercício 4 — Três formas, mesmo contrato

Escreva três funções que recebam um `number` e retornem seu quadrado:

1. uma declaração de função;
2. uma expressão com `function` anônima guardada em variável;
3. uma arrow function guardada em variável.

Nas duas variáveis, escreva explicitamente o contrato completo:

```typescript
(valor: number) => number
```

Chame as três funções com `4` e exiba os resultados. Não troque uma forma pela outra: a diferença de sintaxe faz parte do exercício.

---

## Parte 2 — Referências, chamadas e callbacks

### Exercício 5 — Referência ou resultado?

Considere:

```typescript
function gerarCodigo(): string {
  return "TS-08";
}
```

Complete o arquivo com:

- `const criar: () => string = ...`, guardando a função sem executá-la;
- `const codigo: string = ...`, guardando o resultado de uma chamada;
- uma chamada de `criar` e a exibição dos dois textos produzidos.

Depois escreva em comentários o tipo de cada expressão:

```text
gerarCodigo
gerarCodigo()
criar
criar()
```

### Exercício 6 — Callback `void`

Crie:

```typescript
function repetirMensagem(
  mensagem: string,
  vezes: number,
  exibir: (texto: string, numero: number) => void,
): void
```

A função deve chamar `exibir` uma vez por repetição, numerando de `1` até `vezes`. O callback decide como mostrar a mensagem.

Use uma função anônima inline para produzir:

```text
1/3: revisar contrato
2/3: revisar contrato
3/3: revisar contrato
```

Teste também com `vezes = 0` e comprove, usando um contador externo, que o callback não foi executado.

### Exercício 7 — Callback com retorno

Crie:

```typescript
function combinarNumeros(
  primeiro: number,
  segundo: number,
  operacao: (a: number, b: number) => number,
): number
```

A controladora deve chamar o callback e retornar o valor produzido por ele.

Faça três chamadas usando callbacks diferentes:

- soma de `8` e `3`;
- diferença de `8` e `3`;
- produto de `8` e `3`.

Pelo menos um callback deve ser uma função nomeada e pelo menos um deve ser uma arrow inline. Exiba os três resultados.

### Exercício 8 — Corrija os contratos

O código abaixo contém três erros conceituais. Copie-o sem os comentários de erro e faça as correções mínimas necessárias:

```typescript
function executarVerificacao(
  valor: number,
  verificar: (entrada: number) => boolean,
): string {
  return verificar(valor) ? "válido" : "inválido";
}

function positivo(valor: number): boolean {
  return valor > 0;
}

const regra: boolean = positivo; // erro 1
const resultado = executarVerificacao(-2, positivo()); // erro 2

const outroResultado = executarVerificacao(4, (valor): boolean => {
  valor % 2 === 0; // erro 3
});
```

Após corrigir, exiba os dois resultados. Em comentários, explique cada correção usando os termos **contrato**, **referência**, **chamada** e **retorno**.

---

## Parte 3 — Callbacks com arrays de objetos

### Exercício 9 — Contagem por critério

Use estes dados:

```typescript
const entregas: {
  codigo: string;
  distancia: number;
  concluida: boolean;
}[] = [
  { codigo: "E-10", distancia: 8, concluida: true },
  { codigo: "E-11", distancia: 22, concluida: false },
  { codigo: "E-12", distancia: 15, concluida: true },
  { codigo: "E-13", distancia: 0, concluida: false },
];
```

Crie `contarEntregas`, que recebe o array e um callback de critério. O callback recebe uma entrega e retorna `boolean`; a função retorna quantos objetos atendem ao critério.

Use a mesma controladora para contar:

- entregas concluídas;
- entregas com distância maior ou igual a `15`;
- entregas pendentes com distância igual a `0`.

Exiba os três resultados. Não some as distâncias: o retorno pedido é a quantidade de objetos aprovados.

### Exercício 10 — Produção manual de textos

Use estes dados:

```typescript
const livros: { titulo: string; paginas: number; disponivel: boolean }[] = [
  { titulo: "Horizonte", paginas: 180, disponivel: true },
  { titulo: "Órbita", paginas: 320, disponivel: false },
  { titulo: "Maré", paginas: 95, disponivel: true },
];
```

Crie:

```typescript
function criarDescricoes(
  itens: { titulo: string; paginas: number; disponivel: boolean }[],
  descrever: (livro: {
    titulo: string;
    paginas: number;
    disponivel: boolean;
  }) => string,
): string[]
```

Percorra o array manualmente, chame o callback para cada objeto e construa um novo `string[]`. Faça duas chamadas:

- uma que produza `Título — N páginas`;
- outra que produza `Título: disponível` ou `Título: emprestado`.

Exiba todas as linhas dos dois arrays. Depois mostre que `livros` continua com os mesmos três objetos.

### Exercício 11 — Seleção manual e testes alternativos

Crie uma função que receba:

- um array de jogos com `nome`, `jogadores` e `cooperativo`;
- um callback que recebe um jogo e retorna `boolean`.

Ela deve retornar um novo array contendo apenas as referências dos objetos aprovados pelo callback, usando `for...of` e `push`.

Dados mínimos:

```typescript
const jogos = [
  { nome: "Nebulosa", jogadores: 4, cooperativo: true },
  { nome: "Duelo", jogadores: 2, cooperativo: false },
  { nome: "Expedição", jogadores: 1, cooperativo: true },
  { nome: "Arena", jogadores: 6, cooperativo: false },
];
```

Testes obrigatórios:

1. selecionar jogos cooperativos;
2. selecionar jogos para pelo menos quatro jogadores;
3. usar uma regra que rejeita todos;
4. passar um array vazio;
5. comprovar que o array original continua com quatro elementos.

### Exercício 12 — Um percurso, dois callbacks

Crie uma função que percorra um array de pedidos e receba dois callbacks:

- `calcular`: recebe um pedido e retorna um `number`;
- `registrar`: recebe o código do pedido e o valor calculado, e retorna `void`.

A função controladora deve somar os valores retornados por `calcular`, chamar `registrar` para cada pedido e, no final, retornar o total.

Use estes dados:

```typescript
const pedidos = [
  { codigo: "P1", quantidade: 2, preco: 15 },
  { codigo: "P2", quantidade: 1, preco: 40 },
  { codigo: "P3", quantidade: 3, preco: 8 },
];
```

Na chamada:

- `calcular` deve produzir `quantidade * preco`;
- `registrar` deve exibir `CÓDIGO: VALOR`.

Exiba o total final. Teste também um array vazio e use um contador externo para comprovar que `registrar` não foi chamado.

---

## Parte 4 — Closures, IIFE e integração

### Exercício 13 — Closure numérica

Crie:

```typescript
function criarDesconto(percentual: number): (valor: number) => number
```

A função retornada deve calcular o valor final após o desconto.

Crie duas funções a partir dela:

- uma para desconto de `10%`;
- outra para desconto de `25%`.

Teste ambas com o valor `200`. Depois responda em comentários:

1. qual função é a externa;
2. qual valor cada função interna preserva;
3. quando esse valor é definido;
4. quando ele volta a ser usado.

### Exercício 14 — Closure como critério de objetos

Crie:

```typescript
function criarLimiteDeDuracao(
  maximo: number,
): (tarefa: { nome: string; minutos: number }) => boolean
```

A função retornada deve aprovar tarefas cuja duração seja menor ou igual ao limite preservado.

Use este array:

```typescript
const tarefas = [
  { nome: "Responder mensagens", minutos: 15 },
  { nome: "Revisar projeto", minutos: 50 },
  { nome: "Organizar arquivos", minutos: 30 },
];
```

Reutilize a ideia de seleção manual do exercício 11 para produzir:

- tarefas de até `30` minutos;
- tarefas de até `10` minutos.

Teste também uma tarefa de exatamente `30` minutos para conferir o limite inclusivo.

### Exercício 15 — Reconhecendo uma IIFE

Leia o código sem executá-lo primeiro:

```typescript
const etiqueta = (() => {
  const projeto = "Curso TS";
  const capitulo = 8;
  return `${projeto} | capítulo ${capitulo}`;
})();
```

Registre em comentários:

1. qual trecho representa a função;
2. quais parênteses realizam a chamada imediata;
3. o tipo de `etiqueta`;
4. se `etiqueta` guarda uma função ou o retorno da chamada;
5. por que `projeto` não pode ser acessado depois fora da IIFE.

Em seguida, execute o código e exiba `etiqueta` para conferir sua previsão. Não reescreva a IIFE como função comum: o objetivo é reconhecer sua forma.

### Exercício 16 — Desafio final: painel configurável de missões

Uma equipe acompanha estas missões:

```typescript
const missoes: {
  titulo: string;
  pontos: number;
  concluida: boolean;
  categoria: string;
}[] = [
  { titulo: "Mapa antigo", pontos: 40, concluida: true, categoria: "exploração" },
  { titulo: "Sinal perdido", pontos: 70, concluida: false, categoria: "resgate" },
  { titulo: "Cristal raro", pontos: 100, concluida: true, categoria: "exploração" },
  { titulo: "Defesa da base", pontos: 55, concluida: false, categoria: "defesa" },
];
```

Construa um painel reutilizável que:

- receba o array de missões;
- receba um callback que decide quais missões entram;
- receba um callback que transforma cada missão aprovada em texto;
- aceite um título com valor padrão `Painel de missões`;
- retorne um `string[]`, começando pelo título;
- percorra o array manualmente e não altere os dados originais.

Use o painel para gerar:

1. missões concluídas, com título explícito e linhas contendo título e pontos;
2. missões com pelo menos `60` pontos, usando o título padrão;
3. missões da categoria `exploração`, usando uma função nomeada como critério;
4. um painel vazio usando um critério que rejeita todas.

Crie também uma closure que receba uma pontuação mínima e retorne um critério compatível com o painel. Use-a no item 2.

Restrições:

- decida você mesmo como dividir o problema em funções;
- escreva os contratos completos dos callbacks;
- não use métodos avançados de array;
- não duplique o loop principal para cada relatório.

Ao final, exiba todos os painéis e responda em comentários:

- onde cada callback é recebido;
- onde cada callback é chamado;
- qual retorno de callback é usado na decisão;
- qual retorno é usado para montar as linhas;
- qual valor a closure preserva;
- por que passar o critério sem `()` é diferente de chamá-lo antes da entrega.

## Checklist final

- [ ] Criei os 16 arquivos pedidos.
- [ ] Escrevi parâmetros e retornos com tipos coerentes.
- [ ] Diferenciei referência de função e resultado de chamada.
- [ ] Usei callbacks `void` e callbacks com retorno.
- [ ] Executei todos os testes alternativos pedidos.
- [ ] Misturei funções com arrays de objetos sem perder o contrato dos objetos.
- [ ] Expliquei o valor preservado pelas closures.
- [ ] Reconheci a execução imediata da IIFE.
- [ ] Não usei métodos avançados de array.

