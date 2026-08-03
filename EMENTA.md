# Ementa do Curso de TypeScript

**Aluno:** Gabriel Alonso
**Início:** Janeiro/2025
**Abordagem:** Híbrida (fundamentos sólidos + aplicação prática)

---

## Visão Geral

| Módulo | Tema | Capítulos | Projeto |
|--------|------|-----------|---------|
| 1 | Fundamentos Absolutos | 00-04 | Calculadora de Terminal |
| 2 | Estruturas de Dados e Funções | 05-12 | Gerenciador de Contatos |
| 3 | TypeScript Intermediário | 13-22 | Sistema de Biblioteca |
| 4 | TypeScript Avançado | 23-31 | Sistema de Gestão Financeira |
| Bônus | Integrações | B1-B3 | - |

**Total: 32 capítulos + 3 bônus + 4 projetos**

---

## MÓDULO 1: Fundamentos Absolutos
*Base de programação + primeiros passos com TypeScript*

### Capítulo 00 - Preparação do Ambiente
- O que é programação
- O que é TypeScript e por que usar
- TypeScript vs JavaScript: diferenças fundamentais
- Instalando Node.js e VS Code
- Instalando TypeScript globalmente
- Primeiro programa: "Hello World"
- Como funciona a compilação TS → JS
- Usando o TS Playground online

### Capítulo 01 - Variáveis e Constantes
- O que são variáveis (analogia: caixas com etiquetas)
- Declarando variáveis com `let`
- Declarando constantes com `const`
- Por que evitar `var`
- Regras de nomenclatura (camelCase, snake_case)
- Type inference (inferência de tipos)
- Type annotation (anotação explícita)
- Escopo de variáveis

### Capítulo 02 - Tipos Primitivos
- O tipo `number` (inteiros, decimais, notação científica)
- Operações matemáticas básicas
- O tipo `string` (textos)
- Concatenação e template literals
- O tipo `boolean` (verdadeiro/falso)
- Os tipos `null` e `undefined`
- Diferença entre null e undefined
- Menção: `bigint` e `symbol` (tipos especiais)

### Capítulo 03 - Operadores e Estruturas Condicionais
- Operadores aritméticos (`+`, `-`, `*`, `/`, `%`, `**`)
- Precedência de operadores
- Operadores de atribuição (`=`, `+=`, `-=`, `*=`, `/=`)
- Operadores de comparação (`==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`)
- Diferença entre `==` e `===`
- Operadores lógicos (`&&`, `||`, `!`)
- Operador nullish coalescing (`??`)
- Operador de encadeamento opcional (`?.`)

- A estrutura `if`
- `if` / `else`
- `if` / `else if` / `else`
- Condições aninhadas
- Operador ternário (`? :`)
- A estrutura `switch` / `case`
- Truthy e Falsy values
- Boas práticas em condicionais

### Capítulo 04 - Estruturas de Repetição
- O loop `while`
- O loop `do...while`
- O loop `for` tradicional
- Controlando loops: `break`
- Controlando loops: `continue`
- Loops aninhados
- Cuidados com loops infinitos
- Quando usar cada tipo de loop

### Projeto 1: Calculadora de Terminal
> **Objetivo:** Criar uma calculadora que recebe dois números e uma operação, retornando o resultado.
>
> **Conceitos aplicados:** variáveis, tipos primitivos, operadores, condicionais
>
> **Requisitos:**
> - Suportar operações: soma, subtração, multiplicação, divisão, potência
> - Validar divisão por zero
> - Exibir mensagem de erro para operação inválida

---

## MÓDULO 2: Estruturas de Dados e Funções
*Organizando dados e criando blocos reutilizáveis*

### Capítulo 05 - Arrays: Fundamentos
- O que são arrays (listas ordenadas)
- Criando arrays tipados
- Sintaxe: `string[]` vs `Array<string>`
- Acessando elementos por índice
- Modificando elementos
- Propriedade `length`
- Métodos básicos: `push`, `pop`, `shift`, `unshift`
- Arrays multidimensionais (menção)

