# Gabarito — Leitura de código real do Capítulo 06

**DOCUMENTO CONFIDENCIAL — APENAS PARA CONDUÇÃO E CORREÇÃO**

## Bloco 2 — Guiado

- `formatBytes` recebe `bytes: number` e infere retorno `string`.
- Há três caminhos: bytes, quilobytes e megabytes; os `return` antecipados encerram a função.
- Em `formatBytes(bytes)`, a variável `bytes` do componente é o argumento.
- Os parênteses executam a função.
- A string retornada é renderizada como conteúdo do elemento `<small>`.
- Previsões: `500 B`, `2.0 KB` e `5.0 MB`.

## Bloco 3 — Interpretação esperada

- `limitPatientAlertNotes` recebe `value: string` e infere retorno `string`.
- A chamada envia `clinicalForm.alertNotes`.
- `slice(0, 140)` devolve no máximo os 140 primeiros caracteres sem alterar a string original.
- O retorno alimenta a propriedade `alertNotes`.
- String vazia é falsy; nesse caso, `||` seleciona `undefined`.
- Texto de 20 caracteres permanece completo; texto de 200 fica com os 140 primeiros.

## Bloco 4 — Interpretação esperada

- `wrapTranscription(text: string): string` possui contrato totalmente explícito.
- `rawText` é o argumento e passa a ocupar o parâmetro `text`.
- `escaped` guarda uma nova string: `<` vira `&lt;` e `>` vira `&gt;` em todas as ocorrências.
- Para `Olá`, retorna `<transcription>\nOlá\n</transcription>`.
- O retorno alimenta a propriedade `content` da mensagem enviada ao serviço.
- O parâmetro desacopla a função de `rawText`, permitindo reutilizá-la e testá-la com qualquer string.

## Critério pedagógico

Corrigir o fluxo conceitual, não a reprodução literal dos termos. JSX, objetos e regex devem ser reconhecidos somente no nível necessário; não cobrar conteúdo dos capítulos futuros.
