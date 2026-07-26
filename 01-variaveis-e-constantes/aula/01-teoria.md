# Capítulo 01 — Variáveis e Constantes: Teoria

## Objetivos de Aprendizagem

Ao final desta aula, você será capaz de:

- explicar o que variáveis e constantes representam;
- escolher entre `let` e `const`;
- entender por que `var` deve ser evitado em código moderno;
- criar nomes descritivos seguindo a convenção `camelCase`;
- diferenciar inferência de tipo de anotação explícita;
- reconhecer os escopos global, de função e de bloco.

## Pré-requisitos

- Saber criar e executar um arquivo `.ts`.
- Entender o fluxo TypeScript → JavaScript.
- Reconhecer os tipos básicos `string`, `number` e `boolean`.
- Usar `console.log` para observar resultados.

## Introdução

Imagine uma bancada de manutenção com várias caixas. Cada caixa possui uma etiqueta, como `parafusosDisponiveis`, e guarda um conteúdo, como `120`.

Em um programa:

- a **caixa** representa um espaço usado para armazenar um valor;
- a **etiqueta** é o nome escolhido por você;
- o **conteúdo** é o valor armazenado;
- o **tipo** informa que espécie de conteúdo aquela caixa aceita.

```typescript
let parafusosDisponiveis: number = 120;
```

Nesse exemplo, `parafusosDisponiveis` é uma caixa etiquetada que aceita números. Como foi declarada com `let`, seu conteúdo pode mudar durante a execução.

Nem toda informação deve mudar. A aceleração da gravidade adotada em um cálculo, por exemplo, pode ser definida uma vez e preservada:

```typescript
const gravidade: number = 9.81;
```

Escolher entre algo que pode mudar e algo que deve permanecer fixo ajuda a representar corretamente as regras do problema.

## Variáveis com `let`

### O que é?

`let` declara uma variável cujo valor pode ser substituído depois.

```typescript
let pecasProduzidas: number = 40;
pecasProduzidas = 55;
```

A etiqueta continua sendo `pecasProduzidas`, mas o conteúdo da caixa passou de `40` para `55`.

### Por que existe?

Alguns dados mudam enquanto o programa é executado: quantidade em estoque, temperatura medida, progresso de uma tarefa ou pontuação.

### Como funciona por baixo dos panos?

Ao encontrar a declaração, o TypeScript associa o nome a um valor e verifica seu tipo. Depois de inferir ou receber o tipo `number`, ele impede uma troca incompatível:

```typescript
let temperaturaAtual = 24;
temperaturaAtual = 27;
```

Isto produziria erro de compilação:

```typescript
let temperaturaAtual = 24;
temperaturaAtual = "vinte e sete";
```

O problema não é mudar o valor. O problema é tentar guardar texto em uma variável que o TypeScript reconheceu como numérica.

## Constantes com `const`

### O que é?

`const` declara um nome que deve receber um valor no momento da criação e não pode ser reatribuído depois.

```typescript
const nomeDoProjeto: string = "Suporte de Motor";
```

### Por que existe?

`const` comunica uma intenção: este nome deve continuar apontando para o mesmo valor. Isso evita alterações acidentais e facilita a leitura.

```typescript
const quantidadeDeEixos = 3;
```

Quem lê o código sabe que `quantidadeDeEixos` não será substituído mais adiante.

### Como funciona por baixo dos panos?

O TypeScript acompanha a declaração e rejeita uma nova atribuição ao mesmo nome:

```typescript
const quantidadeDeEixos = 3;
quantidadeDeEixos = 4;
```

O compilador informa que não é possível atribuir outro valor a uma constante.

Uma regra prática útil é:

> Comece com `const`. Use `let` apenas quando souber que o valor precisará mudar.

## Por que evitar `var`

### O que é?

`var` é uma forma antiga de declarar variáveis em JavaScript. Ela ainda funciona, mas possui regras de escopo diferentes das de `let` e `const`.

```typescript
var medidaAntiga = 10;
```

### Por que existe?

`var` existia antes de `let` e `const` serem adicionados ao JavaScript. Por isso, aparece bastante em sistemas antigos e em JavaScript gerado para ambientes antigos.

### Por que evitar?

`var` não respeita o escopo de bloco da maneira esperada e também permite certas redeclarações. Isso pode fazer um nome ficar acessível em lugares inesperados.

```typescript
{
  var codigoAntigo = "A-10";
}

console.log(codigoAntigo);
```

Embora `codigoAntigo` tenha sido declarado dentro das chaves, ele continua acessível fora delas. Com `let` ou `const`, isso não acontece.

Use `let` e `const` em código novo. Aprenda a reconhecer `var` para conseguir ler código antigo.

## Nomes de Variáveis

### O que é um bom nome?

Um bom nome explica o significado do valor sem obrigar o leitor a adivinhar:

```typescript
const quantidadeDeParafusos = 24;
const temperaturaDoMotor = 82;
```

Evite abreviações vagas:

```typescript
const qtdP = 24;
const tempM = 82;
```

Nomes um pouco mais longos costumam economizar tempo de leitura e reduzem ambiguidades.

### `camelCase`

