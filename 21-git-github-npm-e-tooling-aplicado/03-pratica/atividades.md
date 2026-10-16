# Prática — A mesma página, um projeto reproduzível

Vamos reorganizar a página de tarefas que você escreveu no capítulo 20. O resultado continua sendo a mesma aplicação: adicionar tarefas, alternar checkboxes e reiniciar ao recarregar. Este documento define os contratos; a implementação e a configuração serão feitas por você, com acompanhamento do professor.

Use sua tentativa atual. Se ela ainda tem problemas, reproduza-os com o professor e ajuste a base antes da migração; não considere o capítulo anterior concluído automaticamente. Não copie uma solução pronta nem acrescente edição, filtros, persistência, API ou React.

Faça uma etapa por vez. Mostre ao professor o diff pertinente, a saída do comando que falhou ou o comportamento que observou. Não é necessário produzir um relatório ou cumprir uma quantidade fixa de commits.

### 1. Preservar a base

**Entrada:** seus arquivos HTML, CSS e TypeScript do capítulo 20; Git já configurado.

**Contrato:** localize a raiz do repositório, a branch e o estado dos arquivos. Identifique o HTML de entrada, o CSS efetivamente usado e o script da aplicação. Execute a página pelo fluxo anterior e confira que um envio válido acrescenta somente uma tarefa.

Crie uma branch local para a migração, por exemplo `cap21-tooling`, a partir da base que contém seu trabalho. Se houver alterações pendentes, identifique a autoria e combine o que registrar antes; não descarte nem inclua arquivos alheios. A branch afeta todo o repositório, mesmo quando o projeto está em uma subpasta.

Escolha uma **pasta nova** para o laboratório, por exemplo `03-pratica/laboratorio-tarefas/` dentro deste capítulo. Ela não deve existir antes da criação. Nas próximas etapas, copie para ela somente os fontes necessários; preserve a pasta original do capítulo 20. Se continuar dentro do repositório do curso, use esse mesmo Git, sem `git init` aninhado.

**Aceitação:** você consegue apontar a base preservada, a branch em uso e o destino novo. Antes de cada commit da migração, revise `git status`, os arquivos novos, `git diff` e `git diff --staged`; adicione apenas caminhos pertinentes. Não é preciso reenviar o histórico antigo nem refazer a configuração do GitHub.

### 2. Colocar a página no Vite

**Entrada:** destino novo e fontes identificados na atividade 1.

**Contrato:** confira `node --version` e `npm --version`, comparando Node com os requisitos atuais da documentação do Vite e das ferramentas. Gere o projeto **no destino novo**, usando o template `vanilla-ts`. O padrão do comando é `npm create vite@latest NOME-DA-PASTA -- --template vanilla-ts`; substitua o nome pelo destino escolhido a partir da pasta onde está. Não use `.` para gerar sobre materiais existentes. Se o gerador oferecer executar comandos automaticamente, prefira fazê-los manualmente para observar cada etapa.

Inspecione `package.json`, `tsconfig.json` e os arquivos de demonstração antes de adaptá-los. Instale as dependências com npm. Migre seu HTML, CSS e interação para o novo projeto; arquivos da demonstração devem deixar de participar da aplicação. Você pode manter sobras do template fora da entrada até revisá-las com o professor.

O HTML deve carregar uma única entrada TypeScript com `type="module"`, processada pelo Vite. Não copie o JavaScript compilado antigo para `src/`, nem o carregue junto da nova entrada. Mantenha os caminhos do CSS corretos. Preserve o comportamento, os rótulos, o foco e o layout que você já implementou.

Defina um nome para a aplicação e mantenha `private: true`. Identifique os scripts de desenvolvimento, build e preview do template; execute o servidor pelo script npm e abra a URL que ele informar. Acrescente um `.gitignore` da aplicação com `node_modules/` e `dist/`, sem ignorar `package-lock.json`.

