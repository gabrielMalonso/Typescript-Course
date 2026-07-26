# Erros Comuns - Capítulo 00: Preparação do Ambiente

Este guia documenta os erros mais frequentes que iniciantes cometem ao configurar e usar TypeScript pela primeira vez. Use-o como referência quando encontrar problemas.

---

## Erro 1: TypeScript/Node não reconhecido no terminal

### O que acontece

Ao tentar executar `tsc` ou `node`, o terminal exibe uma mensagem de erro indicando que o comando não foi encontrado.

### Comando com erro

```bash
tsc --version
```

### Mensagem de erro

**Windows (CMD):**
```
'tsc' is not recognized as an internal or external command,
operable program or batch file.
```

**Windows (PowerShell):**
```
tsc : The term 'tsc' is not recognized as the name of a cmdlet, function,
script file, or operable program.
```

**macOS/Linux:**
```
zsh: command not found: tsc
```

### Por que está errado

O TypeScript (ou Node.js) não foi instalado corretamente, ou o caminho de instalação não foi adicionado às variáveis de ambiente do sistema (PATH).

### Como corrigir

1. **Verifique se o Node.js está instalado:**
   ```bash
   node --version
   ```
   Se não funcionar, baixe e instale o Node.js em: https://nodejs.org

2. **Instale o TypeScript globalmente:**
   ```bash
   npm install -g typescript
   ```

3. **Feche e reabra o terminal** após a instalação.

4. **Verifique a instalação:**
   ```bash
   tsc --version
   ```

### Como evitar

- Sempre reinicie o terminal após instalar Node.js ou TypeScript
- No Windows, marque a opção "Add to PATH" durante a instalação do Node.js
- Use o instalador oficial do Node.js (não versões portáteis)

---

## Erro 2: Tentar executar arquivo .ts diretamente com Node

### O que acontece

Você tenta executar um arquivo TypeScript diretamente com o Node.js, mas recebe erros de sintaxe.

### Comando com erro

```bash
node meu-arquivo.ts
```

### Código do arquivo (meu-arquivo.ts)

```typescript
let mensagem: string = "Olá, TypeScript!";
console.log(mensagem);
```

### Mensagem de erro

```
/Users/usuario/projeto/meu-arquivo.ts:1
let mensagem: string = "Olá, TypeScript!";
            ^

SyntaxError: Unexpected token ':'
    at wrapSafe (internal/modules/cjs/loader.js:915:16)
```

### Por que está errado

O Node.js executa JavaScript, não TypeScript. Ele não entende a sintaxe de tipos (`: string`). O TypeScript precisa ser **compilado** para JavaScript antes de ser executado.

### Comando correto

```bash
# Passo 1: Compilar o TypeScript para JavaScript
tsc meu-arquivo.ts

# Passo 2: Executar o JavaScript gerado
node meu-arquivo.js
```

### Como evitar

- Lembre-se do fluxo: **Escrever .ts** -> **Compilar com tsc** -> **Executar .js com node**
- Use o watch mode (`tsc --watch`) para compilar automaticamente
- Considere usar `ts-node` para desenvolvimento (executa TS diretamente)

---

## Erro 3: Esquecer de compilar antes de executar

### O que acontece

Você faz alterações no arquivo `.ts`, mas ao executar o `.js`, as mudanças não aparecem.

### Cenário do erro

```typescript
// meu-arquivo.ts - VERSÃO ATUALIZADA
let nome: string = "Maria";  // Mudou de "João" para "Maria"
console.log(nome);
```

```bash
# Esqueceu de compilar!
node meu-arquivo.js
```

### Saída (incorreta)

```
João
```

### Por que está errado

O arquivo `.js` ainda contém o código antigo. Você editou o `.ts`, mas não recompilou para gerar um novo `.js`.

### Comando correto

```bash
# Compilar novamente após cada alteração
tsc meu-arquivo.ts

# Agora executar
node meu-arquivo.js
```

### Saída (correta)

```
Maria
```

### Como evitar

**Use o watch mode!** Ele recompila automaticamente quando você salva o arquivo:

```bash
tsc meu-arquivo.ts --watch
```

Ou para todos os arquivos do projeto:

```bash
tsc --watch
```

Mantenha o terminal com `--watch` aberto enquanto desenvolve.

---

## Erro 4: Erros de tipo - Atribuir valor incompatível

### O que acontece

O compilador TypeScript rejeita seu código porque você está atribuindo um valor de tipo diferente do declarado.

### Código com erro

```typescript
let idade: number = 25;
idade = "vinte e cinco";  // ERRO!

let ativo: boolean = true;
ativo = 1;  // ERRO!

let nome: string = "Ana";
nome = 123;  // ERRO!
```

### Mensagem de erro

```
error TS2322: Type 'string' is not assignable to type 'number'.

2 idade = "vinte e cinco";
  ~~~~~

error TS2322: Type 'number' is not assignable to type 'boolean'.

5 ativo = 1;
  ~~~~~

error TS2322: Type 'number' is not assignable to type 'string'.

8 nome = 123;
  ~~~~
```

### Por que está errado

TypeScript é uma linguagem com **tipagem estática**. Quando você declara uma variável com um tipo, ela só pode receber valores daquele tipo.

