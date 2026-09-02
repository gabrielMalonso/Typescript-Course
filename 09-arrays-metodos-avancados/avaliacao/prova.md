# Prova — Capítulo 09: Arrays — Métodos Avançados

> **PROVA PREPARADA, MAS AINDA NÃO LIBERADA.**
>
> Realize somente após concluir a aula, o mini-projeto, a leitura de código real, a lista e receber a liberação do professor.

## Informações

- **Duração sugerida:** 90–110 minutos
- **Consulta:** não permitida, exceto à documentação oficial
- **Pontuação:** 10 pontos
- **Aprovação:** mínimo 7 pontos
- **Composição:** 4 pontos de teoria e 6 pontos de prática

## Orientações

- Não altere este enunciado.
- Use apenas conteúdos estudados até o Capítulo 09.
- Não use loops explícitos nas questões práticas.
- Use valor inicial em todo `reduce`.
- Nomeie coleções no plural e itens no singular.
- Registre previsões e intermediários quando solicitado.
- Compile, execute e teste exatamente os arquivos entregues.

## Arquivos obrigatórios

| Arquivo | Conteúdo |
|---|---|
| `resposta.md` | Questões 1 a 4 |
| `questao05.ts` | Questão 5 |
| `questao06.ts` | Questão 6 |
| `questao07.ts` | Questão 7 |
| `questao08.ts` | Questão 8 |

Todos devem ficar em `09-arrays-metodos-avancados/avaliacao/`.

---

## Parte 1 — Teoria (4 pontos)

### Questão 1 — Método, callback e retorno (1 ponto)

Analise:

```typescript
const produtos: { nome: string; ativo: boolean }[] = [
  { nome: "Broca", ativo: true },
  { nome: "Serra", ativo: false },
];

const nomesAtivos = produtos
  .filter((produto) => produto.ativo)
  .map((produto) => produto.nome);
```

Responda:

1. qual coleção recebe o primeiro método;
2. o que `produto` representa em cada callback;
3. qual retorno `filter` espera da callback;
4. o tipo e o valor do intermediário entre os métodos;
5. o tipo e o valor de `nomesAtivos`.

### Questão 2 — Quantidade, ausência e interrupção (1 ponto)

Compare `forEach`, `map`, `filter`, `find` e `some`:

1. qual retorna `void`;
2. qual cria exatamente um resultado para cada entrada;
3. qual cria de zero a `N` elementos;
4. quais dois podem parar antes do fim e em que situação;
5. por que `return` dentro de `forEach` não equivale a `break`.

### Questão 3 — Referências e cópia de objetos (1 ponto)

Sem executar, informe os três booleanos e explique:

```typescript
const original = [{ codigo: "A", ativo: true }];
const copiaDoArray = [...original];
const copiaDosObjetos = original.map((item) => ({ ...item }));

console.log(original === copiaDoArray);
console.log(original[0] === copiaDoArray[0]);
console.log(original[0] === copiaDosObjetos[0]);
```

Por que `({ ...item })` precisa dos parênteses nessa arrow concisa?

### Questão 4 — Rastreamento do `reduce` (1 ponto)

```typescript
const pedidos: { quantidade: number; preco: number; ativo: boolean }[] = [
  { quantidade: 2, preco: 10, ativo: true },
  { quantidade: 1, preco: 50, ativo: false },
  { quantidade: 3, preco: 5, ativo: true },
];

const total = pedidos.reduce(
  (acumulador, pedido) =>
    pedido.ativo ? acumulador + pedido.quantidade * pedido.preco : acumulador,
  0,
);
```

Monte uma tabela com acumulador recebido, pedido atual e acumulador devolvido em cada chamada. Informe o resultado final e explique o papel do `0`.

---

## Parte 2 — Prática (6 pontos)

### Questão 5 — Aquecimento: seleção e transformação (1,25 ponto)

Use:

```typescript
const velocidades: number[] = [0, 36, 72, -1, 18];
```

1. mantenha valores `> 0`;
2. transforme os válidos em metros por segundo com `valor / 3.6`;
3. faça as duas etapas em um encadeamento;
4. registre o intermediário em comentário;
5. exiba intermediário, resultado e original.

Resultados: `[36, 72, 18]` e `[10, 20, 5]`.

### Questão 6 — Busca e verificação em objetos (1,25 ponto)

```typescript
const sensores: {
  codigo: string;
  valor: number;
  online: boolean;
}[] = [
  { codigo: "T1", valor: 42, online: true },
  { codigo: "T2", valor: -1, online: false },
  { codigo: "T3", valor: 75, online: true },
  { codigo: "T4", valor: 18, online: true },
];
```

Crie e exiba:

1. o primeiro sensor online com valor `>= 50`;
2. o índice do primeiro sensor offline;
3. se existe sensor online com valor negativo;
4. se todos os sensores online possuem valor positivo;
5. uma busca pelo código `T9`, tratada com `if/else`.

Antes de executar, registre tipo e valor previstos.

### Questão 7 — Cópia independente de objetos (1,5 ponto)

```typescript
const tarefas: { titulo: string; concluida: boolean }[] = [
  { titulo: "Teoria", concluida: true },
  { titulo: "Exercícios", concluida: false },
];
```

1. crie `copiaDoArray` com spread do array;
2. crie `copiaDosObjetos` com `map` e spread de cada objeto;
3. exiba as três comparações de referência da Questão 3;
4. altere `copiaDosObjetos[1].concluida` para `true`;
5. exiba o segundo objeto original e o copiado;
6. explique por que o original permanece `false`.

Não altere objetos de `copiaDoArray`, pois ela existe para comprovar a referência compartilhada sem modificar a entrega original.

### Questão 8 — Pipeline de ordens (2 pontos)

```typescript
const ordens: {
  codigo: string;
  quantidade: number;
  preco: number;
  aprovada: boolean;
}[] = [
  { codigo: "A1", quantidade: 2, preco: 10, aprovada: true },
  { codigo: "B2", quantidade: 0, preco: 40, aprovada: true },
  { codigo: "C3", quantidade: 3, preco: 5, aprovada: false },
  { codigo: "D4", quantidade: 1, preco: 50, aprovada: true },
];
```

Sem loops explícitos:

1. crie uma função nomeada `ordemValida` que aceite somente ordem aprovada com `quantidade > 0`;
2. use sua referência em um encadeamento que filtre as ordens e transforme cada uma em `{ codigo, total }`;
3. registre o array intermediário em comentário;
4. encontre o primeiro resumo com `total >= 50`;
5. verifique se todos os totais são positivos;
6. some os totais com `reduce` iniciado em `0`;
7. use `forEach` para exibir `1. A1: 20`;
8. exiba busca, boolean, total e array original;
9. repita os métodos de busca, verificação e soma para um array vazio de resumos.

Resultados principais:

- intermediário: ordens `A1` e `D4`;
- resumos: `[{ codigo: "A1", total: 20 }, { codigo: "D4", total: 50 }]`;
- primeira com total `>= 50`: `D4`;
- todos positivos: `true`;
- total: `70`;
- no vazio: `undefined`, `true` e `0`.

## Checklist de entrega

- [ ] Preservei `prova.md`.
- [ ] Entreguei os cinco arquivos obrigatórios.
- [ ] Não usei loops explícitos.
- [ ] Nomeei coleção no plural e item no singular.
- [ ] Tratei `undefined`, `-1` e vazio.
- [ ] Usei valor inicial nos `reduce`.
- [ ] Registrei intermediários e previsões solicitados.
- [ ] Diferenciei novo array de novos objetos.
- [ ] Passei a função nomeada por referência.
- [ ] Compilei e executei a versão entregue.
