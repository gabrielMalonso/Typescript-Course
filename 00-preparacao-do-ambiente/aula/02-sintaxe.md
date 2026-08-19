# Capítulo 00 - Preparação do Ambiente

## Parte 2: Sintaxe e Comandos

---

## Objetivo

Este arquivo foca nos **aspectos práticos**: estrutura de arquivos, extensões, comandos do terminal e como organizar seu primeiro projeto. Como este é o capítulo de setup, não vamos escrever código complexo ainda - isso vem nos próximos capítulos.

---

## 1. Estrutura Básica de um Arquivo TypeScript

### A Extensão .ts

Arquivos TypeScript usam a extensão **`.ts`** (ou `.tsx` para arquivos com React, mas ignore isso por enquanto).

```
meu-programa.ts     ✓ Correto - arquivo TypeScript
meu-programa.js     ✗ Isso é JavaScript puro
meu-programa.txt    ✗ O compilador nem olha para isso
```

### Anatomia de um Arquivo Simples

```typescript
// ============================================
// meu-primeiro-arquivo.ts
// ============================================

// 1. COMENTÁRIOS
// Linhas que começam com // são ignoradas pelo compilador
// Use para explicar seu código (pra você mesmo do futuro)

/*
   Comentários de múltiplas linhas
   ficam entre barra-asterisco
   e asterisco-barra
*/

// 2. CÓDIGO EXECUTÁVEL
// Isso é o que realmente "faz algo"
console.log("Olá, mundo!");

// 3. DECLARAÇÕES
// Criar variáveis, funções, etc.
const meuNome: string = "Gabriel";
const minhaIdade: number = 30;

// 4. USO DAS DECLARAÇÕES
console.log(meuNome);
console.log(minhaIdade);
```

### Ordem Importa?

Em geral, sim. O código é lido de cima para baixo. Você precisa **declarar** algo antes de **usar**.

```typescript
// ERRADO - usando antes de declarar
console.log(nome);  // Erro! 'nome' não existe ainda
const nome: string = "Gabriel";

// CERTO - declarar primeiro, usar depois
const nome: string = "Gabriel";
console.log(nome);  // Funciona!
```

---

## 2. Ferramentas Necessárias

### O Que Você Precisa Instalar

| Ferramenta | O Que É | Por Que Precisa |
|------------|---------|-----------------|
| **Node.js** | Ambiente de execução JavaScript | Para rodar JavaScript fora do navegador |
| **npm** | Gerenciador de pacotes | Vem junto com Node.js, instala bibliotecas |
| **TypeScript** | O compilador (tsc) | Transforma .ts em .js |
| **VS Code** | Editor de código | Para escrever código com conforto |

### Analogia: A Oficina

- **Node.js** = A bancada de trabalho (onde as coisas acontecem)
- **npm** = O almoxarifado (onde você pega ferramentas e peças)
- **TypeScript** = Uma ferramenta especializada (que você pega no almoxarifado)
- **VS Code** = Sua caixa de ferramentas pessoal (onde você organiza tudo)

---

## 3. Comandos do Terminal

### O Que é o Terminal?

O terminal (ou prompt de comando) é uma interface de texto para conversar com o computador. Em vez de clicar em ícones, você digita comandos.

**Como abrir:**
- **Mac:** Busque por "Terminal" ou use Cmd + Espaço e digite "terminal"
- **Windows:** Busque por "PowerShell" ou "cmd"
- **VS Code:** Use Ctrl + ` (crase) para abrir o terminal integrado

### Comandos de Navegação Básica

```bash
# Ver onde você está (pasta atual)
pwd

# Listar arquivos da pasta atual
ls              # Mac/Linux
dir             # Windows

# Entrar em uma pasta
cd nome-da-pasta

# Voltar uma pasta
cd ..

# Criar uma pasta
mkdir nome-da-pasta

