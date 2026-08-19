# Aula 05 — Leitura de código real: funções

## Objetivo da sessão

Esta etapa não pede que você escreva código. O objetivo é aprender a seguir uma função em um projeto real:

```text
DEFINIÇÃO → ARGUMENTO → EXECUÇÃO → RETORNO → DESTINO DO RESULTADO
```

Os trechos foram retirados de dois projetos seus:

- `agendoc`, construído com TypeScript, React e Next.js;
- `whatsapp-audio-transcriber`, construído com TypeScript, React e WXT.

O TypeScript das funções é o mesmo estudado no curso. Arquivos `.tsx` também permitem JSX, a sintaxe visual do React. Quando JSX aparecer, ele será explicado apenas o suficiente para localizar a chamada da função.

## O que foi removido dos recortes

Cada bloco reúne somente:

1. a definição da função;
2. o ponto em que ela é executada;
3. o contexto indispensável para acompanhar o dado.

Imports, componentes inteiros e regras sem relação com a leitura foram omitidos. O comentário `// ...` indica que existe outro código entre os dois pontos.

## Roteiro de leitura

Use sempre estas perguntas, nesta ordem:

1. Qual é o nome da função?
2. Quais parâmetros ela declara e quais tipos eles possuem?
3. O corpo provoca um efeito ou devolve um valor?
4. Onde estão os parênteses que executam a função?
5. Quais argumentos entram naquela chamada?
6. Para onde vai o retorno?
7. Existe alguma sintaxe desconhecida que posso isolar sem perder o fluxo principal?

---

## Bloco 1 — Explicado: transformar uma data em mês

**Projeto:** AgenDoc  
**Origem:** `src/lib/agenda/range.ts` e `src/components/agenda/agenda-screen.tsx`

```typescript
export function dateKeyToMonthKey(dateKey: string) {
  return dateKey.slice(0, 7);
}

// ...

const activeMonthKey = activeDateKey
  ? dateKeyToMonthKey(activeDateKey)
  : undefined;
```

### Leitura da definição

- O nome é `dateKeyToMonthKey`.
- Ela declara um parâmetro: `dateKey`, do tipo `string`.
- `export` permite que outros arquivos importem e usem a função; não muda a forma da chamada.
- O corpo usa `slice(0, 7)` para devolver os sete primeiros caracteres.
- O retorno não foi escrito explicitamente, mas o TypeScript infere `string` porque `slice` devolve uma string.

Com a entrada `"2026-08-16"`, o fluxo interno é:

```text
"2026-08-16" → primeiros 7 caracteres → "2026-08"
```

### Leitura da chamada

O ternário primeiro verifica `activeDateKey`:

- se houver uma data, `dateKeyToMonthKey(activeDateKey)` executa a função;
- `activeDateKey` é o argumento que entra no parâmetro `dateKey`;
- o retorno é guardado em `activeMonthKey`;
- se não houver data, a função nem é chamada e `activeMonthKey` recebe `undefined`.

O arquivo da chamada termina em `.tsx`, mas este recorte usa somente TypeScript comum. Não há JSX aqui.

### Resumo do fluxo

```text
activeDateKey
      ↓ argumento
dateKeyToMonthKey(dateKey)
      ↓ retorno
activeMonthKey
```

---

## Bloco 2 — Guiado: formatar uma quantidade de bytes

**Projeto:** WhatsApp Audio Transcriber  
**Origem:** `apps/extension/entrypoints/popup/App.tsx`

```tsx
function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

// ...

<small>{formatBytes(bytes)}</small>
```

Neste bloco, responda uma pergunta por vez durante a sessão com o professor:

1. Qual é o contrato da função: nome, entrada e retorno inferido?
2. Quantos caminhos de retorno existem e como o programa escolhe um deles?
3. Qual é o argumento usado na chamada `formatBytes(bytes)`?
4. O que os parênteses fazem nessa linha?
5. Para onde vai a string retornada?
6. O que você prevê para os argumentos `500`, `2048` e `5 * 1024 * 1024`?

### Única informação nova necessária

Em JSX, as chaves permitem executar JavaScript ou TypeScript dentro da interface:

```text
<small>{resultado}</small>
        └─ valor exibido na tela
```

Portanto, `{formatBytes(bytes)}` chama uma função normal e coloca a string retornada dentro do elemento visual `<small>`. O funcionamento da função não muda por estar em React.

Pare aqui durante a sessão guiada. Explique seu raciocínio antes de seguir para os blocos independentes.

---

## Bloco 3 — Sua interpretação: limitar uma observação

**Projeto:** AgenDoc  
**Origem:** `src/lib/patients/format.ts` e `src/components/patients/patients-screen.tsx`

```typescript
export const PATIENT_ALERT_PREVIEW_MAX_LENGTH = 140;

export function limitPatientAlertNotes(value: string) {
  return value.slice(0, PATIENT_ALERT_PREVIEW_MAX_LENGTH);
}

// ...

alertNotes: limitPatientAlertNotes(clinicalForm.alertNotes) || undefined,
```

Explique com suas palavras:

1. Qual é o contrato da função?
2. Qual argumento é enviado na chamada?
3. O que acontece dentro do corpo?
4. Qual é o maior tamanho possível da string retornada?
5. Para onde vai o retorno?
6. O que `|| undefined` faz quando o retorno é uma string vazia?
7. O que você prevê para um texto com 20 caracteres e para outro com 200?

Você ainda não estudou objetos formalmente. Para esta leitura, basta saber que `alertNotes:` é o nome do lugar que receberá o resultado à direita.

---

## Bloco 4 — Sua interpretação: proteger uma transcrição

**Projeto:** WhatsApp Audio Transcriber  
**Origem:** `apps/extension/src/formatting/settings.ts` e `apps/extension/src/providers/groq.ts`

```typescript
export function wrapTranscription(text: string): string {
  const escaped = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<transcription>\n${escaped}\n</transcription>`;
}

// ...

