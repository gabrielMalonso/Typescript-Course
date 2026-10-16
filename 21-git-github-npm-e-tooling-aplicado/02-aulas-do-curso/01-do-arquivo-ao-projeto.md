# Do arquivo ao projeto — conexões entre as ferramentas

Este complemento acompanha as leituras do guia. O problema agora é fazer a mesma página funcionar a partir dos arquivos que outra pessoa consegue obter do Git, sem depender de passos esquecidos no seu computador.

## Pasta, staging e commit

Antes de um comando, confira onde ele vai atuar. No terminal do macOS/Linux, `pwd` mostra a pasta e `ls` lista seu conteúdo; `cd "caminho com espaços"` entra em outra pasta e `cd ..` sobe um nível. Os comandos do laboratório usam esse terminal; no Windows, use Git Bash. Um servidor ocupa o terminal enquanto estiver ativo; `Ctrl+C` o encerra. Isso não apaga o projeto.

Para inspecionar o contexto Git:

```bash
git rev-parse --show-toplevel
git status
git branch --show-current
```

Uma aplicação pode ter seu próprio `package.json` dentro de um repositório que contém outras aplicações. Não execute um gerador na raiz do curso nem crie um `.git` dentro de outro repositório por engano.

Pense no staging como o conteúdo escolhido para o próximo commit. `git diff` compara alterações de arquivos rastreados com o staging; `git diff --staged` mostra o que está preparado para o commit. Arquivos novos ainda não adicionados aparecem em `git status`, mas seu conteúdo não aparece no `git diff` comum. Confira-os no editor. Edite, revise, adicione caminhos específicos e confira o staging antes de registrar.

Um `.gitignore` local da aplicação deve excluir `node_modules/` e `dist/`. Ele não deixa de rastrear um arquivo já commitado. Se algo gerado já estiver no histórico, peça orientação para ajustar somente a cópia do laboratório; não apague trabalhos anteriores.

