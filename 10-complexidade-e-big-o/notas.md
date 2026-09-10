# Notas complementares

Use somente o apoio indicado pelo [guia de estudo](README.md).

## Pseudocódigo

No CLRS, `A[1]` costuma ser o primeiro elemento; no seu array TypeScript, é `valores[0]`. Confira essa diferença antes de transportar os limites de um loop.

Na análise, os símbolos de custo por linha representam trabalho por execução, não milissegundos medidos. Comece com três perguntas: o que se repete, quantas vezes e quanto custa cada repetição?

[Voltar à etapa 3](README.md#etapa-3).

## Callbacks

Você já usou `map`, `find` e `reduce`. Para analisar uma chamada, olhe também **o que a callback faz**: transformar um número e percorrer outra coleção têm custos diferentes.

Uma passagem depois de outra soma trabalho. Uma busca dentro de cada visita repete trabalho. `find`, `some` e `every` podem terminar cedo; considere também uma entrada que os faça chegar ao fim.

Neste capítulo, usamos arrays comuns de números finitos e operações numéricas de custo constante. É um modelo de análise, não uma garantia de runtime do JavaScript.

[Voltar à etapa 6](README.md#etapa-6).

## Memória

Separe **entrada**, **saída** e **espaço auxiliar**: os dados extras usados para produzir a resposta. Algumas referências incluem a saída no espaço extra; declare sua convenção.

`const outro = valores` compartilha a referência. `[...valores]` cria novas posições para os elementos. Um acumulador guarda um número; uma cópia de `n` números guarda `n` posições.

Uma cópia devolvida é saída; uma cópia criada apenas para calcular outro resultado é auxiliar. Para o total no pico, conte o que precisa existir ao mesmo tempo. Guardar resultados pode economizar trabalho futuro, mas ocupa memória.

[Voltar à etapa 6](README.md#etapa-6).

## Cronômetro e console

Primeiro conte operações. Para medir um intervalo, subtraia duas chamadas de `performance.now()`. Execuções curtas podem dar resultados ruidosos; uma medição isolada não demonstra Big O.

Imprimir um número por iteração pode aumentar o runtime sem mudar a classe assintótica no nosso modelo. Imprimir uma coleção crescente também acrescenta trabalho: declare o que foi impresso e com qual frequência. Para medir o cálculo, deixe o `console.log` fora do intervalo.

[Voltar à etapa 7](README.md#etapa-7).

## Recursão em C

A dificuldade com a sintaxe não exige antecipar o estudo de recursão. Se quiser apenas acompanhar a chamada vista no CS50, este equivalente conceitual em TypeScript imprime **1 e depois 2**:

```typescript
function mostrar(altura: number): void {
  if (altura <= 0) return;
  mostrar(altura - 1);
  console.log(altura);
}
mostrar(2);
```

A chamada com 2 espera a chamada com 1, que espera a chamada com 0. A de 0 retorna sem imprimir; as outras retomam e imprimem seus próprios valores. O lugar da chamada antes do `console.log` determina essa ordem. Use apenas inteiros pequenos e não negativos neste exemplo.

[Voltar à etapa 1](README.md#etapa-1).
