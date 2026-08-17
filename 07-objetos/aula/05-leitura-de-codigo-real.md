# Aula 05 — Leitura de código real: objetos

## Objetivo da sessão

Esta etapa não pede que você escreva código. O objetivo é seguir um objeto em um projeto real:

```text
CRIAÇÃO → PROPRIEDADES → LEITURA OU CÓPIA → DESTINO DO RESULTADO
```

Os trechos foram retirados de dois projetos seus:

- `agendoc`, construído com TypeScript, React e Next.js;
- `whatsapp-audio-transcriber`, construído com TypeScript, React e WXT.

Quando aparecer um `type`, um `Partial` ou um componente React, trate-os apenas como contexto. O mecanismo cobrado aqui é o objeto: literal, propriedade, spread ou destructuring.

## O que foi removido dos recortes

Cada bloco reúne somente:

1. a criação ou a transformação do objeto;
2. o ponto em que ele é usado;
3. o contexto indispensável para acompanhar o dado.

Imports, tipos nomeados completos e regras sem relação com a leitura foram omitidos. O comentário `// ...` indica que existe outro código entre os dois pontos.

## Roteiro de leitura

Use sempre estas perguntas, nesta ordem:

1. Qual valor é um objeto?
2. Quais propriedades ele possui?
3. A leitura usa ponto, colchetes, destructuring ou spread?
4. O código altera o original ou cria outro objeto?
5. Para onde vai o objeto ou a propriedade extraída?
6. Existe alguma sintaxe desconhecida que posso isolar sem perder o fluxo principal?

---

## Bloco 1 — Explicado: ficha de formatação

**Projeto:** WhatsApp Audio Transcriber  
**Origem:** `apps/extension/src/formatting/settings.ts`

```typescript
export const DEFAULT_FORMATTING_SETTINGS = {
  tone: "natural",
  addParagraphs: true,
  formatDates: true,
  formatTimes: true,
  formatLists: true,
};

export function formattingSettingsKey(options: {
  tone: string;
  addParagraphs: boolean;
  formatDates: boolean;
  formatTimes: boolean;
  formatLists: boolean;
}): string {
  const flags = [
    options.addParagraphs,
    options.formatDates,
    options.formatTimes,
    options.formatLists,
  ]
    .map((enabled) => (enabled ? "1" : "0"))
    .join("");
  return `v3:${options.tone}:${flags}`;
}

// ...

formattingSettingsKey(DEFAULT_FORMATTING_SETTINGS);
```

No arquivo original, o objeto tem um tipo nomeado. Aqui a forma foi escrita inline para destacar as propriedades. `.map` pertence ao Capítulo 09; neste recorte, basta saber que cada booleano vira `"1"` ou `"0"` e os quatro dígitos são unidos.

### Leitura da criação

`DEFAULT_FORMATTING_SETTINGS` é um objeto literal com cinco propriedades:

| Propriedade | Valor |
|---|---|
| `tone` | `"natural"` |
| `addParagraphs` | `true` |
| `formatDates` | `true` |
| `formatTimes` | `true` |
| `formatLists` | `true` |

Não é um array. Cada campo tem nome próprio.

### Leitura da chamada

`formattingSettingsKey` recebe esse objeto no parâmetro `options`. Dentro da função, as propriedades booleanas são lidas com ponto e o tom entra no template:

```text
DEFAULT_FORMATTING_SETTINGS
        ↓ argumento
options.addParagraphs / formatDates / formatTimes / formatLists
        ↓
"1111"
options.tone
        ↓
"v3:natural:1111"
```

O objeto original não é alterado. A função só lê campos e devolve uma `string`.

### Resumo do fluxo

```text
objeto padrão
      ↓
formattingSettingsKey(options)
      ↓ leitura por ponto
chave de cache
```

---

## Bloco 2 — Guiado: copiar e substituir configurações

**Projeto:** WhatsApp Audio Transcriber  
**Origem:** `apps/extension/entrypoints/popup/App.tsx`

```tsx
const updateFormatting = (change: { tone?: string; addParagraphs?: boolean }) => {
  const next = { ...formatting, ...change };
  setFormatting(next);
  void saveFormattingSettings(next);
};

// ...

updateFormatting({ tone });
updateFormatting({ addParagraphs });
```

