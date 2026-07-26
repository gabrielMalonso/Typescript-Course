# Capítulo 00 - Preparação do Ambiente

## Parte 4: Mini-Projeto

---

## Mini-Projeto: Configurando Meu Ambiente de Desenvolvimento

### Objetivo

Ao final deste mini-projeto, você terá:

- Node.js instalado e funcionando
- VS Code configurado para TypeScript
- TypeScript instalado globalmente
- Pasta do curso organizada
- Primeiro programa executado com sucesso
- Confianca de que tudo funciona

Este e o momento de garantir que sua "oficina" esta pronta para trabalhar.

---

## Passo 1: Instalar o Node.js

### O Que e Node.js?

Node.js permite executar JavaScript fora do navegador. E tambem necessario para instalar o TypeScript via npm.

### Como Instalar

1. Acesse: **https://nodejs.org**
2. Baixe a versao **LTS** (Long Term Support) - e a mais estavel
3. Execute o instalador
4. Siga o assistente (pode aceitar todas as opcoes padrao)

### Verificar Instalacao

Abra o terminal e digite:

```bash
node --version
```

Voce deve ver algo como:
```
v20.10.0
```

O numero pode ser diferente, mas se aparecer uma versao, esta funcionando.

Verifique tambem o npm (vem junto com Node):

```bash
npm --version
```

Deve aparecer algo como:
```
10.2.3
```

### Se Deu Errado

| Problema | Solucao |
|----------|---------|
| "command not found" | Reinicie o terminal. Se persistir, reinstale o Node.js |
| Versao muito antiga | Desinstale a versao antiga e instale a nova |
| Permissao negada | No Mac/Linux, pode precisar de `sudo`. No Windows, execute como administrador |

---

## Passo 2: Instalar o VS Code

### O Que e VS Code?

Visual Studio Code e um editor de codigo gratuito da Microsoft. E o mais popular entre desenvolvedores, especialmente para TypeScript (que tambem e da Microsoft).

### Como Instalar

1. Acesse: **https://code.visualstudio.com**
2. Baixe a versao para seu sistema operacional
3. Execute o instalador
4. Siga o assistente

### Abrindo o VS Code pela Primeira Vez

1. Abra o VS Code
2. Voce vera uma tela de boas-vindas
3. Pode fechar as abas de boas-vindas por enquanto

### Instalando Extensoes Recomendadas

Extensoes adicionam funcionalidades ao VS Code. Para TypeScript, recomendo:

1. Clique no icone de quadradinhos na barra lateral esquerda (ou Ctrl+Shift+X)
2. Procure e instale:
   - **Error Lens** - mostra erros diretamente no codigo
   - **Prettier - Code formatter** - formata codigo automaticamente

### Habilitando o Terminal Integrado

1. No VS Code, pressione Ctrl+` (crase) ou Cmd+` no Mac
2. Um terminal aparece na parte inferior
3. Voce pode executar comandos diretamente ali

---

## Passo 3: Instalar o TypeScript Globalmente

### O Que Significa "Globalmente"?

Instalar globalmente significa que o TypeScript estara disponivel em qualquer pasta do seu computador, nao apenas em um projeto especifico.

### Comando de Instalacao

No terminal (pode ser o do VS Code), execute:

```bash
npm install -g typescript
```

Explicacao:
- `npm` = gerenciador de pacotes
- `install` = instalar
- `-g` = globalmente
- `typescript` = o pacote que queremos

### Verificar Instalacao

```bash
tsc --version
```

Deve aparecer algo como:
```
Version 5.3.3
```

### Instalar ts-node (Opcional, mas Recomendado)

```bash
npm install -g ts-node
```

Verificar:
```bash
ts-node --version
```

---

## Passo 4: Criar a Pasta do Curso

### Estrutura Sugerida

Crie uma pasta para o curso em um lugar facil de encontrar:

```bash
# Navegue para onde quer criar (exemplo: Documents)
cd ~/Documents

# Crie a pasta do curso
mkdir typescript-curso

# Entre na pasta
cd typescript-curso

# Crie subpastas para organizacao
mkdir capitulo-00
```

### Abrindo no VS Code

```bash
# Estando na pasta typescript-curso, abra no VS Code
code .
```

Ou abra o VS Code e use File > Open Folder para selecionar a pasta.

---

## Passo 5: Criar Seu Primeiro Arquivo TypeScript

### Criando o Arquivo

1. No VS Code, com a pasta do curso aberta
2. Clique com botao direito na pasta `capitulo-00`
3. Selecione "New File"
4. Nomeie como `hello-world.ts`

### Escrevendo o Codigo

Digite o seguinte codigo no arquivo:

