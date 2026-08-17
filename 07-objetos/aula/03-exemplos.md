# Aula 03 — Exemplos progressivos

Antes de executar cada exemplo, preveja o valor das propriedades e as linhas exibidas.

## Exemplo 1 — Literal e ponto

```typescript
const livro = {
  titulo: "Resistência dos materiais",
  paginas: 320,
};

console.log(livro.titulo);
console.log(livro.paginas);
```

Saída:

```text
Resistência dos materiais
320
```

O objeto reúne dois campos de papéis diferentes. `livro` é o objeto; `livro.paginas` é o número.

## Exemplo 2 — Alteração com `const`

```typescript
const marcador = {
  capitulo: 6,
  pagina: 40,
};

marcador.capitulo = 7;
marcador.pagina = 1;

console.log(`${marcador.capitulo}:${marcador.pagina}`);
```

Saída:

```text
7:1
```

A variável `marcador` não foi trocada. Só o conteúdo interno mudou.

## Exemplo 3 — Colchetes e chave variável

```typescript
const clima = {
  cidade: "Campinas",
  temperatura: 22,
};

const campo = "temperatura";
console.log(clima[campo]);
```

Saída:

```text
22
```

`clima.campo` procuraria uma propriedade chamada `campo` e falharia. Os colchetes usam o valor da variável, `"temperatura"`.

## Exemplo 4 — Tipagem inline e excesso no literal

```typescript
const peca: {
  codigo: string;
  massa: number;
} = {
  codigo: "E-21",
  massa: 0.8,
};

console.log(peca.codigo);
```

O literal abaixo seria rejeitado se fosse atribuído diretamente a `peca`, porque `cor` não faz parte do tipo:

```typescript
// const invalida: { codigo: string; massa: number } = {
//   codigo: "E-21",
//   massa: 0.8,
//   cor: "cinza",
// };
```

## Exemplo 5 — Propriedade opcional

```typescript
const aviso: {
  texto: string;
  codigo?: number;
} = {
  texto: "Calibração pendente",
};

console.log(aviso.codigo ?? "sem código");
aviso.codigo = 409;
console.log(aviso.codigo ?? "sem código");
```

Saída:

```text
sem código
409
```

No primeiro `console.log`, `codigo` está ausente. Depois da atribuição, o fallback não é usado.

## Exemplo 6 — Objeto aninhado

```typescript
const ensaio = {
  amostra: "Aço 1020",
  prensa: {
    forca: 12,
    unidade: "kN",
  },
};

console.log(ensaio.prensa.forca);
ensaio.prensa.forca = 15;
console.log(ensaio.prensa.forca);
```

Saída:

```text
12
15
```

A alteração acontece no objeto interno. `ensaio.amostra` permanece igual.

## Exemplo 7 — Referência compartilhada

```typescript
const original = {
  nome: "Compressor",
  ligado: false,
};

const alias = original;
alias.ligado = true;

console.log(original.ligado);
console.log(alias === original);
```

Saída:

```text
true
true
```

`===` entre objetos compara a referência. Os dois nomes apontam para o mesmo valor.

## Exemplo 8 — Método com `this`

```typescript
const estoque = {
  quantidade: 8,
  retirar(unidades: number): number {
    this.quantidade -= unidades;
    return this.quantidade;
  },
};

const restante = estoque.retirar(3);
console.log(restante);
console.log(estoque.quantidade);
```

Saída:

```text
5
5
```

`this.quantidade` é a propriedade do próprio `estoque`. O retorno e a leitura posterior mostram o mesmo número.

## Exemplo 9 — Spread preserva o original

```typescript
const produto = {
  nome: "Broca",
  preco: 20,
};

const promocao = {
  ...produto,
  preco: 16,
};

console.log(produto.preco);
console.log(promocao.preco);
```

Saída:

```text
20
16
```

`produto` não foi mutado. `promocao` é outro objeto com a mesma forma e um preço novo.

## Exemplo 10 — Destructuring

```typescript
const viagem = {
  destino: "Ouro Preto",
  dias: 3,
  diaria: 180,
};

const { destino, dias } = viagem;
const custo = dias * viagem.diaria;

console.log(`${destino}: ${custo}`);
```

Saída:

```text
Ouro Preto: 540
```

`destino` e `dias` viram variáveis. `diaria` continua sendo lida pelo objeto, porque não foi extraída.

## Exemplo 11 — Função que recebe um objeto

```typescript
function criarResumo(item: { destino: string; dias: number }): string {
  return `${item.destino} por ${item.dias} dias`;
}

const roteiro = {
  destino: "Paraty",
  dias: 4,
  transporte: "ônibus",
};

console.log(criarResumo(roteiro));
```

Saída:

```text
Paraty por 4 dias
```

`transporte` existe no argumento, mas a função só exige os campos que usa. O objeto original permanece disponível para o restante do programa.

## Exemplo 12 — Array de objetos

```typescript
const medicoes: {
  sensor: string;
  valor: number;
}[] = [
  { sensor: "T1", valor: 21 },
  { sensor: "T2", valor: -2 },
  { sensor: "T3", valor: 18 },
];

function somarPositivos(itens: { valor: number }[]): number {
  let total = 0;

  for (const item of itens) {
    if (item.valor <= 0) {
      continue;
    }

    total += item.valor;
  }

  return total;
}

console.log(somarPositivos(medicoes));
console.log(somarPositivos([]));
```

Saída:

```text
39
0
```

A regra ignora valores `<= 0`, não apenas zeros. O array vazio produz `0` porque o acumulador começa em `0` e o loop não executa.

## Exemplo de erro comum

```typescript
const usuario = {
  nome: "Gabriel",
  ativo: true,
};

const copia = usuario;
copia.ativo = false;
```

`copia` não é uma cópia. Depois da atribuição, `usuario.ativo` também é `false`.

Correção quando a intenção é preservar o original:

```typescript
const usuario = {
  nome: "Gabriel",
  ativo: true,
};

const copia = {
  ...usuario,
};

copia.ativo = false;
```

## Desafio rápido

Crie `desafio-rapido.ts` em `07-objetos/exercicios/solucoes/`.

1. Declare `personagem` com tipo inline `{ nome: string; vida: number; defesa?: number }`.
2. Comece com `nome: "Mina"`, `vida: 40` e sem `defesa`.
3. Crie `receberDano(alvo: { vida: number; defesa?: number }, dano: number): number` que:
   - usa `defesa ?? 0`;
   - calcula o dano efetivo como `dano - defesa`, sem ficar negativo;
   - reduz a vida por esse dano efetivo, sem deixar a vida negativa;
   - devolve a vida resultante e também atualiza `alvo.vida`.
4. Aplique dano `12` e exiba a vida.
5. Depois, use spread para criar `comArmadura` a partir de `personagem`, com `defesa: 5` e a vida já atualizada.
6. Aplique dano `12` em `comArmadura` e exiba as duas vidas.

Saída conceitual:

```text
28
21
```

Preveja os dois resultados antes de executar. Confira se `personagem.defesa` continua ausente depois da criação de `comArmadura`.
