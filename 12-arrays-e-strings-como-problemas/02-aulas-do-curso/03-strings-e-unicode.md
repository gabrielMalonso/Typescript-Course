# Strings, transformação e contagem

Uma string parece um array quando escrevemos `texto[0]` ou percorremos seu conteúdo. Essa semelhança ajuda a começar, mas esconde duas diferenças: não podemos alterar posições de uma string, e uma posição nem sempre corresponde ao que uma pessoa vê como um caractere.

## Transformar cria outro valor

```ts
const original = "casa";
const maiusculas = original.toUpperCase();

console.log(original);   // "casa"
console.log(maiusculas); // "CASA"
```

`toUpperCase` retorna outro valor de string. Não altera `original`. Atribuir a uma posição, como `original[0] = "C"`, não é permitido pelo TypeScript. Se uma variável `let` receber outra string, você mudou o valor guardado na variável, não os caracteres do valor anterior.

Para transformar texto com uma regra própria, podemos coletar partes e juntá-las. Aqui, o contrato é **texto ASCII**, substituindo cada espaço comum por um hífen e preservando os demais caracteres:

```ts
function trocarEspacos(texto: string): string {
  const partes: string[] = [];

  for (const caractere of texto) {
    partes.push(caractere === " " ? "-" : caractere);
  }

  return partes.join("");
}

console.log(trocarEspacos("um dia"));  // "um-dia"
console.log(trocarEspacos("a  b"));    // "a--b"
console.log(trocarEspacos(""));        // ""
```

`join("")` monta uma string com as partes, sem separador. Para `n` caracteres ASCII, o percurso e a montagem são O(n) no modelo usual. O array auxiliar ocupa O(n) e a saída tem tamanho O(n).

Também seria possível usar um método pronto para substituir espaços. O exemplo expõe o mecanismo para aplicar regras que não tenham uma chamada pronta.

Construir uma string com `resultado += caractere` não autoriza concluir que cada passo custa O(1): strings são imutáveis. Um modelo que copia todo o prefixo a cada concatenação dá O(n²) no total. Motores podem adiar cópias e usar representações internas que reduzem esse custo. Não deduza a implementação só da sintaxe; acumular partes e juntá-las torna o trabalho de montagem mais explícito.

## O que `length` está contando?

JavaScript representa strings como sequências de **unidades de código UTF-16**. Pense nelas como unidades de armazenamento: um ponto de código Unicode pode precisar de uma ou duas dessas unidades.

```ts
const texto = "A😀B";

console.log(texto.length);      // 4
console.log(texto[0]);          // "A"
console.log(texto[3]);          // "B"
console.log(texto.split("").length); // 4
console.log([...texto]);        // ["A", "😀", "B"]
```

O emoji ocupa duas posições UTF-16. `texto[1]` contém apenas a primeira parte, não o emoji completo. `split("")` também separa unidades de código, podendo quebrar esses pares.

Já `for...of` e o spread de string percorrem **pontos de código**. Eles preservam esse emoji, mas ainda não garantem uma unidade visual por item:

```ts
const acentoSeparado = "e\u0301";
const emojiComTom = "👍🏽";

console.log(acentoSeparado);             // aparece como é
console.log(acentoSeparado.length);      // 2
console.log([...acentoSeparado].length); // 2
console.log(emojiComTom.length);         // 4
console.log([...emojiComTom].length);    // 2
```

`\u0301` representa um acento combinante. A letra e o acento são dois pontos de código que se apresentam juntos. O emoji com tom de pele também combina pontos de código.

| Unidade | Exemplo `"A😀B"` | Como a usamos |
|---|---|---|
| Unidade de código UTF-16 | 4 unidades | `length`, índices, `slice` |
| Ponto de código | 3 pontos | `for...of`, spread de string |
| Grafema, uma unidade de texto percebida | 3 grafemas | Segmentação específica, como `Intl.Segmenter` |

Não precisamos implementar segmentação neste capítulo. Precisamos reconhecer quando a exigência é visual: limitar nomes a “dez caracteres” exige definir o que será contado. Para os exercícios, o enunciado dirá a unidade.

Os índices devolvidos por métodos de busca em strings também são posições UTF-16. Um contador incrementado dentro de `for...of` conta pontos de código; não use esse contador como índice de `texto[i]` quando houver caracteres fora do plano básico.

## Igualdade de texto precisa de uma regra

Dois textos visualmente iguais podem ter representações diferentes:

```ts
const composto: string = "é";
const separado: string = "e\u0301";

console.log(composto === separado); // false
console.log(composto.normalize("NFC") === separado.normalize("NFC")); // true
```

`normalize("NFC")` permite comparar essas formas canonicamente equivalentes. Não remove acentos, não ignora maiúsculas e não resolve toda regra de igualdade de uma aplicação. Use normalização quando o contrato pedir; nos exercícios ASCII abaixo, ela não é necessária.

## Contar algo que o problema definiu

Queremos contar grupos de letras separados por um ou mais espaços comuns. A entrada contém somente `a` a `z` e espaços; pontuação, tabs, quebras de linha e outros alfabetos estão fora do contrato. Neste problema, cada grupo é uma palavra.

Um `split(" ")` produz partes vazias quando há espaços repetidos. Poderíamos filtrá-las; para contar, podemos também guardar apenas se estávamos dentro de uma palavra:

```ts
function contarPalavras(texto: string): number {
  let total = 0;
  let dentroDePalavra = false;

  for (const caractere of texto) {
    if (caractere === " ") {
      dentroDePalavra = false;
    } else if (!dentroDePalavra) {
      total++;
      dentroDePalavra = true;
    }
  }

  return total;
}

console.log(contarPalavras("  um   dia bom ")); // 3
console.log(contarPalavras(""));                // 0
console.log(contarPalavras("   "));             // 0
console.log(contarPalavras("dia"));             // 1
```

Um espaço deixa o estado fora da palavra. A primeira letra seguinte aumenta o total; as demais mantêm o estado. Assim, cada palavra é contada uma única vez. Tempo O(n), espaço auxiliar O(1).

Esse estado booleano responde apenas à contagem de grupos. Se precisássemos saber quantas vezes cada letra aparece, precisaríamos preservar mais informação. Comece sempre pela pergunta e pela definição de igualdade do enunciado.

## Como testar e analisar texto

Na função anterior, vazio testa a ausência de iterações; só espaços testa a ausência de palavras; espaços repetidos testam as transições; uma palavra testa se contamos também sem espaço final. Escolher casos por essas diferenças é mais útil que repetir muitos exemplos parecidos.

Para texto geral, declare `n` em unidades UTF-16 e, se necessário, `p` em pontos de código. Formar `[...texto]` custa um percurso e um array adicional; não é uma conversão gratuita. Comparar ou transformar strings longas também pode exigir percorrê-las. A hipótese de operações O(1) usada para números não se transfere automaticamente a palavras de tamanho variável.

**Continue:** [prática com texto](../03-pratica/atividades.md#atividade-3). [Voltar ao guia](../README.md#etapa-4).

## Referências

- [MDN — String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String): imutabilidade e representação UTF-16.
- [MDN — String.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length): unidade de tamanho.
- [MDN — Iteração de strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Symbol.iterator): pontos de código e limites de grafemas.
- [MDN — normalize](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize): equivalência canônica.