### Código correto

```typescript
let idade: number = 25;
idade = 30;  // OK - number para number

let ativo: boolean = true;
ativo = false;  // OK - boolean para boolean

let nome: string = "Ana";
nome = "Maria";  // OK - string para string
```

### Como evitar

- Preste atenção ao tipo declarado da variável
- Use a inferência de tipos quando possível (deixe o TS descobrir o tipo)
- Leia atentamente as mensagens de erro - elas indicam exatamente o problema

---

## Erro 5: Arquivo não encontrado (pasta errada)

### O que acontece

Você tenta compilar ou executar um arquivo, mas o terminal não o encontra.

### Comando com erro

```bash
tsc meu-arquivo.ts
```

### Mensagem de erro

```
error TS6053: File 'meu-arquivo.ts' not found.
  The file is in the program because:
    Root file specified for compilation
```

Ou com node:

```bash
node meu-arquivo.js
```

```
node:internal/modules/cjs/loader:1080
  throw err;
  ^

Error: Cannot find module '/Users/usuario/meu-arquivo.js'
```

### Por que está errado

O terminal está em uma pasta diferente de onde o arquivo está salvo.

### Como corrigir

1. **Verifique sua localização atual:**
   ```bash
   pwd     # macOS/Linux
   cd      # Windows (sem argumentos)
   ```

2. **Liste os arquivos da pasta atual:**
   ```bash
   ls      # macOS/Linux
   dir     # Windows
   ```

3. **Navegue até a pasta correta:**
   ```bash
   cd /caminho/para/sua/pasta
   ```

4. **Ou use o caminho completo do arquivo:**
   ```bash
   tsc /Users/usuario/projetos/meu-arquivo.ts
   ```

### Comando correto

```bash
# Navegar para a pasta do projeto
cd /Users/usuario/projetos/typescript-curso

# Verificar se o arquivo existe
ls

# Compilar
tsc meu-arquivo.ts
```

### Como evitar

- Abra o terminal integrado do VS Code (Ctrl+` ou Cmd+`) - ele já abre na pasta do projeto
- Use `pwd` ou `cd` para verificar onde você está antes de executar comandos
- Organize seus arquivos em uma pasta dedicada ao curso

---

## Checklist Anti-Erros

Antes de pedir ajuda, verifique cada item:

### Instalação
- [ ] Node.js está instalado? (`node --version`)
- [ ] TypeScript está instalado? (`tsc --version`)
- [ ] Reiniciei o terminal após instalar?

### Compilação
- [ ] Estou na pasta correta? (`pwd` ou `ls`)
- [ ] O arquivo .ts existe? (`ls *.ts`)
- [ ] Compilei o arquivo? (`tsc arquivo.ts`)
- [ ] A compilação foi bem-sucedida? (sem mensagens de erro)

### Execução
- [ ] Estou executando o arquivo .js (não .ts)?
- [ ] O arquivo .js foi gerado? (`ls *.js`)
- [ ] Recompilei após a última alteração?

### Código
- [ ] Os tipos estão corretos?
- [ ] Não há erros de digitação?
- [ ] Salvei o arquivo antes de compilar?

---

## Tabela de Mensagens de Erro Comuns

| Mensagem de Erro | Significado | Solução |
|------------------|-------------|---------|
| `'tsc' is not recognized` | TypeScript não instalado ou não está no PATH | Instale com `npm install -g typescript` e reinicie o terminal |
| `SyntaxError: Unexpected token ':'` | Tentou executar .ts com node | Compile primeiro: `tsc arquivo.ts`, depois `node arquivo.js` |
| `TS6053: File not found` | Arquivo não existe ou pasta errada | Verifique o nome e navegue para a pasta correta |
| `TS2322: Type 'X' is not assignable to type 'Y'` | Tipo incompatível | Use um valor do tipo correto |
| `TS2304: Cannot find name 'X'` | Variável não declarada | Declare a variável antes de usar |
| `TS1005: ';' expected` | Falta ponto e vírgula ou erro de sintaxe | Verifique a sintaxe da linha anterior |
| `TS2339: Property 'X' does not exist` | Propriedade não existe no tipo | Verifique o nome da propriedade ou o tipo do objeto |
| `TS7006: Parameter 'X' implicitly has an 'any' type` | Parâmetro sem tipo definido | Adicione o tipo ao parâmetro: `(x: number)` |
| `Cannot find module` | Node não encontrou o arquivo JS | Verifique se compilou e se está na pasta certa |
| `ENOENT: no such file or directory` | Arquivo ou pasta não existe | Verifique o caminho e nome do arquivo |

---

## Dica Final

Quando encontrar um erro:

1. **Leia a mensagem** - O TypeScript tem mensagens descritivas
2. **Identifique o arquivo e linha** - O erro mostra onde está o problema
3. **Procure o código do erro** - Ex: TS2322, TS6053
4. **Consulte este guia** - A maioria dos erros iniciais está aqui
5. **Pesquise o código** - Se não encontrar, pesquise "TS2322" no Google

Erros são normais e fazem parte do aprendizado. Cada erro resolvido é conhecimento adquirido!