**Aceitação:** `npm run dev` abre a página de tarefas pela URL local, sem compilação manual a cada edição. Alterar um texto e salvar aparece na página após a atualização do Vite; não é preciso preservar as tarefas adicionadas durante essa atualização. Ao recarregar, a lista volta ao conteúdo inicial. Não aparecem controles da demonstração, requisições com erro nem execução duplicada da interação.

No diff, identifique a responsabilidade dos novos arquivos. Verifique que as ferramentas estão instaladas localmente e que manifesto e lockfile estão presentes; `node_modules/` não deve aparecer entre os arquivos a adicionar.

### 3. Separar uma regra e proteger o build

**Entrada:** aplicação funcionando pelo servidor Vite.

**Contrato dos módulos:** mantenha a inicialização, as consultas DOM e o listener na entrada `src/main.ts` (ou equivalente). Extraia para `src/titulo.ts` uma função nomeada `normalizarTitulo(texto: string): string` e importe-a na entrada. Ela deve retirar somente espaços das pontas, preservar espaços internos e não acessar o DOM. A decisão sobre aceitar texto vazio e a mensagem na interface permanecem no fluxo do formulário. A inicialização deve continuar acontecendo uma única vez. Não é necessário criar uma coleção paralela ou uma camada de serviços.

**Entradas e resultados da função:** `"  Comprar pão  "` retorna `"Comprar pão"`; `"   "` retorna `""`; `"Ler  duas páginas"` preserva os dois espaços internos. Implemente e experimente esses casos; depois confira a integração pelo formulário. O exemplo de medidas do complemento serve para entender a sintaxe, sem fazer parte da entrega.

**Contrato das ferramentas:** preserve a configuração do template para módulos/navegador e `strict: true`. Crie um script `typecheck` que verifique o projeto local sem emitir `.js`. Faça o script `build` executar a checagem de tipos antes do build Vite, interrompendo se houver erro. Use o TypeScript instalado no projeto; não passe um arquivo isolado ao `tsc`.

**Experimento de falha:** em um arquivo dentro de `src/`, introduza temporariamente uma atribuição incompatível, como `const quantidade: number = "duas";`, usando a variável em um `console.log`. `npm run typecheck` e `npm run build` devem terminar com erro de tipo; o build não deve avançar para a etapa Vite. O servidor de desenvolvimento pode continuar mostrando a página: ele não faz essa checagem. Retire somente o experimento e rode os comandos novamente. Não comite o erro intencional.

**Aceitação:** módulos conectados por exportação/importação nomeada, sem globais compartilhadas; três casos da função corretos; comportamento da página preservado. Com código válido, checagem e build passam e a saída é criada em `dist/`, sem `.js` emitido ao lado dos fontes. Elementos possivelmente ausentes continuam tratados por narrowing, sem casts ou `!` para contornar o verificador.

### 4. Tornar a qualidade executável

**Entrada:** módulos e build da atividade 3.

**Contrato:** instale ESLint e os pacotes do Quickstart do typescript-eslint como dependências de desenvolvimento. Adote a configuração recomendada em formato flat, com escopo para os fontes TypeScript; não habilite regras de estilo ou regras que exigem informações de tipos. Instale Prettier localmente com versão exata e adote uma configuração mínima compartilhada. Use os guias para escrever as configurações; não é necessário memorizar seu formato.

Exponha os seguintes scripts em `package.json`:

| Script | Resultado exigido |
|---|---|
| `lint` | Analisar os fontes TS e falhar diante de violações; não modificar arquivos |
| `format:check` | Conferir a formatação dos fontes HTML/CSS/TS e das configurações; não modificar arquivos |
| `format` | Formatar esses mesmos arquivos; mudanças devem ser revisadas no diff |

Não processe `dist/` ou `node_modules/`. Não dependa exclusivamente de uma extensão do editor: os comandos devem funcionar no terminal. Preserve `dev`, `typecheck`, `build` e `preview`.

