# Apoios para usar as referências em TypeScript

Consulte a parte que estiver atrapalhando sua leitura ou prática. O roteiro principal está no [guia do capítulo](README.md); Big O e as famílias de crescimento são estudados no vídeo e no CLRS.

## 1. Quando o livro escreve diferente do seu código

No pseudocódigo do CLRS, `A[1]` costuma ser o primeiro elemento. No seu array TypeScript, ele é `valores[0]`. Não copie limites de índices sem conferir essa diferença. `A.length` representa a quantidade de elementos; atribuição guarda um valor e `return` encerra a chamada, como nas suas funções.

Na seção 2.2, o livro acompanha quantas vezes cada linha executa. Você pode começar pelo loop conhecido: identificar o que se repete, quantas vezes se repete e quanto custa uma repetição. Os símbolos de custo por linha representam esse modelo; não são medições em milissegundos. Não é necessário implementar insertion sort para ler a discussão selecionada.

Para interpretar a seção 3.1: `O` limita o crescimento por cima, `Ω` por baixo e `Θ` pelos dois lados. Essas notações não são sinônimos de pior, melhor e médio caso. Primeiro escolha o caso; depois descreva seu custo. No exercício que pede `Θ`, procure a ordem que acompanha o crescimento, não apenas um limite superior muito folgado. Não exigimos provas formais aqui.

## 2. A callback também trabalha

Você já usou `map`, `find` e `reduce`. A pergunta agora é o que ocorre **a cada chamada** da callback.

Em um array denso de `n` números, `map` visita os elementos e produz outro array. Se a callback apenas multiplica um número por dois, contamos trabalho constante por visita. Se ela procura um valor em outra coleção de tamanho `m`, cada visita pode esconder até `m` verificações. A quantidade de linhas escritas não revela esse custo.

Na sua análise, desenhe a ordem das operações: uma passagem **depois** de outra soma trabalho; uma busca **dentro** de cada visita repete trabalho. `find`, `some` e `every` podem terminar cedo, mas é preciso considerar também entradas que exigem chegar ao fim.

Use arrays comuns de números finitos e operações numéricas de custo constante neste capítulo. Esse é nosso modelo de análise, não uma garantia de tempo do JavaScript. Não precisamos analisar implementação de `sort`, hashing ou detalhes do motor agora.

Referências de comportamento: [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) e [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), MDN, conferidas em 10/09/2026.

## 3. Qual memória você está contando?

Comece pelo que existe durante a chamada. O array recebido é **entrada**. O que será devolvido é **saída**. Os dados extras usados para chegar à resposta são **espaço auxiliar**. Aqui separamos as três partes; algumas referências incluem a saída no espaço extra, por isso declare sua convenção.

Somar um array com um acumulador mantém um número extra, mesmo após muitas iterações. Criar uma cópia mantém posições adicionais para os elementos. `const outro = valores` compartilha a referência; `[...valores]` cria uma cópia das posições. Você já conhece a diferença de comportamento; agora ela também importa para memória.

Se uma função devolve uma cópia transformada de `n` números sem outro array intermediário, a saída ocupa O(n), e o armazenamento auxiliar do algoritmo pode ser O(1). Incluindo entrada e saída, o total no pico é O(n). Se ela cria essa cópia apenas para somar e devolver um número, a cópia é auxiliar. Conte o que precisa estar vivo ao mesmo tempo, sem somar toda alocação feita ao longo da execução.

Guardar resultados pode acelerar perguntas repetidas, mas usa espaço e pode exigir atualização quando a entrada muda. É essa escolha que a prática pede para discutir; implementar uma estrutura nova fica para os próximos capítulos.

## 4. O cronômetro e o console

Seu relato de TLE mostra por que a escala importa. Para explicar a complexidade, conte o trabalho em função da entrada. Uma medição isolada também depende do ambiente, da execução e do que você incluiu no intervalo medido.

Na atividade de experimentação, primeiro registre a quantidade de operações. Se quiser medir tempo, `performance.now()` fornece um instante em milissegundos; subtraia o valor inicial do final. Ele é adequado a intervalos de duração, mas execuções muito curtas ainda são ruidosas. Referência: [Node.js — performance.now](https://nodejs.org/api/perf_hooks.html#performancenow), conferida em 10/09/2026.

Imprimir valores escalares em cada volta pode aumentar bastante o runtime sem mudar a classe no modelo usado. Isso não significa que logging seja sempre constante: imprimir uma coleção crescente pode acrescentar trabalho proporcional ao seu tamanho. Explique o que foi impresso e com qual frequência. Para comparar o cálculo, deixe a impressão fora do intervalo cronometrado.

## 5. Se a recursão em C ainda incomodar

Você relatou dificuldade nesse trecho do CS50. Pode deixá-lo para o capítulo 15; ele não bloqueia Big O. Se quiser apenas acompanhar a chamada, veja este exemplo conceitual em TypeScript, sem necessidade de implementá-lo na prática:

```typescript
function mostrar(altura: number): void {
  if (altura <= 0) return;
  mostrar(altura - 1);
  console.log(altura);
}
mostrar(2);
```

A chamada com 2 chega a `mostrar(1)` e espera seu retorno. A chamada com 1 chega a `mostrar(0)`, que termina imediatamente. Ao voltar, imprime 1; depois a chamada que esperava imprime 2. Cada chamada tem seu próprio parâmetro. A ordem é explicada pelo lugar da chamada em relação ao `console.log`.

Contrato deste exemplo: inteiro pequeno e não negativo. Ele só remove a barreira sintática; não é exercício de recursão, requisito de avanço nem evidência de domínio desse assunto.

Volte ao [guia](README.md) ou siga para a [prática selecionada](pratica/atividades.md).
