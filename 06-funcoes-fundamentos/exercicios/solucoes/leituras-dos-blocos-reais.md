# Leituras dos blocos reais — versão corrigida

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
