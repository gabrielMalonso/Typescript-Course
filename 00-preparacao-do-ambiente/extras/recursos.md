# Recursos Complementares - Capítulo 00: Preparação do Ambiente

Material adicional para aprofundar seus conhecimentos e praticar mais.

---

## Documentação Oficial

### TypeScript

| Recurso | Link | Descrição |
|---------|------|-----------|
| TypeScript Handbook | https://www.typescriptlang.org/docs/handbook/ | Guia oficial completo do TypeScript |
| Básico do TypeScript | https://www.typescriptlang.org/docs/handbook/2/basic-types.html | Tipos básicos explicados |
| TypeScript para Iniciantes | https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html | Introdução para quem nunca programou |
| TS para Programadores JS | https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html | TypeScript em 5 minutos |

### Ferramentas

| Recurso | Link | Descrição |
|---------|------|-----------|
| TS Playground | https://www.typescriptlang.org/play | Editor online para testar TypeScript |
| Node.js | https://nodejs.org | Download oficial do Node.js |
| VS Code | https://code.visualstudio.com | Editor de código recomendado |

### Extensões Úteis para VS Code

| Extensão | Descrição |
|----------|-----------|
| ESLint | Detecta erros e problemas de estilo no código |
| Prettier | Formata o código automaticamente |
| Error Lens | Mostra erros diretamente na linha do código |
| Code Runner | Executa código com um clique |

---

## Exercícios Extras Opcionais

### Exercício Extra 1: Explorador de Tipos no Playground

**Objetivo:** Familiarizar-se com o TS Playground e entender a compilação.

**Instruções:**

1. Acesse https://www.typescriptlang.org/play

2. Digite o seguinte código no painel esquerdo:

```typescript
let produto: string = "Notebook";
let preco: number = 2500.99;
let disponivel: boolean = true;
let quantidade: number = 10;

console.log("Produto:", produto);
console.log("Preço: R$", preco);
console.log("Disponível:", disponivel);
console.log("Em estoque:", quantidade, "unidades");
```

3. Observe o painel direito (JavaScript gerado):
   - O que mudou no código?
   - O que foi removido?

4. Clique em "Run" para executar e veja a saída no console.

5. Agora, provoque um erro - altere a linha 2 para:
```typescript
let preco: number = "dois mil";
```

6. Observe o erro que aparece. Corrija-o.

**Reflexão:**
- Por que as anotações de tipo (`: string`, `: number`) desaparecem no JavaScript?
- O JavaScript funcionaria se você copiasse o código TypeScript diretamente?

---

### Exercício Extra 2: Projeto Organizador

**Objetivo:** Praticar o fluxo completo de trabalho com TypeScript.

**Instruções:**

1. Crie uma pasta chamada `exercicio-extra` dentro da pasta do capítulo.

2. Dentro dela, crie um arquivo `dados-pessoais.ts` com:

```typescript
// Informações pessoais (use seus dados ou fictícios)
let nomeCompleto: string = "Seu Nome Aqui";
let anoNascimento: number = 2000;
let cidade: string = "Sua Cidade";
let estudante: boolean = true;

// Cálculo automático da idade (ano atual - ano de nascimento)
let anoAtual: number = 2024;
let idade: number = anoAtual - anoNascimento;

// Exibição formatada
console.log("=== DADOS PESSOAIS ===");
console.log("Nome:", nomeCompleto);
console.log("Idade:", idade, "anos");
console.log("Cidade:", cidade);
console.log("É estudante?", estudante ? "Sim" : "Não");
console.log("======================");
```

3. Abra o terminal na pasta `exercicio-extra`.

4. Compile o arquivo:
```bash
tsc dados-pessoais.ts
```

5. Execute o resultado:
```bash
node dados-pessoais.js
```

6. Agora, ative o watch mode:
```bash
tsc dados-pessoais.ts --watch
```

7. Com o watch mode ativo, faça as seguintes alterações (uma por vez, salvando após cada uma):
   - Mude seu nome
   - Mude o ano de nascimento
   - Execute `node dados-pessoais.js` em outro terminal para ver as mudanças

8. **Desafio:** Adicione mais duas variáveis:
   - `profissao` (string)
   - `temExperiencia` (boolean)

   E inclua-as na exibição.

**Entrega esperada:**
- Arquivo `dados-pessoais.ts` com seus dados
- Arquivo `dados-pessoais.js` gerado pela compilação
- Código funcionando sem erros

---

## Glossário do Capítulo

### Termos Essenciais

