# Leitor de Aulas

Aplicação React com Vinext/Vite para ler os materiais do currículo pessoal em Markdown. Preserva as rotas da fase inicial com TypeScript e aceita a estrutura flexível dos capítulos futuros.

## Versão hospedada

O leitor está publicado com acesso privado em:

<https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site>

A reformulação curricular de 09/09/2026 foi integrada localmente; esta alteração ainda não foi publicada. A URL existente permanece a mesma.

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
- Novos capítulos: aula, prática numerada 01–03, debugging/LeetCode/lab, perguntas do checkpoint, resumo/erros comuns/revisitar e referências.

Respostas, soluções, correções, resultados e gabaritos ficam fora do catálogo. Variações de nomes/seções precisam ser conferidas na geração de cada capítulo. Avaliações de bloco em `avaliacoes/` e capstones em `projetos/` deverão ser integrados quando seus primeiros enunciados forem criados; essas pastas ainda não têm materiais novos.

Arquivos sensíveis (`.context/`, `correcoes.md`, `resultado.md`, gabaritos) ficam fora do catálogo.

## Progresso

Atualize `src/content/progress.json` com base nas evidências de `PROGRESSO.md`: 00–08 concluídos; 09 em andamento para fechamento formal. A contagem da home refere-se aos capítulos registrados, não à porcentagem do currículo futuro. Atualize também a indicação de próximo conteúdo na home quando houver avanço.

## Verificação

Após mudanças no leitor, executar `npm run typecheck`, `npm run lint` e `npm run build`. Conferir home e rota pertinente, mantendo as rotas existentes. Publicação requer escopo autorizado e deve reutilizar `leitor/.openai/hosting.json`, URL e acesso existentes.
