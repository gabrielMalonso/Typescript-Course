# Exercícios - Capítulo 00: Preparação do Ambiente

## Instruções Gerais
- Resolva os exercícios na ordem apresentada
- Crie um arquivo separado para cada exercício: `ex01.ts`, `ex02.ts`, etc.
- Salve os arquivos na pasta `exercicios/solucoes/`
- Execute cada arquivo para verificar se funciona
- Anote dúvidas que surgirem no DIARIO.md

---

## Nível 1: Aquecimento
*Exercícios básicos para verificar se o ambiente está funcionando*

### Exercício 1.1 - Verificação do Ambiente

**Objetivo:** Confirmar que Node.js e TypeScript estão instalados corretamente.

**Tarefa:**
Abra o terminal e execute os seguintes comandos. Anote as versões que aparecem:

```bash
node --version
tsc --version
```

**Entrega:**
Crie um arquivo `ex01.ts` com um comentário contendo as versões instaladas:

```typescript
// Meu ambiente TypeScript
// Node.js: v__.__.__
// TypeScript: __.__
```

**Resultado esperado:**
Você deve ver números de versão (ex: `v20.10.0` para Node e `5.3.3` para TypeScript).

> **Dica:** Se algum comando der erro "não reconhecido", revise a instalação na aula.

---

### Exercício 1.2 - Meu Primeiro Arquivo TypeScript

**Objetivo:** Criar, compilar e executar seu primeiro programa.

**Tarefa:**
1. Crie o arquivo `ex02.ts`
2. Escreva um código que exiba no console: `Olá, meu nome é [SEU NOME]!`
3. Compile o arquivo com `tsc`
4. Execute o arquivo JavaScript gerado com `node`

**Exemplo de saída no terminal:**
```
Olá, meu nome é Gabriel Alonso!
```

**Comandos que você vai usar:**
```bash
tsc ex02.ts
node ex02.js
```

> **Dica:** Lembre-se da função `console.log()` que vimos na aula.

---

### Exercício 1.3 - Entendendo a Compilação

**Objetivo:** Visualizar a transformação de TypeScript para JavaScript.

**Tarefa:**
1. Crie o arquivo `ex03.ts` com o seguinte código:

```typescript
let linguagem: string = "TypeScript";
let ano: number = 2012;
console.log(linguagem + " foi lançado em " + ano);
```

2. Compile com `tsc ex03.ts`
3. Abra o arquivo `ex03.js` gerado e observe as diferenças
4. Adicione um comentário no `ex03.ts` explicando o que mudou

**Saída esperada:**
```
TypeScript foi lançado em 2012
```

**Pergunta para refletir:** O que aconteceu com `: string` e `: number` no arquivo JavaScript?

> **Dica:** Compare os dois arquivos lado a lado no VS Code.

---

## Nível 2: Praticando
*Exercícios que combinam conceitos e exigem mais passos*

### Exercício 2.1 - Watch Mode em Ação

**Objetivo:** Experimentar o modo de observação automática do TypeScript.

**Tarefa:**
1. Crie o arquivo `ex04.ts` com:

```typescript
console.log("Versão 1");
```

2. Abra um terminal e inicie o watch mode: `tsc ex04.ts --watch`
3. **Sem fechar o terminal**, edite o arquivo e mude para:

```typescript
console.log("Versão 2 - Compilação automática!");
```

4. Salve o arquivo e observe o que acontece no terminal
5. Em outro terminal, execute `node ex04.js` para ver o resultado

**Saída esperada após a edição:**
```
Versão 2 - Compilação automática!
```

> **Dica:** O watch mode recompila automaticamente quando você salva. Para sair, pressione `Ctrl + C`.

---

### Exercício 2.2 - Calculadora do Engenheiro

**Objetivo:** Praticar variáveis tipadas com um cálculo simples.

**Contexto:** Como engenheiro mecânico, você precisa calcular a área de um círculo.

