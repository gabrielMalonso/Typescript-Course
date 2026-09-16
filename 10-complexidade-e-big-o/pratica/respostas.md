# Respostas das atividades

## Atividade 1:

```typescript
const limiteInferior = 2;
const limiteSuperior = 1000;

console.log(`Limite Inferior: ${limiteInferior}`);

let n = limiteInferior;

while (n < limiteSuperior) {
    const insertionSort = 8 * n * n;
    const mergeSort = 64 * n * Math.log2(n);

    if (insertionSort >= mergeSort) {
        console.log(`Valor limite de n encontrado: ${n - 1}`);
        break;
    }

    n++;
}
```

```log
[LOG]: "Limite Inferior: 2"
[LOG]: "Valor limite de n encontrado: 43"
```

## Atividade 2:
n³/1000-100n²-100n +3
termo dominante: n³/1000
ignora o fator constante 1/1000
↓
n³ → portanto, Theta(n³)

## Atividade 3: 
Linear search:
```typescript
function linearSearch(nums: number[], alvo: number): boolean {
    for (let i = 0; i < nums.length ; i++) {
        if (nums[i] === alvo) {
            return true;
        }
    }
    return false;
}
```
- Parte A:
    Pior caso: O alvo está na última posição. Precisamos verificar todos os `n` elementos → Theta(n)

    Caso médio: Considerando que o alvo tem a mesma probabilidade de estar em qualquer posição, verificamos em média aproximadamente metade do array: ≈ n/2 ≈ n → Theta(n).

    Conclusão: Apesar do caso médio fazer só metade das verificações do pior caso, ambos crescem linearmente com o tamanho da entrada.

- Parte B:
    ```typescript
    function devolverObjeto (nums: number[], target: number): {indice: number; qtdComparacoes: number} {
        let indicePrimeiraOcorrencia: number = -1;
        let cont = 0;

        for (let i = 0 ; i < nums.length ; i++) {
            if (nums[i] === target) {
                cont++;
                indicePrimeiraOcorrencia = i;
                break;
            } else {
                cont++;
            }
        }
        
        return {indice: indicePrimeiraOcorrencia, qtdComparacoes: cont};
    }

    const nums: number[] = [10, 20, 30, 40, 50];
    const targetComeco = 10;
    const targetFim = 50;
    const targetAusente = 80;

    console.log(devolverObjeto(nums, targetComeco));
    console.log(devolverObjeto(nums, targetFim));
    console.log(devolverObjeto(nums, targetAusente));

    const nums2: number[] = [
    42, 17, 8, 99, 23, 56, 12, 78, 34, 61,
    5, 88, 31, 47, 15, 72, 26, 93, 10, 54
    ];

    const targetComeco2 = 99;
    const targetFim2 = 10;
    const targetAusente2 = 120;

    console.log(devolverObjeto(nums2, targetComeco2));
    console.log(devolverObjeto(nums2, targetFim2));
    console.log(devolverObjeto(nums2, targetAusente2));
    ```
    ```log
    [LOG]: {
    "indice": 0,
    "qtdComparacoes": 1
    } 
    [LOG]: {
    "indice": 4,
    "qtdComparacoes": 5
    } 
    [LOG]: {
    "indice": -1,
    "qtdComparacoes": 5
    } 
    [LOG]: {
    "indice": 3,
    "qtdComparacoes": 4
    } 
    [LOG]: {
    "indice": 18,
    "qtdComparacoes": 19
    } 
    [LOG]: {
    "indice": -1,
    "qtdComparacoes": 20
    } 
    ```
    3. Qual entrada representa o melhor caso da sua busca? O que a função precisa fazer nesse caso?
    R. A segunda entrada. Como a segunda entrada está completamente desorganizada, o linear search representa melhor essa busca. 

    4. Se o valor estiver ausente, nada muda na minha busca. O que acontece é que o algoritmo vai procurar em todos os elementos e, ao constatar que nenhum deles bate com o target, ele termina com menos 1. Comparado aos casos anteriores, tem a melhor e a pior hipótese, mas ambas crescem de acordo com N, ou seja, O(n).

## Atividade 4:
ContarA: Temos, nesse caso, dois `for` NÃO ANINHADOS. Sendo assim, percorre-se `n` duas vezes: 2n. Assintoticamente, tem-se `Theta(n)`.

ContarB: tem-se dois `for`, dessa vez, aninhados. No entanto, o segundo `for` vai apenas até 4, hardcoded. Sendo assim, para valores acima de 4, principalmente valores muito maiores que 4, tem-se `Theta(n)` ainda. Apenas o primeiro `for` percorre `n` por completo.

ContarC: Tem-se dois `for` aninhados e percorrendo, inicialmente, todo o array `n`. Mesmo que o número de passos seja reduzido, ainda é possível, assintoticamente, considerar Big O(n²).

1. 
```csv  
 ,n=8,n=16,
n,8,16
n²,64,256
```
2. [LOG]: "Relação das divisões entre os resultados de 8 e 16:" 
[LOG]: "ContarA: 2" 
[LOG]: "ContarB: 2" 
[LOG]: "ContarC: 4.285714285714286" 

Percebe-se que a relação é quadrática em contarC e é linear em contarA e contarB. Isso corrobora com a resposta anterior.

