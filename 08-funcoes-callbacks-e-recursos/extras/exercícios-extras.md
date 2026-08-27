Boa. Vou te passar uma série no mesmo nível dos 9–12, mas variando o que **você** tem que escrever. Sem `map`, `filter` ou `reduce`. Só `for...of` / `for` + callback.

Use esta regra em todos:

> A controladora percorre e decide **quando** chamar.  
> O callback decide **o que fazer** com um item.

---

## Como praticar

Faça **um exercício por vez**.  
No final de cada um, confira só isto:

1. Qual função recebe a outra?
2. O callback recebe o objeto inteiro ou valores soltos?
3. O retorno do callback é usado ou ignorado?
4. O array original mudou?

---

## Modo A — Você cria tudo
Controladora + corpo + chamadas.

### A1 — Contar sensores

```typescript
const sensores = [
  { id: "S1", temperatura: 18, ativo: true },
  { id: "S2", temperatura: 31, ativo: true },
  { id: "S3", temperatura: 27, ativo: false },
  { id: "S4", temperatura: 42, ativo: true },
];
```

Crie `contarSensores(lista, criterio)`.  
O callback recebe um sensor e devolve `boolean`.  
A função devolve a quantidade.

Use a mesma controladora para contar:

- sensores ativos
- temperatura maior que 30
- inativos com temperatura menor que 20

---

### A2 — Filtrar tarefas

```typescript
const tarefas = [
  { titulo: "Backup", urgente: true, horas: 2 },
  { titulo: "Reunião", urgente: false, horas: 1 },
  { titulo: "Deploy", urgente: true, horas: 4 },
  { titulo: "Documentar", urgente: false, horas: 3 },
];
```

Crie `selecionarTarefas(lista, atende)` e devolva um **array novo** com as tarefas aprovadas.

Testes:

- urgentes
- horas >= 3
- regra que rejeita todas
- array vazio
- `tarefas.length` continua 4

---

## Modo B — Assinatura pronta, você só escreve o corpo
Não mude os tipos. Preencha o miolo e o `return`.

### B1

```typescript
function somarValores(
  itens: { nome: string; valor: number; pago: boolean }[],
  escolher: (item: { nome: string; valor: number; pago: boolean }) => number,
): number {
  // percorra, some o que o callback devolver, retorne o total
}
```

Dados:

```typescript
const cobrancas = [
  { nome: "A", valor: 20, pago: true },
  { nome: "B", valor: 35, pago: false },
  { nome: "C", valor: 10, pago: true },
];
```

Depois escreva as chamadas:

- somar todos os `valor`
- somar só os pagos (não pagos devolvem 0)

---

### B2

```typescript
function montarRelatorio(
  alunos: { nome: string; nota: number; presente: boolean }[],
  linha: (aluno: { nome: string; nota: number; presente: boolean }) => string,
): string[] {
  // crie um string[] novo
}
```

Dados:

```typescript
const alunos = [
  { nome: "Lia", nota: 8, presente: true },
  { nome: "Ruy", nota: 5, presente: false },
  { nome: "Nia", nota: 9, presente: true },
];
```

Duas chamadas:

- `Lia — nota 8`
- `Lia: presente` ou `Ruy: falta`

Mostre que `alunos` não mudou.

---

## Modo C — Controladora pronta, você só escreve os callbacks
Copie a função. Não altere. Só faça as chamadas.

```typescript
function aplicarRegra(
  pecas: { codigo: string; peso: number; aprovada: boolean }[],
  regra: (peca: { codigo: string; peso: number; aprovada: boolean }) => boolean,
): { codigo: string; peso: number; aprovada: boolean }[] {
  const resultado = [];
  for (const peca of pecas) {
    if (regra(peca)) {
      resultado.push(peca);
    }
  }
  return resultado;
}

const pecas = [
  { codigo: "A-1", peso: 12, aprovada: true },
  { codigo: "A-2", peso: 7, aprovada: false },
  { codigo: "A-3", peso: 19, aprovada: true },
  { codigo: "A-4", peso: 4, aprovada: false },
];
```

Escreva callbacks para:

1. peças aprovadas
2. peso >= 10
3. reprovadas com peso < 5
4. rejeitar todas
5. passar `[]` e comprovar que o callback não precisa “encontrar” peça nenhuma

---

## Modo D — Dois callbacks
O ponto em que você mais travou.

### D1 — Separar objeto e valores soltos

```typescript
const chamados = [
  { id: "C1", minutos: 40, critico: true },
  { id: "C2", minutos: 15, critico: false },
  { id: "C3", minutos: 55, critico: true },
];
```

Crie `processarChamados(lista, medir, avisar)`.

- `medir` recebe o **objeto** e devolve `number`
- `avisar` recebe `id: string` e `minutosMedidos: number` e devolve `void`

A controladora, para cada chamado:

1. chama `medir`
2. soma esse número
3. chama `avisar` com o id e o número
4. no final retorna o total

Na chamada:

- `medir` devolve `minutos` (se quiser, depois faça outra versão que devolve `minutos * 2` quando `critico` for true)
- `avisar` exibe `ID: MINUTOS`

Teste array vazio com contador externo em `avisar`.

Antes de escrever o callback, anote no papel:

```text
medir(...) entrega o quê?
avisar(...) entrega o quê?
```

Só então escreva os parênteses.

---

### D2 — Um callback decide, o outro formata

```typescript
const rotas = [
  { destino: "Lisboa", km: 120, ativa: true },
  { destino: "Porto", km: 80, ativa: false },
  { destino: "Faro", km: 220, ativa: true },
];
```

Crie `listarRotas(lista, incluir, formatar)`.

- `incluir` recebe a rota e devolve `boolean`
- `formatar` recebe `destino: string` e `km: number` e devolve `string`

A controladora devolve um `string[]` só das rotas incluídas.

Chamadas:

- ativas, formato `Lisboa (120 km)`
- km >= 100, formato `Porto — 80`

---

## Modo E — Corpo + um callback “estranho” de propósito

### E1

Assinatura:

```typescript
function inspecionar(
  lotes: { lote: string; quantidade: number; vencido: boolean }[],
  acao: (codigoLote: string, quantidade: number) => void,
): number
```

Repare: o callback **não** recebe o objeto. Recebe dois valores soltos.

Você deve:

- percorrer os lotes
- chamar `acao` com `lote` e `quantidade`
- retornar quantos lotes **não** estão vencidos

A decisão do “não vencido” fica na controladora desta vez.  
O callback só registra.

Isso é de propósito: para você sentir a diferença entre

- callback que decide
- callback que só executa um efeito

---

### E2 — Inverta o papel

Agora o callback decide, e a controladora só conta.

```typescript
function contarLotes(
  lotes: { lote: string; quantidade: number; vencido: boolean }[],
  criterio: (lote: { lote: string; quantidade: number; vencido: boolean }) => boolean,
): number
```

Use os mesmos dados e conte:

- vencidos
- quantidade >= 10
- não vencidos com quantidade === 0 (se não houver, tem que dar 0)

---

## Ordem sugerida

1. A1  
2. B1  
3. C  
4. A2  
5. B2  
6. D1  
7. E1  
8. D2  
9. E2  

O D1 é o irmão do exercício 12. Se travar, não olhe solução. Pergunte só: “o que a controladora está passando neste callback?”

Quando quiser, me manda **um** exercício feito que eu corrijo só aquele.