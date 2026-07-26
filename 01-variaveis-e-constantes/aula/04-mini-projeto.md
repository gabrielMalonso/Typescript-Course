# Mini-Projeto: Painel de Parâmetros de Engenharia

## Objetivo

Vamos construir um painel de terminal que registra parâmetros básicos de um eixo mecânico e simula a atualização de uma medição. O projeto pratica a escolha entre dados fixos e mutáveis, a criação de nomes descritivos e a formatação cuidadosa da saída.

Ao final, o terminal deverá mostrar exatamente:

```text
=== PAINEL DO PROJETO ===
Projeto: Eixo de Transmissão
Código: ET-2026
Material: Aço carbono
Diâmetro nominal: 40 mm
Comprimento: 250 mm
Temperatura inicial: 22 °C
Temperatura atual: 28 °C
Status do registro: atualizado
```

## Conceitos Aplicados

- declaração com `const` e `let`;
- inferência e anotação explícita;
- reatribuição de variável;
- nomes descritivos em `camelCase`;
- escopo global e escopo de bloco;
- formatação com `console.log`;
- consistência com ponto e vírgula.

## Passo a Passo

Crie um arquivo chamado `painel-projeto.ts`.

### Passo 1: Declare as informações fixas

O nome, o código, o material e as dimensões não mudarão neste programa. Use `const`.

```typescript
const nomeDoProjeto = "Eixo de Transmissão";
const codigoDoProjeto: string = "ET-2026";
const materialDoEixo = "Aço carbono";
const diametroNominal: number = 40;
const comprimentoDoEixo = 250;
```

Alguns tipos foram inferidos e outros foram anotados explicitamente para praticar as duas formas.

### Passo 2: Declare os dados que mudarão

A temperatura e o texto que descreve o estado do registro serão atualizados. Use `let`.

```typescript
let temperaturaAtual: number = 22;
let statusDoRegistro = "inicial";
```

### Passo 3: Exiba o cabeçalho e os dados fixos

Observe os espaços: com a vírgula, não deixe um espaço extra no fim da string.

```typescript
console.log("=== PAINEL DO PROJETO ===");
console.log("Projeto:", nomeDoProjeto);
console.log("Código:", codigoDoProjeto);
console.log("Material:", materialDoEixo);
```

### Passo 4: Use um bloco para uma unidade auxiliar

A unidade `mm` só é necessária ao exibir as dimensões. Declare-a dentro de um bloco.

```typescript
{
  const unidadeDeComprimento = "mm";

  console.log("Diâmetro nominal:", diametroNominal, unidadeDeComprimento);
  console.log("Comprimento:", comprimentoDoEixo, unidadeDeComprimento);
}
```

`unidadeDeComprimento` deixa de estar disponível após `}`. As constantes externas continuam acessíveis dentro do bloco.

### Passo 5: Mostre e atualize a medição

Primeiro, exiba a temperatura inicial. Depois, reatribua os dois valores mutáveis e mostre o resultado.

```typescript
console.log("Temperatura inicial: " + temperaturaAtual + " °C");

temperaturaAtual = 28;
statusDoRegistro = "atualizado";

console.log("Temperatura atual: " + temperaturaAtual + " °C");
console.log("Status do registro:", statusDoRegistro);
```

O uso de `+` permite controlar diretamente os espaços ao redor do valor. No Capítulo 02, você verá template literals com mais detalhes.

## Código Final Completo

Antes de copiar este código, compare-o com os passos anteriores. Depois de copiar, compile e execute exatamente esta versão.

```typescript
const nomeDoProjeto = "Eixo de Transmissão";
const codigoDoProjeto: string = "ET-2026";
const materialDoEixo = "Aço carbono";
const diametroNominal: number = 40;
const comprimentoDoEixo = 250;

let temperaturaAtual: number = 22;
let statusDoRegistro = "inicial";

console.log("=== PAINEL DO PROJETO ===");
console.log("Projeto:", nomeDoProjeto);
console.log("Código:", codigoDoProjeto);
console.log("Material:", materialDoEixo);

{
  const unidadeDeComprimento = "mm";

  console.log("Diâmetro nominal:", diametroNominal, unidadeDeComprimento);
  console.log("Comprimento:", comprimentoDoEixo, unidadeDeComprimento);
}

console.log("Temperatura inicial: " + temperaturaAtual + " °C");

temperaturaAtual = 28;
statusDoRegistro = "atualizado";

console.log("Temperatura atual: " + temperaturaAtual + " °C");
console.log("Status do registro:", statusDoRegistro);
```

## Testando

No terminal, entre na pasta onde salvou o arquivo e compile:

```bash
tsc painel-projeto.ts
```

Se não houver erro, execute o JavaScript gerado:

```bash
node painel-projeto.js
```

Confira:

- se cada linha corresponde exatamente à saída definida no objetivo;
- se há espaços duplicados ou ausentes;
- se a temperatura mudou de `22` para `28`;
- se o status final é `atualizado`;
- se todas as instruções terminam com ponto e vírgula;
- se o arquivo que você conferiu é o mesmo que executou.

### Experimentos seguros

Depois de confirmar que o programa funciona, faça um experimento por vez e observe o erro do compilador:

1. tente reatribuir `diametroNominal`;
2. tente atribuir um texto a `temperaturaAtual`;
3. tente exibir `unidadeDeComprimento` depois do bloco.

Desfaça cada alteração antes de iniciar a próxima. Registre se o problema envolve `const`, tipo ou escopo.

## Desafios de Expansão

1. Acrescente uma constante `nomeDoResponsavel` e exiba `Responsável: Gabriel Alonso`.
2. Crie uma variável `revisaoAtual` iniciada em `1`, exiba seu valor, atualize para `2` e exiba novamente.
3. Reescreva somente a linha da temperatura atual usando um template literal e confirme que a saída permanece idêntica.

Não use condicionais, funções ou objetos neste projeto. O foco é dominar declarações, reatribuições, tipos, nomes e escopo.