3.  contarA = Theta(n) | contarB = Theta(n) | contarC = Theta(n²)
4.  Explicado acima
5.  Não. É necessário entender o que cada loop está fazendo. 

Parte B
Fazer uma quantidade fixa de trabalho, independentemente de n. → Theta(1)
Visitar cada um dos n itens uma vez. → Theta (n)
Reduzir n pela metade repetidamente, até chegar a 1. → Theta(log n)
Para cada um dos n itens, realizar uma sequência de reduções de n pela metade até 1. → Theta(n log n)
Visitar todos os pares de itens distintos, sem repetir o mesmo par em ordem inversa. → Theta(n²)
Contar todas as configurações possíveis de n escolhas binárias: cada nova escolha duplica a quantidade de configurações. (2^n)

## Atividade 5:
1.  n → valores.length. A cada chamada do callback do map, ele percorre todo o array fazendo a soma.
2.  Nesse caso, ele percorre todo o array n, n vezes, ou seja, n * n, que é n². Portanto, Theta(n²).
3.  
    ```typescript
    function repetirTotal(valores: number[]): number[] {
        const total = valores.reduce((total, valor) => total + valor, 0);
        return valores.map(() => total);
    }
    ```
4.  
```typescript
function repetirTotal(valores: number[]): number[] {
    const total = valores.reduce((total, valor) => total + valor, 0);
    return valores.map(() => total);
}

// Array vazio
const numsVazio: number[] = [];

// Um único elemento
const numsUmElemento: number[] = [42];

// Números negativos
const numsNegativos: number[] = [
  -42, -17, -8, -99, -23, -56, -12, -78, -34, -61
];

console.log(repetirTotal(numsVazio)); // [LOG]: [] 
console.log(repetirTotal(numsUmElemento)); // [LOG]: [42] 
console.log(repetirTotal(numsNegativos)); // [LOG]: [-430, -430, -430, -430, -430, -430, -430, -430, -430, -430] 
```
5.  Theta (n). A mudança feita é que a soma de todos os n itens do array é feita apenas uma vez, ao invés de ser refeita para cada elemento.
6.  
    **Versão original:**
    entrada: n
    saída: n
    auxiliar: n²

    **Versão modifiada:**
    entrada: n
    saída: n
    auxiliar: 1
7.  Original: n² | Modificada: n

Parte B:
1.  O primeiro pedido tem o mesmo custo. Já os demais pedidos são muito mais eficientes na versão onde guardamos o array de resposta. O custo disso é um gasto maior com memória.
2.  Cada pedido receberá a mesma referência. Como dito acima, o custo será maior com memória. (Theta(n))
3.  É necessário recalcular a referência.
4.  Não há vantagem de guardar a resposta, nesse caso.

## Atividade 6: LeetCode 1 - TwoSum
```typescript
function twoSum(nums: number[], target: number): number[] {
    for (let i = 0 ; i < nums.length ; i++) {
        for (let j = i + 1 ; j < nums.length ; j++) {
            if(nums[i] + nums[j] === target) {
                return [i,j];
            }
        }
    }  
};
```
1.  n seria o nums.length
2.  n * [(n-1) + (n-2) ... ] ≈ O(n²)
3.  nums = [2,7,11,15], target = 26 - Para se chegar ao target, exige-se que o algoritmo rode até os dois últimos itens do array.
4.  Com relação a espaço auxiliar, a estrutura não cresce, permanece Theta(1).
5.  Input: nums = [3,3], target = 6 | Output: [0,1]
6.  A solução atende aos limites do problema, mas falha quando saímos desses limites. Presume que todo input tem solução. Se, por acaso, houver um input sem solução, meu código falharia. O contrato da função exige retornar um array de numbers, então, se não houver solução, nada é retornado. Outro problema também é que minha solução é de força bruta, portanto O(n²). O ideal é encontrar uma solução O(n) futuramente.

## Atividade 7: LeetCode 217 - Contains Duplicate
```typescript
function containsDuplicate(nums: number[]): boolean {
    for (let i = 0; i < nums.length; i++) {
        const referencia = nums[i];

        for (let j = i + 1; j < nums.length; j++) {
            if (referencia === nums[j]) {
                return true;
            }
        }
    }

    return false;
}
```
1.  n = nums.length. Estamos comparando a referência com algum dos valores do array ≈n² vezes.
2.  Entradas permitidas onde os números duplicados são especificamente o último e o penúltimo. 
3.  O(n²). 
4.  Teoricamente, aproximadamente 100x o trabalho anterior. 
5.  Como o número de operações cresce ao quadrado em relação ao número de elementos de entrada, isso explica o motivo pelo qual entradas maiores recebem TLE e entradas menores passam numa boa.

## Atividade 8: LeetCode 121 - Best Time to Buy and Sell Stock
```typescript
function maxProfit(prices: number[]): number {
    let menor = prices[0];
    let lucro = 0;

    for (let i = 0 ; i < prices.length ; i++) {
        if (menor > prices[i]) {
            menor = prices[i];
        }
        if (lucro < (prices[i] - menor)) {
            lucro = (prices[i] - menor);
        }
    }
    return lucro;
};
```
