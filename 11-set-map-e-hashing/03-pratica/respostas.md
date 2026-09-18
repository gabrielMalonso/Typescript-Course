# RESPOSTAS DAS ATIVIDADES - CAPÍTULO 11

## Atividade 01:

```typescript
let keys = [5, 28, 19, 15, 20, 33, 12, 17, 10];

function defineSlots (keys: number[]): number [] {
    const slots: number [] = [];

    for (let i = 0 ; i < keys.length ; i++) {
        slots.push(keys[i] % 9);
    }
    console.log(slots);
    return slots;
}

defineSlots(keys);
```

```console
[LOG]: [5, 1, 1, 6, 2, 6, 3, 8, 1]
```

Desenho da hashtable após as inserções:

```
bucket 0:
bucket 1: 10 → 19 → 28
bucket 2: 20
bucket 3: 12
bucket 4:
bucket 5: 5
bucket 6: 33 → 15
bucket 7:
bucket 8: 17
```

Note que `bucket 1: 10 → 19 → 28`. Isso é devido ao algorítmo utilizado no livro, onde as inserções ocorrem sempre no início do bucket. 

## Atividade 02:

```typescript
const primeiro = { codigo: 4 };
const segundo = { codigo: 4 };
const itens = new Set([primeiro, segundo, primeiro]);
console.log(itens.size); // 2
console.log(itens.has({ codigo: 4 })); // false

const numeros = new Set([NaN, NaN, 0, -0]); 
console.log(numeros.size); // 2

```
```typescript
const permissoes = new Set<string>();
permissoes.add("ler");
permissoes.add("editar");
permissoes.add("ler");

console.log(permissoes.size);          // 2
console.log(permissoes.has("editar")); // true
console.log(permissoes.has("publicar")); // false

console.log(permissoes.delete("editar")); // true

for (const permissao of permissoes) {
    console.log(permissao);
}

console.log(permissoes.size);          // 1
permissoes.clear();
console.log(permissoes.size);          // 0

```

## Atividade 03: LeetCode 217. Contains Duplicate
```typescript
function containsDuplicate(nums: number[]): boolean {
    const vistos = new Set<number>();
    for (let i = 0 ; i < nums.length ; i++) {
        if(vistos.has(nums[i])) {
            return true;
        }
        vistos.add(nums[i]);
    }
    return false;
};
```
Tempo: Versão 1: O(n²) | Versão 2: O(n).
Memória: Versão 1: O(1) | Versão 2: O(n). ( Melhorar o tempo e a velocidade do exercício veio com o custo de memória).

## Atividade 04: 
A função `Boolean()` converte qualquer valor para true ou false. Caso o valor da função seja falsy, ele retornará falso. Exemplo:
```typescript
Boolean(10) // true
Boolean(5)  // true
Boolean(1)  // true

Boolean(0)  // false
```
Supondo:
```typescript
const estoque = new Map<string, number>();

estoque.set("camisa", 0);

estoque.get("camisa")
// 0

Boolean(0)
// false ❌
```

O correto é, ao invés de utilizar o `get`, utilizar o `has`.

Nesse caso, a implementação mais correta seria:
```typescript
function temRegistro(estoque: Map<string, number>, codigo: string): boolean {
  return estoque.has(codigo);
}

// um teste que falhe antes e passe depois, além de um caso com chave ausente:
estoque.set("camisa", 0);

// Chave existente com valor 0
console.log(temRegistro(estoque, "camisa")); // true

// Chave ausente
console.log(temRegistro(estoque, "calca")); // false
```
**Causa: get() retorna o valor associado à chave, e Boolean(0) é false; por isso ele não permite distinguir uma chave ausente de uma chave existente cujo valor seja 0. has() verifica diretamente a existência da chave.**

## Atividade 05: LeetCode 1. Two Sum
```typescript
function twoSum(nums: number[], target: number): number[] {
    const valores = new Map<number, number>();
    for (let i = 0 ; i < nums.length ; i++) {
        if (valores.has(target - nums[i])) {
            const valorEncontrado = valores.get(target - nums[i]);
            return [i, valorEncontrado!];
        }
        valores.set (nums[i], i);
    }   
    throw new Error("Nenhuma solução encontrada");
};
```
- Ao usar map em vez do segundo for, o map verifica direto os valores, buscando pelo valor encontrado sem precisar percorrer todos os elementos de novo. No pior dos casos, percorre-se todos os elementos do array apenas uma vez, no `for`. Assim, O(n²) → O(n).
- Quanto ao espaço: Tinha-se uma solução onde o espaço era constante, ou seja, all of one, e passou-se a utilizar o map, que no pior dos casos armazena todos os n elementos do array, sendo assim, O(1) → O(n).

## Atividade 06: LeetCode 242 - Valid Anagram
```typescript
function isAnagram(s: string, t: string): boolean {
    // Pensando em trabalhar todas as letras e suas quantidades, utilizarei o MAP para identificar cada letra e a quantidade de cada letra em cada uma das streams, e depois comparar.

    if (s.length !== t.length) {
        return false;
    }

    const frequencias = new Map<string, number>();

    for (let i = 0 ;  i < s.length ; i++) {
        let saldoAtual = frequencias.get(s[i]) ?? 0;
        frequencias.set(s[i], saldoAtual + 1);
        
        saldoAtual = frequencias.get(t[i]) ?? 0;
        frequencias.set(t[i], saldoAtual - 1);
    }
    for (const saldo of frequencias.values()) {
        if(saldo !== 0) return false;
    };



return true;
}
```
Tempo assintótico	O(n) esperado
Espaço assintótico	O(n)

## Atividade 07: 