# Aula 02 — Sintaxe de objetos

## 1. Objeto literal

```typescript
const identificador = {
  chave: valor,
};
```

Exemplo:

```typescript
const sala = {
  nome: "Laboratório 3",
  capacidade: 16,
  disponivel: true,
};
```

Cada propriedade termina com vírgula, inclusive a última, por clareza. As aspas na chave só são necessárias quando o nome não é um identificador válido.

## 2. Tipagem inline

```typescript
const sala: {
  nome: string;
  capacidade: number;
  disponivel: boolean;
} = {
  nome: "Laboratório 3",
  capacidade: 16,
  disponivel: true,
};
```

A anotação descreve a forma. A inferência também funciona:

```typescript
const outraSala = {
  nome: "Oficina",
  capacidade: 8,
  disponivel: false,
};
```

Nos exercícios deste capítulo, declare o tipo do objeto quando o enunciado pedir forma explícita. A inferência continua válida para variáveis locais auxiliares.

## 3. Leitura e alteração

Ponto:

```typescript
console.log(sala.nome);
sala.disponivel = false;
```

Colchetes:

```typescript
console.log(sala["capacidade"]);

const campo = "nome";
console.log(sala[campo]);
```

Atribuição com chave em string:

```typescript
sala["capacidade"] = 20;
```

## 4. Propriedades opcionais

```typescript
const medicao: {
  sensor: string;
  valor: number;
  unidade?: string;
} = {
  sensor: "pressão",
  valor: 1.8,
};
```

`unidade` pode ser omitida. Depois da criação, ela também pode receber um valor:

```typescript
medicao.unidade = "bar";
```

Leitura segura:

```typescript
const unidadeExibida = medicao.unidade ?? "sem unidade";
```

## 5. Objetos aninhados

```typescript
const ensaio: {
  peca: string;
  local: {
    laboratorio: string;
    bancada: number;
  };
} = {
  peca: "Mola",
  local: {
    laboratorio: "Resistência dos materiais",
    bancada: 2,
  },
};

console.log(ensaio.local.bancada);
ensaio.local.bancada = 4;
```

O tipo interno também é um objeto. Altere o nível correto: `ensaio.local` é o objeto aninhado; `ensaio.local.bancada` é o número.

## 6. Atalho de propriedade

Quando a variável já tem o mesmo nome da chave:

```typescript
const nome = "Ana";
const idade = 34;

const paciente = {
  nome: nome,
  idade: idade,
};
```

equivale a:

```typescript
const paciente = {
  nome,
  idade,
};
```

O atalho não muda o valor; só evita repetir o identificador.

## 7. Métodos

Forma recomendada neste capítulo:

```typescript
const cronometro = {
  segundos: 10,
  formatar(): string {
    return `${this.segundos}s`;
  },
  tick(): void {
    this.segundos += 1;
  },
};

cronometro.tick();
console.log(cronometro.formatar());
```

o `this` significa, nesse contexto:

> o objeto que está chamando este método”.


Então quando você faz:
```ts
cronometro.tick();
```

dentro de `tick`, o `this` aponta para `cronometro`.

Ou seja:
```ts
this.segundos += 1;
```

pode ser entendido mentalmente como:
```ts
cronometro.segundos += 1;
```

Nesse caso específico.


Função externa que recebe o objeto:

```typescript
function formatarTempo(item: { segundos: number }): string {
  return `${item.segundos}s`;
}
```

As duas formas são válidas. O método concentra o comportamento no objeto; a função independente facilita reutilização e teste.

Não use arrow function como método que precisa de `this`:

```typescript
const cronometroIncorreto = {
  segundos: 10,
  formatar: (): string => {
    // this não representa cronometroIncorreto
    return "inválido para este capítulo";
  },
};
```

## 8. Spread

Cópia rasa com substituição:

```typescript
const origem = {
  titulo: "Relatório",
  paginas: 12,
};

const revisao = {
  ...origem,
  paginas: 15,
};
```

Várias fontes, da esquerda para a direita:

```typescript
const padrao = { tema: "claro", fonte: 16 };
const usuario = { fonte: 18 };
const final = { ...padrao, ...usuario };
```

`final.fonte` vale `18`, porque `usuario` veio depois.

Spread não substitui a alteração direta quando a intenção é mutar o mesmo objeto. Use-o quando quiser preservar o original.

## 9. Destructuring

```typescript
const pedido = {
  item: "Reagente",
  quantidade: 3,
  urgente: true,
};

const { item, quantidade } = pedido;
```

Renomear:

```typescript
const { item: nomeDoItem } = pedido;
```

Valor padrão:

```typescript
const alerta: { texto: string; codigo?: number } = {
  texto: "falha",
};

const { codigo = 0 } = alerta;
```

Rest do objeto, para guardar o que sobrou:

```typescript
const { urgente, ...dados } = pedido;
```

`urgente` sai como `boolean`; `dados` fica `{ item: "Reagente", quantidade: 3 }`. Esse `...` no destructuring não é o rest parameter de função do Capítulo 08; aqui ele apenas recolhe propriedades restantes.

Na lista de parâmetros:

```typescript
function resumir({ item, quantidade }: { item: string; quantidade: number }): string {
  return `${item} × ${quantidade}`;
}

console.log(resumir(pedido));
```

## 10. Função que devolve objeto

```typescript
function criarPonto(x: number, y: number): { x: number; y: number } {
  return { x, y };
}

const origem = criarPonto(0, 0);
```

O retorno precisa cumprir a forma declarada em todos os caminhos, como qualquer outro contrato de função.

## 11. Array de objetos

```typescript
const filas: {
  nome: string;
  tamanho: number;
}[] = [
  { nome: "Recepção", tamanho: 4 },
  { nome: "Triagem", tamanho: 2 },
];

function somarTamanhos(itens: { tamanho: number }[]): number {
  let total = 0;

  for (const item of itens) {
    total += item.tamanho;
  }

  return total;
}
```

O parâmetro pede somente `tamanho` porque é o campo usado. Um objeto com campos a mais continua compatível quando já existe em uma variável; o literal atribuído a um tipo mais estreito continua sujeito à verificação de excesso.

## 12. Checklist de um objeto

Ao criar ou receber um objeto, responda:

1. Quais campos existem de fato?
2. Quais são obrigatórios e quais são opcionais?
3. Algum campo é outro objeto?
4. A variável aponta para um objeto novo ou para um já existente?
5. A operação altera o original ou devolve uma cópia?
6. O tipo descreve o objeto inteiro ou só uma propriedade?

## Tabela de referência

| Sintaxe | Uso |
|---|---|
| `{ nome: "Ana" }` | literal |
| `obj.nome` | leitura/escrita com chave conhecida |
| `obj["nome"]` | leitura/escrita com string |
| `campo?: number` | propriedade opcional |
| `{ ...obj, nome: "Bia" }` | cópia rasa com substituição |
| `const { nome } = obj` | destructuring |
| `nome()` dentro do literal | método |
| `this.nome` | propriedade do objeto da chamada |
| `{ nome: string }[]` | array de objetos |
