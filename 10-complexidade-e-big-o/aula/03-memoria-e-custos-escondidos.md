# Memória e custos escondidos

## 1. Uma linha pode esconder um percurso

Você já conhece `map`, `filter`, `find` e `reduce`. A sintaxe curta não elimina as visitas. Um `map` em um array denso de `n` elementos chama a callback para cada elemento e cria outro array. Com transformação constante por item, modelamos seu tempo como O(n). Veja a descrição de [map na MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

```typescript
function totalDobrado(valores: number[]): number {
  const dobrados = valores.map((valor) => valor * 2);
  return dobrados.reduce((total, valor) => total + valor, 0);
}
console.log(totalDobrado([2, -1, 4])); // 10
console.log(totalDobrado([])); // 0
```

Primeiro são produzidos `n` números; depois, os `n` números são somados. São dois percursos sequenciais, portanto O(n), com um array intermediário de tamanho `n`.

Agora fazemos a mesma conta sem guardar todos os resultados intermediários:

```typescript
function totalDobradoDireto(valores: number[]): number {
  let total = 0;
  for (const valor of valores) {
    total += valor * 2;
  }
  return total;
}
console.log(totalDobradoDireto([2, -1, 4])); // 10
console.log(totalDobradoDireto([])); // 0
```

O resultado continua sendo 10. Ambas têm tempo O(n), mas a segunda elimina um percurso e o array intermediário. Isso pode melhorar tempo e memória reais sem mudar a classe de tempo. A escolha também depende da clareza e de precisar reutilizar o array.

## 2. Três contas diferentes de memória

**Entrada:** dados já recebidos. **Saída:** dados devolvidos ao chamador. **Espaço auxiliar:** armazenamento adicional durante o algoritmo, excluindo entrada e saída. Vamos declarar essas três partes separadamente; algumas fontes incluem a saída em “espaço extra”, por isso a convenção precisa aparecer.

| Algoritmo | Entrada | Saída | Auxiliar | Total no pico, incluindo entrada |
|---|---|---|---|---|
| Somar sem cópia | O(n) | O(1) | O(1) | O(n) |
| Criar dobrados e devolver sua soma | O(n) | O(1) | O(n) | O(n) |
| Devolver diretamente `valores.map(...)` | O(n) | O(n) | O(1)* | O(n) |

`*` No modelo de construção da saída, com callback constante e sem temporários proporcionais a `n`; detalhes internos de alocação do runtime ficam fora dessa conta.

Contamos quantas posições/valores precisam estar vivos ao mesmo tempo, não bytes exatos nem a soma de tudo que já foi alocado. Um único nome `copia` pode apontar para um milhão de posições. Já reutilizar `total` um milhão de vezes não cria um milhão de acumuladores vivos.

`const outro = valores` cria outra referência, não outro array: O(1) de espaço adicional. `const copia = [...valores]` copia as posições: O(n). Para arrays de objetos, essa cópia ainda compartilha os objetos internos, como no 09.

## 3. O custo está dentro da callback?

Suponha que cada consulta pergunte se um código numérico existe em um catálogo. [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) devolve um booleano; no modelo de busca linear, pode precisar verificar todas as posições.

```typescript
function contarConsultasPresentes(consultas: number[], catalogo: number[]): number {
  let presentes = 0;
  for (const codigo of consultas) {
    if (catalogo.includes(codigo)) presentes++;
  }
  return presentes;
}
console.log(contarConsultasPresentes([7, 2, 7], [2, 4])); // 1
console.log(contarConsultasPresentes([], [2, 4])); // 0
```

Se `n` é a quantidade de consultas e `m` a de códigos do catálogo, consultas ausentes podem exigir `n × m` verificações. Para ambos positivos, o pior caso é O(nm); incluindo também catálogo vazio, o limite uniforme é O(n + nm), pois o loop externo ainda roda. Não existe um segundo `for` visível, mas existe uma busca repetida.

Com `map`/`filter` encadeados, some os custos das fases. Com uma busca **dentro** da callback, conte o custo da busca por chamada. `find`, `some` e `every` podem encerrar antes; isso não remove seus piores casos lineares quando cada callback tem custo constante.

Não atribua um custo universal a `sort` sem discutir algoritmo/runtime; estudaremos ordenação no 14. As análises acima são modelos para arrays comuns e callbacks descritos, não promessas de milissegundos da linguagem.

## 4. Trocar memória por tempo: guardar somas já calculadas

Um sensor produz uma lista fixa de leituras. Várias perguntas pedem “qual a soma das primeiras `k` leituras?”. Uma possibilidade é somar do começo a cada pergunta: até `n` adições por consulta.

Outra é fazer uma preparação, guardando cada soma parcial:

```typescript
function prepararSomas(leituras: number[]): number[] {
  const somas = [0];
  let total = 0;
  for (const leitura of leituras) {
    total += leitura;
    somas.push(total);
  }
  return somas;
}
const leituras = [4, -1, 6];
const somas = prepararSomas(leituras);
console.log(somas); // [0, 4, 3, 9]
console.log(somas[2]); // 3: soma das primeiras duas leituras
console.log(somas[0]); // 0: nenhuma leitura
```

Cada volta guarda um estado: total 4, depois 3, depois 9. A posição `k` agora contém a resposta. Contrato da consulta: `k` inteiro entre 0 e `n`; fora disso, não há resposta válida garantida. A preparação custa O(n) tempo (considerando inserção no final amortizada constante: eventuais realocações são diluídas entre as inserções) e O(n) armazenamento produzido. Cada consulta posterior é O(1).

Para `q` consultas, repetir somas tem pior caso O(qn); preparar uma vez e consultar custa O(n + q), com O(n) memória adicional ao sistema. Na função de preparação, esse array é saída; no sistema de consultas, é uma estrutura extra mantida para acelerar respostas. Se as leituras mudarem, as somas guardadas podem ficar desatualizadas. Se houver uma única consulta curta, a preparação talvez não compense.

Voltamos ao problema inicial: conseguir responder está separado de conseguir responder dentro de um limite. No próximo capítulo, investigaremos estruturas que ajudam em perguntas de presença e localização. Por enquanto, a competência é identificar onde o trabalho se repete e o que custaria guardar informação.

Próximo: [experimentos](04-experimentos.md).
