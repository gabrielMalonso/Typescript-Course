# Aula 01 — O que são objetos

## 1. O problema que um objeto resolve

Um array é excelente quando a ordem importa e todos os itens têm o mesmo papel:

```typescript
const duracoes: number[] = [35, 50, 25];
```

Ele deixa de ser a melhor ficha quando cada valor tem um significado próprio:

```typescript
const dados: (string | number | boolean)[] = ["Paquímetro", 17, true];
```

Qual posição é o nome? Qual é o código? Essa leitura depende de memória, não do próprio dado.

Um objeto dá um nome a cada campo:

```typescript
const equipamento: {
  nome: string;
  codigo: number;
  ativo: boolean;
} = {
  nome: "Paquímetro",
  codigo: 17,
  ativo: true,
};
```

Agora a pergunta deixa de ser “qual é o índice 0?” e passa a ser “qual é o `nome`?”.

## 2. Propriedades são campos nomeados

Cada par `nome: valor` é uma propriedade.

```text
objeto
  ├── nome da propriedade  →  chave
  └── valor guardado       →  dado
```

```typescript
const sessao = {
  titulo: "Objetos",
  minutos: 45,
  concluida: false,
};
```

| Chave | Valor | Tipo |
|---|---|---|
| `titulo` | `"Objetos"` | `string` |
| `minutos` | `45` | `number` |
| `concluida` | `false` | `boolean` |

A ordem das propriedades quase nunca importa para a leitura. O que importa é o nome.

## 3. Ponto e colchetes

A forma mais comum de leitura é a notação de ponto:

```typescript
console.log(sessao.titulo);
console.log(sessao.minutos);
```

Os colchetes servem quando a chave está em uma string, especialmente se ela vier de uma variável:

```typescript
const campo = "titulo";
console.log(sessao[campo]);
```

```text
sessao.titulo     → chave conhecida no código
sessao["titulo"]  → mesma chave, escrita como string
sessao[campo]     → chave decidida em tempo de execução
```

Use o ponto quando souber o nome da propriedade. Use colchetes quando o nome chegar como valor.

## 4. `const` não congela o conteúdo

Como no array, `const` impede trocar o objeto inteiro, não alterar um campo:

```typescript
const sensor = {
  nome: "Temperatura",
  valor: 21,
};

sensor.valor = 23; // permitido
// sensor = { nome: "Pressão", valor: 1.2 }; // erro: reatribuição
```

```text
const sensor  → a variável continua apontando para o mesmo objeto
sensor.valor  → o conteúdo interno pode mudar
```

Se a intenção for preservar o original, crie outro objeto. Spread, mais adiante, faz exatamente isso.

## 5. Referência compartilhada

Objetos, como arrays, são copiados por referência:

```typescript
const original = {
  nome: "Bomba",
  pressao: 4,
};

const alias = original;
alias.pressao = 6;

console.log(original.pressao); // 6
```

Não existem dois objetos. Existem dois nomes para o mesmo objeto.

```text
original ──┐
           ├──► { nome: "Bomba", pressao: 6 }
alias    ──┘
```

Por isso, alterar uma propriedade por um nome altera a leitura pelo outro.

## 6. O tipo descreve a forma, não um único valor

O tipo de um objeto lista as propriedades esperadas e o tipo de cada uma:

```typescript
const pedido: {
  produto: string;
  quantidade: number;
} = {
  produto: "Parafuso M6",
  quantidade: 20,
};
```

Leia assim:

```text
objeto com
  produto: string
  quantidade: number
```

O TypeScript rejeita uma propriedade com tipo incompatível:

```typescript
// pedido.quantidade = "vinte"; // erro: string não é number
```

Ele também rejeita uma propriedade extra no literal atribuído diretamente àquele tipo:

```typescript
const outroPedido: {
  produto: string;
  quantidade: number;
} = {
  produto: "Porca",
  quantidade: 10,
  // cor: "prata", // erro: propriedade em excesso no literal
};
```

Essa verificação existe para pegar erros de digitação no momento da criação. O tipo da variável não é o tipo de uma propriedade isolada: `pedido` é o objeto inteiro; `pedido.quantidade` é um `number`.

## 7. Propriedades opcionais

Nem todo campo existe em todos os casos. O `?` marca uma propriedade que pode estar ausente:

```typescript
const alerta: {
  mensagem: string;
  codigo?: number;
} = {
  mensagem: "Nível baixo",
};
```

`codigo` não foi informado. Ler `alerta.codigo` pode resultar em `undefined`.

```text
obrigatória → precisa existir
opcional ?  → pode existir ou não
```

Antes de usar o valor, verifique se ele está presente. O operador `??`, já estudado, é útil para um fallback:

```typescript
const codigoExibido = alerta.codigo ?? 0;
```

## 8. Objetos aninhados

Uma propriedade pode guardar outro objeto:

```typescript
const consulta = {
  paciente: "Ana",
  horario: {
    data: "2026-08-17",
    hora: "14:30",
  },
};

console.log(consulta.horario.hora);
```

