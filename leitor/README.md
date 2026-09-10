# Leitor de Aulas

Aplicação React com Vinext/Vite para ler os materiais do currículo pessoal em Markdown e recortes PDF. Preserva as rotas da fase inicial com TypeScript e aceita a estrutura flexível dos capítulos futuros.

## Versão hospedada

O leitor está publicado com acesso privado em:

<https://leitor-typescript-gabriel.gabrielm-alonso.chatgpt.site>

A reformulação curricular e o capítulo 10 foram publicados em 09/09/2026 na versão 31, no projeto existente e com acesso privado preservado. A URL acima é a retornada pelo Sites na confirmação.

## Como usar

```bash
cd leitor
npm install
npm run dev
```

Abra o endereço local (e, na mesma rede, o IP mostrado pelo Vite no celular).

## Rotas

- `/` — home, progresso e índice
- `/ler/:caminho` — leitura (ex.: `/ler/00-preparacao-do-ambiente/aula/01-teoria`)

## Escalabilidade

Novos capítulos em pastas `NN-nome/` entram no índice via `import.meta.glob`, conforme as seções permitidas em `src/content/catalog.ts`:

- Histórico: README, aula, extras, listas de exercícios e enunciado da prova.
- Guias por curadoria: README, notas.md opcional e pratica/atividades.md. O capítulo 10 usa esses três documentos e seis recortes PDF.
- Formatos anteriores continuam reconhecidos: aula, prática numerada 01–03, debugging/LeetCode/lab, perguntas do checkpoint, resumo/erros comuns/revisitar e referências. Isso não torna essas etapas obrigatórias.

Respostas, soluções, correções, resultados e gabaritos ficam fora do catálogo. Variações de nomes/seções precisam ser conferidas na geração de cada capítulo. Avaliações de bloco em `avaliacoes/` e capstones em `projetos/` deverão ser integrados quando seus primeiros enunciados forem criados; essas pastas ainda não têm materiais novos.

Arquivos sensíveis (`.context/`, `correcoes.md`, `resultado.md`, gabaritos) ficam fora do catálogo. Os 14 caminhos substituídos do capítulo 10 redirecionam ao novo README sem recolocar o material antigo no índice.

Atualização em 10/09/2026: piloto por curadoria e leitor PDF noturno publicados na versão 32, com acesso privado e publicação confirmada. A versão 31 acima descreve o histórico anterior.

## Progresso

Atualize `src/content/progress.json` com base nas evidências de `PROGRESSO.md`: 00–08 concluídos; 09 em andamento para fechamento formal; 10 com material disponível e estudo pendente. A contagem da home refere-se aos capítulos registrados, não à porcentagem do currículo futuro. Atualize também a indicação de próximo conteúdo na home quando houver avanço.

## Verificação

Gestos de zoom: `node tests/pdf-zoom.test.mjs`. Após mudanças no leitor, executar `npm run typecheck`, `npm run lint` e `npm run build`. Conferir home e rota pertinente, mantendo as rotas existentes. Publicação requer escopo autorizado e deve reutilizar `leitor/.openai/hosting.json`, URL e acesso existentes.

## Leituras PDF

Colocar somente o recorte selecionado em `NN-capitulo/leituras/nome.pdf`, acompanhado de `nome.json`. O catálogo exige `title`, `book`, `edition`, `section`, `printedStart`, `sourcePdfStart` e `pageCount`; as páginas são numeradas a partir de 1. Cada recorte é contínuo. Para intervalos distintos, criar recortes separados.

Para apontar uma página, use `[p. 14 — abrir enunciado](../leituras/clrs-1.2.pdf#page=4)` nas atividades: 14 é a página impressa; 4 é a posição dentro do recorte 11–14. O leitor preserva o fragmento e espera as páginas anteriores terem altura definida antes de rolar. Fragmentos inválidos abrem a primeira página. A pinça não refaz esse salto. Não usar a posição do PDF completo em `#page=`.

A partir do capítulo 10, README aparece como “Guia de estudo”, com retorno a ele nos rodapés de notas/prática. Seções numeradas de nível 2 do guia usam `#etapa-N`; atividades numeradas de nível 3 em `pratica/atividades.md` usam `#atividade-N`. Outros títulos usam minúsculas, sem acentos/pontuação, com hífens entre palavras (ex.: `#memoria`). Links a notas devem incluir o fragmento e um retorno à etapa correspondente. Os caminhos antigos permanecem válidos.

O link relativo `[Título · páginas](leituras/nome.pdf)` no README abre um cartão de leitura. PDF e metadados entram automaticamente no índice. O PDF.js é carregado somente ao abrir uma leitura, usa worker local e apresenta as páginas em rolagem contínua. A barra superior contém somente índice e alternância do modo noturno; o gesto de pinça amplia somente o PDF (1×–4×), com rolagem interna e barra fixa. Pinça de trackpad/Ctrl+roda também atua sobre o PDF. O PDF original permanece no arquivo do capítulo e é oferecido como alternativa em caso de erro; a tela do piloto utiliza canvas, sem camada de seleção de texto.

Incluir apenas os recortes autorizados para o acesso do site; o livro completo permanece fora do repositório. No piloto, páginas impressas 11–14 correspondem às posições 32–35 do PDF enviado. O recorte inclui os limites completos das páginas, e o guia delimita a seção estudada.


Atualização posterior em 10/09/2026: interface de leitura simplificada publicada na versão 33, com confirmação `succeeded` e acesso privado preservado. Somente índice e alternância do modo noturno na barra; páginas em rolagem contínua.


Zoom interno do PDF publicado em 10/09/2026 na versão 34, com estado `succeeded`: pinça amplia o documento e mantém a barra fixa. Validação em tablet físico ainda não realizada.


O leitor Markdown e o PDF compartilham `ReaderToolbar` e `ThemeToggle`. O PDF usa o tema persistido por `ThemeProvider`, mantendo a barra mínima sem cabeçalho editorial. Leituras do capítulo 10: 1.2 (11–14), introdução de 2.1 (16–18), 2.2 em dois recortes (23–25 e 27–29), 3.1 (43–49) e 3.2 (55–57). Total: 23 páginas originais; os limites pedagógicos dentro das páginas continuam no guia.


Atualização em 10/09/2026, versão 35 publicada (`succeeded`): barra e tema compartilhados entre Markdown/PDF; cinco recortes CLRS do capítulo 10 disponíveis (20 páginas). Protótipo aprovado por Gabriel; estudo e domínio não concluídos.
