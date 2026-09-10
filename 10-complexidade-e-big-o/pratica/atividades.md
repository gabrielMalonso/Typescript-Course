# Prática selecionada — Complexidade e Big O

Use os enunciados do seu **CLRS, 3ª edição**, e os links oficiais do LeetCode. As páginas do livro são da edição inglesa. As orientações abaixo indicam o foco e identificam extensões próprias; não reproduzem os enunciados ou suas soluções.

São **11 atividades no total**: 1–8 essenciais; 9–10 de consolidação; 11 desafio opcional. Os subitens de análise e teste fazem parte da atividade, não são uma quota extra. Entregue em blocos pequenos, se preferir, e ajuste a carga com o feedback.

## Essenciais

### 1. CLRS 1.2-2 — Comparar alternativas

**Origem:** seção 1.2, p. 14. Faça após a leitura 1.2. Use as expressões e a condição exatas do livro. Pode usar uma tabela ou um pequeno programa em TypeScript; explique como verificou os limites da sua resposta. Não precisa implementar as ordenações mencionadas.

O foco é perceber quando constantes e crescimento mudam a comparação entre algoritmos. Registre o raciocínio e a resposta, sem relatório extenso.

### 2. CLRS 2.2-1 — Ordem de crescimento

**Origem:** seção 2.2, p. 29. Faça após os recortes de 2.2 e 3.1. O original pede **Θ**; use essa notação e explique por que o termo escolhido descreve o crescimento. Não é necessário demonstrar formalmente com constantes e limiares.

### 3. CLRS 2.2-3 — Uma busca e suas entradas

**Origem:** seção 2.2, p. 29. A busca linear mencionada percorre a coleção em sequência até encontrar o valor. Leia e responda o enunciado original, incluindo suas hipóteses sobre a posição do elemento. Distingua quantidade esperada de verificações e ordem de crescimento.

**Extensão do curso para TypeScript e testes:** implemente uma busca que recebe um array de números e um valor, retornando um objeto com o índice da primeira ocorrência (`-1` se ausente) e a quantidade de comparações de igualdade realizadas. Preserve a entrada.

Teste valor no começo, no fim, ausente, repetido e array vazio. Faça chamadas com duas coleções diferentes, para verificar se a função usa o parâmetro. Explique como ausência e melhor caso se relacionam à análise original, sem inventar uma distribuição de entradas.

### 4. Uma análise que deve acompanhar os limites

**Atividade própria:** cobre transferência do modelo para loops TypeScript, sem exigir ordenação ou recursão. Faça após a leitura 3.2. Considere `n` inteiro positivo, corpos de custo constante e valores pequenos na execução.

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

Preveja as contagens para 4 e 8, execute e justifique a ordem de crescimento de cada função. A quantidade de loops escritos é suficiente para classificá-las?

Agora compare modelos, sem implementar algoritmos novos: trabalho constante, uma visita por item, reduções de n pela metade até 1, essas reduções repetidas para cada um dos n itens, todos os pares e todas as configurações de n escolhas binárias. Associe cada modelo a uma família estudada e explique o efeito de passar de n = 8 para n = 16. Para as reduções, desenhe a sequência; para escolhas binárias, cada nova escolha duplica a quantidade de configurações. Contar configurações matematicamente é diferente de percorrê-las.

### 5. Um relatório funciona, mas repete trabalho

**Atividade própria:** cobre custo de callbacks, memória e regressão, lacunas específicas da implementação em TypeScript. Consulte os apoios 2–3 das [notas](../notas.md).

Contrato: devolver, em cada posição, a soma de todos os valores recebidos. Para `[2, 3]`, a saída é `[5, 5]`. Os números e somas permanecem em limites seguros. O código é **intencionalmente ineficiente**, embora produza a saída esperada.

```typescript
function repetirTotal(valores: number[]): number[] {
  return valores.map(() => valores.reduce((total, valor) => total + valor, 0));
}
```

Identifique o trabalho repetido, proponha uma melhoria e teste vazio, um elemento e negativos. Justifique tempo, entrada, saída e espaço auxiliar antes/depois; conte também o total no pico. A saída exigida pelo contrato pode desaparecer da conta de memória?

**Variação em texto:** um sistema consulta repetidamente esse resultado para o mesmo array. Compare recalcular a resposta a cada solicitação com guardar o array de resposta para reutilização. Qual o custo inicial, por consulta e de armazenamento? O que muda se a entrada for alterada ou existir apenas uma consulta? Não precisa implementar cache, Map ou qualquer estrutura nova. Declare se a consulta devolve a referência guardada ou cria uma cópia, pois isso afeta seu modelo.

### 6. Two Sum — Analisar sua tentativa

