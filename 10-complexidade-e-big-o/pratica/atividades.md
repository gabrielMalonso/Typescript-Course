# Prática selecionada — Complexidade e Big O

Use os enunciados do seu **CLRS, 3ª edição**, e os links oficiais do LeetCode. As páginas do livro são da edição inglesa. Nos exercícios externos, responda ao enunciado original; as perguntas abaixo ajudam a organizar sua análise. Extensões do curso estão identificadas separadamente.

São **11 atividades no total**: 1–8 essenciais; 9–10 de consolidação; 11 desafio opcional. As perguntas numeradas fazem parte da mesma atividade. Você pode entregar algumas tentativas e receber feedback antes de continuar.

## Essenciais

### 1. CLRS 1.2-2 — Comparar alternativas

**Origem:** seção 1.2, [p. 14 — abrir enunciado](../leituras/clrs-1.2.pdf#page=4). Faça após a leitura 1.2.

Resolva o exercício usando as expressões e a condição exatas do livro. Não precisa implementar as ordenações mencionadas. Pode usar uma tabela ou um pequeno programa em TypeScript para apoiar a comparação.

Na resposta, mostre:

1. O que você está comparando e qual condição precisa ser satisfeita para responder ao exercício?
2. Para quais valores de `n` essa condição é satisfeita?
3. Como você chegou a esses valores? Apresente seu raciocínio e, se usou tabela ou programa, inclua esse apoio.
4. Como verificou os limites da resposta — isto é, onde a condição passa a valer ou deixa de valer? Confira também o que acontece na igualdade entre as expressões, caso ela ocorra.

O foco é comparar o efeito das constantes e do crescimento. Uma justificativa curta é suficiente; não precisa escrever um relatório.

### 2. CLRS 2.2-1 — Ordem de crescimento

**Origem:** seção 2.2, [p. 29 — abrir enunciado](../leituras/clrs-2.2-02-casos.pdf#page=3). Faça após os recortes de 2.2 e 3.1.

Resolva o exercício original, que pede a notação **Θ**. Organize a resposta assim:

1. Qual termo da expressão do livro determina seu crescimento quando `n` aumenta?
2. Como você escreve a ordem de crescimento dessa expressão usando Θ?
3. Por que essa escolha descreve o crescimento? Explique o papel dos demais termos e dos coeficientes na sua decisão.

Não é necessário fazer uma demonstração formal com constantes e limiares.

### 3. CLRS 2.2-3 — Uma busca e suas entradas

**Origem:** seção 2.2, [p. 29 — abrir enunciado](../leituras/clrs-2.2-02-casos.pdf#page=3).

A busca linear percorre a coleção em sequência até encontrar o valor procurado.

**Parte A — exercício do livro**

Leia e responda às perguntas do enunciado original. Na justificativa:

1. Deixe explícitas as hipóteses usadas sobre a posição do elemento procurado. Não invente uma distribuição de entradas para justificar uma média.
2. Diferencie a quantidade esperada de verificações da ordem de crescimento: apresente o que o livro pede de cada uma, identificando a qual caso sua resposta se refere.

**Parte B — extensão do curso para TypeScript e testes**

Implemente uma função que receba um array de números e um valor procurado. Ela deve preservar o array recebido e devolver um objeto com:

- o índice da primeira ocorrência, ou `-1` se o valor estiver ausente;
- a quantidade de comparações de igualdade feitas entre o valor procurado e os elementos do array.

Entregue o código, os testes e as respostas:

1. Teste o valor no começo, no fim, ausente, repetido e em um array vazio. Em cada teste, informe a entrada, o resultado esperado e o resultado obtido, incluindo o índice e a contagem.
2. Chame a mesma função com duas coleções diferentes. Como esses testes ajudam a conferir se ela usa o parâmetro recebido, em vez de uma coleção fixa fora da função?
3. Qual entrada representa o melhor caso da sua busca? O que a função precisa fazer nesse caso?
4. Quando o valor está ausente, o que muda na busca? Relacione esse caso e o melhor caso às hipóteses da análise que você fez na Parte A.

### 4. Uma análise que deve acompanhar os limites

**Atividade própria:** análise de loops TypeScript. Faça após a leitura 3.2. Considere `n` inteiro positivo e cada execução de `passos++` com custo constante.

```typescript
function contarA(n: number): number {
  let passos = 0;
  for (let i = 0; i < n; i++) passos++;
  for (let j = 0; j < n; j++) passos++;
  return passos;
}

function contarB(n: number): number {
  let passos = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 4; j++) passos++;
  }
  return passos;
}

function contarC(n: number): number {
  let passos = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) passos++;
  }
  return passos;
}
```

**Parte A — analisar os códigos**

1. Sem executar, qual valor cada função deve devolver para `n = 4` e para `n = 8`? Registre as seis previsões.
2. Execute as funções com esses valores e compare os resultados com suas previsões. Se houver diferença, explique o que você deixou de contar ou contou a mais.
3. Para cada função, como a quantidade de passos depende de `n`? Use os limites dos loops para justificar sua contagem.
4. Qual é a ordem de crescimento de cada função? Explique como chegou à classificação a partir da contagem.
5. Saber apenas quantos loops aparecem no código é suficiente para classificá-lo? Justifique usando os exemplos acima.

**Parte B — comparar situações**

Sem implementar novos algoritmos, considere estas seis situações:

- Fazer uma quantidade fixa de trabalho, independentemente de `n`.
- Visitar cada um dos `n` itens uma vez.
- Reduzir `n` pela metade repetidamente, até chegar a 1.
- Para cada um dos `n` itens, realizar uma sequência de reduções de `n` pela metade até 1.
- Visitar todos os pares de itens distintos, sem repetir o mesmo par em ordem inversa.
- Contar todas as configurações possíveis de `n` escolhas binárias: cada nova escolha duplica a quantidade de configurações.

Responda para cada situação:

1. Qual família de crescimento estudada descreve esse trabalho ou essa quantidade? Justifique.
2. O que acontece com a quantidade quando `n` passa de 8 para 16? Compare os valores ou explique a relação entre eles.
3. Nas situações com reduções pela metade, desenhe a sequência usada na sua contagem. Nas escolhas binárias, explique o que está contando; contar configurações matematicamente não exige executar todas elas.

### 5. Um relatório funciona, mas repete trabalho

**Atividade própria:** custo de callbacks, memória e testes após uma melhoria. Consulte [Callbacks](../notas.md#callbacks) e [Memória](../notas.md#memoria).

A função deve devolver um array com a mesma quantidade de posições da entrada. Cada posição da saída deve conter a soma de todos os valores recebidos. Por exemplo, para `[2, 3]`, a saída é `[5, 5]`. Considere números e somas dentro dos limites seguros.

O código abaixo produz a saída esperada, mas é **intencionalmente ineficiente**:

```typescript
function repetirTotal(valores: number[]): number[] {
  return valores.map(() => valores.reduce((total, valor) => total + valor, 0));
}
```

**Parte A — analisar e melhorar**

1. O que representa `n`? Que trabalho a função faz novamente a cada chamada da callback do `map`?
2. Quanto trabalho a função pode fazer ao processar uma entrada de tamanho `n`? A partir disso, qual é a complexidade de tempo da versão atual?
3. Escreva uma versão que reduza o trabalho repetido e mantenha o resultado exigido.
4. Teste a versão original e a sua versão com array vazio, um elemento e números negativos. Registre as saídas esperadas e obtidas para verificar se a mudança preservou o comportamento.
5. Qual é a complexidade de tempo da sua versão? Explique o que mudou em relação à original.
6. Para cada versão, separe a memória ocupada pela **entrada**, pela **saída** e pelo **espaço auxiliar** — os dados extras usados durante o cálculo. Como cada parte cresce com `n`?
7. Contando o que precisa existir ao mesmo tempo, qual é o espaço total no pico de cada versão? A saída exigida pelo contrato pode ser ignorada nesse total? Justifique.

**Parte B — reutilizar o resultado, somente em texto**

Imagine um sistema que pede várias vezes o resultado para o mesmo array. Compare duas alternativas: calcular a resposta a cada pedido ou guardar o array de resposta e reutilizá-lo.

1. Para cada alternativa, qual é o custo do primeiro pedido, dos pedidos seguintes e da memória mantida entre pedidos?
2. Na alternativa que guarda a resposta, declare se cada pedido recebe a mesma referência ou uma nova cópia. Como essa escolha afeta os custos que você apresentou?
3. Se o array de entrada mudar, o que precisa acontecer para que o próximo pedido receba uma resposta correta?
4. Se houver apenas um pedido, que vantagens ou custos de guardar a resposta ainda permanecem?

Não precisa implementar cache, Map ou outra estrutura nova.

### 6. Two Sum — Analise sua solução anterior

**Origem:** [LeetCode 1 — Two Sum](https://leetcode.com/problems/two-sum/). Use o enunciado oficial para conferir o contrato.

Use a solução que você já escreveu e preserve essa versão. Não tente otimizá-la ainda; não é necessário fazer nova submissão.

Responda:

1. O que representa `n` neste problema?
2. No pior caso — uma entrada permitida que faça sua solução trabalhar o máximo para aquele tamanho — quantas combinações ou operações seu código pode precisar testar? A partir disso, qual é a complexidade de tempo?
3. Dê um exemplo de entrada permitida que faça seu código chegar próximo desse pior caso. Explique por que ela exige esse trabalho.
4. Conforme o array cresce, seu código cria estruturas que também crescem? Identifique o que ele guarda além da entrada e da saída e determine a complexidade de espaço auxiliar.
5. Escolha um caso de borda permitido pelo LeetCode — por exemplo, array mínimo, números repetidos ou negativos. Informe a entrada, o resultado esperado e o obtido pela sua solução.
6. Explique em poucas frases por que sua solução atende ao problema e em que situações pode se tornar cara para entradas grandes. Se encontrar uma falha, registre-a em vez de presumir que a solução está correta.

### 7. Contains Duplicate — Explicar a limitação

**Origem:** [LeetCode 217 — Contains Duplicate](https://leetcode.com/problems/contains-duplicate/).

Use sua tentativa anterior para analisar o TLE relatado. A otimização com estruturas do próximo capítulo fica para depois; não consulte editoriais ou soluções prontas.

Responda:

1. O que representa `n`? Qual operação ou comparação do seu código você vai contar para estimar o trabalho?
2. Que tipo de entrada permitida faz essa operação se repetir mais vezes? Explique como seu código se comporta nessa situação.
3. Como a quantidade de operações cresce com `n`? Qual é a complexidade de tempo correspondente?
4. Se o array tiver dez vezes mais elementos, quanto trabalho seu modelo prevê em comparação com o tamanho anterior? Mantenha o mesmo tipo de caso nas duas análises e justifique.
5. Como essa previsão ajuda a explicar por que a solução pode funcionar em amostras pequenas e receber TLE em entradas maiores?
6. Separe o que você sabe em três registros: o resultado de submissão que observou ou lembra; o comportamento que conseguiu reproduzir localmente, se houver; e a previsão feita pela análise. Indique o que não foi verificado, sem apresentar uma estimativa como medição real.

### 8. Best Time to Buy and Sell Stock — Comparar sua evolução

**Origem:** [LeetCode 121 — Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/).

Compare a abordagem com buscas repetidas e a versão de uma passagem que você relata ter desenvolvido. Use os códigos disponíveis, preservando as duas versões.

Responda:

1. O que representa `n`? Descreva brevemente como cada versão encontra sua resposta.
2. Na versão inicial, que trabalho era repetido? Onde esse trabalho deixou de se repetir na versão revisada?
3. Qual é a complexidade de tempo de cada versão? Justifique olhando para as operações que cada uma executa conforme o array cresce.
4. O que cada versão precisa guardar durante a execução, além da entrada e da saída? Qual é a complexidade de espaço auxiliar de cada uma?
5. Como a versão revisada garante a ordem exigida pelo problema, em que a compra deve ocorrer antes da venda? Explique isso a partir do seu código.
6. Teste preços decrescentes, preços iguais e o menor tamanho de entrada permitido pelo LeetCode. Informe entrada, resposta esperada e resposta obtida por cada versão disponível.
7. Em poucas frases, o que a comparação mostrou sobre a melhoria: o que mudou no trabalho e no uso de memória, e o que precisou continuar correto?

**Para as atividades 6–8:** se uma versão antiga não estiver salva, registre isso e descreva apenas a ideia de que se lembra. Não reconstrua código ou resultados como se fossem registros da tentativa original. Guarde as versões disponíveis sem sobrescrevê-las; uma melhoria ainda pendente pode continuar pendente.

## Consolidação — somente se precisar ou quiser

### 9. CLRS 1.2-3 — Crescimentos que se cruzam

**Origem:** seção 1.2, [p. 14 — abrir enunciado](../leituras/clrs-1.2.pdf#page=4).

Resolva o exercício com os valores e a comparação exatos do livro. Pode usar uma tabela ou um programa com valores pequenos e limites de execução explícitos.

Na resposta, mostre:

1. Qual é o primeiro valor que satisfaz a condição pedida?
2. Como você comparou as expressões para chegar a esse valor? Inclua seu raciocínio e a tabela ou o código, se os usou.
3. Como verificou que esse é o primeiro valor, e não apenas um valor que funciona? Justifique por que os valores anteriores permitidos não atendem à condição; um teste isolado não basta.

O foco é comparar os crescimentos polinomial e exponencial.

### 10. Contagem, tempo e logging

**Experimento próprio:** retoma sua experiência com runtime. Reutilize `contarA` e `contarC` da atividade 4. Ambiente: terminal local do curso, sem bibliotecas novas; pré-requisitos: atividade 4 e a nota [Cronômetro e console](../notas.md#cronometro-e-console).

**Parte A — previsão e execução**

1. Antes de executar, quantos passos cada função deve contar para `n = 100`, `200` e `400`? Registre suas previsões.
2. Execute com esses valores e compare as contagens obtidas com as previstas. Explique qualquer diferença.
3. Se quiser medir o tempo, chame `performance.now()` imediatamente antes e depois de cada execução. Subtraia os instantes e imprima o resultado somente depois. Repita cada medição três vezes e registre os tempos.
4. Se fez as medições, compare o crescimento das contagens com o dos tempos. Os tempos variaram entre repetições? Por que a razão entre milissegundos, sozinha, não comprova a classe de complexidade?

**Parte B — observar o efeito do console**

Use uma cópia de `contarA`, com `n = 10` e `20`, que imprima um número em cada volta. Preserve a versão original e não acrescente logging a `contarC`.

1. Execute a versão com logging e compare seu comportamento com o da original para os mesmos valores de `n`.
2. Se cronometrar a chamada inteira, que trabalho adicional passa a fazer parte do intervalo medido?
3. O que muda no trabalho contado e na análise de complexidade quando essas impressões são acrescentadas? Justifique no modelo usado pelo capítulo.
4. Por que esse experimento curto pode produzir tempos ruidosos, até próximos de zero? O que você pode concluir — e o que não pode — a partir desses resultados?

Entregue as previsões, as observações, as respostas e, se mediu, os tempos registrados. Informe também as versões de Node e ts-node. Não precisa de relatório extenso.

O experimento termina sozinho. Não aumente os tamanhos para forçar uma curva; se precisar interromper, use Ctrl+C somente no terminal dessa execução.

## Desafio — opcional

### 11. Revisar uma conclusão sobre código desconhecido

**Atividade própria:** análise de um código novo, sem exigir recursão. O código está correto para seu contrato. Seu autor afirma: “Ele precisa ser quadrático porque tem dois loops”.

```typescript
function contarEtapas(n: number): number {
  let etapas = 0;
  for (let i = 0; i < n; i++) {
    let restante = n;
    while (restante > 1) {
      restante = Math.floor(restante / 2);
      etapas++;
    }
  }
  return etapas;
}
```

`Math.floor` arredonda para baixo; por exemplo, `Math.floor(2.5)` é 2. Considere `n` inteiro entre 0 e 1000.

Responda:

1. Sem executar, quais valores a função deve devolver para `n = 0`, `1`, `8` e `16`? Registre como contou as etapas.
2. Execute com esses valores e compare com suas previsões. Explique eventuais diferenças.
3. Você concorda com a conclusão do autor? Determine a complexidade de tempo e justifique usando os limites e as atualizações dos loops, em vez de apenas contar quantos loops estão escritos.
4. Que dados a função mantém durante a execução? Conforme `n` aumenta, a memória necessária também cresce? Determine a complexidade de espaço auxiliar.
5. Imagine que `restante` comece com um inteiro positivo `m`, independente de `n`, em cada volta do `for`. Como você expressaria o custo de tempo em função das duas entradas? O uso de memória mudaria? Explique sem alterar o código.

## Entrega e próximo passo

Crie seus arquivos em `pratica/solucoes/`. Código e testes podem ficar juntos; respostas conceituais podem compartilhar um Markdown com o número da atividade e da pergunta. Use `ts-node caminho/do/arquivo.ts`. Não preencha os enunciados nem apague tentativas anteriores.

Pode entregar as atividades 1–3 para feedback antes de continuar. Se travar, envie a tentativa e indique qual pergunta gerou a dúvida. Consolidação e desafio não são condições de avanço. Retorne ao [guia](../README.md) para os critérios de domínio e as revisões planejadas.

Curadoria e links conferidos em 10/09/2026. Formulação dos enunciados revisada em 12/09/2026, sem alterar os exercícios externos originais ou fornecer respostas.
