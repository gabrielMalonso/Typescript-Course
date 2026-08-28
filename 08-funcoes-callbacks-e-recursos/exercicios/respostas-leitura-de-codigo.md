# Respostas das leituras de códigos reais
## Recorte 2:
1.  `onStage` é uma função
2.  (stage: string) => void
3.  Na linha da entrega:
    ```ts
    TypeScript(stage) => {
    console.log(`Progresso: ${stage}`);
    }
    ```
    essa arrow não roda. Ela vira o valor do parâmetro onStage. Só depois, dentro de transcribe, alguém faz onStage("transcribing") e o console.log aparece.

4.  No recorte há duas execuções visíveis de onStage:
    ```ts
    onStage("transcribing");
    onStage("formatting");
    ```
5.  Chegam duas strings, nesta ordem: `"transcribing"` e `"formatting"`.
6.  Apenas importa o efeito de exibir. Não é aproveitado.
7.  O momento das atualizações é controlado pelo Transcribe. A chamada externa apenas faz o console.log formatado, “o que fazer em cada etapa”.

## Recorte 3
1.  Função que recebe o callback: transcribeForTest
2.  Contrato do callback: (stage: string) => void
3.  Callback entregue na chamada: (stage) => stages.push(stage)
4.  Onde ele é executado: Dentro de transcribeForTest, nestas duas linhas:
    ```ts
    TypeScriptonStage("transcribing");
    onStage("formatting");
    ```
5.  Argumentos recebidos, em ordem: Os valores que entram: `"transcribing"` e `"formatting"`
6.  Estado final do array stages: stages: ["transcribing", "formatting"]
7.  Valor final de result: "texto pronto"
8.  O callback usa um valor de fora dele? Qual? Sim: o array stages.
