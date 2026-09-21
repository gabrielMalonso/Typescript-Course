# Custos de métodos e encadeamentos

No capítulo 10, você contou o trabalho dos loops. Os métodos de array também fazem trabalho: a chamada esconde o percurso, mas ele continua existindo.

Vamos usar arrays comuns, densos, sem posições vazias, getters ou proxies. Considere operações aritméticas e comparações de números como O(1). Os custos abaixo são um modelo usual de análise, não uma promessa de tempo de execução feita pelo JavaScript para todos os motores e tipos de array.

## Duas etapas lineares continuam lineares

Uma lista de leituras contém números negativos que representam medições inválidas. Queremos dobrar somente as válidas:

```ts
const leituras = [3, -1, 5, -2];
const resultado = leituras
  .filter(valor => valor >= 0)
  .map(valor => valor * 2);

console.log(resultado); // [6, 10]
```

Se a entrada tem `n` elementos e `k` passam pelo filtro, `filter` examina `n` e `map` transforma `k`. Como `k <= n`, são no máximo `2n` visitas: O(n).

Há um array intermediário de `k` elementos e um resultado com outros `k`. O espaço adicional é O(n) no pior caso, incluindo a saída; o intermediário também pode consumir O(n) sozinho. A coleta de lixo pode liberar objetos depois, mas não elimina a alocação que aconteceu.

Podemos construir o resultado em um percurso:

```ts
const leituras = [3, -1, 5, -2];
const resultado: number[] = [];

for (const valor of leituras) {
  if (valor >= 0) resultado.push(valor * 2);
}

console.log(resultado); // [6, 10]
```

Essa versão mantém tempo O(n), elimina o array intermediário e usa O(1) de espaço auxiliar além da saída. A diferença de alocação pode importar em entradas grandes; em código pequeno, o encadeamento pode ser suficientemente claro e econômico. Conte antes de otimizar.

## O callback pode esconder uma segunda busca

Agora queremos saber, para cada código solicitado, se ele aparece em uma lista de códigos disponíveis:

```ts
const solicitados = [8, 2, 9];
const disponiveis = [2, 8, 4, 5];
const presencas = solicitados.map(codigo => disponiveis.includes(codigo));

console.log(presencas); // [true, true, false]
```

Se são `n` solicitações e `m` códigos disponíveis, cada callback pode examinar `m` posições. O pior caso é O(n × m). Quando os tamanhos crescem juntos, isso pode ser O(n²). Não há dois `for` escritos, mas há uma busca dentro de cada visita.

Uma estrutura de consulta preparada uma vez pode reduzir buscas repetidas. Seu custo de construção também entra na conta, e ela consome memória. A escolha depende de quantas consultas serão feitas e de quais informações precisam ser preservadas; use o raciocínio do capítulo 11.

## Copiar um acumulador a cada passo

Até uma transformação simples pode ficar cara:

```ts
const valores = [2, 4, 6];
let dobros: number[] = [];

for (const valor of valores) {
  dobros = [...dobros, valor * 2];
}

console.log(dobros); // [4, 8, 12]
```

Antes de acrescentar cada número, copiamos tudo que já estava no resultado. São `0 + 1 + 2 + ... + (n - 1)` elementos copiados. O total cresce quadraticamente: O(n²) de tempo.

O resultado final ocupa O(n). O volume acumulado de alocações é O(n²), mas isso não significa O(n²) de memória simultaneamente necessária: os arrays antigos podem deixar de estar acessíveis. Separar trabalho acumulado e espaço vivo evita uma conclusão errada; o consumo real também depende do coletor de lixo.

Usar `push` em um resultado recém-criado evita reconstruí-lo inteiro a cada passo. Isso altera apenas esse resultado, sem alterar a entrada. Também poderíamos usar `map` diretamente para essa transformação.

## Por que `push` merece uma ressalva

No modelo de array dinâmico, acrescentar ao final costuma usar uma posição já disponível. Ocasionalmente, o armazenamento cresce e os elementos precisam ser copiados. Se a capacidade aumenta geometricamente, as cópias ficam espaçadas: capacidades 1, 2, 4, 8…

Ao longo de `n` inserções, a soma dessas cópias é proporcional a `n`. Por isso usamos **O(1) amortizado por inserção**, ou O(n) para a sequência. Amortizado analisa o conjunto de operações; não quer dizer que todas custem o mesmo, nem é a mesma coisa que média sobre entradas aleatórias. Essa é a intuição da [leitura de CLRS 17.4](../01-leituras-do-livro/clrs-17.4-expansao.pdf); a prova formal completa fica para depois. JavaScript não exige uma estratégia interna específica de expansão.

## Referência de custos para estes problemas

`n` é o tamanho do array; `k`, a quantidade de elementos copiados. Callbacks simples têm custo O(1). Espaço da saída é mencionado separadamente quando ajuda.

| Operação | Tempo no modelo adotado | Efeito relevante |
|---|---|---|
| Acessar posição válida, ler `length` | O(1) | Não percorre a sequência |
| `push` de um elemento | O(1) amortizado | Altera o final; pode crescer o armazenamento |
| `pop` | O(1) | Remove do final; vazio retorna `undefined` |
| `shift` / `unshift` | O(n) | Podem deslocar os elementos |
| `slice` de `k` elementos | O(k) | Cria array com O(k) posições |
| Spread de todo o array | O(n) | Cria cópia rasa |
| `reverse` | O(n) | Altera a ordem do array |
| `splice` removendo/inserindo no meio | O(n) para quantidades limitadas | Desloca posições; devolve removidos |
| `includes`, `find`, `findIndex`, `some`, `every` | O(n) no pior caso | Podem encerrar antes |
| `map`, `filter`, `forEach`, `reduce` | O(n), com callback O(1) | O custo muda se o callback fizer mais trabalho |

Essa tabela não é um catálogo para decorar. Para reconstruí-la, pergunte: quantos elementos podem ser visitados, deslocados ou copiados? `reduce` não é mais rápido por juntar a sintaxe em uma chamada; copiar o acumulador nele reproduz o problema anterior. A análise de ordenação fica para o capítulo 14.

**Continue:** [Lotes recebidos](../03-pratica/atividades.md#atividade-2). [Voltar ao guia](../README.md#etapa-3).

## Referências

- [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array): comportamento dos métodos.
- [MDN — Quando não usar reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#when_to_not_use_reduce): cópias repetidas do acumulador.
- [CLRS, 3ª edição, seção 17.4, pp. 463–465](../01-leituras-do-livro/clrs-17.4-expansao.pdf): modelo de expansão de tabelas; limites de leitura na etapa 3 do guia.