```text
consulta
  ├── paciente: "Ana"
  └── horario
        ├── data: "2026-08-17"
        └── hora: "14:30"
```

Cada ponto desce um nível. `consulta.horario` é um objeto; `consulta.horario.hora` é a string.

## 9. Métodos são funções guardadas no objeto

No Capítulo 06, uma função já podia ser um valor. Colocada em uma propriedade, ela vira um método:

```typescript
const contador = {
  valor: 0,
  avancar(): void {
    this.valor += 1;
  },
};

contador.avancar();
console.log(contador.valor); // 1
```

`this` representa o objeto usado na chamada, aquele à esquerda do ponto:

```text
contador.avancar()
    ↑
  this aponta para contador
```

Neste capítulo, prefira a forma de método `avancar() { }`. Arrow functions como métodos não ligam `this` ao objeto da chamada; essa diferença fica como aviso, sem virar o centro da aula.

Um método também pode apenas formatar dados recebidos por parâmetro, sem usar `this`. A escolha depende de a regra pertencer ao objeto ou ser uma função independente que recebe o objeto.

## 10. Spread copia propriedades para um objeto novo

O operador `...` copia as propriedades enumeráveis para outro literal:

```typescript
const base = {
  nome: "Motor",
  potencia: 120,
};

const atualizado = {
  ...base,
  potencia: 150,
};
```

```text
base        → { nome: "Motor", potencia: 120 }
atualizado  → { nome: "Motor", potencia: 150 }
```

A propriedade repetida à direita substitui a da esquerda. O objeto original permanece intacto, desde que você não altere `base` depois.

Essa cópia é rasa: se uma propriedade for outro objeto, os dois nomes ainda compartilham o aninhado.

```typescript
const origem = {
  nome: "Sala 2",
  medidas: { largura: 4, altura: 3 },
};

const copia = { ...origem };
copia.medidas.largura = 5;

console.log(origem.medidas.largura); // 5
```

Spread duplicou a ficha externa, não a ficha interna.

## 11. Destructuring extrai propriedades para variáveis

Em vez de repetir `objeto.propriedade`, você pode abrir o objeto:

```typescript
const peca = {
  nome: "Eixo",
  massa: 2.4,
};

const { nome, massa } = peca;
```

`nome` recebe `"Eixo"` e `massa` recebe `2.4`. Os nomes à esquerda precisam coincidir com as chaves, a menos que você renomeie:

```typescript
const { nome: titulo } = peca;
```

Com propriedade ausente, um valor padrão evita `undefined`:

```typescript
const registro: { nome: string; observacao?: string } = {
  nome: "Eixo",
};

const { observacao = "sem nota" } = registro;
```

Destructuring também aparece na lista de parâmetros, quando a função já espera um objeto:

```typescript
function criarEtiqueta({ nome, massa }: { nome: string; massa: number }): string {
  return `${nome}: ${massa} kg`;
}
```

## 12. Arrays de objetos

Cada elemento pode ser uma ficha:

```typescript
const estoque: {
  nome: string;
  quantidade: number;
}[] = [
  { nome: "Parafuso", quantidade: 40 },
  { nome: "Porca", quantidade: 18 },
];

for (const item of estoque) {
  console.log(`${item.nome}: ${item.quantidade}`);
}
```

O tipo ` { nome: string; quantidade: number }[] ` lê-se: array de objetos com essa forma. Percorra com `for...of` e acesse as propriedades pelo nome. Métodos como `map` e `filter` ficam para o Capítulo 09; aqui o percurso continua explícito.

## 13. Funções que recebem e devolvem objetos

Um objeto pode entrar e sair de uma função como qualquer outro valor:

```typescript
function aplicarDesconto(
  produto: { nome: string; preco: number },
  percentual: number,
): { nome: string; preco: number } {
  return {
    ...produto,
    preco: produto.preco * (1 - percentual / 100),
  };
}

const original = { nome: "Broca", preco: 20 };
const comDesconto = aplicarDesconto(original, 10);

console.log(original.preco); // 20
console.log(comDesconto.preco); // 18
```

A função não altera o argumento. Ela devolve um objeto novo. Esse padrão combina o contrato do Capítulo 06 com a cópia por spread.

## Resumo

- Objetos agrupam dados por nome; arrays agrupam dados por posição.
- Ponto lê uma chave conhecida; colchetes lêem uma chave em string ou variável.
- `const` protege a variável, não os campos.
- Duas variáveis podem apontar para o mesmo objeto.
- O tipo descreve a forma completa, não uma propriedade isolada.
- `?` torna uma propriedade ausente possível; a leitura pode ser `undefined`.
- Objetos podem conter outros objetos e funções.
- Spread cria outro objeto; a cópia de campos aninhados continua rasa.
- Destructuring extrai propriedades para variáveis ou parâmetros.
- Arrays de objetos se percorrem com os loops já conhecidos.

## Próximo passo

Em `02-sintaxe.md`, cada construção aparece com a forma exata usada nos exercícios.