content: wrapTranscription(rawText),
```

Explique com suas palavras:

1. Qual é o contrato completo da função?
2. Qual argumento entra na chamada?
3. Qual variável local é criada?
4. O que as duas chamadas de `replace` fazem conceitualmente?
5. O que a função retorna ao receber `"Olá"`?
6. Para onde vai esse retorno no ponto da chamada?
7. Por que a função recebe o texto por parâmetro em vez de depender diretamente de `rawText`?

Não é necessário dominar expressões regulares agora. Leia `/</g` como “todas as ocorrências de `<`” e `/>/g` como “todas as ocorrências de `>`”.

---

## Formato da sua resposta

Para os blocos 3 e 4, responda sem executar o projeto:

```text
Bloco X
- Função:
- Parâmetros:
- Argumento da chamada:
- O que o corpo faz:
- Retorno:
- Destino do retorno:
- Sintaxe que ainda parece estranha:
```

Não tente explicar o componente inteiro. O exercício termina quando você consegue seguir o dado da chamada até o destino do retorno.

## Critério de conclusão

A sessão está concluída quando você consegue:

- localizar definição e chamada;
- separar parâmetro de argumento;
- prever o tipo e o valor conceitual do retorno;
- dizer onde o retorno será usado;
- isolar JSX, objetos ou expressões regulares sem deixar que eles escondam o fluxo da função.

Depois da correção dos blocos 3 e 4, prossiga para a lista de exercícios do capítulo.

---

# Respostas corrigidas

Consulte esta parte depois de realizar a leitura dos blocos. Ela reúne suas respostas revisadas e os principais ajustes feitos durante a correção.

## Bloco 2 — `formatBytes`

### Respostas

1. O nome da função é `formatBytes`. Ela recebe o parâmetro `bytes`, do tipo `number`, e seu retorno é inferido como `string`. A saída representa a quantidade formatada em bytes, quilobytes ou megabytes.

2. Existem três caminhos de retorno, verificados do menor intervalo para o maior:

   - abaixo de `1024`: retorna o valor em bytes (`B`);
   - abaixo de `1024 * 1024`: divide por `1024` e retorna em quilobytes (`KB`);
   - nos demais casos: divide por `1024` duas vezes e retorna em megabytes (`MB`).

   Cada `return` encerra a função, portanto apenas um caminho é executado por chamada.

3. Em `formatBytes(bytes)`, o argumento é a variável `bytes`, cujo valor deve ser um `number`.

4. Os parênteses executam a função. O valor colocado dentro deles ocupa o papel de argumento e é recebido pelo parâmetro `bytes`.

5. A string retornada é inserida na interface como conteúdo do elemento `<small>`:

   ```tsx
   <small>{formatBytes(bytes)}</small>
   ```

6. Resultados previstos:

   - `formatBytes(500)` retorna `"500 B"`;
   - `formatBytes(2048)` retorna `"2.0 KB"`;
   - `formatBytes(5 * 1024 * 1024)` retorna `"5.0 MB"`.

### Explicação do raciocínio

A função recebe uma quantidade numérica e testa os limites em ordem. Valores menores permanecem em bytes; valores intermediários são convertidos para quilobytes; os maiores são convertidos para megabytes. O retorno é uma `string`, que a chamada dentro do JSX coloca na interface.

---

## Bloco 3 — `limitPatientAlertNotes`

### Respostas

1. A função `limitPatientAlertNotes` recebe `value: string` e tem retorno inferido como `string`. Ela devolve no máximo os primeiros `140` caracteres, limite definido em `PATIENT_ALERT_PREVIEW_MAX_LENGTH`.

2. O argumento enviado para a função é somente `clinicalForm.alertNotes`.

3. Dentro do corpo, `slice(0, PATIENT_ALERT_PREVIEW_MAX_LENGTH)` cria uma string com os caracteres dos índices `0` a `139`. A string original não é alterada.

4. O retorno possui no máximo `140` caracteres.

5. O retorno alimenta a propriedade `alertNotes`.

6. `undefined` não é um argumento da função. Ele é um fallback avaliado depois da chamada: se a função retornar `""`, que é falsy, a expressão completa resulta em `undefined`.

7. Um texto com `20` caracteres é retornado integralmente. Um texto com `200` caracteres é limitado aos primeiros `140`.

### Explicação do raciocínio

O código comprova que a função aplica um limite ao texto antes de guardá-lo em `alertNotes`. Evitar problemas visuais pode ser uma motivação plausível, mas não é possível concluir essa intenção somente com o recorte apresentado.

---

## Bloco 4 — `wrapTranscription`

### Respostas

1. O contrato é `wrapTranscription(text: string): string`. A função recebe o texto original da transcrição e retorna uma nova string protegida e envolvida pelas tags `<transcription>`.

2. O argumento da chamada é `rawText`. Durante a execução, seu valor ocupa o parâmetro `text`.

3. A variável local criada é `escaped`, também do tipo `string`.

4. As duas chamadas de `replace` fazem substituições em todas as ocorrências:

   - `/</g` encontra cada `<` e o substitui por `&lt;`;
   - `/>/g` encontra cada `>` e o substitui por `&gt;`.

   Isso impede que tags presentes na transcrição original sejam interpretadas como parte da estrutura XML do prompt.

5. Ao receber `"Olá"`, a função retorna conceitualmente:

   ```text
   <transcription>
   Olá
   </transcription>
   ```

   Os dois `\n` do template literal produzem quebras de linha.

6. No ponto da chamada, a string retornada alimenta a propriedade `content` da mensagem enviada ao serviço de formatação.

7. Receber o texto por parâmetro torna a função independente da variável `rawText`. Assim, ela pode ser reutilizada e testada com qualquer `string` compatível.

### Explicação do raciocínio

O raciocínio original sobre as tags XML estava correto. O refinamento importante é que essa função prepara a transcrição original antes da formatação: primeiro protege os sinais `<` e `>`, depois envolve o texto em `<transcription>`. Ela não recebe ainda o texto já formatado pela LLM.

---

## Pontos corrigidos

- Parênteses executam a função; os valores dentro deles são os argumentos.
- `undefined` é um fallback posterior à chamada de `limitPatientAlertNotes`, não um argumento.
- `wrapTranscription` trabalha com a transcrição original e escapa possíveis tags antes de enviá-la para formatação.
