# Aula 05 — Leitura de código real: callbacks

## Objetivo da sessão

Esta etapa não pede que você escreva código. O objetivo é seguir uma função entregue a outra função:

```text
DEFINIÇÃO DO CONTRATO → CALLBACK NA CHAMADA → EXECUÇÃO → EFEITO OU RETORNO
```

Os quatro recortes vêm de dois projetos seus:

- `agendoc`, construído com TypeScript, React e Next.js;
- `whatsapp-audio-transcriber`, construído com TypeScript, React e WXT.

Sintaxe de classes, React, eventos do navegador, testes e código assíncrono aparece apenas como contexto. Não é conteúdo cobrado agora.

## Roteiro de leitura

Em cada recorte, responda:

1. Qual função ou método recebe o callback?
2. Qual é o contrato do callback?
3. A chamada passa uma referência ou executa a função imediatamente?
4. Onde o callback é chamado?
5. Que argumento ele recebe?
6. Seu retorno é reutilizado ou o efeito é o que importa?

---

## Recorte 1 — Explicado: registrar e remover um callback

**Projeto:** AgenDoc  
**Origem:** `src/components/agenda/agenda-calendar.tsx`

```typescript
function subscribeToCompactTimeLabels(callback: () => void) {
  const mediaQuery = window.matchMedia("(max-width: 520px)");
  mediaQuery.addEventListener("change", callback);

  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

// ...

const unsubscribe = subscribeToCompactTimeLabels(() => {
  console.log("o tamanho da tela mudou");
});

// ...

unsubscribe();
```

O arquivo real usa o retorno dentro de uma integração do React. Aqui a chamada foi reduzida para destacar os dois contratos.

### Contrato recebido

```typescript
callback: () => void
```

O callback não recebe argumentos e seu valor de retorno não é usado. Ele é passado ao navegador por `addEventListener`, que o chamará quando ocorrer uma mudança.

### Contrato retornado

`subscribeToCompactTimeLabels` também retorna uma função `() => void`. Essa segunda função remove o mesmo callback do navegador.

```text
callback entregue
      ↓
addEventListener guarda a referência
      ↓ evento de mudança
callback é executado

função retornada → unsubscribe
      ↓ chamada posterior
removeEventListener recebe a mesma referência
```

Note a diferença:

- `subscribeToCompactTimeLabels(() => { ... })` entrega uma função anônima;
- `unsubscribe()` executa a função que foi retornada.

Também existe closure: a função retornada continua acessando `mediaQuery` e `callback`, criados ou recebidos pela função externa.

---

## Recorte 2 — Guiado: callback de progresso

**Projeto:** WhatsApp Audio Transcriber  
**Origem:** `apps/extension/src/providers/groq.ts` e `apps/extension/entrypoints/background.ts`

```typescript
class GroqProvider {
  async transcribe(
    audio: Blob,
    language: string | null,
    signal: AbortSignal,
    onStage: (stage: string) => void,
  ) {
    onStage("transcribing");
    // ...
    onStage("formatting");
    // ...
  }
}

// ...

const result = await provider.transcribe(
  audio,
  job.language,
  job.controller.signal,
  (stage) => {
    console.log(`Progresso: ${stage}`);
  },
);
```

O tipo real de `stage` é mais específico e o método possui retornos assíncronos. Para esta leitura, acompanhe apenas o callback `onStage`.

Responda em ordem:

1. Qual dos quatro argumentos é uma função?
2. Qual é o contrato de `onStage`?
3. A arrow function é chamada no ponto da entrega ou guardada no parâmetro?
4. Quantas chamadas de `onStage` estão visíveis no recorte?
5. Quais strings chegam ao parâmetro local `stage`?
6. O retorno do callback é aproveitado ou importa o efeito de exibir?
7. Quem controla o momento das atualizações: a chamada externa ou `transcribe`?

---

## Recorte 3 — Para você interpretar: callback de teste

**Projeto:** WhatsApp Audio Transcriber  
**Origem:** `apps/extension/src/providers/groq.test.ts`

```typescript
async function transcribeForTest(
  onStage: (stage: string) => void,
): Promise<string> {
  onStage("transcribing");
  // ...
  onStage("formatting");
  return "texto pronto";
}

// ...

const stages: string[] = [];

const result = await transcribeForTest(
  (stage) => stages.push(stage),
);
```

`Promise<string>` e `await` pertencem a um capítulo posterior. Para esta atividade, considere que ao final `result` recebe a string retornada. Embora `push` devolva um número, esse retorno não é usado pelo contrato `void`; o efeito importante é alterar `stages`.

Preencha:

```text
Recorte 3
- Função que recebe o callback:
- Contrato do callback:
- Callback entregue na chamada:
- Onde ele é executado:
- Argumentos recebidos, em ordem:
- Estado final do array stages:
- Valor final de result:
- O callback usa um valor de fora dele? Qual?
```

---

## Recorte 4 — Para você interpretar: agendar uma função

**Projeto:** AgenDoc  
**Origem:** `src/components/shared/delayed-loading.tsx`

```typescript
function scheduleAfter(
  delayMs: number,
  callback: () => void,
): number {
  return window.setTimeout(callback, delayMs);
}

// ...

let visivel = false;

const timerId = scheduleAfter(180, () => {
  visivel = true;
});
```

No componente real, `setTimeout` controla quando um indicador de carregamento aparece. Aqui o recorte preserva o mesmo mecanismo e remove o contexto de React. O número retornado identifica o agendamento; não é o retorno do callback.

Preencha:

```text
Recorte 4
- Função que recebe o callback:
- Contrato completo de scheduleAfter:
- Contrato do callback:
- A arrow function executa antes ou depois da espera?
- Valor externo alterado pelo callback:
- Valor guardado em timerId:
- timerId é o retorno de qual chamada?
- O retorno do callback é utilizado?
```

## Fechamento

Compare os quatro recortes:

| Recorte | Quem recebe | Contrato do callback | Uso principal |
|---|---|---|---|
| 1 | função de inscrição | `() => void` | reagir a evento e depois cancelar |
| 2 | método de transcrição | `(stage: string) => void` | comunicar progresso |
| 3 | função de teste | `(stage: string) => void` | registrar etapas em array |
| 4 | função de agendamento | `() => void` | executar depois de um atraso |

Em todos, a ideia central é a mesma: a função é entregue primeiro e chamada depois por quem controla o fluxo.
