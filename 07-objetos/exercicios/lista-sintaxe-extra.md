# Treino extra — Funções, arrays e objetos

Este treino existe para praticar a decisão que vem antes do código: entender o problema e escolher como os dados devem entrar, ser processados e sair das funções.

## Regras gerais

- Use apenas o conteúdo estudado até o Capítulo 07.
- Não use `map`, `filter`, `reduce`, `type`, `interface`, classes nem callbacks.
- Cada programa deve possuir pelo menos uma função.
- Toda função que processar uma coleção deve receber o array correspondente por parâmetro, sem buscar diretamente a variável declarada fora dela.
- Tipos dos parâmetros e dos retornos devem estar explícitos.
- A divisão das responsabilidades entre as funções é uma decisão sua.
- Antes de executar, registre em comentário a saída prevista.

Crie as soluções em `exercicios/solucoes/`, nos arquivos indicados em cada exercício.

Quando você enviar uma solução, a primeira correção apontará apenas **correto / problema aqui / pense novamente nesta parte**. O código não será reescrito por você antes da sua tentativa de correção.

---

## Extra 1 — Controle de estoque

**Arquivo:** `extra01.ts`

```ts
const produtos = [
  { nome: "Furadeira", preco: 350, estoque: 4 },
  { nome: "Broca", preco: 25, estoque: 0 },
  { nome: "Martelo", preco: 70, estoque: 8 },
  { nome: "Serra", preco: 180, estoque: 0 },
];
```

Crie um programa que:

- informe quantos produtos estão disponíveis;
- calcule o valor total do estoque disponível, considerando `preço × quantidade`;
- mostre o nome de cada produto sem estoque.

Resultado esperado:

```text
Produtos disponíveis: 2
Valor total em estoque: R$ 1960
Sem estoque: Broca
Sem estoque: Serra
```

---

## Extra 2 — Sistema de alunos

**Arquivo:** `extra02.ts`

```ts
const alunos = [
  { nome: "Ana", nota: 8.5, faltas: 2 },
  { nome: "Bruno", nota: 5, faltas: 3 },
  { nome: "Carla", nota: 7, faltas: 8 },
  { nome: "Diego", nota: 9, faltas: 1 },
];
```

Um aluno é aprovado quando sua nota é maior ou igual a `7` e suas faltas são menores ou iguais a `5`.

O programa deve:

- informar as quantidades de aprovados e reprovados;
- calcular a média das notas da turma;
- mostrar o nome, a nota e a situação de cada aluno.

Formato do resumo individual:

```text
Ana | nota 8.5 | Aprovado
Bruno | nota 5 | Reprovado
```

---

## Extra 3 — Pedidos de uma loja

**Arquivo:** `extra03.ts`

```ts
const pedidos = [
  {
    numero: 101,
    cliente: "Marcos",
    valor: 250,
    pago: true,
    entrega: {
      cidade: "Recife",
      urgente: false,
    },
  },
  {
    numero: 102,
    cliente: "Julia",
    valor: 480,
    pago: false,
    entrega: {
      cidade: "Olinda",
      urgente: true,
    },
    observacao: "Ligar antes da entrega",
  },
  {
    numero: 103,
    cliente: "Paulo",
    valor: 150,
    pago: true,
    entrega: {
      cidade: "Recife",
      urgente: true,
    },
    observacao: "Deixar na portaria",
  },
];
```

Crie um relatório que mostre:

- o valor total já pago;
- a quantidade de pedidos ainda não pagos;
- a quantidade de entregas urgentes;
- um resumo de cada pedido pago.

Quando a observação não existir, o resumo deve mostrar `sem observação`.

Formato do resumo:

```text
Pedido 101 | Marcos | Recife | R$ 250 | sem observação
Pedido 103 | Paulo | Recife | R$ 150 | Deixar na portaria
```

---

## Extra 4 — Reajuste salarial

**Arquivo:** `extra04.ts`

```ts
const funcionarios = [
  { nome: "Amanda", salario: 3000, setor: "TI", ativo: true },
  { nome: "Lucas", salario: 2200, setor: "Vendas", ativo: true },
  { nome: "Renata", salario: 4500, setor: "TI", ativo: false },
  { nome: "João", salario: 2800, setor: "Financeiro", ativo: true },
];
```

A empresa dará `8%` de aumento apenas aos funcionários ativos.

Produza um novo array contendo somente os funcionários ativos com seus salários reajustados. O array `funcionarios` e todos os seus objetos devem permanecer inalterados.

Depois, mostre:

```text
SALÁRIOS REAJUSTADOS
Amanda: 3240
Lucas: 2376
João: 3024

SALÁRIOS ORIGINAIS
Amanda: 3000
Lucas: 2200
Renata: 4500
João: 2800
```

---

## Extra 5 — Sistema de veículos

**Arquivo:** `extra05.ts`

```ts
const veiculos = [
  {
    modelo: "Corolla",
    ano: 2022,
    km: 42000,
    disponivel: true,
    proprietario: {
      nome: "Carlos",
      cidade: "Recife",
    },
  },
  {
    modelo: "Civic",
    ano: 2019,
    km: 87000,
    disponivel: false,
    proprietario: {
      nome: "Marina",
      cidade: "Olinda",
    },
    observacao: "Em manutenção",
  },
  {
    modelo: "Onix",
    ano: 2023,
    km: 18000,
    disponivel: true,
    proprietario: {
      nome: "Pedro",
      cidade: "Recife",
    },
  },
  {
    modelo: "HB20",
    ano: 2020,
    km: 61000,
    disponivel: true,
    proprietario: {
      nome: "Fernanda",
      cidade: "Jaboatão",
    },
  },
];
```

Construa um programa que:

- informe quantos veículos estão disponíveis;
- calcule a quilometragem média dos veículos disponíveis;
- informe quantos veículos disponíveis possuem menos de `50.000 km`;
- mostre um resumo apenas dos veículos disponíveis com menos de `50.000 km`.

Quando a observação não existir, o resumo deve mostrar `sem observação`.

Formato do resumo:

```text
Corolla (2022) | 42000 km | Carlos - Recife | sem observação
Onix (2023) | 18000 km | Pedro - Recife | sem observação
```

---

## Checklist de entrega

- [ ] Criei `extra01.ts` até `extra05.ts`.
- [ ] Registrei a previsão de saída antes de executar cada programa.
- [ ] Passei os arrays para as funções por parâmetro.
- [ ] Explicitei os tipos dos parâmetros e retornos.
- [ ] Mantive os dados originais do Extra 4 inalterados.
- [ ] Usei somente o conteúdo estudado até o Capítulo 07.