### Capítulo 06 - Arrays: Métodos Avançados
- Iterando com `forEach`
- Transformando com `map`
- Filtrando com `filter`
- Buscando com `find` e `findIndex`
- Verificando com `some` e `every`
- Introdução ao `reduce`
- Encadeamento de métodos
- Spread operator com arrays (`...`)

### Capítulo 07 - Tuples
- O que são tuples (arrays de tamanho fixo)
- Diferença entre array e tuple
- Criando e tipando tuples
- Acessando elementos de tuples
- Tuples com elementos opcionais
- Readonly tuples
- Casos de uso: coordenadas, retorno múltiplo
- Destructuring em tuples

### Capítulo 08 - Funções: Fundamentos
- O que são funções
- Declaração de função (function declaration)
- Expressão de função (function expression)
- Arrow functions (`=>`)
- Parâmetros e argumentos
- Tipagem de parâmetros
- Tipagem de retorno
- Funções que não retornam: `void`

### Capítulo 09 - Funções: Conceitos Avançados
- Parâmetros opcionais (`?`)
- Parâmetros com valor default
- Rest parameters (`...args`)
- Funções como parâmetros (callbacks)
- Tipando callbacks
- Funções anônimas
- IIFE (Immediately Invoked Function Expression)
- Closures (introdução)

### Capítulo 10 - Objetos
- O que são objetos
- Criando objetos literais
- Propriedades e métodos
- Acessando propriedades: notação de ponto vs colchetes
- Objetos aninhados
- Tipagem de objetos inline
- Propriedades opcionais em objetos
- Spread operator com objetos
- Destructuring de objetos

### Capítulo 11 - Type Alias, Union e Intersection
- Criando tipos customizados com `type`
- Reutilizando tipos
- Union types (`|`): aceitar múltiplos tipos
- Narrowing básico com `typeof`
- Intersection types (`&`): combinar tipos
- Literal types (valores específicos como tipos)
- Discriminated unions (introdução)
- Type alias vs interface (prévia)

### Capítulo 12 - Enums
- O que são enums
- Enums numéricos
- Enums de string
- Enums heterogêneos
- `const` enums (otimização)
- Reverse mapping
- Quando usar enum vs union de literais
- Boas práticas com enums

### Projeto 2: Gerenciador de Contatos
> **Objetivo:** Sistema para cadastrar, listar, buscar e remover contatos.
>
> **Conceitos aplicados:** arrays, objetos, funções, tipos customizados, enums
>
> **Requisitos:**
> - Cadastrar contato (nome, telefone, email, categoria)
> - Listar todos os contatos
> - Buscar contato por nome
> - Remover contato
> - Categorias usando enum (Família, Trabalho, Amigo)

---

## MÓDULO 3: TypeScript Intermediário
*Interfaces, Classes e Sistema de Tipos*

### Capítulo 13 - Interfaces: Fundamentos
- O que são interfaces
- Definindo estrutura de objetos
- Propriedades obrigatórias e opcionais
- Propriedades readonly
- Interface vs Type Alias: quando usar cada
- Convenções de nomenclatura

### Capítulo 14 - Interfaces: Recursos Avançados
- Herança de interfaces (`extends`)
- Múltipla herança de interfaces
- Index signatures (`[key: string]: type`)
- Interfaces para funções
- Hybrid types (objeto + função)
- Declaration merging

### Capítulo 15 - Classes: Fundamentos
- O que são classes
- Definindo propriedades
- O constructor
- Criando métodos
- O `this`
- Instanciando objetos com `new`
- Propriedades readonly em classes

### Capítulo 16 - Classes: Encapsulamento
- Modificadores de acesso: `public`
- Modificadores de acesso: `private`
- Modificadores de acesso: `protected`
- Getters (`get`)
- Setters (`set`)
- Parameter properties (atalho no constructor)
- Validação em setters

### Capítulo 17 - Classes: Herança e Polimorfismo
- Herança com `extends`
- O `super()` no constructor
- Sobrescrita de métodos (override)
- A keyword `override` (TS 4.3+)
- Classes abstratas (`abstract`)
- Métodos abstratos
- Polimorfismo na prática
- Implementando interfaces (`implements`)

### Capítulo 18 - Narrowing: Refinamento de Tipos
- O que é narrowing
- Type guard com `typeof`
- Type guard com `instanceof`
- Type guard com operador `in`
- Equality narrowing
- Truthiness narrowing
- Discriminated unions
- Exhaustiveness checking com `never`

