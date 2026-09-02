# Leitura de Código Real — Métodos de Array

## Objetivo

Reconhecer, em projetos reais, a coleção, o item recebido pela callback, a regra, o retorno do método e o destino do resultado.

Você não precisa dominar imports, testes, `async`, interfaces, generics ou APIs do navegador. Eles aparecem apenas como contexto. O foco são os métodos estudados neste capítulo.

---

## Recorte 1 — Explicado: contar vínculos principais

**Fonte:** AgenDoc — `src/lib/patients/aggregate.ts` e teste correspondente.

```typescript
export function assertSinglePrimaryAssignment(
  assignments: PatientAssignmentInput[],
) {
  const primaryCount = assignments.filter(
    (assignment) => assignment.isPrimary,
  ).length;

  if (primaryCount > 1) {
    throw new Error("multiple_primary_assignments");
  }
}

// chamada real em teste
assertSinglePrimaryAssignment([
  { membershipId: "m1", relationshipType: "doctor", isPrimary: true },
  { membershipId: "m2", relationshipType: "doctor", isPrimary: true },
]);
```

Leitura:

```text
assignments                     → coleção de objetos
assignment                      → um vínculo por chamada
assignment.isPrimary            → boolean entregue ao filter
filter(...)                     → novo array só com os principais
.length                         → quantidade de principais
primaryCount > 1                → regra que dispara o erro
```

O método não devolve a quantidade diretamente. `filter` devolve um array; `.length` lê a quantidade desse novo array.

---

## Recorte 2 — Guiado: escolher um vínculo ativo

**Fonte:** AgenDoc — `src/lib/auth/active-membership.ts` e teste correspondente.

```typescript
export function resolveActiveMembership(
  memberships: MembershipSummary[],
  preferredMembershipId: string | null,
): MembershipSummary | null {
  const activeMemberships = memberships
    .filter((membership) => membership.isActive)
    .sort((left, right) => left.joinedAt - right.joinedAt);

  // ... caso vazio omitido

  if (preferredMembershipId) {
    const preferred = activeMemberships.find(
      (membership) => membership.membershipId === preferredMembershipId,
    );

    if (preferred) {
      return preferred;
    }
  }

  return activeMemberships[0] ?? null;
}

// chamada real em teste
resolveActiveMembership(memberships, "m-2");
```

`sort` apenas organiza os ativos pela data de entrada; ele não faz parte da cobrança deste capítulo.

Responda antes de ver o gabarito:

1. Qual coleção recebe `filter`?
2. O que representa `membership` dentro da callback?
3. Qual propriedade decide se o objeto permanece?
4. Em qual array `find` procura a preferência?
5. O retorno de `find` é usado como função, índice ou objeto?
6. Se a preferência não for encontrada, qual caminho final ainda existe?

<details>
<summary>Gabarito do recorte 2</summary>

1. `memberships`.
2. Um objeto de vínculo por chamada.
3. `isActive`.
4. Em `activeMemberships`, que já contém somente ativos.
5. Como objeto encontrado; pode também ser `undefined`.
6. O primeiro ativo ou `null`.

</details>

---

## Recorte 3 — Sua interpretação: comparar bytes com `every`

**Fonte:** WhatsApp Audio Transcriber — `apps/extension/src/messaging/pageBridge.ts`.

```typescript
function matches(value: Uint8Array, expected: number[]): boolean {
  return expected.every((byte, index) => value[index] === byte);
}

function detectedAudioType(header: Uint8Array): string | null {
  if (matches(header, [0x4f, 0x67, 0x67, 0x53])) return "audio/ogg";
  if (matches(header, [0x1a, 0x45, 0xdf, 0xa3])) return "audio/webm";
  // ... outros formatos omitidos
  return null;
}

// chamada no fluxo real
const mimeType = detectedAudioType(header);
```

Responda:

1. Qual array recebe `every`?
2. Quais dois argumentos a callback recebe?
3. O que precisa acontecer para `every` devolver `true`?
4. Em qual comparação o índice é usado?
5. `every` precisa continuar depois da primeira diferença? Por quê?
6. Qual valor `matches` devolve para `detectedAudioType`?

---

## Recorte 4 — Sua interpretação: acumular dois contadores

**Fonte:** AgenDoc — `src/lib/legacy-import/report.ts`.

Cada objeto `issue` possui uma propriedade `severity`, que pode representar erro ou aviso.

```typescript
function issueCounts(issues: LegacyImportIssue[]) {
  return issues.reduce(
    (counts, issue) => ({
      errors: counts.errors + (issue.severity === "error" ? 1 : 0),
      warnings: counts.warnings + (issue.severity === "warning" ? 1 : 0),
    }),
    { errors: 0, warnings: 0 },
  );
}

function formatLegacyImportReport(result: LegacyTransformResult) {
  const counts = issueCounts(result.issues);
  // ... counts.errors e counts.warnings entram no relatório
}
```

Responda:

1. Qual é a coleção percorrida por `reduce`?
2. Qual é o tipo conceitual de `counts`: número, item do array ou objeto acumulador?
3. O que `issue` representa em cada chamada?
4. Qual é o valor inicial completo?
5. O callback altera o mesmo objeto ou devolve um objeto novo?
6. O que acontece com `errors` quando a severidade é `warning`?
7. Qual é o destino do retorno de `issueCounts`?

---

## Fechamento

Complete em `exercicios/respostas-leitura-de-codigo.md`:

```text
Recorte 3
1.
2.
3.
4.
5.
6.

Recorte 4
1.
2.
3.
4.
5.
6.
7.
```

O padrão dos quatro recortes é o mesmo:

```text
coleção → método controla → callback recebe item → callback devolve regra/estado → método produz resultado
```
