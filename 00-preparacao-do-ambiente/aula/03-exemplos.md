# Capítulo 00 - Preparação do Ambiente

## Parte 3: Exemplos Práticos

---

## Objetivo

Agora vamos colocar a mão na massa. Este arquivo contém exemplos práticos que você pode (e deve) reproduzir no seu computador. Cada exemplo é comentado linha por linha para você entender exatamente o que está acontecendo.

---

## Exemplo 1: Hello World Simples

O clássico primeiro programa de toda linguagem.

### O Código

Crie um arquivo chamado `hello.ts`:

```typescript
// hello.ts
// O famoso primeiro programa - exibe uma mensagem na tela

// console.log() é uma função que escreve texto no terminal
// Tudo que está entre parênteses é o que será exibido
// O texto precisa estar entre aspas (simples ou duplas)
console.log("Hello, World!");

// Você também pode usar aspas simples - funciona igual
console.log('Olá, Gabriel!');

// E pode exibir múltiplas mensagens
console.log("Primeira linha");
console.log("Segunda linha");
console.log("Terceira linha");
```

### Como Executar

```bash
# Método 1: Compilar e executar separadamente
tsc hello.ts        # Gera hello.js
node hello.js       # Executa

# Método 2: Usar ts-node (se instalou)
ts-node hello.ts    # Compila e executa em um passo
```

### Saída Esperada

```
Hello, World!
Olá, Gabriel!
Primeira linha
Segunda linha
Terceira linha
```

### O Que Está Acontecendo

1. O compilador (`tsc`) lê o arquivo `hello.ts`
2. Verifica se há erros (não há neste caso)
3. Gera o arquivo `hello.js` (praticamente idêntico, pois não usamos tipos)
4. O Node.js executa o JavaScript e mostra as mensagens

---

## Exemplo 2: Variáveis Tipadas (Prévia)

Este exemplo é uma **prévia** do próximo capítulo. Mostra a diferença entre TypeScript e JavaScript.

### O Código

Crie um arquivo chamado `variaveis.ts`:

```typescript
// variaveis.ts
// Demonstração de variáveis com tipos

// ============================================
// DECLARANDO VARIÁVEIS COM TIPOS
// ============================================

// Em TypeScript, podemos (e devemos) dizer o TIPO da variável
// A sintaxe é: let nomeVariavel: tipo = valor;

// Variável do tipo string (texto)
let nome: string = "Gabriel";

// Variável do tipo number (número)
let idade: number = 30;

// Variável do tipo boolean (verdadeiro/falso)
let estudandoTypeScript: boolean = true;

// ============================================
// USANDO AS VARIÁVEIS
// ============================================

console.log("Nome:", nome);
console.log("Idade:", idade);
console.log("Estudando TypeScript?", estudandoTypeScript);

// ============================================
// O QUE ACONTECE SE EU TENTAR QUEBRAR O TIPO?
// ============================================

// DESCOMENTE a linha abaixo para ver o erro:
// idade = "trinta";  // ERRO! Não pode atribuir string a number

// O TypeScript avisa ANTES de você executar
// Isso evita bugs que só apareceriam quando o programa rodasse

// ============================================
// INFERÊNCIA DE TIPO (TypeScript é esperto)
// ============================================

// Você não PRECISA sempre declarar o tipo
// Se você atribuir um valor, TypeScript infere o tipo

let cidade = "São Paulo";  // TypeScript sabe que é string
let ano = 2025;            // TypeScript sabe que é number

// Mas se tentar mudar o tipo, ele reclama:
// cidade = 123;  // ERRO! TypeScript lembra que cidade é string

console.log("Cidade:", cidade);
console.log("Ano:", ano);
```

### Como Executar

```bash
ts-node variaveis.ts
```

### Saída Esperada

```
Nome: Gabriel
Idade: 30
Estudando TypeScript? true
Cidade: São Paulo
Ano: 2025
```

### O Que Aprendemos

- `: string` significa "esta variável guarda texto"
- `: number` significa "esta variável guarda número"
- `: boolean` significa "esta variável guarda verdadeiro ou falso"
- TypeScript infere tipos quando você atribui um valor inicial
- Se você tentar atribuir um tipo diferente, TypeScript avisa com erro

---

## Exemplo 3: Compilação Manual e Automática

Vamos ver a diferença entre compilar manualmente e usar o modo de observação (watch).

### Setup

Crie um arquivo `contador.ts`:

```typescript
// contador.ts
// Um contador simples para demonstrar compilação

let contagem: number = 0;

contagem = contagem + 1;
console.log("Contagem:", contagem);

contagem = contagem + 1;
console.log("Contagem:", contagem);

contagem = contagem + 1;
console.log("Contagem:", contagem);
```

### Compilação Manual

```bash
# Cada vez que você muda o arquivo, precisa compilar de novo
tsc contador.ts
node contador.js

# Mudou algo? Compile de novo
tsc contador.ts
node contador.js
```

Isso é cansativo para desenvolvimento.

### Compilação Automática (Watch Mode)

```bash
# O -w ou --watch faz o compilador "vigiar" o arquivo
tsc contador.ts -w
```

Agora o terminal fica assim:
```
[12:34:56] Starting compilation in watch mode...
[12:34:56] Found 0 errors. Watching for file changes.
```

