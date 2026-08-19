# Capítulo 01 — Variáveis e Constantes: Exemplos Práticos

Os exemplos abaixo podem ser salvos em arquivos separados, compilados com `tsc` e executados com Node.js.

## Exemplo 1: Identificação de um Componente

### Contexto

Uma ficha simples precisa exibir dados que não mudarão durante a execução.

### Código

```typescript
const nomeDoComponente = "Rolamento";
const codigoDoComponente: string = "ROL-6204";
const quantidadeEmEstoque = 18;

console.log("Componente:", nomeDoComponente);
console.log("Código: " + codigoDoComponente);
console.log("Estoque:", quantidadeEmEstoque);
```

### Explicação

- As três informações foram declaradas com `const` porque não serão reatribuídas.
- `nomeDoComponente` e `quantidadeEmEstoque` usam inferência.
- `codigoDoComponente` mostra uma anotação explícita `: string`.
- Os nomes seguem `camelCase` e explicam claramente o conteúdo.
- A primeira e a terceira saídas usam argumentos separados por vírgula.
- A segunda usa `+`; por isso, o espaço necessário está no fim de `"Código: "`.

### Saída Esperada

```text
Componente: Rolamento
Código: ROL-6204
Estoque: 18
```

## Exemplo 2: Atualização de uma Medição

### Contexto

Durante uma inspeção, a temperatura medida pode mudar, mas o limite de referência permanece fixo.

### Código

```typescript
const nomeDaMaquina = "Compressor 03";
const temperaturaLimite: number = 90;
let temperaturaAtual: number = 72;

console.log("Máquina:", nomeDaMaquina);
console.log("Temperatura inicial:", temperaturaAtual);

temperaturaAtual = 78;

console.log("Temperatura atualizada:", temperaturaAtual);
console.log("Limite: " + temperaturaLimite);
```

### Explicação

- `nomeDaMaquina` e `temperaturaLimite` usam `const`, pois representam referências fixas neste programa.
- `temperaturaAtual` usa `let` porque recebe uma nova medição.
- A reatribuição não repete `let`.
- O novo valor continua sendo `number`, portanto é compatível com o tipo declarado.

### Saída Esperada

```text
Máquina: Compressor 03
Temperatura inicial: 72
Temperatura atualizada: 78
Limite: 90
```

## Exemplo 3: Alcance das Etiquetas

### Contexto

Um código de projeto é usado em toda a ficha, enquanto uma unidade auxiliar só é necessária em uma parte específica.

### Código

```typescript
const codigoDoProjeto = "ENG-014";

console.log("Projeto:", codigoDoProjeto);

{
  const unidadeDaMedida = "mm";
  const diametroDoEixo = 32;

  console.log("Diâmetro:", diametroDoEixo, unidadeDaMedida);
  console.log("Projeto dentro do bloco:", codigoDoProjeto);
}

console.log("Projeto ao final:", codigoDoProjeto);
```

### Explicação

- `codigoDoProjeto` foi declarado fora do bloco e pode ser acessado antes, dentro e depois dele.
- `unidadeDaMedida` e `diametroDoEixo` só existem entre as chaves.
- O bloco cria uma área de trabalho menor para as duas etiquetas internas.
- O exemplo usa somente `const`, pois nenhum dos valores precisa ser reatribuído.

### Saída Esperada

```text
Projeto: ENG-014
Diâmetro: 32 mm
Projeto dentro do bloco: ENG-014
Projeto ao final: ENG-014
```

## Exemplo 4: Três Formas de Exibir o Mesmo Resultado

### Contexto

O objetivo é produzir exatamente a saída `Peças aprovadas: 25`.

### Código

```typescript
const pecasAprovadas = 25;

console.log("Peças aprovadas:", pecasAprovadas);
console.log("Peças aprovadas: " + pecasAprovadas);
console.log(`Peças aprovadas: ${pecasAprovadas}`);
```

### Explicação

- Com vírgula, não foi colocado espaço depois de `:`; o console separa os argumentos.
- Com `+`, o espaço foi incluído dentro da string.
- A terceira linha usa template literal apenas como uma alternativa breve. Esse recurso será estudado com mais profundidade no Capítulo 02.

### Saída Esperada

```text
Peças aprovadas: 25
Peças aprovadas: 25
Peças aprovadas: 25
```

## Exemplo de Erro Comum

### Código com Problema

```typescript
const qtd = 10;
qtd = "doze";

{
  let setorAtual = "Montagem";
}

console.log("Setor: ", setorAtual);
```

### Por que está errado?

Há mais de um problema:

1. `qtd` foi declarada com `const`, então não pode ser reatribuída.
2. Mesmo que fosse `let`, trocar um número por uma string seria incompatível com o tipo inferido.
3. `setorAtual` foi declarada com `let` dentro do bloco e não existe fora dele.
4. `qtd` é um nome abreviado e menos claro que `quantidadeDePecas`.
5. O espaço ao final de `"Setor: "` poderia gerar espaçamento adicional com a vírgula.

Os quatro primeiros itens envolvem escolha inadequada ou erro detectável pelo compilador. O espaçamento da saída é um problema de formatação, não de tipo.

### Código Corrigido

```typescript
let quantidadeDePecas = 10;
quantidadeDePecas = 12;

const setorAtual = "Montagem";

console.log("Quantidade de peças:", quantidadeDePecas);
console.log("Setor:", setorAtual);
```

### Saída Esperada

```text
Quantidade de peças: 12
Setor: Montagem
```

## Desafio Rápido

Crie um arquivo `desafio-rapido.ts` que:

1. declare com `const` o nome de uma peça e seu código;
2. declare com `let` a quantidade disponível;
3. exiba os três valores;
4. atualize a quantidade;
5. exiba a nova quantidade no formato exato `Quantidade atualizada: 15`.

Use nomes descritivos em `camelCase`, mantenha o ponto e vírgula de forma consistente e teste a saída no terminal.