# Limpar a tela do terminal
clear           # Mac/Linux
cls             # Windows
```

### Comandos do Node.js e npm

```bash
# Verificar se Node está instalado (mostra a versão)
node --version
# ou
node -v

# Verificar versão do npm
npm --version
# ou
npm -v

# Instalar TypeScript globalmente (uma vez só)
npm install -g typescript

# Verificar se TypeScript está instalado
tsc --version
# ou
tsc -v
```

### Comandos do TypeScript

```bash
# Compilar um arquivo TypeScript
tsc arquivo.ts
# Resultado: cria arquivo.js na mesma pasta

# Compilar e observar mudanças (watch mode)
tsc arquivo.ts --watch
# ou
tsc arquivo.ts -w
# O compilador fica "escutando" - cada vez que você salva, recompila

# Executar o JavaScript gerado
node arquivo.js
```

### Usando ts-node (Atalho)

O `ts-node` permite rodar TypeScript diretamente, sem compilar manualmente:

```bash
# Instalar ts-node globalmente
npm install -g ts-node

# Rodar um arquivo TypeScript diretamente
ts-node arquivo.ts
# Compila e executa em um só passo!
```

---

## 4. Tabela de Referência Rápida

### Comandos Mais Usados

| Comando | O Que Faz | Quando Usar |
|---------|-----------|-------------|
| `node -v` | Mostra versão do Node | Verificar instalação |
| `npm -v` | Mostra versão do npm | Verificar instalação |
| `tsc -v` | Mostra versão do TypeScript | Verificar instalação |
| `npm install -g typescript` | Instala TypeScript globalmente | Uma vez só |
| `npm install -g ts-node` | Instala ts-node globalmente | Uma vez só |
| `tsc arquivo.ts` | Compila TS para JS | Quando quer gerar o .js |
| `tsc arquivo.ts -w` | Compila e observa mudanças | Durante desenvolvimento |
| `node arquivo.js` | Executa JavaScript | Depois de compilar |
| `ts-node arquivo.ts` | Compila e executa direto | Atalho para testes rápidos |

### Extensões de Arquivo

| Extensão | Tipo | Quem Cria | Quem Usa |
|----------|------|-----------|----------|
| `.ts` | TypeScript | Você | Compilador (tsc) |
| `.js` | JavaScript | Compilador | Node.js / Navegador |
| `.tsx` | TypeScript + JSX | Você | Projetos React |
| `.json` | Configuração | Você ou ferramentas | Várias ferramentas |

---

## 5. Estrutura de um Projeto Simples

### Projeto Mínimo (Um Arquivo)

```
meu-projeto/
└── hello.ts
```

Só isso. Para começar, você só precisa de um arquivo `.ts`.

### Projeto Organizado (Recomendado)

```
meu-projeto/
├── src/                    # Código fonte (TypeScript)
│   └── index.ts
├── dist/                   # Código compilado (JavaScript)
│   └── index.js
├── package.json            # Configuração do projeto
└── tsconfig.json           # Configuração do TypeScript
```

### O Que é Cada Coisa?

**`src/` (source):** Onde fica seu código TypeScript. É onde você trabalha.

**`dist/` (distribution):** Onde o código compilado vai parar. Você não edita isso.

**`package.json`:** Arquivo que descreve seu projeto - nome, versão, dependências. Criado com `npm init`.

**`tsconfig.json`:** Configurações do TypeScript - como compilar, para qual versão de JavaScript, etc. Criado com `tsc --init`.

### Criando a Estrutura Inicial

```bash
# Criar pasta do projeto
mkdir meu-projeto
cd meu-projeto

# Criar estrutura de pastas
mkdir src
mkdir dist

# Inicializar projeto npm (cria package.json)
npm init -y

# Inicializar TypeScript (cria tsconfig.json)
tsc --init

# Renomear arquivo ou pasta
mv nome-antigo nome-novo

# Deletar um arquivo
rm arquivo.txt

# Deletar uma pasta vazia
rmdir nome-da-pasta

