# Guia de estudo — Git/GitHub, npm e tooling aplicado

**Objetivo:** transformar a página de tarefas do capítulo 20 em um projeto que possa ser obtido, instalado, executado, verificado e compilado a partir de instruções claras e arquivos versionados.

Você já usa Git/GitHub e compila TypeScript. Aqui, vamos conectar essas ferramentas: escolher o conteúdo de um commit, declarar dependências locais, separar módulos e produzir um build sem depender de uma instalação global de `tsc`.

O percurso é **leitura curta → conexão com o projeto → atividade**. As fontes abaixo são a leitura principal; o [complemento](02-aulas-do-curso/01-do-arquivo-ao-projeto.md) esclarece apenas as fronteiras entre ferramentas. Consulte uma seção por vez. Não há vídeo obrigatório, criação de conta ou repetição do primeiro programa em TypeScript.

**Laboratório:** sua [página de tarefas do capítulo 20](../20-html-css-essencial-e-navegador/03-pratica/atividades.md). Preserve o trabalho anterior e faça a migração em uma cópia. Os contratos da prática orientam a implementação pelo aluno, com acompanhamento do professor; este capítulo não entrega o projeto pronto.

**Limites:** frontend sem framework. React começa no capítulo 22. Publicação, CI, pull requests, conflitos e rebase não são requisitos; colaboração e entrega serão aprofundadas no capítulo 34. Configuração avançada de módulos e dependências fica para o capítulo 62.

## 1. Localizar o projeto e preparar uma mudança

No terminal, identifique a pasta do projeto, a raiz do repositório e a branch atual. São referências diferentes: a pasta que contém `package.json` pode estar dentro de um repositório maior.