```typescript
// ============================================
// Meu Primeiro Programa em TypeScript!
// Autor: Gabriel Alonso
// Data: Janeiro/2025
// ============================================

// Este programa demonstra que meu ambiente esta funcionando
// e que eu consigo escrever, compilar e executar TypeScript.

// --------------------------------------------
// Secao 1: Mensagem de boas-vindas
// --------------------------------------------

// console.log exibe texto no terminal
// E a funcao mais basica para ver resultados
console.log("=================================");
console.log("   Bem-vindo ao Curso de TypeScript!");
console.log("=================================");
console.log("");  // linha em branco

// --------------------------------------------
// Secao 2: Minhas informacoes (com tipos!)
// --------------------------------------------

// Declarando variaveis com tipos explicitos
// Isso e o que torna TypeScript especial
let nomeAluno: string = "Gabriel Alonso";
let formacao: string = "Engenheiro Mecanico";
let capitulo: number = 0;
let ambientePronto: boolean = true;

// Exibindo as informacoes
console.log("Aluno:", nomeAluno);
console.log("Formacao:", formacao);
console.log("Capitulo atual:", capitulo);
console.log("Ambiente configurado?", ambientePronto);
console.log("");

// --------------------------------------------
// Secao 3: Confirmacao final
// --------------------------------------------

// Uma verificacao simples usando if (veremos em detalhes depois)
if (ambientePronto) {
    console.log("Tudo certo! Ambiente pronto para estudar.");
    console.log("Proximo passo: Capitulo 01 - Variaveis e Constantes");
} else {
    console.log("Algo deu errado. Revise os passos anteriores.");
}

console.log("");
console.log("=================================");
console.log("   Fim do Capitulo 00");
console.log("=================================");
```

### Salvando

Pressione Ctrl+S (ou Cmd+S no Mac) para salvar.

---

## Passo 6: Compilar e Executar

### Metodo 1: Compilar + Executar (Dois Passos)

No terminal do VS Code:

```bash
# Navegue ate a pasta do capitulo
cd capitulo-00

# Compile o TypeScript para JavaScript
tsc hello-world.ts

# Execute o JavaScript gerado
node hello-world.js
```

### Metodo 2: Usar ts-node (Um Passo)

```bash
# Compile e execute diretamente
ts-node hello-world.ts
```

### Saida Esperada

```
=================================
   Bem-vindo ao Curso de TypeScript!
=================================

Aluno: Gabriel Alonso
Formacao: Engenheiro Mecanico
Capitulo atual: 0
Ambiente configurado? true

Tudo certo! Ambiente pronto para estudar.
Proximo passo: Capitulo 01 - Variaveis e Constantes

=================================
   Fim do Capitulo 00
=================================
```

Se voce viu isso, **parabens!** Seu ambiente esta 100% configurado.

---

## Passo 7: Verificar o Arquivo JavaScript Gerado

Depois de compilar com `tsc`, um arquivo `hello-world.js` foi criado. Abra-o no VS Code e compare com o `.ts`:

### Arquivo Original (hello-world.ts)

```typescript
let nomeAluno: string = "Gabriel Alonso";
let capitulo: number = 0;
let ambientePronto: boolean = true;
```

### Arquivo Gerado (hello-world.js)

```javascript
var nomeAluno = "Gabriel Alonso";
var capitulo = 0;
var ambientePronto = true;
```

### O Que Mudou?

| TypeScript | JavaScript |
|------------|------------|
| `let` | `var` (por padrao, compilador antigo) |
| `: string` | (removido) |
| `: number` | (removido) |
| `: boolean` | (removido) |

Os tipos serviram apenas para verificacao. O JavaScript final e mais simples.

---

## Como Testar Se Tudo Funciona

### Checklist Final

Execute estes comandos e verifique se todos funcionam:

```bash
# 1. Node instalado?
node --version
# Esperado: v18.x.x ou superior

# 2. npm instalado?
npm --version
# Esperado: 9.x.x ou superior

# 3. TypeScript instalado?
tsc --version
# Esperado: 5.x.x ou superior

# 4. ts-node instalado? (opcional)
ts-node --version
# Esperado: 10.x.x ou superior

# 5. VS Code abrindo pelo terminal?
code --version
# Esperado: mostra versao do VS Code

# 6. Consegue compilar TypeScript?
cd ~/Documents/typescript-curso/capitulo-00
tsc hello-world.ts
# Esperado: nenhum erro, arquivo .js criado

# 7. Consegue executar JavaScript?
node hello-world.js
# Esperado: saida do programa
```

### Resultado

