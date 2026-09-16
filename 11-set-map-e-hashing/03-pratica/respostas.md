# RESPOSTAS DAS ATIVIDADES - CAPÍTULO 11

## Questão 01:

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