### Capítulo 19 - Type Assertions e Predicates
- Type assertions com `as`
- Assertion para `unknown`
- `as const` (const assertions)
- Non-null assertion (`!`)
- A keyword `satisfies` (TS 4.9+)
- Type predicates (`is`)
- Criando custom type guards
- Quando usar (e quando evitar) assertions

### Capítulo 20 - Tipando o DOM
- Tipos de elementos HTML
- `HTMLElement` vs tipos específicos
- Selecionando elementos: `querySelector`
- Type assertion com elementos DOM
- Eventos e seus tipos (`MouseEvent`, `KeyboardEvent`, etc.)
- Tipando event handlers
- Manipulação segura do DOM
- Lidando com `null` (elemento não encontrado)

### Capítulo 21 - Generics: Introdução
- O problema que Generics resolve
- Funções genéricas
- Convenções de nomenclatura (`T`, `U`, `K`, `V`)
- Inferência de tipo genérico
- Múltiplos parâmetros genéricos
- Generics com arrays
- Generics em interfaces
- Generics em classes

### Capítulo 22 - Generics: Avançado
- Constraints com `extends`
- O operador `keyof`
- Usando `keyof` com generics
- O operador `typeof` (em tipos)
- Indexed access types (`Type["prop"]`)
- Generic defaults
- Generics com condicionais (introdução)

### Projeto 3: Sistema de Biblioteca
> **Objetivo:** Sistema para gerenciar livros, usuários e empréstimos.
>
> **Conceitos aplicados:** classes, interfaces, generics, herança, encapsulamento
>
> **Requisitos:**
> - Classes: Livro, Usuario, Emprestimo
> - Interface para itens emprestáveis (livro, revista, DVD)
> - Herança: diferentes tipos de usuário (Estudante, Professor)
> - Generics: repositório genérico para armazenar entidades
> - Validações com getters/setters
> - Regras de empréstimo por tipo de usuário

---

## MÓDULO 4: TypeScript Avançado
*Configuração, Módulos e Padrões Profissionais*

### Capítulo 23 - Configuração do Compilador
- O arquivo `tsconfig.json`
- Opções de compilação principais
- `target` e `module`
- `strict` mode e suas flags individuais
- `strictNullChecks`
- `noImplicitAny`
- `esModuleInterop`
- Include, exclude e files
- Diferentes configs para dev/prod

### Capítulo 24 - Módulos e Organização
- O que são módulos
- `export` e `import`
- Named exports vs default export
- Re-exportando (`export * from`)
- Alias de importação (`as`)
- Importando tipos (`import type`)
- Organização de arquivos e pastas
- Barrel files (index.ts)

### Capítulo 25 - Declaration Files e Tipagem Externa
- O que são declaration files (`.d.ts`)
- O repositório DefinitelyTyped
- Instalando tipos: `@types/`
- Criando declarations para libs sem tipos
- Ambient declarations (`declare`)
- Triple-slash directives
- Tipando módulos JavaScript existentes

### Capítulo 26 - Tratamento de Erros
- `try` / `catch` / `finally`
- O tipo `unknown` em catch (TS 4.4+)
- Criando classes de erro customizadas
- Error vs Exception
- O tipo `never` para funções que nunca retornam
- Assertion functions
- Boas práticas em tratamento de erros
- Patterns: Result type

### Capítulo 27 - Function Overloading
- O que é sobrecarga de funções
- Sintaxe de overload signatures
- Implementation signature
- Ordem das overloads
- Overloading vs Union types
- Casos de uso práticos
- Overloading em métodos de classe
- Limitações do overloading em TS

### Capítulo 28 - Utility Types
- `Partial<T>` - todas propriedades opcionais
- `Required<T>` - todas propriedades obrigatórias
- `Readonly<T>` - todas propriedades readonly
- `Pick<T, K>` - selecionar propriedades
- `Omit<T, K>` - excluir propriedades
- `Record<K, T>` - criar objeto tipado
- `ReturnType<T>` - tipo de retorno de função
- `Parameters<T>` - tipos dos parâmetros
- `Exclude` e `Extract`
- `NonNullable<T>`

