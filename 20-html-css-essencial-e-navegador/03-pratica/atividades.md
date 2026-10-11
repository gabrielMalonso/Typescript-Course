# Prática — Minha primeira página de tarefas

## O que vamos construir

Uma página local para escrever tarefas, adicioná-las a uma lista e marcar ou desmarcar sua conclusão. Você implementa cada etapa depois da aula correspondente, com acompanhamento do professor (ChatGPT). Este documento define a entrega; não contém a implementação.

Comece uma pasta própria de trabalho com `index.html`. Na etapa 2, acrescente `estilos.css`; na etapa 5, `interacao.ts` e seu JavaScript compilado. Preserve os arquivos dos experimentos e os trabalhos anteriores.

O projeto não exige remoção, edição, filtros, contadores, armazenamento, backend, publicação ou bibliotecas. Recarregar devolve a lista inicial. Marcar uma checkbox é comportamento nativo do navegador; adicionar um novo item será a interação programada.

### Como trabalhar com o professor

Leia os requisitos, faça uma primeira tentativa e envie somente a etapa atual. Para as etapas visuais, mostre o HTML/CSS e uma captura ou a página aberta; para a interação, inclua o TypeScript e diga quais casos testou. Uma frase sobre a dúvida basta; não há relatório obrigatório.

O professor deve revisar a tentativa, explicar problemas concretos e sugerir o próximo ajuste. Se você travar, peça uma pista sobre o conceito ou o próximo passo. Implemente e teste antes de pedir a próxima pista; não peça uma página inteira pronta.

### 1. Estrutura da página de tarefas

**Ponto de partida:** aula 1; nenhum CSS próprio ou script ainda.

**Conteúdo inicial:** título principal **Minhas tarefas**, uma breve descrição, uma região **Nova tarefa** com formulário e uma região **Lista de tarefas**. A lista começa com **Ler dez páginas** e **Organizar a mesa**, ambas não concluídas.

**Requisitos:**

- Documento com idioma português, codificação UTF-8, título da aba e configuração de viewport.
- Um conteúdo principal identificado semanticamente, com título principal e títulos das duas regiões.
- Formulário com um campo de texto obrigatório, rótulo visível **Título da tarefa** e botão de envio **Adicionar tarefa**. Use `name` no campo e associe seu rótulo corretamente.
- Lista HTML com dois itens. Cada item contém uma checkbox e um rótulo visível com o título da tarefa. Cada associação tem um `id` único.
- Aviso visível de que esta primeira etapa ainda não adiciona tarefas.

**Aceitação:** a página abre localmente e mantém acentos; a aba tem título; clicar em cada rótulo atua sobre seu próprio campo ou checkbox; a lista e a hierarquia de títulos fazem sentido mesmo sem CSS. Enviar vazio é bloqueado pelo navegador. O formulário ainda tem envio padrão, conforme a aula; não precisa criar itens nesta etapa.

### 2. Aparência e espaçamento

**Entrada:** a página da etapa 1, com os mesmos textos e controles.

**Requisitos:** conectar `estilos.css`; escolher fonte legível, cores e espaçamentos em `rem`; limitar a largura principal e centralizá-la quando houver espaço; usar `border-box` nas caixas dimensionadas. Diferencie visualmente as regiões sem depender de imagens ou animações. Preserve os rótulos e o foco padrão do navegador.

**Aceitação:** editar o CSS e recarregar muda a página; título, formulário e lista têm uma separação visível; caixas de texto crescem quando o conteúdo exige mais linhas. No inspetor, escolha uma região e explique quais medidas pertencem a conteúdo, padding, borda e margem. Se uma declaração perdeu na cascata, consiga identificar a vencedora.

Não há uma aparência única obrigatória: a escolha visual é sua. Não use `!important` para resolver conflitos sem compreender sua origem.

### 3. Organização do layout

**Entrada:** as duas regiões estilizadas da etapa 2.

**Requisitos:** em uma janela larga, colocar formulário e lista lado a lado com Grid. Usar Flexbox para alinhar a checkbox e seu rótulo dentro de cada item; manter os itens da lista em sequência. Separar elementos com `gap` onde esse mecanismo fizer sentido. Preservar a ordem do HTML: apresentação, formulário, lista.

**Aceitação:** as duas regiões dividem o espaço sem sobreposição em um viewport de `900px`; as caixas de seleção ficam alinhadas aos títulos; o texto pode quebrar em linhas. Acrescente temporariamente um terceiro item estático e confira que ele entra na sequência sem regras de posição específicas; remova somente esse item de teste para voltar às duas tarefas iniciais.

Estreite a janela e observe onde o layout começa a ficar apertado. Essa observação será a entrada da próxima etapa, sem necessidade de registrar uma análise formal.