**Experimentos de aceitação:** acrescente temporariamente uma variável não utilizada em um fonte; o lint deve apontá-la. Remova esse experimento. Desformate uma linha; `format:check` deve falhar sem reescrevê-la. Execute `format`, confira que mudou apenas a apresentação e rode a conferência novamente. Remova os experimentos antes do commit. Os comandos `lint`, `format:check`, `typecheck` e `build` devem então passar.

Reteste um envio por `Enter` e outro pelo botão: cada um adiciona exatamente um item. A entrada `<b>teste</b>` deve continuar aparecendo como texto literal, e o rótulo da nova checkbox deve alternar somente ela. Se uma ferramenta passar e esse comportamento falhar, o trabalho ainda precisa de ajuste.

### 5. Executar a partir do que foi versionado

**Entrada:** versão local funcionando, com verificações aprovadas.

**Contrato da entrega:** escreva um README curto **da aplicação**, na pasta do laboratório. Informe a finalidade, as versões de Node/npm utilizadas, o caminho dessa pasta em relação à raiz Git, os comandos de instalação, desenvolvimento, checagem, lint, formatação, build e preview. Explique que a lista reinicia ao recarregar. Esse README serve para executar o projeto; não é um relatório de estudo.

Registre os fontes, as configurações, o README, `package.json` e `package-lock.json` em commits compreensíveis na branch. `node_modules/`, `dist/` e credenciais não entram. Confira o conteúdo registrado; um arquivo salvo mas não commitado não será obtido pelo clone.

Para conferir **sem depender de envio ao GitHub**, faça um clone local da branch para uma pasta nova fora da árvore de trabalho original. O padrão é `git clone --branch NOME-DA-BRANCH CAMINHO-DO-REPOSITORIO PASTA-NOVA`; substitua os três valores, usando aspas para caminhos com espaços. Ele clona o repositório inteiro, incluindo somente o que foi commitado. Entre na subpasta da aplicação e siga apenas seu README.

Rode `npm ci`, as três checagens (`typecheck`, `lint`, `format:check`), `build` e `preview`. Use `dev` separadamente para confirmar também esse comando; encerre o servidor com `Ctrl+C` quando terminar. Não copie `node_modules` nem `dist` da pasta anterior.

**GitHub:** identifique o remoto com `git remote -v` e compare a branch local com o que aparece no GitHub. Se os commits ainda não foram enviados, essa diferença é esperada. Quando combinar com o professor o envio ao remoto existente, use `git push -u origin NOME-DA-BRANCH`, adaptando o nome do remoto se necessário; confira a branch, os arquivos e o commit na interface do GitHub. Não é necessário criar um repositório, publicar a página ou abrir PR. Havendo rejeição, investigue com o professor; não use force-push. O clone local já permite verificar a reprodução sem tornar esse envio uma condição para testar.

**Aceitação final:**

| Verificação no clone novo | Resultado esperado |
|---|---|
| `npm ci` | Instalação concluída; manifesto e lockfile permanecem sem alterações |
| Checagens e build | Sucesso usando as ferramentas locais; `dist/` gerado no clone |
| URL do preview | Página carregada com CSS e script, sem falhas de carregamento no Console |
| Espaços, título válido, `Enter` e botão | Mesmos resultados contratados no capítulo 20, sem duplicar itens |
| Checkbox, teclado e viewport de `360px`/`900px` | Interação e layout preservados |
| Recarregar a página | Lista inicial restaurada, sem persistência |
| `git status` depois dos comandos | Sem mudanças rastreadas nem saídas geradas pendentes |

O professor revisa a tentativa e as falhas que aparecerem. Conseguir explicar qual arquivo controla uma etapa e qual comando reproduz o resultado é mais útil do que decorar todos os comandos.

[Voltar ao guia — etapa 5](../README.md#etapa-5)
