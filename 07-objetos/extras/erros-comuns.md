# Objetos — Erros comuns

## 1. Tratar o objeto como se fosse um array

```typescript
const ficha = {
  nome: "Paquímetro",
  codigo: 17,
};

console.log(ficha[0]); // erro de tipo em TypeScript estrito
```

O TypeScript estrito rejeita esse acesso porque `0` não é uma chave conhecida de `ficha`. Em JavaScript sem verificação de tipos, a leitura produziria `undefined`. Objetos não possuem índice posicional por padrão; a leitura correta é `ficha.nome` ou `ficha["nome"]`.

## 2. Confundir o objeto com uma propriedade

```typescript
const pedido: {
  total: number;
} = {
  total: 85,
};
```

`pedido` é o objeto. `pedido.total` é o `number`. O tipo da variável não é `number`.

## 3. Achar que `const` impede alterar campos

```typescript
const sensor = {
  valor: 21,
};

sensor.valor = 25;
```

Isso é permitido. `const` impede `sensor = { valor: 30 }`, não a mutação interna.

## 4. Copiar por atribuição e achar que criou outro objeto

```typescript
const original = { potencia: 120 };
const alias = original;
alias.potencia = 80;
```

`original.potencia` também vira `80`. Para copiar as propriedades, use spread:

```typescript
const copia = { ...original };
```

Lembre-se: a cópia é rasa. Objetos aninhados continuam compartilhados.

## 5. Usar ponto com o nome da variável da chave

```typescript
const campo = "temperatura";
const clima = { temperatura: 22 };

console.log(clima.campo);
```

O ponto procura uma propriedade literalmente chamada `campo`. A chave dinâmica exige `clima[campo]`.

## 6. Esquecer que a propriedade opcional pode estar ausente

```typescript
const alerta: { mensagem: string; codigo?: number } = {
  mensagem: "falha",
};

console.log(alerta.codigo.toFixed(0));
```

Se `codigo` não existe, a leitura quebra em tempo de execução. Use `??` ou uma condição antes de tratar o valor como `number`.

## 7. Mutar o argumento quando o enunciado pede um objeto novo

```typescript
function aplicarDesconto(produto: { preco: number }, percentual: number) {
  produto.preco = produto.preco * (1 - percentual / 100);
  return produto;
}
```

O original muda. Se a função deve preservar o argumento:

```typescript
function aplicarDesconto(produto: { preco: number }, percentual: number) {
  return {
    ...produto,
    preco: produto.preco * (1 - percentual / 100),
  };
}
```

## 8. Usar arrow function como método com `this`

```typescript
const conta = {
  saldo: 100,
  depositar: (valor: number): void => {
    this.saldo += valor;
  },
};
```

Nesse método, `this` não representa `conta`. Prefira:

```typescript
const conta = {
  saldo: 100,
  depositar(valor: number): void {
    this.saldo += valor;
  },
};
```

## 9. Modelar a amostra em vez da regra

Se a regra é `quantidade > 0` e `ativa === true`, um zero na lista não autoriza aceitar qualquer não-zero, nem somar itens inativos. Teste negativos, zero, ausência de campo opcional e array vazio.

## Checklist anti-erros

- [ ] Li propriedades pelo nome, não por índice.
- [ ] Separei o tipo do objeto do tipo de cada campo.
- [ ] Conferi se a operação muta, copia ou apenas lê.
- [ ] Tratei propriedade opcional como possivelmente `undefined`.
- [ ] Protegi limites com a regra geral, não só com os números do exemplo.
- [ ] Percorri arrays de objetos com loop explícito.

## Mensagens frequentes do compilador

| Mensagem | Significado | Caminho |
|---|---|---|
| `Property 'x' does not exist` | A chave não está no tipo | Confira o nome ou o tipo inline |
| `Object literal may only specify known properties` | Literal com campo extra na atribuição direta | Remova o campo ou amplie o tipo |
| `Type 'string' is not assignable to type 'number'` | Propriedade com tipo incompatível | Ajuste o valor ou o tipo do campo |
| `'codigo' is possibly 'undefined'` | Leitura de propriedade opcional | Use `??` ou uma condição |
