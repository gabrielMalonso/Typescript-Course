# Experimentos: prever, executar, explicar

## 1. Primeiro conte, depois cronometre

Crie `pratica/solucoes/experimento.ts` e copie este programa completo. Ele não resolve os problemas do LeetCode; compara uma visita por item com o torneio da primeira aula.

```typescript
function medirCrescimento(n: number) {
  let visitas = 0;
  let pares = 0;
  for (let i = 0; i < n; i++) visitas++;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) pares++;
  }
  return { n, visitas, pares };
}
for (const tamanho of [0, 1, 10, 100, 1000]) {
  console.log(medirCrescimento(tamanho));
}
```

Execute, a partir da raiz do curso:

```bash
ts-node 10-complexidade-e-big-o/pratica/solucoes/experimento.ts
```

Antes de executar, escreva as cinco linhas esperadas. Depois confronte com esta referência:

| n | visitas | pares |
|---:|---:|---:|
| 0 | 0 | 0 |
| 1 | 1 | 0 |
| 10 | 10 | 45 |
| 100 | 100 | 4.950 |
| 1.000 | 1.000 | 499.500 |

Acrescente `n = 2000` depois da previsão: visitas dobram; pares passam para 1.999.000, aproximadamente quatro vezes o valor para 1000. A razão não é exatamente 4 porque a fórmula também tem o termo `-n/2`.

**Caso de regressão:** um teste pequeno que continua sendo executado após uma mudança para revelar se um comportamento correto quebrou. Aqui, 0, 1 e 4 verificam ausência de pares, exclusão de partida consigo mesmo e contagem sem repetir a ordem.

## 2. Cronometragem opcional e pequena

Depois das contagens, você pode medir tempo com `Date.now()`, que devolve um número de milissegundos; o tempo decorrido aproximado é o valor final menos o inicial. Essa API usa relógio civil e tem resolução limitada: não é um cronômetro preciso ou monotônico. Ela serve aqui para observar por que medições curtas podem ser ruidosas, não para um benchmark profissional.

Acrescente ao mesmo arquivo, após a função:

```typescript
for (const tamanho of [1000, 2000, 4000]) {
  const inicio = Date.now();
  const resultado = medirCrescimento(tamanho);
  const decorrido = Date.now() - inicio;
  console.log(tamanho, resultado.pares, decorrido);
}
```

Não existe saída fixa de milissegundos. Pode aparecer zero. Repita três vezes, registre a ordem das execuções e compare os resultados. Não aumente indefinidamente os tamanhos para “forçar” uma curva. Esses limites pequenos são suficientes para a atividade.

Por que a razão de tempos pode não ser 4? Inicialização, compilação/otimização do runtime, resolução do relógio, coleta de lixo e outros programas afetam a medida. `console.log` fica fora do intervalo medido para não misturar impressão com o trabalho contado. Mesmo assim, esta função mede dois percursos e seus contadores; não isola uma instrução.

Não use `n = 1000000` no loop de pares: uma mudança aparentemente pequena no arquivo criaria aproximadamente meio trilhão de iterações. Se uma experiência sua ficar longa, interrompa apenas a execução iniciada nesse terminal com Ctrl+C.

## 3. O que registrar

Em `pratica/solucoes/experimentos.md`: hipótese → tamanhos e operação contada → previsão → saída observada → explicação → limites da conclusão. Separe dados previstos de dados realmente executados. Registre também `node --version` e `ts-node --version` se fizer a cronometragem, para contextualizar o ambiente.

Se o tempo não acompanhar a curva, investigue a medição antes de descartar a contagem. Se a contagem divergir, rastreie os índices numa entrada de tamanho 4. Uma amostra pequena não prova a complexidade geral; o raciocínio sobre os limites dos loops sustenta a análise.

**Retorno ao TLE:** agora você pode perguntar qual é `n`, quantas comparações sua tentativa realiza no pior caso e qual trecho repete trabalho. Ainda não precisa conhecer a estrutura que removerá essa repetição.

Próximo: [prática de fundamentos](../pratica/01-fundamentos.md).
