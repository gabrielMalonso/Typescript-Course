# Gabarito — Leitura de código real do Capítulo 07

**DOCUMENTO CONFIDENCIAL — APENAS PARA CONDUÇÃO E CORREÇÃO**

## Bloco 2 — Guiado

- `{ ...formatting, ...change }` cria um objeto novo; não muta `formatting` naquela linha.
- `next.tone` fica `"formal"` porque a propriedade à direita substitui a copiada.
- `{ tone }` é o atalho de `{ tone: tone }`.
- As chamadas enviam objetos parciais; o spread só substitui os campos presentes em `change`.
- O original permanece com os valores anteriores até `setFormatting(next)` atualizar o estado.
- `next` segue para `setFormatting` e para `saveFormattingSettings`.

## Bloco 3 — Interpretação esperada

- A função espera um objeto com `clinicName` e `requestedAt`.
- O destructuring extrai essas duas propriedades para variáveis locais de mesmo nome.
- Na chamada, `clinicName` vem de `payload.clinic.tradeName` ou, se esse valor for falsy, de `payload.clinic.legalName`.
- `requestedAt` vem de `payload.request.requestedAt`, leitura aninhada.
- O retorno é uma `string` com o nome do arquivo, não um objeto.
- Essa string é guardada em `filename`.

## Bloco 4 — Interpretação esperada

- `{ key, label, description }` usa atalho: os nomes das variáveis viram chaves e valores.
- A chamada de `column` devolve `{ key: "fullName", label: "fullName", description: "Nome completo." }`.
- Em `createEmptyPatientDetail`, `base` contém `address`, que é outro objeto.
- `fullName` recebe o argumento `initialName`.
- `contacts: []` é um array, não um objeto de propriedades nomeadas.
- Os retornos seguem como objeto-coluna e como ficha inicial de paciente.

## Critério pedagógico

Corrigir o fluxo do objeto, não a reprodução literal dos termos. `type`, `Partial`, React e regex devem ser reconhecidos somente no nível necessário; não cobrar Capítulos 08, 09, 11 ou 13.
