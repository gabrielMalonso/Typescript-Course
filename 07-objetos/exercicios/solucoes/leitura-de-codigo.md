# Leitura de códigos
## Bloco 2
1.    Cria um novo objeto com os mesmos dados dos objetos formatting e change, utilizando `spread`. A ideia é que `change`, que possui parte do formato de `formatting`, altere `tone` e/ou `addParagraphs`, existentes em `formatting`.
2.    `next.tone` será alterado para "Formal". Como explicado anteriormente, o objeto `next` é criado a partir de spread, usando formatting e change. Na chamada da função, change recebe o argumento `tone` novo e, na hora de formar o objeto `next`, esse novo argumento, alterando a configuração existente anteriormente em `formatting`. 
3.  O atalho `{ tone }` representa o objeto que entra como argumento em updateFormatting.
4.  Porque o parâmetro da função é um objeto `change`, com duas propriedades `tone` e `addParagraphs`. Ambas as propriedades são opcionais, por isso é possível entrar com apenas uma das propriedades na função.
5.  Sim. `next` é criado a partir de `formatting`, criando um novo objeto.
6.  `next` é usado como argumento em `setFormatting` e em `saveFormattingSettings`, outras funções que muito provavelmente irão alterar de fato, o `formatting`.

## Bloco 3
1.  A função espera um objeto com dois itens, `clinicName` e `requestedAt` como argumento.
2.  O argumento precisa ser um objeto, cujas propriedades devem ser: clinicName: string; requestedAt: number;
3.  O Destructuring extrai as propriedades do objeto para variáveis. Nesse caso, ele faz isso na entrada da função.
4.  Os valores na chamada vêm de objetos aninhados dentro de `payload`:
    - `clinicName` sai de `payload.clinic.tradeName` ou, se esse estiver vazio, `payload.clinic.legalName`
    - `requestedAt` sai de `payload.request.requestedAt`
5.  O retorno é uma string. 
6.  

## Bloco 4
1.  O atalho `{ key, label, description }` usa os parâmetros como nome e como valor. Equivale a `{ key: key, label: label, description: description }`.
2.  `column("fullName", "fullName", "Nome completo.")` devolve o objeto `{ key: "fullName", label: "fullName", description: "Nome completo." }`.
3.  Os objetos aninhados são `base` (dentro do retorno) e `address` (dentro de `base`).
4.  A propriedade que recebe `initialName` é `fullName`.
5.  `contacts: []` é um array, que se encontra dentro do objeto devolvido.
6.  O objeto devolvido por `column` entra no array `columns`.
7.  `detail` é a variável que recebe o objeto devolvido por `createEmptyPatientDetail`.
8.  `useMemo` (React). Basta saber que ele chama `createEmptyPatientDetail(initialName)` e guarda o retorno em `detail`.

---

## Correção — 21/08/2026

### Bloco 2 — guiado

1. Correto: `{ ...formatting, ...change }` cria um objeto novo.
2. Correto no mecanismo: `change` entra depois e substitui `tone`. O enunciado usava `"formal"` em minúsculas; o raciocínio vale igual.
3. Quase: `{ tone }` é mesmo o argumento. O atalho significa `{ tone: tone }` — o nome da propriedade e o nome da variável são o mesmo.
4. Correto: as duas propriedades de `change` são opcionais.
5. Correto: `formatting` original permanece intacto.
6. Correto o destino: `next` vai para `setFormatting` e `saveFormattingSettings`. Essas funções recebem o objeto novo; no React isso costuma trocar o estado, não alterar o `formatting` antigo no mesmo lugar.

### Bloco 3 — interpretação

1. Correto: espera um objeto.
2. Correto: `clinicName: string` e `requestedAt: number`.
3. Correto: o destructuring extrai as propriedades já na entrada.
4. Quase: os dois valores vêm de `payload`. `clinicName` sai de `payload.clinic.tradeName` ou `payload.clinic.legalName`. `requestedAt` sai de `payload.request.requestedAt`, não de um `requestedAt` solto.
5. Correto: o retorno é `string`.
6. Destino: a constante `filename`.

### Bloco 4 — interpretação

1. Quase: você misturou o atalho geral com a chamada específica. `{ key, label, description }` significa `{ key: key, label: label, description: description }`. Os valores `"fullName"` etc. só aparecem naquela chamada.
2. Quase: a função devolve `{ key: "fullName", label: "fullName", description: "Nome completo." }`, não três textos soltos.
3. Ajuste: os objetos aninhados são `base` (dentro do retorno) e `address` (dentro de `base`). `base.address.country` é um caminho de leitura, não o nome do objeto aninhado.
4. Problema aqui: a propriedade que recebe `initialName` é `fullName`. `string` é o tipo do argumento, não o nome do campo.
5. Correto: `contacts: []` é um array.
6. Correto: o objeto de `column` entra em `columns`.
7. Correto: fica em `detail`.
8. Correto: `useMemo` pode ficar isolado como React.