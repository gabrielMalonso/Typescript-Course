# Big O e famílias de crescimento

## 1. Da contagem à notação

Já encontramos `n`, `2n` e `n(n - 1)/2`. Queremos comparar a forma de crescimento, sem depender do computador ou de quantos nanossegundos custa uma comparação.

**Big O expressa um limite superior assintótico:** a partir de um tamanho suficientemente grande, o custo fica abaixo de uma constante multiplicada pela função indicada. “Assintótico” significa olhar a tendência conforme a entrada cresce.

Em símbolos, `T(n)` é O(f(n)) se existem constantes positivas `c` e `n₀` tais que `T(n) ≤ c × f(n)` para todo `n ≥ n₀`. Não é preciso memorizar isso: `2n + 3 ≤ 5n` para `n ≥ 1`, então esse trabalho é O(n).

Usaremos o limite mais informativo que conseguimos justificar. Um percurso linear também tem o limite O(n²), mas chamar tudo de quadrático esconderia a diferença que queremos estudar. A notação Θ descreve uma ordem justa por cima e por baixo; basta reconhecer essa distinção, sem fazer provas formais neste capítulo.

Para `n² + 3n + 10`, o termo quadrático domina conforme `n` cresce: O(n²). Não descartamos constantes ao prever o tempo real; descartamos ao classificar a ordem de crescimento.

## 2. Famílias com um problema por trás

| Ordem | Trabalho intuitivo | Se n dobra |
|---|---|---|
| O(1) | Ler uma posição conhecida de um array | Permanece limitado por uma constante |
| O(log n) | Reduzir o restante pela metade a cada etapa | Aproximadamente uma etapa adicional |
| O(n) | Visitar todos os itens uma vez | Aproximadamente 2× |
| O(n log n) | Para cada item, realizar log n etapas | Um pouco mais que 2× |
| O(n²) | Visitar todos os pares de duas listas de tamanho n | Aproximadamente 4× |
| O(2ⁿ) | Explorar todas as combinações de n escolhas binárias | De 2ⁿ para 2²ⁿ: quadrado do total anterior |

Os fatores da tabela descrevem esses modelos de crescimento; Big O sozinho não promete uma razão exata para toda implementação. O(1) também não significa “uma instrução”. Ler duas posições, comparar e devolver um número ainda pode ser O(1).

## 3. Dividir pela metade antes de falar em logaritmo

Há 16 candidatos. Cada etapa elimina metade: `16 → 8 → 4 → 2 → 1`. São quatro reduções. Com 32, são cinco. **log₂(n)** responde: quantas vezes precisamos dobrar 1 para chegar a `n`? Nas potências de dois, é também o número de reduções pela metade até 1.

```typescript
function contarReducoes(quantidade: number): number {
  let restante = quantidade;
  let etapas = 0;
  while (restante > 1) {
    restante = Math.floor(restante / 2);
    etapas++;
  }
  return etapas;
}
console.log(contarReducoes(16)); // 4
console.log(contarReducoes(20)); // 4
console.log(contarReducoes(1)); // 0
console.log(contarReducoes(0)); // 0
```

Contrato: inteiro não negativo, representável com segurança como `number`. `Math.floor` arredonda para baixo: `Math.floor(2.5)` é 2. Para 20, o estado é `20 → 10 → 5 → 2 → 1`. Para positivos, a contagem é a parte inteira de log₂(n). Não calculamos log(0): o caso vazio é tratado pela condição do loop.

Dividir por 2 ou por 3 gera famílias logarítmicas: trocar a base muda um fator constante. Dividir **o trabalho restante** pela metade é diferente de percorrer metade do array uma única vez: `n/2` visitas ainda crescem linearmente. Busca binária usará essa ideia no 14; não precisamos implementá-la agora.

Se para cada um dos `n` itens fizermos o processo de redução de `n` até 1, teremos `n × log n` etapas: O(n log n), apesar dos loops aninhados. Ordenação eficiente retomará essa família mais adiante.

## 4. Crescimento exponencial sem recursão

Um jogo permite ligar ou desligar cada uma de `n` opções. Uma opção permite 2 configurações; duas permitem 4; três, 8. Cada nova opção dobra o conjunto de possibilidades: `2ⁿ`.

| n | log₂ n | n | n log₂ n | n² | 2ⁿ |
|---:|---:|---:|---:|---:|---:|
| 4 | 2 | 4 | 8 | 16 | 16 |
| 8 | 3 | 8 | 24 | 64 | 256 |
| 16 | 4 | 16 | 64 | 256 | 65.536 |

Contar matematicamente as configurações e **visitar cada configuração** são tarefas diferentes. A segunda exige pelo menos uma visita para cada uma das `2ⁿ` possibilidades; se copiar `n` opções por configuração, há ainda esse fator adicional. Não gere todas para valores grandes.

## 5. Qual caso estamos analisando?

Na busca da aula anterior, com `n ≥ 1`:

- Melhor caso: o primeiro preço serve → uma comparação, O(1).
- Pior caso: só o último serve ou nenhum serve → `n` comparações, O(n).
- Caso médio **sob a hipótese de exatamente um preço acima do teto e posição uniformemente distribuída**: `(1 + 2 + … + n)/n = (n + 1)/2`, O(n).

Essa hipótese não é universal. Se quase todas as buscas falham, a média observada se aproxima de `n`. Big O não significa “pior caso” por definição: precisamos dizer de qual função de custo estamos falando. Neste capítulo, quando não houver outra indicação, analise o **pior caso** e escreva isso na resposta.

Para entradas independentes de tamanhos `n` e `m`, preserve os dois: percursos sequenciais O(n + m), todas as combinações O(nm). Só troque por O(n²) se houver uma relação que justifique.

**Pausa:** um `return` no meio do loop garante O(1)? Explique usando entradas diferentes. Próximo: [memória e métodos](03-memoria-e-custos-escondidos.md).
