# Exercícios — Arrays + Loops

## Instruções

- Leia primeiro `aula/05-arrays-e-loops.md`.
- Resolva os quatro exercícios na ordem.
- Crie os arquivos em `exercicios/solucoes/`.
- Use apenas `for`, `for...of`, condicionais, `break`, `continue` e os fundamentos já estudados.
- Não use métodos avançados de arrays, como `forEach`, `map`, `filter`, `find` ou `reduce`; eles pertencem ao Capítulo 09.
- Antes de executar, registre em comentário a saída ou o estado final previsto.
- Faça o teste de limite indicado em cada exercício e depois restaure a versão principal.

---

## Exercício L1 — Índice e posição humana

**Arquivo:** `loops01.ts`

Use:

```typescript
const ferramentas: string[] = ["chave", "alicate", "multímetro"];
```

Com um único `for` tradicional:

1. comece no primeiro índice válido;
2. percorra todos os elementos usando `ferramentas.length`;
3. exiba o índice, a posição humana e o valor de cada elemento;
4. depois do loop, exiba a quantidade total.

**Saída esperada:**

```text
Índice 0 — item 1: chave
Índice 1 — item 2: alicate
Índice 2 — item 3: multímetro
Quantidade: 3
```

**Teste de limite:** use temporariamente `const ferramentas: string[] = [];`. Nenhuma linha de item deve aparecer e a quantidade deve ser `0`.

---

## Exercício L2 — Valores, soma e contagem

**Arquivo:** `loops02.ts`

Use:

```typescript
const temperaturas: number[] = [18, 21, 17, 24];
```

Crie `total` e `acimaDeVinte` com valor inicial `0`. Use `for...of` para:

1. somar cada temperatura ao total;
2. contar quantas temperaturas são maiores que `20`.

Depois do loop, calcule a média usando `total / temperaturas.length` e exiba os três resultados.

**Saída esperada:**

```text
Total: 80
Acima de 20: 2
Média: 20
```

**Teste de limite:** use temporariamente `[20]`. O total e a média devem ser `20`, e `acimaDeVinte` deve permanecer `0`.

---

## Exercício L3 — Ignorar e encerrar

**Arquivo:** `loops03.ts`

Use:

```typescript
const tentativas: number[] = [4, -1, 7, 0, 9];
```

Considere estas regras:

- `-1` representa uma leitura inválida e deve ser ignorado com `continue`;
- `0` representa o encerramento e deve terminar o loop com `break`;
- os demais valores devem ser exibidos, somados em `totalValido` e contados em `quantidadeValida`.

Use `for...of`. Depois do loop, exiba o total e a quantidade.

**Saída esperada:**

```text
Valor aceito: 4
Valor aceito: 7
Total válido: 11
Quantidade válida: 2
```

O `-1` não aparece e o `9` não é alcançado.

**Teste de limite:** use temporariamente `[0, 5]`. Nenhum valor deve ser aceito, e os dois resultados finais devem permanecer `0`.

---

## Exercício L4 — Percorrendo duas dimensões

**Arquivo:** `loops04.ts`

Use:

```typescript
const mapa: string[][] = [
  ["A1", "A2"],
  ["B1", "B2", "B3"],
];
```

Crie `totalDePosicoes = 0`. Use dois loops `for` aninhados para:

1. percorrer todas as linhas;
2. usar `mapa[linha].length` como limite da coluna;
3. exibir linha humana, coluna humana e valor;
4. incrementar `totalDePosicoes` para cada elemento visitado.

Depois dos loops, exiba o total.

**Saída esperada:**

```text
Linha 1, coluna 1: A1
Linha 1, coluna 2: A2
Linha 2, coluna 1: B1
Linha 2, coluna 2: B2
Linha 2, coluna 3: B3
Total de posições: 5
```

**Teste de limite:** use temporariamente:

```typescript
const mapa: string[][] = [["A1"], [], ["C1"]];
```

O loop deve atravessar a linha vazia sem erro e exibir apenas `A1` e `C1`. O total deve ser `2`.

## Checklist

- [ ] Usei `indice < array.length`, sem acessar `array[array.length]`.
- [ ] Mantive índice e posição humana como conceitos diferentes.
- [ ] Usei `for...of` quando precisei apenas dos valores.
- [ ] Inicializei acumuladores e contadores antes dos loops.
- [ ] Posicionei `continue` e `break` antes das ações que eles devem impedir.
- [ ] No array bidimensional, usei o tamanho da linha atual.
- [ ] Executei os quatro testes principais e os testes de limite.