### 4. Tela pequena e teclado

**Entrada:** o layout da etapa 3 e o ponto em que ele deixou de ser confortável.

**Requisitos:** usar uma coluna como base e uma media query para apresentar as duas regiões lado a lado quando houver espaço. Escolher o breakpoint pelo conteúdo. Manter a largura dos controles dentro da região. Garantir rótulos visíveis, contorno de foco perceptível e contraste de pelo menos 4,5:1 nos textos. Não bloquear zoom nem reordenar visualmente os controles.

**Testes de aceitação:**

| Entrada/ação | Resultado esperado |
|---|---|
| Viewport de `360px` | Formulário antes da lista, em uma coluna; sem rolagem horizontal |
| Viewport de `900px` | Duas regiões lado a lado, sem corte ou sobreposição |
| Zoom de `200%` | Textos e controles continuam visíveis e utilizáveis |
| Percurso com `Tab` e `Shift+Tab` | Campo, botão e checkboxes em ordem compreensível; foco sempre visível |
| `Espaço` em uma checkbox | Alternar somente aquela tarefa; repetir para desmarcar |
| Título estático de cerca de 100 caracteres | Quebra de linha sem invadir a região vizinha |

O estado marcado da checkbox comunica a conclusão. Não é necessário acrescentar um texto de estado ou mudar a cor por JavaScript. Se acrescentar cor decorativa, ela não pode ser a única indicação.

### 5. Adicionar uma tarefa

**Entrada:** a página das etapas anteriores, ainda com as duas tarefas iniciais. Compile o script como no experimento da aula 5 e conecte o `.js` ao HTML com execução após a leitura dos elementos. Atualize o aviso: a página funciona localmente e reinicia ao recarregar.

**Contrato da interação:**

1. O título vem do campo de texto. Considere o texto após remover espaços das pontas; se ficar vazio, não adicione nada.
2. Ouça o envio do formulário, atendendo tanto o botão quanto `Enter`. Em um envio tratado pelo script, impeça a navegação padrão.
3. Para entrada válida, acrescente exatamente um item ao final da lista. Ele contém o título como texto e uma checkbox inicialmente desmarcada, com rótulo associado e identificador único entre todas as checkboxes da página.
4. Depois do sucesso, limpe o campo, devolva o foco a ele e mostre uma mensagem textual em uma região de status existente antes do envio. Para texto só de espaços, preserve a lista, explique o problema e foque o campo. Para o campo totalmente vazio, a validação nativa de `required` é suficiente.
5. Consulte os elementos necessários uma vez na inicialização. Trate `null` e confira os tipos de formulário e input antes de usá-los; se faltar uma peça, registre um diagnóstico claro no Console e não inicialize a interação. Não use casts ou non-null assertions.

Você escolhe os nomes de classes, seletores e a forma simples de gerar identificadores. Não é obrigatório criar uma coleção paralela de objetos: o DOM basta para este escopo. Se preferir representar dados, combine com o professor uma única fonte de verdade e evite duplicar estados sem necessidade.

**Casos de aceitação, após recarregar:**

| Entrada/ação | Resultado esperado |
|---|---|
| Campo vazio | Bloqueio nativo; lista continua com dois itens |
| Três espaços | Mensagem explicativa; dois itens; foco no campo |
| `  Comprar pão  ` pelo botão | Terceiro item com `Comprar pão`; campo limpo; sem recarregar |
| `Revisar anotações` com `Enter` | Quarto item; mesmo fluxo do botão |
| Repetir um título existente | Mais um item: títulos iguais são permitidos, com IDs diferentes |
| `<b>teste</b>` | Título literal; não criar marcação HTML a partir da entrada |
| Marcar o novo item pelo rótulo e pelo teclado | Alternar a checkbox correta; o item continua na lista |
| Adicionar um título de cerca de 100 caracteres | Preservar o layout nas larguras da etapa 4 |
| Recarregar | Voltar às duas tarefas iniciais, sem persistência presumida |

**Experimento de ausência:** em uma cópia de trabalho, mude o `id` de um elemento exigido pelo script sem alterar o seletor. Recarregue e confira o diagnóstico no Console, sem erro por acessar `null`. Restaure a associação ao terminar. Esse teste confere a inicialização; sem ela, o formulário pode voltar ao envio padrão.

## Critério de conclusão

Revise com o professor a versão que você implementou. Ela deve atender às cinco etapas, preservar o uso por teclado depois de adicionar itens e permitir explicar o papel de cada arquivo, uma decisão de layout e o caminho do evento até a alteração da lista. Problemas encontrados são ajustes a fazer, não evidência automática de estudo concluído.

[Voltar ao guia — etapa 5](../README.md#etapa-5)
