# Do código que funciona ao trabalho que cresce

## 1. A limitação de testar só exemplos pequenos

Você relatou que encontrou Time Limit Exceeded (TLE) trabalhando com Contains Duplicate. Isso é uma evidência sobre uma execução dentro de um limite, não uma classificação matemática automática. Um programa pode produzir a resposta certa e ainda fazer trabalho demais.

Vamos investigar outra situação: encontrar o primeiro preço acima de um teto. Entrada: um array de números e um teto. Saída: o índice encontrado ou `-1`. Estado durante a execução: o índice atual. A comparação só acontece quando a função é chamada.

```typescript
function primeiroAcima(precos: number[], teto: number): number {
  for (let i = 0; i < precos.length; i++) {
    if (precos[i] > teto) return i;
  }
  return -1;
}
console.log(primeiroAcima([12, 8, 25, 7], 20)); // 2
console.log(primeiroAcima([], 20)); // -1
```

Com teto 20, compara 12, 8 e 25: três comparações. Com teto 30, compara os quatro preços. Se houver um milhão de preços abaixo do teto, precisará percorrer um milhão.

**Tamanho da entrada:** chamaremos de `n` a quantidade de preços. **Operação básica:** a comparação `precos[i] > teto`. Não estamos contando cada instrução do processador. Índices, leituras e comparações de números têm custo constante no modelo deste capítulo; os arrays são densos e contêm números finitos, sem acessores especiais.

## 2. Uma mudança: tornar o trabalho visível

Preservamos a busca e acrescentamos um contador. O objeto retornado reúne a resposta e a evidência; sua sintaxe já apareceu no 07.

```typescript
function medirBusca(precos: number[], teto: number) {
  let comparacoes = 0;
  for (let i = 0; i < precos.length; i++) {
    comparacoes++;
    if (precos[i] > teto) return { indice: i, comparacoes };
  }
  return { indice: -1, comparacoes };
}
console.log(medirBusca([12, 8, 25, 7], 20)); // { indice: 2, comparacoes: 3 }
console.log(medirBusca([12, 8, 25, 7], 30)); // { indice: -1, comparacoes: 4 }
console.log(medirBusca([], 20)); // { indice: -1, comparacoes: 0 }
```

O incremento fica antes do `if`, pois a comparação também ocorre quando encontramos a resposta. O contador não muda o critério da busca. O array recebido é a fonte de dados: nenhuma coleção global deve substituir `precos`.

## 3. Outra tarefa, dois percursos

Um painel precisa somar temperaturas e, depois, contar quantas são negativas. Se cada percurso visita `n` elementos, são `n + n = 2n` visitas. Um percurso termina antes de o outro começar.

```text
Sequenciais:  [visitar n] → [visitar n]       total: 2n
Aninhados:    para cada item de A, visitar B  total: n × m
```

Imagine testar compatibilidade entre `n` motores e `m` suportes: cada motor deve ser comparado com cada suporte. Para 3 motores e 4 suportes, são 12 pares. Se as duas coleções tiverem tamanho `n`, serão `n²` pares. Aqui o percurso interno recomeça a cada volta do externo.

E se cada motor passar por exatamente três verificações fixas? Serão `3n` verificações. Ter dois loops escritos não basta para concluir que o custo é quadrático.

## 4. Pares sem repetir a ordem

Em um torneio, cada jogador enfrenta cada outro uma vez. Não existe partida contra si mesmo e A × B é a mesma partida que B × A.

```typescript
function contarPartidas(jogadores: number[]): number {
  let partidas = 0;
  for (let i = 0; i < jogadores.length; i++) {
    for (let j = i + 1; j < jogadores.length; j++) {
      partidas++;
    }
  }
  return partidas;
}
console.log(contarPartidas([10, 20, 30, 40])); // 6
console.log(contarPartidas([])); // 0
```

Para quatro jogadores: `3 + 2 + 1 + 0 = 6`. Para `n`: `(n - 1) + (n - 2) + … + 0 = n(n - 1)/2`. A divisão por dois retira a duplicação da ordem dos pares; não transforma o crescimento em linear.

| n | Uma visita por item | Dois percursos | Pares do torneio |
|---:|---:|---:|---:|
| 10 | 10 | 20 | 45 |
| 100 | 100 | 200 | 4.950 |
| 1.000 | 1.000 | 2.000 | 499.500 |
| 10.000 | 10.000 | 20.000 | 49.995.000 |

Ao multiplicar `n` por dez, a primeira coluna multiplica por dez; a última cresce aproximadamente cem vezes. Essa diferença ajuda a investigar o TLE sem tentar “acelerar” cada linha isoladamente.

**Pausa:** explique por que 100 jogadores não geram apenas dez vezes as partidas de 10. Depois siga para [Big O](02-big-o-e-crescimento.md).