# Deletar uma pasta com todo o conteúdo
rm -r nome-da-pasta

Para pedir confirmação antes de cada exclusão:

rm -i arquivo.txt
rm -ri nome-da-pasta

Cuidado: rm não envia para a Lixeira; a exclusão normalmente é permanente. Evite rm -rf até ter certeza absoluta do caminho.
```

Por enquanto, não se preocupe com `package.json` e `tsconfig.json`. Vamos usar a forma mais simples: um arquivo solto, compilado diretamente.

---

## 6. Fluxo de Trabalho Básico

### Passo a Passo para Criar e Executar

```bash
# 1. Criar o arquivo TypeScript
# (use o VS Code ou qualquer editor)

# 2. Escrever código no arquivo
# Salve como: hello.ts

# 3. Compilar
tsc hello.ts

# 4. Executar o JavaScript gerado
node hello.js

# OU, com ts-node (passos 3 e 4 juntos):
ts-node hello.ts
```

### Diagrama do Fluxo

```
[Você]
   │
   ▼
[Escreve hello.ts]
   │
   ▼
[Salva o arquivo]
   │
   ▼
[Terminal: tsc hello.ts]
   │
   ▼
[Compilador verifica erros]
   │
   ├─► Se tem erro: Mostra mensagem, não gera .js
   │
   └─► Se não tem erro: Gera hello.js
          │
          ▼
       [Terminal: node hello.js]
          │
          ▼
       [Programa executa!]
```

---

## 7. Usando o VS Code

### Extensões Recomendadas

Depois de instalar o VS Code, adicione estas extensões:

| Extensão | Para Quê |
|----------|----------|
| **ESLint** | Detecta problemas no código |
| **Prettier** | Formata código automaticamente |
| **Error Lens** | Mostra erros inline (muito útil!) |
| **Material Icon Theme** | Ícones bonitos (opcional) |

### Atalhos Úteis

| Atalho (Mac / Windows) | O Que Faz |
|------------------------|-----------|
| Cmd+S / Ctrl+S | Salvar arquivo |
| Cmd+` / Ctrl+` | Abrir/fechar terminal |
| Cmd+P / Ctrl+P | Buscar arquivo pelo nome |
| Cmd+Shift+P / Ctrl+Shift+P | Paleta de comandos |
| Cmd+/ / Ctrl+/ | Comentar/descomentar linha |

### Abrindo uma Pasta no VS Code

```bash
# No terminal, navegue até a pasta do projeto
cd meu-projeto

# Abra o VS Code nessa pasta
code .
```

O ponto (`.`) significa "pasta atual".

---

## 8. TS Playground (Alternativa Online)

Se você quiser testar código TypeScript **sem instalar nada**, use o playground oficial:

**https://www.typescriptlang.org/play**

### Vantagens do Playground

- Não precisa instalar nada
- Veja o JavaScript gerado em tempo real
- Erros aparecem instantaneamente
- Bom para testar snippets rápidos

### Limitações

- Não salva arquivos no seu computador
- Não executa o código (só compila)
- Não serve para projetos reais

Use o Playground para experimentar. Use seu ambiente local para projetos de verdade.

---

## Resumo

1. **Arquivos TypeScript** usam extensão `.ts`

2. **Ferramentas necessárias**: Node.js, npm, TypeScript (tsc), VS Code

3. **Fluxo básico**: Escrever `.ts` → Compilar com `tsc` → Executar `.js` com `node`

4. **Atalho**: `ts-node arquivo.ts` compila e executa em um passo

5. **VS Code** é o editor recomendado - instale extensões para melhor experiência

6. **TS Playground** é ótimo para testes rápidos sem instalação

---

## Próximo Passo

No próximo arquivo (`03-exemplos.md`), você vai ver exemplos práticos:
- Hello World passo a passo
- Prévia de variáveis tipadas
- Erros comuns e como resolver

Mãos à obra!

---

*Capítulo 00 - Parte 2 de 4*
