# Prova — Capítulo 08: Funções — Callbacks e Recursos

> **PROVA PREPARADA, MAS AINDA NÃO LIBERADA.**
>
> Realize somente depois de concluir a aula, a leitura de código real, o mini-projeto, a lista de exercícios e receber a liberação do professor.

## Informações

- **Duração sugerida:** 90–110 minutos
- **Consulta:** não permitida, exceto à documentação oficial
- **Pontuação:** 10 pontos
- **Aprovação:** mínimo 7 pontos
- **Composição:** 4 pontos de teoria e 6 pontos de prática

## Orientações

- Use somente conteúdos estudados até este capítulo.
- Escreva contratos completos e tipos precisos para parâmetros e retornos.
- Para percorrer arrays, use `for`, `for...of` ou `while`.
- **Não use** `forEach`, `map`, `filter`, `find`, `some`, `every` ou `reduce`.
- Não use `type`, `interface`, classes ou recursos assíncronos.
- Não altere este enunciado.
- Compile, execute e teste exatamente os arquivos entregues.
- Respeite os textos e os casos alternativos pedidos, inclusive array vazio e valores de limite.

## Arquivos obrigatórios

| Arquivo | Conteúdo |
|---|---|
| `resposta.md` | Questões 1 a 4 |
| `questao05.ts` | Questão 5 |
| `questao06.ts` | Questão 6 |
| `questao07.ts` | Questão 7 |
| `questao08.ts` | Questão 8 |

Todos devem ficar em `08-funcoes-callbacks-e-recursos/avaliacao/`.

---

## Parte 1 — Teoria (4 pontos)

### Questão 1 — Contrato, referência e chamada (1 ponto)

Analise:

```typescript
function calcularFrete(peso: number, distancia: number): number {
  return peso * 0.5 + distancia * 0.2;
}

const operacao = calcularFrete;
const preco = calcularFrete(10, 30);
```

Responda:

1. qual é o contrato completo de `calcularFrete`;
2. o que `operacao` guarda e qual é seu tipo;
3. o que `preco` guarda, seu valor e seu tipo;
4. por que `calcularFrete` e `calcularFrete(10, 30)` não podem ser usados indistintamente como argumentos.

### Questão 2 — Opcional, valor padrão e rest parameter (1 ponto)

Considere os contratos:

```typescript
function descreverSensor(nome: string, setor?: string): string
function criarAviso(texto: string, nivel = "normal"): string
function somarLeituras(inicial: number, ...outras: number[]): number
```

Explique:

1. qual parâmetro pode continuar sendo `undefined` dentro da função;
2. o tipo de `nivel` dentro de `criarAviso` quando o argumento é omitido;
3. o conteúdo de `outras` na chamada `somarLeituras(4, 6, 8)`;
4. por que `somarLeituras(4, [6, 8])` não respeita esse contrato;
5. duas regras de posição ou quantidade aplicáveis a parâmetros opcionais e rest parameters.

### Questão 3 — Dois contratos de callback (1,25 ponto)

Analise:

```typescript
function verificarERegistrar(
  valor: number,
  aceitar: (entrada: number) => boolean,
  registrar: (entrada: number, aceita: boolean) => void,
): boolean {
  const resultado = aceitar(valor);
  registrar(valor, resultado);
  return resultado;
}

function positivo(numero: number): boolean {
  return numero > 0;
}

const aprovado = verificarERegistrar(-3, positivo, (numero, aceita): void => {
  console.log(`${numero}: ${aceita}`);
});
```

Responda:

1. o contrato completo de cada callback;
2. onde cada callback é chamado e quais argumentos recebe;
3. qual retorno é reutilizado pela função controladora e qual callback é usado pelo efeito;
4. por que a chamada passa `positivo`, e não `positivo(-3)`;
5. a saída exibida e o valor final de `aprovado`.

### Questão 4 — Closure e reconhecimento de IIFE (0,75 ponto)

Compare:

```typescript
function criarConversor(fator: number): (valor: number) => number {
  return (valor): number => valor * fator;
}

const converter = criarConversor(2.5);

const identificador = (() => {
  const prefixo = "CAP08";
  return `${prefixo}-PROVA`;
})();
```

Explique:

1. qual valor a função guardada em `converter` preserva e quando ele volta a ser usado;
2. os tipos de `criarConversor`, `converter` e `converter(4)`;
3. quais parênteses executam imediatamente a IIFE;
4. se `identificador` guarda uma função ou o retorno da chamada, e qual é seu valor.

---

## Parte 2 — Prática (6 pontos)

### Questão 5 — Parâmetros configuráveis (1,25 ponto)

Crie `questao05.ts` com:

```typescript
function montarRegistro(
  evento: string,
  responsavel?: string,
  categoria = "geral",
  ...codigos: number[]
): string
```

Regras:

- quando `responsavel` estiver ausente, use o texto `sem responsável`;
- some todos os elementos de `codigos` manualmente;
- retorne `CATEGORIA | evento | responsável | soma N`;
- não altere o array reunido pelo rest parameter.

Faça e exiba estas chamadas:

```typescript
montarRegistro("reinício", undefined, undefined, 4, 6)
montarRegistro("inspeção", "Lia", "segurança", 3, -3, 5)
montarRegistro("encerramento", "Caio")
```

Saída esperada:

```text
geral | reinício | sem responsável | soma 10
segurança | inspeção | Lia | soma 5
geral | encerramento | Caio | soma 0
```

