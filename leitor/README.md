# Leitor de Aulas

App React + Vite para ler as aulas do curso em Markdown com tipografia confortável e índice estilo explorador.

## Versão hospedada

O leitor está publicado com acesso privado em:

<https://leitor-typescript-gabriel.gabrielmonteiroalons.chatgpt.site>

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

Novos capítulos em pastas `NN-nome/` entram no índice automaticamente via `import.meta.glob`.

Arquivos sensíveis (`.context/`, `correcoes.md`, `resultado.md`, gabaritos) ficam fora do catálogo.

## Progresso

Edite `src/content/progress.json` para atualizar o bloco de progresso da home.