Na MDN, consulte [Command line crash course](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line#navigation_on_the_command_line): leia **Navigation on the command line** e **Listing directory contents**, parando antes de **Introducing command options**. Se já usa `pwd`, `cd`, `..` e `ls`, pule a leitura. Não faça os exercícios de remoção nem a instalação de ferramentas desse artigo.

No Pro Git, [Recording Changes to the Repository](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository), leia **Viewing Your Staged and Unstaged Changes**, até antes de **Committing Your Changes**; pule a nota sobre ferramenta gráfica. Consulte **Staging Modified Files** somente se ainda não estiver claro por que editar depois de `git add` deixa duas versões do mesmo arquivo. Em **Ignoring Files**, leia os dois primeiros parágrafos; padrões avançados não são necessários.

Leia o complemento [Pasta, staging e commit](02-aulas-do-curso/01-do-arquivo-ao-projeto.md#pasta-staging-e-commit) e faça a [atividade 1 — Preservar a base](03-pratica/atividades.md#atividade-1).

## 2. Criar o ambiente local com npm e Vite

Em [Getting Started — Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project), leia **Scaffolding Your First Vite Project**, com a nota de compatibilidade e o exemplo de escolha de template; use `vanilla-ts`. Pule **Community Templates** e **Manual Installation**. Depois leia **index.html and Project Root** e **Command Line Interface**, parando antes de **Using Unreleased Commits**. O objetivo é entender a entrada HTML e os comandos de desenvolvimento/build/preview.

Na referência de [package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/), leia **scripts**; o início de **dependencies**, até antes da lista de formatos de versão; os três primeiros parágrafos de **devDependencies**, sem o exemplo de publicação; e **private**. Não estude publicação, `peerDependencies` ou workspaces.

Em [npm run](https://docs.npmjs.com/cli/v11/commands/npm-run/#description), leia em **Description** somente o parágrafo inicial e os parágrafos sobre `node_modules/.bin` e execução na raiz do pacote. Pule a configuração e os demais detalhes de ambiente.

Leia o complemento [Dependências e comandos locais](02-aulas-do-curso/01-do-arquivo-ao-projeto.md#dependencias-e-comandos-locais) e faça a [atividade 2 — Colocar a página no Vite](03-pratica/atividades.md#atividade-2).

## 3. Separar módulos e verificar os tipos

No Handbook, [Modules](https://www.typescriptlang.org/docs/handbook/2/modules.html#how-javascript-modules-are-defined), leia **How JavaScript Modules are Defined** e, em **Modules in TypeScript**, **ES Module Syntax**, até antes de **Additional Import Syntax**. Reconheça a diferença entre exportação nomeada e padrão; usaremos a nomeada na prática. Pule os exemplos com classes. Vá a **TypeScript Specific ES Module Syntax** e leia até o fim de **import type**, pulando **Inline type imports** e todo o restante. CommonJS, interoperabilidade e resolução avançada ficam fora.

Em [What is a tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#using-tsconfigjson-or-jsconfigjson), leia a introdução e **Using tsconfig.json or jsconfig.json**; pare antes de **Examples**. Leia também a descrição curta de [strict](https://www.typescriptlang.org/tsconfig/strict.html). Não é necessário abrir cada opção relacionada.

Em [Features — Vite](https://vite.dev/guide/features.html#typescript), leia a introdução de **TypeScript** e **Transpile Only**, parando antes de **TypeScript Compiler Options**. Retenha a distinção: transformar TypeScript em JavaScript não comprova que os tipos estão corretos.

Leia o complemento [Módulos e duas verificações diferentes](02-aulas-do-curso/01-do-arquivo-ao-projeto.md#modulos-e-duas-verificacoes-diferentes) e faça a [atividade 3 — Separar uma regra e proteger o build](03-pratica/atividades.md#atividade-3).

## 4. Acrescentar lint e formatação

No [Quickstart do typescript-eslint](https://typescript-eslint.io/getting-started/), leia **Step 1: Installation**, **Step 2: Configuration** e **Step 3: Running ESLint**. Em **Details**, consulte apenas os itens sobre `files`/`extends` e configurações recomendadas, além da nota de extensões. Pare antes de **Next Steps**. A configuração é um exemplo de uso de `import`/`export`; não precisamos conhecer o funcionamento interno do ESLint nem habilitar regras que exigem informações de tipos.

Em [Install — Prettier](https://prettier.io/docs/install), leia da instalação local até a explicação de `--check`, parando antes de **Set up your editor**. Use apenas os comandos npm; crie os arquivos de configuração pelo editor se preferir. Hooks e CI não entram.

Leia o complemento [O que cada ferramenta confere](02-aulas-do-curso/01-do-arquivo-ao-projeto.md#o-que-cada-ferramenta-confere) e faça a [atividade 4 — Tornar a qualidade executável](03-pratica/atividades.md#atividade-4).

## 5. Reproduzir uma versão e reconhecer o remoto

Em [npm ci](https://docs.npmjs.com/cli/v11/commands/npm-ci/#description), leia **Description** e sua lista de diferenças em relação a `npm install`. Pare antes da nota sobre flags de instalação. Observe a exigência de lockfile coerente e a substituição de `node_modules`.

Se branches e remotos já fazem parte do seu fluxo, use as leituras a seguir apenas para esclarecer dúvidas da atividade:

- Pro Git, [Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell): em **Creating a New Branch**, leia os dois primeiros parágrafos; em **Switching Branches**, leia até o primeiro exemplo de troca e a nota final sobre `git switch`. Pule objetos internos, divergência e experimentos de histórico.
- Pro Git, [Working with Remotes](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes): **Showing Your Remotes**, somente até o primeiro exemplo de `git remote -v`; **Fetching and Pulling from Your Remotes**, somente até a explicação de que `fetch` não integra as mudanças. Pule configurações globais e os outros remotos dos exemplos.
- GitHub, [Pushing commits to a remote repository](https://docs.github.com/en/get-started/using-git/pushing-commits-to-a-remote-repository#about-git-push): somente **About git push**, parando antes de **Renaming branches**. Git guarda o histórico local; GitHub hospeda uma cópia remota. Um commit ainda não enviado não aparece lá.

Em [Deploying a Static Site — Vite](https://vite.dev/guide/static-deploy.html#building-the-app), leia **Building the App** e **Testing the App Locally**. Pare antes de **GitHub Pages**. Vamos servir o build localmente; `preview` não é servidor de produção.

Leia o complemento [Lockfile e reprodução](02-aulas-do-curso/01-do-arquivo-ao-projeto.md#lockfile-e-reproducao) e faça a [atividade 5 — Executar a partir do que foi versionado](03-pratica/atividades.md#atividade-5).

## Ao terminar

Você deve conseguir partir de um clone, entrar na pasta correta, instalar pelo lockfile, executar a página e produzir um build verificado. O histórico deve mostrar a migração, sem misturar os arquivos gerados com os fontes. Use os critérios da prática com o professor para avaliar sua tentativa; a criação deste capítulo não registra estudo concluído.