**O que acontece:**
1. O compilador fica rodando
2. Você edita e salva o arquivo
3. O compilador automaticamente recompila
4. Você vê os resultados instantaneamente

Para parar o watch mode: pressione `Ctrl + C`

### Comparação

| Método | Quando Usar |
|--------|-------------|
| `tsc arquivo.ts` | Compilação única, antes de enviar para produção |
| `tsc arquivo.ts -w` | Durante desenvolvimento, para ver mudanças rápido |
| `ts-node arquivo.ts` | Testes rápidos, quando não precisa do .js |

---

## Exemplo 4: Erros Comuns

Erros são seus amigos. Sério. Eles te dizem exatamente o que está errado. Vamos ver alguns erros comuns quando você está começando.

### Erro 1: Arquivo Sem Extensão .ts

**O que você fez:**
```bash
# Criou um arquivo chamado "teste" (sem extensão)
# Tentou compilar:
tsc teste
```

**Erro que aparece:**
```
error TS6053: File 'teste.ts' not found.
```

**Solução:**
O arquivo precisa ter extensão `.ts`. Renomeie para `teste.ts`.

---

### Erro 2: TypeScript Não Encontrado

**O que você fez:**
```bash
tsc arquivo.ts
```

**Erro que aparece:**
```
command not found: tsc
# ou
'tsc' is not recognized as an internal or external command
```

**Solução:**
TypeScript não está instalado globalmente. Execute:
```bash
npm install -g typescript
```

---

### Erro 3: Node Não Encontrado

**O que você fez:**
```bash
node arquivo.js
```

**Erro que aparece:**
```
command not found: node
# ou
'node' is not recognized as an internal or external command
```

**Solução:**
Node.js não está instalado. Baixe em https://nodejs.org

---

### Erro 4: Erro de Tipo

**O que você fez:**
```typescript
// No arquivo erro-tipo.ts
let numero: number = 10;
numero = "dez";  // Tentou atribuir texto a uma variável de número
```

**Erro que aparece:**
```
error TS2322: Type 'string' is not assignable to type 'number'.
```

**Explicação:**
Este erro é **proposital**. TypeScript está te protegendo! Você declarou `numero` como `number`, mas tentou colocar um `string` (texto) nele.

**Solução:**
Mantenha o tipo consistente:
```typescript
let numero: number = 10;
numero = 20;  // OK, continua sendo number
```

---

### Erro 5: Variável Não Declarada

**O que você fez:**
```typescript
console.log(mensagem);  // Usando sem declarar
```

**Erro que aparece:**
```
error TS2304: Cannot find name 'mensagem'.
```

**Solução:**
Declare a variável antes de usar:
```typescript
let mensagem: string = "Olá!";
console.log(mensagem);
```

---

### Como Ler Mensagens de Erro

Toda mensagem de erro do TypeScript segue este padrão:

```
arquivo.ts:3:5 - error TS2322: Type 'string' is not assignable to type 'number'.

3     numero = "dez";
          ~~~~~~
```

| Parte | Significado |
|-------|-------------|
| `arquivo.ts` | Nome do arquivo com problema |
| `:3:5` | Linha 3, coluna 5 |
| `TS2322` | Código do erro (pode pesquisar no Google) |
| `Type 'string'...` | Descrição do problema |
| `~~~~~~` | Sublinha onde está o problema |

**Dica:** Copie o código do erro (ex: TS2322) e pesquise no Google. Você vai encontrar explicações e soluções.

---

## Desafio Rápido

Agora é sua vez! Crie um arquivo `meu-perfil.ts` que:

1. Declare uma variável `nome` do tipo `string` com seu nome
2. Declare uma variável `idade` do tipo `number` com sua idade
3. Declare uma variável `profissao` do tipo `string` com sua profissão
4. Use `console.log` para exibir todas as informações

**Exemplo de saída esperada:**
```
Nome: Gabriel Alonso
Idade: 30
Profissao: Engenheiro Mecanico
```

### Dicas

- Use a sintaxe `let variavel: tipo = valor;`
- Lembre-se que textos ficam entre aspas
- Números ficam sem aspas
- `console.log` pode receber múltiplos argumentos separados por vírgula

### Solução (tente antes de olhar!)

<details>
<summary>Clique para ver a solução</summary>

```typescript
// meu-perfil.ts

// Declarando as variáveis com seus tipos
let nome: string = "Gabriel Alonso";
let idade: number = 30;
let profissao: string = "Engenheiro Mecanico";

// Exibindo as informações
console.log("Nome:", nome);
console.log("Idade:", idade);
console.log("Profissao:", profissao);
```

Para executar:
```bash
ts-node meu-perfil.ts
```

</details>

---

## Resumo

1. **Hello World** usa `console.log()` para exibir mensagens
2. **Variáveis tipadas** usam a sintaxe `let nome: tipo = valor`
3. **Watch mode** (`tsc -w`) recompila automaticamente quando você salva
4. **Erros são informativos** - leia com calma, eles dizem exatamente o problema
5. **ts-node** é um atalho que compila e executa em um passo

---

## Próximo Passo

No próximo arquivo (`04-mini-projeto.md`), você vai configurar todo o ambiente passo a passo e garantir que está tudo funcionando. É o momento de colocar a mão na massa de verdade!

---

*Capítulo 00 - Parte 3 de 4*