### Capítulo 29 - Tipos Avançados
- Conditional types (`T extends U ? X : Y`)
- O keyword `infer`
- Mapped types
- Template literal types
- Recursive types (introdução)
- Criando utility types customizados
- Type-level programming (conceitos)

### Capítulo 30 - Decorators
- O que são decorators
- Habilitando decorators no tsconfig
- Class decorators
- Method decorators
- Property decorators
- Parameter decorators
- Decorator factories
- Ordem de execução dos decorators
- Casos de uso: logging, validação, medição

### Capítulo 31 - Boas Práticas e Padrões
- Programação defensiva
- Imutabilidade (readonly, Object.freeze)
- Princípios SOLID (visão geral)
- DRY, KISS, YAGNI
- Code smells comuns em TypeScript
- Quando usar `any` (spoiler: quase nunca)
- Naming conventions
- Documentação com JSDoc
- Linting com ESLint

### Projeto Final: Sistema de Gestão Financeira
> **Objetivo:** Aplicação completa para controle de finanças pessoais.
>
> **Conceitos aplicados:** todos os módulos do curso
>
> **Requisitos:**
> - Módulos bem organizados
> - Classes: Conta, Transacao, Categoria, Usuario
> - Tipos de transação: Receita, Despesa, Transferência
> - Generics para repositórios e serviços
> - Utility types para DTOs
> - Decorators para logging e validação
> - Tratamento de erros robusto
> - Relatórios: saldo, extrato, gastos por categoria
> - Exportar dados (simular)

---

## MÓDULO BÔNUS (Opcional)
*Para continuar aprendendo após o curso*

### B1 - JavaScript Moderno (ES6+)
- `let` e `const` (revisão)
- Arrow functions (revisão)
- Destructuring avançado
- Spread e rest operators
- Template literals
- Classes em JS
- Promises
- Async/await
- Módulos ES6
- Optional chaining e nullish coalescing

### B2 - TypeScript com React
- Setup: Create React App com TypeScript
- Vite com TypeScript
- Tipando componentes funcionais
- Props com interfaces
- O tipo `React.FC` (e por que evitar)
- Tipando useState
- Tipando useEffect
- Tipando useRef
- Tipando eventos
- Context API com tipos
- Custom hooks tipados

### B3 - TypeScript com Node/Express
- Setup do ambiente Node + TS
- Configurando ts-node e nodemon
- Tipando requisições e respostas
- Interfaces para Request e Response
- Middlewares tipados
- Validação com Zod ou Yup
- Estrutura de projeto
- Integração com banco de dados (tipos)

---

## Legenda de Ícones

| Ícone | Significado |
|-------|-------------|
| 📖 | Aula teórica |
| 💻 | Exercícios práticos |
| 📝 | Prova |
| 🎯 | Projeto |
| ⭐ | Conceito fundamental |
| ⚠️ | Atenção especial |

---

## Pré-requisitos por Módulo

| Módulo | Pré-requisito |
|--------|---------------|
| 1 | Nenhum (começamos do zero) |
| 2 | Módulo 1 completo |
| 3 | Módulos 1 e 2 completos |
| 4 | Módulos 1, 2 e 3 completos |
| Bônus | Curso principal completo |

---

## Estimativa de Progresso

Considerando ~1 hora de estudo por dia:

| Módulo | Capítulos | Estimativa |
|--------|-----------|------------|
| 1 | 5 + projeto | ~2 semanas |
| 2 | 8 + projeto | ~3 semanas |
| 3 | 10 + projeto | ~4 semanas |
| 4 | 9 + projeto | ~4 semanas |
| **Total** | **32 + 4 projetos** | **~13 semanas** |

*Estimativa flexível - o ritmo será adaptado conforme seu progresso.*

---

## Observações

1. **Abordagem híbrida**: Cada capítulo combina teoria + prática
2. **Exercícios**: Todos os capítulos terão exercícios para fixação
3. **Provas**: Avaliação ao final de cada capítulo
4. **Projetos**: Aplicação prática integrando múltiplos conceitos
5. **Adaptável**: A ementa pode ser ajustada conforme necessidade

---

*Última atualização: Agosto/2026*
