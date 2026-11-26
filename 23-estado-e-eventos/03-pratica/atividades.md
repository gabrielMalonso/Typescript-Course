# Prática — Tornar a página de tarefas interativa

Vamos evoluir a página de tarefas do capítulo 22 para responder a ações do usuário, alternar situações e manter um resumo sempre coerente. Os contratos abaixo especificam o resultado; a implementação fica com você, acompanhada pelo professor.

**Escopo preservado:** continuamos com as duas tarefas iniciais exibidas explicitamente, sem formulário, sem `<input>` controlado, sem geração de lista com `map`/`key` no JSX e sem renderização condicional para vazio ou erro. Tudo isso entra no capítulo 24.

## Preparar a base

Preserve sua versão somente leitura do capítulo 22 sem modificá-la. Trabalhe em uma **pasta nova** dentro deste capítulo, por exemplo `03-pratica/laboratorio-tarefas-interativo/`:

- Se você já construiu o laboratório do capítulo 22, copie apenas os arquivos-fonte e de configuração (sem `node_modules/` nem `dist/`) para a pasta nova e execute `npm install`.
- Se ainda não fez o laboratório do capítulo 22, crie um projeto novo com `npm create vite@latest laboratorio-tarefas-interativo -- --template react-ts`, instale as dependências e comece pelos contratos do capítulo 22 (`Cabecalho`, `Secao`, `ItemTarefa` e `Tarefa`) combinados com o professor. Não é necessário presumir que capítulos anteriores foram concluídos.

Use o Git existente do curso, sem iniciar outro repositório dentro dele. Antes de começar as etapas, teste os exemplos independentes do guia em `src/App.tsx` e confirme que `npm run dev`, `npm run lint` e `npm run build` funcionam.

### 1. Interação local e atualização imutável

**Entrada:** base React + TypeScript funcionando, com `Cabecalho`, `Secao`, `ItemTarefa` e os dois registros iniciais:

- `id: 1`, título **Ler dez páginas**, situação `"Pendente"`.
- `id: 2`, título **Organizar a mesa**, situação `"Concluída"`.

**Contrato:**

- Atualize o contrato nomeado `Tarefa` para ter `readonly id: number`, `readonly titulo: string` e `readonly situacao: "Pendente" | "Concluída"`.
- Em `ItemTarefa`, receba a prop `tarefaInicial: Tarefa` e declare um estado local `useState<Tarefa>(tarefaInicial)`.
- Dentro do `li` de `ItemTarefa`, além do título e da situação em texto, acrescente um `<button type="button">` com rótulo claro (por exemplo, **Alternar situação**, ou **Concluir** / **Reabrir** conforme a situação atual).
- Ao clicar no botão, atualize o estado de forma **imutável**, usando função atualizadora e spread (`{ ...atual, situacao: ... }`), alternando entre `"Pendente"` e `"Concluída"`.

**Aceitação:**

- Clicar no botão da primeira tarefa altera apenas a situação dela; a segunda tarefa permanece intacta (estado isolado por instância).
- Ativar os botões pelo teclado (`Tab` + `Enter` ou `Espaço`) produz o mesmo resultado.
- Nenhum código muta o objeto do estado diretamente.
- Recarregar a página volta as duas tarefas às situações iniciais.

Com o professor, tente temporariamente mutar `tarefaAtual.situacao = "Concluída"` ou atribuir uma string fora da union (`"Em andamento"`): confirme que o TypeScript barra ambos. Restaure o código válido antes de seguir.

[Voltar ao guia — Estado derivado](../README.md#etapa-4)

### 2. Elevar o estado e derivar o resumo

Agora surgiu uma necessidade real que o estado local de `ItemTarefa` não consegue atender: exibir um resumo atualizado das tarefas e coordená-las a partir de uma única fonte de verdade.

**Entrada:** componentes e registros da etapa 1.

**Contrato:**

- **Remover estado do filho:** remova `useState` de `ItemTarefa`. Ele volta a receber `tarefa: Tarefa` e passa a receber o callback tipado `onAlternar: (id: number) => void`. Ao clicar no botão, `ItemTarefa` apenas avisa o pai chamando `onAlternar(tarefa.id)`.
- **Elevar para `App`:** declare em `App` a lista inicial `readonly Tarefa[]` com as duas tarefas e guarde-a em `useState<readonly Tarefa[]>(...)`. Implemente `handleAlternarTarefa(id: number)` atualizando o array de forma imutável (`.map(...)` criando um novo objeto apenas para a tarefa cujo `id` corresponde).
- **Renderização explícita:** continue passando `tarefas[0]` e `tarefas[1]` explicitamente para os dois usos de `<ItemTarefa />` dentro do `ul` da seção **Tarefas** (a geração por `map` no JSX entra no capítulo 24).
- **Estado derivado em `ResumoTarefas`:** crie o componente `ResumoTarefas` recebendo `total: number` e `concluidas: number`. Ele apresenta quantas tarefas estão concluídas, o total e quantas estão pendentes (por exemplo: `Concluídas: 1 de 2 · Pendentes: 1`). Calcule `concluidas` em `App` diretamente a partir de `tarefas` — **sem** criar um segundo `useState` para contagem — e calcule `pendentes` a partir de `total` e `concluidas`.

**Aceitação:**

- Estado inicial na tela: `Ler dez páginas` (`Pendente`), `Organizar a mesa` (`Concluída`) e resumo indicando `1` concluída de `2` (`1` pendente).
- Alternar `Ler dez páginas` atualiza o item para `Concluída` e o resumo para `2` de `2` (`0` pendentes).
- Alternar ambas atualiza o resumo para `0` de `2` (`2` pendentes).
- `ItemTarefa` e `ResumoTarefas` não possuem `useState`; `App` possui apenas um `useState` para a lista de tarefas.
- A estrutura semântica (`main`, `section`, `ul` → `li`, `button type="button"`) e o layout em tela estreita continuam preservados.

**Mudança de requisito:** acrescente à seção **Tarefas** um botão **Marcar todas como pendentes**, implementado no `App` sem alterar `ItemTarefa` nem `ResumoTarefas`. Ao ativá-lo, todas as tarefas passam para `"Pendente"` por atualização imutável do array, e tanto os dois itens quanto o `ResumoTarefas` refletem `0` de `2` concluídas imediatamente. (Se algum item não mudar junto com o resumo, investigue se restou estado duplicado no componente filho.)

Ao terminar, execute a checagem de tipos/build (`npm run build`) e o lint (`npm run lint`), confira todas as interações no navegador (mouse e teclado) e apresente sua tentativa ao professor. A entrega está pronta para discussão quando você consegue explicar por que o estado subiu para `App`, por que a contagem não deve ficar em outro `useState` e o que aconteceria se o array fosse mutado no lugar. Não é necessário criar relatório nem novos exercícios.

[Voltar ao guia](../README.md)
