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