| Item | Status |
|------|--------|
| Node.js | [ ] Funcionando |
| npm | [ ] Funcionando |
| TypeScript (tsc) | [ ] Funcionando |
| ts-node | [ ] Funcionando |
| VS Code | [ ] Funcionando |
| Compilacao | [ ] Funcionando |
| Execucao | [ ] Funcionando |

Marque cada item conforme for verificando. Se todos estiverem marcados, voce esta pronto!

---

## Desafios de Expansao

Agora que seu ambiente esta funcionando, tente estes desafios para praticar:

### Desafio 1: Personalize a Mensagem

Modifique o `hello-world.ts` para incluir:
- Seu hobby
- Sua meta com este curso

### Desafio 2: Crie um Novo Arquivo

Crie `sobre-mim.ts` que exibe 5 fatos sobre voce, cada um em uma linha.

### Desafio 3: Explore o Watch Mode

```bash
tsc hello-world.ts -w
```

Com o watch mode rodando:
1. Modifique algo no arquivo .ts
2. Salve
3. Veja o compilador atualizar automaticamente
4. Execute `node hello-world.js` para ver a mudanca

Pressione Ctrl+C para sair do watch mode.

### Desafio 4: Cause um Erro de Proposito

Adicione esta linha ao seu codigo:

```typescript
let idade: number = "trinta";  // Erro proposital!
```

Tente compilar e observe a mensagem de erro. Isso e o TypeScript te protegendo!

---

## Solucao de Problemas Comuns

### "Nao consigo instalar globalmente"

No Mac/Linux:
```bash
sudo npm install -g typescript
```

No Windows: abra o terminal como Administrador.

### "VS Code nao abre pelo terminal"

1. Abra o VS Code normalmente
2. Pressione Ctrl+Shift+P (ou Cmd+Shift+P no Mac)
3. Digite "shell command"
4. Selecione "Shell Command: Install 'code' command in PATH"

### "O arquivo .js nao foi criado"

- Verifique se voce esta na pasta certa
- Verifique se o arquivo e `.ts` (nao `.txt` ou outro)
- Verifique se nao ha erros de compilacao

### "Erros de permissao"

- Evite criar projetos em pastas do sistema
- Use pastas como Documents, Desktop ou Home

---

## O Que Voce Aprendeu Neste Capitulo

1. **O que e programacao** - dar instrucoes precisas a maquinas
2. **O que e TypeScript** - JavaScript com tipos para maior seguranca
3. **Por que TypeScript** - pega erros antes de executar, melhor autocompletar
4. **Como instalar** Node.js, VS Code, TypeScript
5. **Como compilar** - `tsc arquivo.ts` ou `ts-node arquivo.ts`
6. **Como executar** - `node arquivo.js`
7. **Como organizar** - pastas separadas por capitulo

---

## Proximo Capitulo

**Capitulo 01: Variaveis e Constantes**

Voce vai aprender:
- Como criar "caixas" para guardar dados
- A diferenca entre `let`, `const` e `var`
- Como o TypeScript infere tipos automaticamente
- Boas praticas de nomenclatura

Ate la!

---

## Codigo Final Completo

Para referencia, aqui esta o codigo final do mini-projeto:

```typescript
// ============================================
// hello-world.ts
// Meu Primeiro Programa em TypeScript!
// Autor: Gabriel Alonso
// Data: Janeiro/2025
// ============================================

// Este programa demonstra que meu ambiente esta funcionando
// e que eu consigo escrever, compilar e executar TypeScript.

// --------------------------------------------
// Secao 1: Mensagem de boas-vindas
// --------------------------------------------

console.log("=================================");
console.log("   Bem-vindo ao Curso de TypeScript!");
console.log("=================================");
console.log("");

// --------------------------------------------
// Secao 2: Minhas informacoes (com tipos!)
// --------------------------------------------

let nomeAluno: string = "Gabriel Alonso";
let formacao: string = "Engenheiro Mecanico";
let capitulo: number = 0;
let ambientePronto: boolean = true;

console.log("Aluno:", nomeAluno);
console.log("Formacao:", formacao);
console.log("Capitulo atual:", capitulo);
console.log("Ambiente configurado?", ambientePronto);
console.log("");

// --------------------------------------------
// Secao 3: Confirmacao final
// --------------------------------------------

if (ambientePronto) {
    console.log("Tudo certo! Ambiente pronto para estudar.");
    console.log("Proximo passo: Capitulo 01 - Variaveis e Constantes");
} else {
    console.log("Algo deu errado. Revise os passos anteriores.");
}

console.log("");
console.log("=================================");
console.log("   Fim do Capitulo 00");
console.log("=================================");
```

---

*Capitulo 00 - Parte 4 de 4*

*Parabens por completar o primeiro capitulo! O mais dificil ja passou: comecar.*