**Origem:** [LeetCode 1 — Two Sum](https://leetcode.com/problems/two-sum/). Use o enunciado oficial para conferir o contrato.

Preserve a tentativa que você já fez e analise o custo dos seus limites e operações. Declare n, pior caso e espaço auxiliar. Mostre um caso de borda permitido pelo contrato. Não é necessário descobrir agora uma solução otimizada nem fazer nova submissão.

### 7. Contains Duplicate — Explicar a limitação

**Origem:** [LeetCode 217 — Contains Duplicate](https://leetcode.com/problems/contains-duplicate/).

Revisite sua tentativa e explique qual contagem ajuda a entender o TLE relatado. Diferencie resultado de uma submissão, comportamento reproduzido localmente e previsão pelo modelo. Compare o trabalho previsto ao multiplicar o tamanho da entrada por dez. A otimização com estruturas do próximo capítulo fica para depois; não consulte editoriais ou soluções prontas.

### 8. Best Time to Buy and Sell Stock — Comparar sua evolução

**Origem:** [LeetCode 121 — Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/).

Compare a abordagem de busca repetida e a versão de uma passagem que você relata ter desenvolvido. Use seu código, quando disponível: onde o trabalho deixou de se repetir? Justifique tempo e espaço e explique como a versão revisada respeita a ordem das operações exigida pelo enunciado. Teste preços decrescentes, iguais e o menor tamanho permitido.

Para as atividades 6–8, se não houver versão antiga salva, registre essa ausência e descreva apenas a ideia que lembra; não invente código ou resultado. Guarde versões disponíveis sem sobrescrevê-las. Seu registro pode acompanhar primeira ideia → tentativa → custo → dificuldade → mudança → custo final → aprendizado, apenas nos pontos que de fato ocorreram. Uma melhoria pendente pode continuar pendente.

## Consolidação — somente se precisar ou quiser

### 9. CLRS 1.2-3 — Crescimentos que se cruzam

**Origem:** seção 1.2, p. 14. Faça com os valores e a comparação do enunciado original. Pode usar tabela ou programa com limites pequenos e explícitos. Explique como verificou o primeiro valor que satisfaz a condição, sem depender de um único teste isolado. Esta atividade reforça a comparação de crescimento polinomial e exponencial.

### 10. Contagem, tempo e logging

**Experimento próprio:** retoma sua experiência com runtime. Reutilize `contarA` e `contarC` da atividade 4. Ambiente: terminal local do curso, sem bibliotecas novas; pré-requisitos: atividade 4 e apoio 4 das notas.

Antes de executar, preveja as contagens para n = 100, 200 e 400. Confira as contagens. Se quiser cronometrar, registre `performance.now()` imediatamente antes e depois da chamada, subtraia os valores e imprima depois. Repita três vezes; compare contagem e tempo, sem tratar a razão de milissegundos como prova de Big O.

Para observar interferência, use uma cópia da função A com n = 10 e 20 e imprima um número em cada volta. Não acrescente logging ao loop de pares. Explique o que mudou no intervalo medido e por que esse ensaio curto pode ser ruidoso. Uma medição pode dar quase zero; isso não significa ausência de trabalho.

Registre previsão, observação e limites em poucas linhas, junto das versões de Node e ts-node. O experimento termina sozinho; não aumente os tamanhos para forçar uma curva. Se precisar interromper, use Ctrl+C somente no terminal dessa execução.

## Desafio — opcional

### 11. Revisar uma conclusão sobre código desconhecido

**Atividade própria:** transferência de análise, sem recursão. O código abaixo está correto para seu contrato; a conclusão do autor é que precisa ser quadrático porque tem dois loops.

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

`Math.floor` arredonda para baixo; por exemplo, `Math.floor(2.5)` é 2. Considere n inteiro entre 0 e 1000. Avalie a conclusão, preveja as saídas para 0, 1, 8 e 16 e confira. Explique tempo e memória. Se o valor inicial de `restante` fosse m, independente de n, como você declararia a análise? Não precisa alterar o código.

## Entrega e próximo passo

Crie seus arquivos em `pratica/solucoes/`. Código e testes podem ficar juntos; respostas conceituais podem compartilhar um Markdown numerado. Use `ts-node caminho/do/arquivo.ts`. Não preencha enunciados nem apague tentativas que ajudem a explicar a evolução.

Pode entregar as atividades 1–3 para feedback antes de continuar. Se travar, envie a tentativa e a dúvida; começaremos por uma pista. Consolidação e desafio não são condições de avanço. Retorne ao [guia](../README.md) para os critérios de domínio e as revisões planejadas.

Curadoria e links conferidos em 10/09/2026. Não foram criadas respostas ou notas de avaliação antecipadas.