No original, `change` usa `Partial<FormattingSettings>`, um utilitário de capítulos futuros. Leia como: objeto com algumas propriedades do mesmo formato, todas opcionais. `setFormatting` e `saveFormattingSettings` apenas recebem o objeto novo; não é necessário entender React para seguir o dado.

Neste bloco, responda uma pergunta por vez durante a sessão com o professor:

1. O que `{ ...formatting, ...change }` cria: um objeto novo ou uma alteração de `formatting`?
2. Se `formatting` já tem `tone: "natural"` e a chamada envia `{ tone: "formal" }`, qual valor fica em `next.tone`? Por quê?
3. Em `updateFormatting({ tone })`, o que o atalho `{ tone }` representa?
4. Por que as duas chamadas podem enviar objetos com propriedades diferentes?
5. `formatting` original continua intacto depois de `next` ser criado?
6. Para onde vai `next` depois da linha do spread?

---

## Bloco 3 — Interpretação: destructuring no parâmetro

**Projeto:** AgenDoc  
**Origem:** `src/lib/patients/export.ts` e `convex/dataExportActions.ts`

```typescript
export function buildPatientExportFilename({
  clinicName,
  requestedAt,
}: {
  clinicName: string;
  requestedAt: number;
}) {
  const clinicSlug = clinicName
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase() || "clinica";
  const dateKey = new Date(requestedAt).toISOString().slice(0, 10);

  return `agendoc-${clinicSlug}-pacientes-${dateKey}.xlsx`;
}

// ...

const filename = buildPatientExportFilename({
  clinicName: payload.clinic.tradeName || payload.clinic.legalName,
  requestedAt: payload.request.requestedAt,
});
```

`normalize`, a regex e `Date` servem para montar um nome de arquivo. Não é preciso dominá-los para seguir o objeto. `payload.clinic.tradeName` é leitura aninhada: objeto `payload`, propriedade `clinic`, propriedade `tradeName`.

Para este bloco, responda sem executar o projeto:

```text
Bloco 3
- A função espera um valor ou um objeto?
- Quais propriedades o argumento precisa ter?
- O que o destructuring `{ clinicName, requestedAt }` faz na entrada?
- De onde vêm os dois valores na chamada?
- O retorno é um objeto ou outro tipo?
- Destino do retorno:
- Sintaxe que ainda parece estranha:
```

---

## Bloco 4 — Interpretação: objeto aninhado e atalho de propriedades

**Projeto:** AgenDoc  
**Origem:** `src/lib/patients/export.ts` e `src/components/patients/patients-screen.tsx`

```typescript
function column(key: string, label: string, description: string) {
  return { key, label, description };
}

function createEmptyPatientDetail(initialName: string) {
  return {
    base: {
      patientId: "new",
      fullName: initialName,
      address: {
        country: "Brasil",
      },
      status: "active",
    },
    contacts: [],
  };
}

// ...

column("fullName", "fullName", "Nome completo.");
createEmptyPatientDetail(initialName);
```

O original de `column` usa `satisfies` com um tipo nomeado, e o de `createEmptyPatientDetail` devolve mais campos. O recorte mantém só o necessário para ver atalho de propriedades e objeto aninhado.

Para este bloco, responda sem executar o projeto:

```text
Bloco 4
- O que `{ key, label, description }` usa como nomes e como valores?
- Qual objeto `column("fullName", "fullName", "Nome completo.")` devolve?
- Em `createEmptyPatientDetail`, quais objetos estão aninhados?
- Qual propriedade recebe o argumento `initialName`?
- `contacts: []` é um objeto ou um array?
- Destino dos dois retornos:
- Sintaxe que ainda parece estranha:
```

Não tente explicar a tela inteira de pacientes. O exercício termina quando você consegue abrir cada objeto e dizer o que cada propriedade guarda.

## Critério de conclusão

A sessão está concluída quando você consegue:

- localizar o literal ou a cópia do objeto;
- nomear as propriedades lidas ou gravadas;
- distinguir mutação, spread e destructuring;
- dizer para onde o objeto ou o campo extraído segue;
- isolar `type`, React e regex sem perder o fluxo principal.

Depois da correção dos blocos 3 e 4, prossiga para a lista de exercícios do capítulo.
