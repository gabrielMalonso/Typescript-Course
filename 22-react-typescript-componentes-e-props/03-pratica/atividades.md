# Prática — A página de tarefas em componentes

Vamos reaproveitar o contexto dos capítulos 20 e 21 para construir uma **versão de leitura** da página de tarefas. Você implementará o projeto com acompanhamento do professor. Os contratos abaixo definem o resultado, sem fornecer os componentes prontos.

Preserve a aplicação anterior, inclusive seu formulário e sua interação. Esta versão React ficará em uma pasta nova e mostrará dados definidos no código. Vamos acrescentar interações nos próximos capítulos.

## Preparar o laboratório

Use como referência seus fontes e o layout anterior. Se ainda não os desenvolveu, combine a base com o professor; não é necessário presumir que os estudos anteriores foram concluídos.

Na documentação do [Vite — Scaffolding Your First Vite Project](https://vite.dev/guide/#scaffolding-your-first-vite-project), consulte a nota de compatibilidade e a escolha de templates. Pare antes de **Community Templates**. A novidade em relação ao capítulo 21 é escolher **`react-ts`** em vez de `vanilla-ts`.

Na pasta `03-pratica/` deste capítulo, confira que `laboratorio-tarefas-react` ainda não existe e execute:

```bash
npm create vite@latest laboratorio-tarefas-react -- --template react-ts
cd laboratorio-tarefas-react
npm install
npm run dev
```

Confira os requisitos de Node e as mensagens do gerador. Se ele oferecer comandos automáticos, execute-os manualmente para acompanhar as etapas. Use o Git existente do curso, sem iniciar outro repositório dentro dele.

Inspecione `index.html`, a entrada `src/main.tsx` e `src/App.tsx`. Preserve a montagem do React feita pela entrada. Substitua a demonstração de `App.tsx` pelos exemplos do guia, um por vez; o contador do template usa recursos que estudaremos depois. Ajuste o CSS de demonstração quando ele atrapalhar o layout.

Depois dos exemplos, escreva sua própria versão de `App.tsx` para as etapas abaixo. Mantenha TypeScript estrito e as configurações JSX do template. Use `npm run build` para conferir tipos e gerar a aplicação; confirme que o script executa a checagem antes do Vite, como no capítulo 21. Se separar um script `typecheck`, ele deve verificar os projetos TypeScript referenciados pelo template.

### 1. Da página aos componentes

**Entrada:** laboratório React funcionando e dois registros definidos por você no código:

- **Ler dez páginas**, situação **Pendente**.
- **Organizar a mesa**, situação **Concluída**.

**Contrato dos componentes:**

- `App` monta a página com um único `main`, o título principal **Minhas tarefas** e uma explicação de que esta versão apenas apresenta dados.
- `Cabecalho` recebe `titulo: string` e `descricao?: string`. Apresenta o `h1` e a descrição; quando ela for omitida, usa **Uma tarefa de cada vez.** como valor padrão.
- `ItemTarefa` recebe uma prop `tarefa`, com um contrato nomeado `Tarefa`. Esse contrato tem `titulo: string` e `situacao: "Pendente" | "Concluída"`, ambos de leitura (`readonly`). O componente apresenta um `li` com o título e a situação em texto.

Declare os dois registros fora de `ItemTarefa` e passe um para cada uso do componente. Escreva as duas instâncias explicitamente dentro de um `ul`; a geração por `map` fica para o capítulo 24. A situação já contém o texto a exibir, sem exigir condicionais.

**Aceitação:** os dois itens usam a mesma implementação e mostram seus respectivos dados. Não há formulário nem checkbox nesta versão. Os elementos no inspetor preservam a estrutura `ul` → `li`, e o layout cabe em tela estreita, reaproveitando o CSS que for útil.

Com o professor, experimente omitir a descrição e mudar o título de somente um registro: a descrição padrão aparece e apenas o item correspondente recebe o novo título. Passe temporariamente um número como título ou uma situação fora da union e observe o erro de tipos. Restaure o código válido antes de continuar, sem casts para contornar o contrato.

[Voltar ao guia — Composição](../README.md#etapa-4)

### 2. Uma seção que recebe conteúdo

**Entrada:** componentes e registros da etapa 1.

**Contrato:** crie `Secao`, que recebe `titulo: string` e `children: ReactNode`. Ela apresenta um `section` com `h2` e o conteúdo recebido. Importe `ReactNode` como tipo.

Use `Secao` duas vezes no `App`: **Tarefas** recebe o `ul` com os itens; **Sobre esta página** recebe um parágrafo explicativo. O `App` escolhe esses conteúdos. `Secao` organiza a região e não conhece o contrato `Tarefa`.

**Aceitação:** ambos os conteúdos aparecem em suas respectivas seções. Os dados chegam a `ItemTarefa` por props; a lista e o parágrafo chegam a `Secao` por `children`. Nenhum componente modifica os objetos recebidos ou altera manualmente o DOM gerenciado por React.

**Mudança de requisito:** acrescente à seção **Sobre esta página** um link para `https://react.dev/learn`, depois do parágrafo. Faça isso sem alterar `Secao`. O link deve funcionar por navegação HTML normal, inclusive com teclado.

Ao terminar, rode a checagem de tipos/build e o lint do template, confira a página no navegador e apresente sua tentativa ao professor. A entrega está pronta para discussão quando os componentes cumprem seus contratos e você consegue explicar por que `Secao` recebe conteúdo, enquanto `ItemTarefa` recebe dados de uma tarefa. Não é necessário criar relatório nem novos exercícios.

[Voltar ao guia](../README.md)