Em TypeScript, nomes de variáveis e constantes normalmente seguem `camelCase`: a primeira palavra começa com letra minúscula e as seguintes começam com maiúscula.

```typescript
const nomeDoComponente = "Rolamento";
let velocidadeAtualDoEixo = 1200;
```

### `snake_case`

Em `snake_case`, as palavras são separadas por `_`:

```typescript
const nome_do_componente = "Rolamento";
```

Essa convenção é comum em outras linguagens e em alguns bancos de dados. Ela é válida em TypeScript, mas `camelCase` é a convenção predominante. O mais importante dentro de um projeto é seguir o padrão adotado de forma consistente.

### Regras do identificador

Um nome:

- pode conter letras, números, `_` e `$`;
- não pode começar com número;
- não pode conter espaços ou hífens;
- não pode ser uma palavra reservada da linguagem;
- diferencia letras maiúsculas de minúsculas.

Assim, `temperaturaMotor` e `temperaturamotor` são nomes diferentes.

## Inferência de Tipo

### O que é?

Inferência ocorre quando o TypeScript deduz o tipo a partir do valor inicial:

```typescript
const fabricante = "Atlas";
let pressaoAtual = 8.5;
const sistemaAtivo = true;
```

O TypeScript infere `string`, `number` e `boolean`, respectivamente.

### Por que existe?

A inferência mantém a proteção de tipos sem exigir que você escreva informações óbvias. Isso deixa o código mais direto.

### Como funciona por baixo dos panos?

O analisador observa o valor inicial e registra o tipo correspondente. A anotação não aparece no código, mas a verificação continua acontecendo durante a compilação.

```typescript
let pressaoAtual = 8.5;
pressaoAtual = 9.2;
```

Uma atribuição de texto a `pressaoAtual` seria rejeitada porque seu tipo já foi inferido como `number`.

## Anotação Explícita de Tipo

### O que é?

Anotação explícita é escrever o tipo depois do nome:

```typescript
let pressaoAtual: number = 8.5;
const nomeDaMaquina: string = "Prensa 02";
```

### Por que existe?

Ela é útil quando o tipo não está claro, quando o valor será atribuído depois ou quando você quer registrar uma intenção importante. Quando o valor inicial já deixa o tipo evidente, a inferência normalmente é suficiente.

As duas declarações abaixo criam variáveis do tipo `number`:

```typescript
let rotacaoInferida = 1800;
let rotacaoAnotada: number = 1800;
```

Não existe uma opção universalmente melhor. A escolha depende de quanto a anotação ajuda o leitor e o compilador.

## Escopo de Variáveis

### O que é?

Escopo é a região do código em que um nome pode ser acessado. Pense nele como a área de alcance da etiqueta.

```text
Arquivo ou programa
├── escopo global
├── bloco { }
│   └── escopo de bloco
└── função
    └── escopo de função
```

### Escopo global

Uma variável declarada fora de blocos e funções fica disponível no restante daquele arquivo. Em um script simples, dizemos de forma introdutória que ela está no escopo global.

```typescript
const nomeDaFabrica = "Fábrica Central";

console.log(nomeDaFabrica);
```

Projetos com módulos possuem detalhes adicionais sobre o alcance entre arquivos, que serão estudados mais adiante.

### Escopo de bloco

Um bloco é uma região delimitada por `{` e `}`. `let` e `const` declarados dentro dele só existem ali.

```typescript
{
  const setorAtual = "Usinagem";
  console.log(setorAtual);
}
```

Fora das chaves, `setorAtual` não pode ser acessado.

### Escopo de função

Uma função cria sua própria região de alcance. Nomes declarados dentro dela ficam disponíveis apenas durante o trabalho daquela função. Funções serão estudadas em um capítulo posterior; por enquanto, guarde esta ideia:

> uma variável interna de uma função não fica automaticamente disponível no restante do programa.

`var` respeita escopo de função, mas não escopo de bloco. `let` e `const` respeitam ambos, o que torna seu comportamento mais previsível.

## Ponto e Vírgula: Erro ou Estilo?

Em muitos casos, TypeScript consegue interpretar uma linha mesmo sem `;`, por causa da inserção automática de ponto e vírgula do JavaScript.

```typescript
const material = "Aço"
const quantidade = 12
```

Isso normalmente compila. Portanto, a ausência de `;` nessas linhas não é um erro de tipo nem necessariamente um erro de sintaxe.

O problema é a inconsistência. Neste curso, adotaremos ponto e vírgula no final das instruções:

```typescript
const material = "Aço";
const quantidade = 12;
```

Essa é uma convenção de estilo escolhida para tornar o código uniforme.

## Resumo

- Variáveis são como caixas etiquetadas que armazenam valores.
- `let` permite reatribuição; `const` impede reatribuição.
- Prefira `const` e use `let` quando o valor realmente precisar mudar.
- Evite `var` em código novo porque seu escopo é menos previsível.
- Use nomes descritivos em `camelCase`.
- O TypeScript pode inferir o tipo ou recebê-lo por anotação explícita.
- Escopo define onde um nome está disponível.
- Consistência com ponto e vírgula é uma decisão de estilo, não uma regra universal de compilação.

## Próximo Passo

Agora você estudará a sintaxe exata das declarações, reatribuições, nomes e blocos.