| Termo | Definição |
|-------|-----------|
| **Algoritmo** | Sequência de passos lógicos para resolver um problema. Como uma receita de bolo para o computador. |
| **Código-fonte** | O texto que o programador escreve. É legível por humanos e precisa ser traduzido para o computador entender. |
| **Compilador** | Programa que traduz código de uma linguagem para outra. O `tsc` traduz TypeScript para JavaScript. |
| **Compilação** | O processo de traduzir código-fonte para outro formato. No nosso caso, de `.ts` para `.js`. |
| **Console** | Área onde o programa exibe mensagens de texto. Usamos `console.log()` para escrever nele. |
| **Extensão de arquivo** | O sufixo após o ponto no nome do arquivo. `.ts` indica TypeScript, `.js` indica JavaScript. |
| **Inferência de tipos** | Capacidade do TypeScript de descobrir o tipo automaticamente baseado no valor atribuído. |
| **JavaScript (JS)** | Linguagem de programação que roda em navegadores e no Node.js. É o que o TypeScript vira após compilar. |
| **Node.js** | Ambiente que permite executar JavaScript fora do navegador, direto no seu computador. |
| **Runtime** | O ambiente onde o código é executado. O Node.js é o runtime que usamos para rodar nosso JavaScript. |
| **Terminal** | Interface de texto para interagir com o computador usando comandos. Também chamado de console ou prompt. |
| **Tipagem dinâmica** | Sistema onde o tipo da variável pode mudar durante a execução. JavaScript usa tipagem dinâmica. |
| **Tipagem estática** | Sistema onde o tipo da variável é definido e verificado antes da execução. TypeScript usa tipagem estática. |
| **Tipo** | Categoria que define quais valores uma variável pode armazenar: `string` (texto), `number` (número), `boolean` (verdadeiro/falso). |
| **TypeScript (TS)** | Linguagem que adiciona tipos ao JavaScript. Ajuda a encontrar erros antes de executar o código. |
| **VS Code** | Visual Studio Code - editor de código gratuito da Microsoft, muito usado para programar. |
| **Watch mode** | Modo do compilador que fica "vigiando" os arquivos e recompila automaticamente quando você salva. |

### Comandos do Terminal

| Comando | O que faz |
|---------|-----------|
| `node --version` | Mostra a versão do Node.js instalada |
| `tsc --version` | Mostra a versão do TypeScript instalada |
| `npm install -g typescript` | Instala o TypeScript globalmente |
| `tsc arquivo.ts` | Compila um arquivo TypeScript |
| `tsc --watch` | Ativa o modo de vigilância (recompila ao salvar) |
| `node arquivo.js` | Executa um arquivo JavaScript |
| `cd pasta` | Entra em uma pasta |
| `ls` (mac/linux) / `dir` (windows) | Lista arquivos da pasta atual |
| `pwd` (mac/linux) / `cd` (windows) | Mostra a pasta atual |

---

## Prévia do Próximo Capítulo

### Capítulo 01: Variáveis e Constantes

No próximo capítulo, você vai aprender:

#### Variáveis com `let`

```typescript
let pontos: number = 0;
pontos = 100;  // Pode mudar o valor
pontos = 250;  // Pode mudar novamente
```

Variáveis são como caixas que guardam valores. Com `let`, você pode trocar o conteúdo da caixa.

#### Constantes com `const`

```typescript
const PI: number = 3.14159;
const NOME_APP: string = "Meu App";
// PI = 3.14;  // ERRO! Constantes não podem mudar
```

Constantes são valores que nunca mudam após serem definidos. Útil para configurações e valores fixos.

#### Quando usar cada um?

| Use `let` quando... | Use `const` quando... |
|--------------------|-----------------------|
| O valor vai mudar | O valor nunca muda |
| Contadores | Configurações |
| Acumuladores | Valores matemáticos (PI) |
| Status que atualiza | IDs fixos |

#### Os tipos primitivos em detalhes

```typescript
// string - textos
const saudacao: string = "Olá!";
const frase: string = 'Também funciona com aspas simples';
const template: string = `Texto com ${variavel}`;

// number - números (inteiros e decimais)
const idade: number = 25;
const altura: number = 1.75;
const negativo: number = -10;

// boolean - verdadeiro ou falso
const ativo: boolean = true;
const finalizado: boolean = false;
```

#### Conceitos que serão abordados

- Diferença entre `let`, `const` e `var`
- Escopo de variáveis
- Boas práticas de nomenclatura
- Conversão entre tipos
- Template strings

---

## Checklist de Preparação para o Próximo Capítulo

Antes de avançar, certifique-se de que você:

- [ ] Consegue instalar e verificar versões (node, tsc)
- [ ] Sabe criar um arquivo `.ts` no VS Code
- [ ] Consegue compilar com `tsc arquivo.ts`
- [ ] Consegue executar com `node arquivo.js`
- [ ] Entende o que é tipagem estática
- [ ] Sabe usar o watch mode
- [ ] Consegue identificar e corrigir erros de tipo básicos

Se marcou todos os itens, você está pronto para o próximo capítulo!

---

## Dica de Estudo

> **Prática constante supera teoria excessiva.**

- Digite os exemplos manualmente (não copie e cole)
- Experimente modificar os códigos para ver o que acontece
- Provoque erros de propósito para entender as mensagens
- Use o TS Playground para testar ideias rapidamente
- Refaça os exercícios até conseguir fazer sem consultar

Bons estudos!