Em um comentário, explique por que foi necessário passar `undefined` explicitamente na primeira chamada para alcançar o valor padrão de `categoria` e ainda fornecer os códigos.

### Questão 6 — Percurso controlado e callback `void` (1,25 ponto)

Crie `questao06.ts` com:

```typescript
function percorrerAlertas(
  alertas: string[],
  visitar: (alerta: string, indice: number) => void,
): void
```

A função deve percorrer o array manualmente e chamar `visitar` uma vez por elemento, fornecendo o texto e o índice correto.

Use o array `['temperatura', 'pressão', 'energia']` e uma função anônima inline para exibir:

```text
1. temperatura
2. pressão
3. energia
```

O índice entregue ao callback deve continuar começando em `0`; faça o ajuste para exibição dentro do callback.

Teste também um array vazio. Use um contador externo e exiba `Chamadas no vazio: 0` para comprovar que o callback não foi executado nesse caso.

### Questão 7 — Pedidos analisados por callbacks (1,75 ponto)

Crie `questao07.ts` com os dados:

```typescript
const pedidos: {
  codigo: string;
  quantidade: number;
  preco: number;
  entregue: boolean;
}[] = [
  { codigo: "A1", quantidade: 2, preco: 12, entregue: true },
  { codigo: "B2", quantidade: 0, preco: 30, entregue: false },
  { codigo: "C3", quantidade: 3, preco: 10, entregue: false },
  { codigo: "D4", quantidade: 1, preco: 60, entregue: true },
];
```

Implemente:

```typescript
function calcularPorCriterio(
  itens: {
    codigo: string;
    quantidade: number;
    preco: number;
    entregue: boolean;
  }[],
  incluir: (pedido: {
    codigo: string;
    quantidade: number;
    preco: number;
    entregue: boolean;
  }) => boolean,
  calcular: (pedido: {
    codigo: string;
    quantidade: number;
    preco: number;
    entregue: boolean;
  }) => number,
): number
```

A função deve fazer um único percurso manual. Para cada pedido aprovado por `incluir`, some o retorno de `calcular`. Não altere o array nem seus objetos.

Use a mesma função para obter e exibir:

1. o valor total dos pedidos entregues: `84`;
2. a quantidade total de unidades dos pedidos não entregues com `quantidade > 0`: `3`;
3. o resultado de um critério que rejeita todos: `0`;
4. o resultado para um array vazio: `0`.

No item 1, `calcular` deve retornar `quantidade * preco`. No item 2, deve retornar somente `quantidade`. Use ao menos um callback nomeado e ao menos uma arrow inline.

Depois exiba `pedidos.length` e `pedidos[0].quantidade` para comprovar que os dados originais continuam iguais a `4` e `2`.

### Questão 8 — Closure aplicada a uma seleção manual (1,75 ponto)

Crie `questao08.ts` com:

```typescript
const candidatos: {
  nome: string;
  pontuacao: number;
  ativo: boolean;
}[] = [
  { nome: "Ana", pontuacao: 70, ativo: true },
  { nome: "Bruno", pontuacao: 85, ativo: false },
  { nome: "Clara", pontuacao: 85, ativo: true },
  { nome: "Davi", pontuacao: 40, ativo: true },
];
```

Implemente uma closure com este contrato:

```typescript
function criarCriterioDeAprovacao(
  minima: number,
): (candidato: { nome: string; pontuacao: number; ativo: boolean }) => boolean
```

A função retornada deve aprovar somente candidatos ativos cuja pontuação seja maior ou igual ao valor preservado em `minima`.

Implemente também:

```typescript
function selecionarNomes(
  itens: { nome: string; pontuacao: number; ativo: boolean }[],
  criterio: (candidato: {
    nome: string;
    pontuacao: number;
    ativo: boolean;
  }) => boolean,
): string[]
```

`selecionarNomes` deve percorrer o array manualmente, chamar o callback para cada objeto aprovado ou rejeitado e criar um novo `string[]` apenas com os nomes aprovados.

Crie e teste:

- `minimo70`, gerado por `criarCriterioDeAprovacao(70)`: deve produzir `['Ana', 'Clara']`;
- `minimo85`, gerado por `criarCriterioDeAprovacao(85)`: deve produzir `['Clara']`;
- `minimo100`, gerado por `criarCriterioDeAprovacao(100)`: deve produzir `[]`;
- `minimo70` com um array vazio: deve produzir `[]`.

Exiba os nomes de cada resultado usando somente loops. Quando não houver nomes, exiba `nenhum aprovado`.

Em comentários, explique:

1. qual valor cada critério preserva;
2. quando esse valor foi definido e quando foi reutilizado;
3. por que `selecionarNomes(candidatos, minimo70)` passa uma referência válida;
4. por que `selecionarNomes(candidatos, minimo70(candidatos[0]))` entregaria um `boolean` em vez do callback esperado.

## Checklist final

- [ ] Entreguei os cinco arquivos obrigatórios.
- [ ] Não alterei `prova.md`.
- [ ] A soma das questões teóricas é 4 pontos e a das práticas é 6 pontos.
- [ ] Escrevi contratos completos para funções e callbacks.
- [ ] Diferenciei referência de função e resultado de chamada.
- [ ] Testei parâmetros opcionais, valor padrão e rest parameter.
- [ ] Usei callbacks `void` e callbacks com retorno.
- [ ] Percorri arrays de objetos manualmente e preservei os dados originais.
- [ ] Expliquei o valor preservado pela closure.
- [ ] Não usei métodos avançados de array.
- [ ] Compilei e executei os quatro arquivos TypeScript.