**Tarefa:**
Crie o arquivo `ex05.ts` que:
1. Declare uma variável `raio` do tipo `number` com valor `5`
2. Declare uma variável `pi` do tipo `number` com valor `3.14159`
3. Calcule a área (π × r²) e armazene em uma variável `area`
4. Exiba o resultado formatado

**Saída esperada:**
```
Raio: 5
Área do círculo: 78.53975
```

**Fórmula:** Área = π × raio²

> **Dica:** Para elevar ao quadrado, você pode usar `raio * raio`.

---

### Exercício 2.3 - Detetive de Erros

**Objetivo:** Aprender a ler e corrigir erros de compilação.

**Tarefa:**
O código abaixo tem **3 erros**. Crie o arquivo `ex06.ts`, cole o código e corrija os erros:

```typescript
console.log("Verificando ambiente...")

let versao: number = "1.0"
let ativo: boolean = "sim"

console.log("Versão: " + versao)
console.log("Sistema ativo: " + ativo)
```

**Passos:**
1. Tente compilar com `tsc ex06.ts`
2. Leia as mensagens de erro
3. Corrija cada erro
4. Recompile até funcionar

**Saída esperada (após correções):**
```
Verificando ambiente...
Versão: 1.0
Sistema ativo: true
```

> **Dica:** O TypeScript está reclamando que os valores não combinam com os tipos declarados. Você pode corrigir o valor OU o tipo.

---

### Exercício 2.4 - Múltiplas Mensagens

**Objetivo:** Praticar o fluxo completo com um programa mais elaborado.

**Tarefa:**
Crie o arquivo `ex07.ts` que exiba sua "ficha técnica" como desenvolvedor iniciante:

```
============================
   FICHA DO DESENVOLVEDOR
============================
Nome: [Seu nome]
Formação: Engenharia Mecânica
Linguagem: TypeScript
Nível: Iniciante
Objetivo: Aprender a programar!
============================
```

**Requisitos:**
- Use pelo menos 3 variáveis tipadas
- Use `console.log()` para cada linha

> **Dica:** Você pode criar variáveis como `let nome: string = "Gabriel"` e usá-las dentro do `console.log()`.

---

## Nível 3: Desafios
*Exercícios que exigem raciocínio e exploração*

### Exercício 3.1 - Investigando Tipos

**Objetivo:** Explorar o que acontece quando você não declara tipos.

**Tarefa:**
1. Crie o arquivo `ex08.ts` com o código abaixo:

```typescript
let comTipo: string = "Olá";
let semTipo = "Mundo";

console.log(comTipo);
console.log(semTipo);
```

2. Compile e execute - funciona?
3. Agora tente adicionar esta linha ao código:

```typescript
semTipo = 123;
```

4. Compile novamente. O que acontece?
5. Adicione um comentário no arquivo explicando sua descoberta

**Pergunta:** O TypeScript consegue "adivinhar" o tipo mesmo quando você não declara?

> **Dica:** Isso se chama "inferência de tipos" - o TypeScript é inteligente!

---

### Exercício 3.2 - Simulando um Erro Real

**Objetivo:** Entender erros comuns de quem está começando.

**Cenário:** Você escreveu um código, mas algo está errado. O terminal mostra erros estranhos.

**Tarefa:**
Crie o arquivo `ex09.ts` e descubra o que está errado em cada situação:

**Situação A:** Você digita `tsc ex09.ts` mas recebe "arquivo não encontrado"
- Qual comando você usaria para verificar se está na pasta certa?

**Situação B:** Você executa `node ex09.ts` (com .ts) em vez de `node ex09.js`
- O que acontece? Por que?

**Situação C:** O código compila, mas `node ex09.js` não mostra nada
- Olhe o código abaixo. Por que não aparece nada?

```typescript
let mensagem: string = "Teste";
// console.log(mensagem);
```

**Entrega:**
Crie o `ex09.ts` com comentários explicando cada situação:

```typescript
// Situação A: [sua explicação]
// Situação B: [sua explicação]
// Situação C: [sua explicação]

// Código funcionando:
let mensagem: string = "Exercício 9 completo!";
console.log(mensagem);
```

---

### Exercício 3.3 - Criando seu Ambiente de Trabalho

**Objetivo:** Organizar seus arquivos como um desenvolvedor profissional.

**Tarefa:**
1. Dentro da pasta `exercicios/`, crie a seguinte estrutura:

```
exercicios/
├── solucoes/
│   ├── ex01.ts
│   ├── ex02.ts
│   └── ... (seus arquivos)
├── testes/
│   └── (pasta para experimentos)
└── README.md
```

2. Crie o arquivo `ex10.ts` dentro de `solucoes/` que:
   - Exiba "Ambiente organizado com sucesso!"
   - Exiba a data de hoje (pode ser texto fixo)
   - Exiba quantos exercícios você completou

**Saída esperada:**
```
=== STATUS DO CURSO ===
Ambiente organizado com sucesso!
Data: [data de hoje]
Exercícios completos: 10
Próximo passo: Capítulo 01!
```

> **Dica para criar pastas:** No terminal, use `mkdir nome-da-pasta`.

---

## Exercício Bônus (Opcional)
*Para quem quer ir além*

### Bônus - Explorando o TS Playground

**Objetivo:** Conhecer uma ferramenta online para testar código rapidamente.

**Tarefa:**
1. Acesse: https://www.typescriptlang.org/play
2. Digite o seguinte código no editor:

```typescript
interface Engenheiro {
    nome: string;
    especialidade: string;
    anosExperiencia: number;
}

const gabriel: Engenheiro = {
    nome: "Gabriel Alonso",
    especialidade: "Mecânica",
    anosExperiencia: 0
};

console.log(`${gabriel.nome} é engenheiro ${gabriel.especialidade}`);
```

3. Observe o JavaScript gerado do lado direito
4. Clique em "Run" para executar
5. Experimente mudar os valores e ver o que acontece

**Reflexão:**
Este código usa conceitos que você ainda vai aprender (interfaces). Mas note como o TypeScript ajuda a organizar dados complexos. Isso será muito útil quando você for programar sistemas de engenharia!

**Entrega opcional:**
Tire um screenshot do Playground funcionando e salve como `bonus-playground.png`.

---

## Checklist de Entrega

Antes de considerar o capítulo completo, verifique:

- [ ] Exercício 1.1 - Versões anotadas no arquivo
- [ ] Exercício 1.2 - "Olá, meu nome é..." funcionando
- [ ] Exercício 1.3 - Compilação entendida, comentário adicionado
- [ ] Exercício 2.1 - Watch mode testado
- [ ] Exercício 2.2 - Área do círculo calculada corretamente
- [ ] Exercício 2.3 - 3 erros encontrados e corrigidos
- [ ] Exercício 2.4 - Ficha técnica exibida
- [ ] Exercício 3.1 - Inferência de tipos descoberta
- [ ] Exercício 3.2 - Erros comuns explicados
- [ ] Exercício 3.3 - Estrutura de pastas criada
- [ ] Todos os arquivos .ts compilam sem erros
- [ ] Todos os arquivos .js executam corretamente
- [ ] Dúvidas anotadas no DIARIO.md

---

## Reflexão Final

Depois de completar os exercícios, responda no seu DIARIO.md:

1. **O que foi mais fácil?** (instalação, compilação, correção de erros?)
2. **O que foi mais difícil?** (entender erros, lembrar comandos?)
3. **O que você descobriu** que não estava na aula?

---

**Parabéns por completar o Capítulo 00!**

Você agora tem um ambiente TypeScript funcionando e entende o fluxo básico de desenvolvimento. No próximo capítulo, vamos mergulhar nos tipos de dados e começar a programar de verdade!

*Tempo estimado: 45-60 minutos*