[Voltar ao guia — etapa 1](../README.md#etapa-1)

## Dependências e comandos locais

Node executa as ferramentas no seu computador; o navegador executa a aplicação. npm instala os pacotes declarados em `package.json` e dispara scripts. Vite fornece o servidor de desenvolvimento e prepara os arquivos para o navegador.

Neste projeto, TypeScript, Vite, ESLint e Prettier são ferramentas de desenvolvimento: pertencem a `devDependencies`. Uma biblioteca importada pela aplicação seria uma dependência de uso da aplicação. Classificar um pacote como desenvolvimento não elimina a necessidade dele na máquina que vai produzir o build.

O campo `private: true` evita publicar acidentalmente o pacote no registro npm; ele não torna um repositório GitHub privado.

Em um script npm, o comando encontra executáveis instalados em `node_modules/.bin`. Assim, `"typecheck": "tsc --noEmit"` usa o TypeScript do projeto. Não exige `tsc` global. `npm run` sem nome lista os scripts disponíveis; o nome é escolhido pelo projeto, não uma função mágica do npm. Rode os comandos na pasta que contém o `package.json` da aplicação.

O gerador `npm create vite@latest` é uma preparação inicial e pode mudar com o tempo. Depois da criação, quem define as versões instaladas é o projeto com seu lockfile. A prática usa `vanilla-ts` em uma pasta nova, sem substituir a página original. Confira a versão de Node exigida pelo Vite e pelas ferramentas antes de começar; registre as versões de Node e npm que você realmente utilizou.

[Voltar ao guia — etapa 2](../README.md#etapa-2)

## Módulos e duas verificações diferentes

Antes, o HTML carregava o `.js` gerado ao lado de `interacao.ts`. No Vite, a entrada é um `<script type="module" src="/src/main.ts"></script>` no `index.html`. Essa referência passa pelo servidor/build do Vite, que a transforma para o navegador. Ela não significa que abrir o HTML com `file://` permite ao navegador executar TypeScript diretamente.

O módulo de entrada importa os demais. Não mantenha também o script antigo: executar as duas entradas pode registrar dois listeners para o mesmo envio. Mantenha uma única conexão de cada CSS, pelo HTML ou pelo import aceito pelo Vite.

Um exemplo independente da página de tarefas, para experimentar exportações nomeadas:

```typescript
// medida.ts
export interface Medida {
  centimetros: number;
}

export function emMetros(medida: Medida): number {
  return medida.centimetros / 100;
}
```

```typescript
// main.ts
import { emMetros } from "./medida";
import type { Medida } from "./medida";

const altura: Medida = { centimetros: 180 };
console.log(emMetros(altura)); // 1.8
```

Experimente os dois arquivos em um projeto Vite de teste, separado das tarefas. A função é um valor utilizado durante a execução; a interface é informação para o verificador e desaparece do JavaScript. `import type` explicita essa diferença. O caminho `./medida` é relativo ao arquivo que importa e funciona com a configuração de resolução do template Vite; não generalize essa escolha de extensão para executar módulos diretamente no Node.

O template também pode importar CSS por efeito colateral: `import "./style.css"`. Nesse caso, não há valor importado; Vite processa o arquivo. Não precisamos criar importações desse tipo para os módulos de regras da aplicação.

O `tsconfig.json` define o conjunto de arquivos e as opções do verificador. Use o arquivo local do template, preserve `strict: true` e confira que os fontes da aplicação estão incluídos. Rodar `tsc arquivo.ts` ignora esse arquivo de configuração; use `tsc --noEmit` na pasta do projeto ou `tsc -p caminho/tsconfig.json --noEmit` quando precisar indicar outro local.

`strict` reúne checagens como parâmetros sem tipo inferível e uso de valores possivelmente nulos. Não substitua o narrowing do capítulo 20 por casts ou `!` para silenciar um diagnóstico. Os tipos continuam sem validar a entrada do usuário em runtime.

Vite transforma e empacota o código, mas não faz a checagem de tipos. Por isso o contrato do laboratório exige que o script de build verifique os tipos antes de gerar a saída. Um encadeamento com `&&` executa a segunda etapa somente se a primeira terminar com sucesso. Veja o contrato na prática e escreva o script com base nessa relação.

[Voltar ao guia — etapa 3](../README.md#etapa-3)

## O que cada ferramenta confere

- **TypeScript:** compatibilidade de tipos e usos que suas opções conseguem verificar.
- **ESLint:** padrões problemáticos no código conforme as regras habilitadas. A configuração recomendada do typescript-eslint é suficiente aqui.
- **Prettier:** forma consistente do texto. `--check` diagnostica diferenças; `--write` modifica os arquivos e exige revisão do diff.
- **Vite build:** resolução e transformação dos arquivos para a saída de produção.
- **Navegador:** comportamento real da página, uso de teclado, layout e erros durante a execução.

Uma página que passa nessas ferramentas ainda pode adicionar a tarefa errada. Reteste o comportamento do capítulo 20. Essas verificações têm escopos distintos e nenhuma substitui observar a aplicação.

Use os scripts para conferir só os fontes e configurações pertinentes; exclua `dist/` do lint e da formatação. Evite regras de estilo duplicadas no ESLint e no Prettier. Não precisamos de plugins de integração, hooks ou configuração extensa para isso. Cada ferramenta percorre arquivos e consome tempo; escopos claros evitam analisar saídas geradas sem benefício.

[Voltar ao guia — etapa 4](../README.md#etapa-4)

## Lockfile e reprodução

`package.json` declara o projeto e as dependências desejadas; `package-lock.json` registra a resolução concreta, incluindo dependências das dependências. Versione os dois. `node_modules/` é o resultado local da instalação e `dist/` é uma saída de build: ambos podem ser refeitos.

Use `npm install` para preparar ou alterar dependências e revise as mudanças no manifesto e no lockfile. Use `npm ci` para instalar a versão já registrada: ele exige coerência entre os dois arquivos, não os atualiza e substitui `node_modules` se a pasta existir. Por isso faremos a verificação em um clone novo, sem apagar a instalação em que você está trabalhando.

O lockfile ajuda a repetir a instalação, mas não guarda a versão do Node, o sistema operacional nem garante que pacotes externos estarão sempre disponíveis. O README da aplicação precisa registrar o ambiente usado e os comandos. Um clone limpo é uma conferência prática desses limites, sem prometer builds idênticos byte a byte em qualquer máquina.

Uma branch identifica uma linha de trabalho no repositório. Criá-la não cria outro projeto npm. O remoto é outro repositório: `git remote -v` mostra os destinos; `git fetch` atualiza as referências remotas sem integrar a mudança na sua branch; `push` envia commits. Não use `pull` às cegas para resolver divergências. Neste laboratório, se aparecer rejeição ou conflito, examine com o professor.

`npm run dev` serve os fontes durante o desenvolvimento. O build gera `dist/`; `npm run preview` serve essa saída para conferência local. Mudou os fontes? Gere o build novamente antes de conferir o preview. Acessar o preview antigo não testa a mudança nova.

[Voltar ao guia — etapa 5](../README.md#etapa-5)
