# Aula 04 — Mini-projeto: processador de inspeções

## Contexto

Uma equipe registra inspeções de equipamentos. O mesmo conjunto de registros precisa ser analisado por critérios diferentes, sem duplicar o loop a cada regra.

Você criará uma função controladora que percorre um array de objetos e recebe dois callbacks:

- um decide se a inspeção entra no relatório;
- outro transforma a inspeção selecionada em texto.

```text
inspeções + critério + formatação
               ↓
       gerarRelatorio(...)
               ↓
          string[]
```

## Objetivos praticados

- contrato completo de função;
- callback com retorno `boolean`;
- callback com retorno `string`;
- array de objetos percorrido com `for...of`;
- parâmetro com valor padrão;
- closure simples no desafio opcional.

## Dados iniciais

Copie para um arquivo `mini-projeto.ts`:

```typescript
const inspecoes: {
  equipamento: string;
  temperatura: number;
  aprovado: boolean;
}[] = [
  { equipamento: "Compressor", temperatura: 72, aprovado: true },
  { equipamento: "Forno", temperatura: 135, aprovado: false },
  { equipamento: "Bomba", temperatura: 88, aprovado: false },
  { equipamento: "Esteira", temperatura: 41, aprovado: true },
];
```

## Requisitos

Crie esta função:

```typescript
function gerarRelatorio(
  registros: {
    equipamento: string;
    temperatura: number;
    aprovado: boolean;
  }[],
  incluir: (registro: {
    equipamento: string;
    temperatura: number;
    aprovado: boolean;
  }) => boolean,
  formatar: (registro: {
    equipamento: string;
    temperatura: number;
    aprovado: boolean;
  }) => string,
  titulo = "Relatório",
): string[] {
  // sua implementação
}
```

A função deve:

1. criar um array `linhas` começando com o `titulo`;
2. percorrer `registros` com `for...of`;
3. chamar `incluir(registro)` para cada objeto;
4. quando o retorno for `true`, chamar `formatar(registro)`;
5. adicionar o texto retornado a `linhas`;
6. retornar o array completo.

Não use `forEach`, `map`, `filter`, `find`, `some`, `every` ou `reduce`.

## Primeira chamada — inspeções reprovadas

Use callbacks inline:

```typescript
const reprovadas = gerarRelatorio(
  inspecoes,
  (registro): boolean => !registro.aprovado,
  (registro): string =>
    `${registro.equipamento} | ${registro.temperatura} °C`,
  "Inspeções reprovadas",
);
```

Percorra `reprovadas` com `for...of` e exiba cada linha.

Saída esperada:

```text
Inspeções reprovadas
Forno | 135 °C
Bomba | 88 °C
```

## Segunda chamada — temperatura alta

Reutilize `gerarRelatorio`, agora sem passar o título:

```typescript
const quentes = gerarRelatorio(
  inspecoes,
  (registro): boolean => registro.temperatura >= 80,
  (registro): string => `${registro.equipamento}: ALERTA`,
);
```

Saída esperada:

```text
Relatório
Forno: ALERTA
Bomba: ALERTA
```

## Como pensar antes de programar

Preencha este quadro:

| Função | Entradas | Retorno |
|---|---|---|
| `gerarRelatorio` | array, dois callbacks, título | `string[]` |
| `incluir` | um objeto de inspeção | `boolean` |
| `formatar` | um objeto de inspeção | `string` |

Depois marque no código:

```text
onde o callback é recebido  → parâmetros incluir e formatar
onde ele é chamado          → dentro do for...of
onde o retorno é usado      → if e push
```

## Testes obrigatórios

Confira também:

1. array vazio: deve retornar somente o título;
2. critério que nunca retorna `true`: somente o título;
3. critério que aceita todos: uma linha por inspeção;
4. `temperatura` igual a `80`: deve entrar na segunda regra.

## Desafio opcional — closure para criar critérios

Crie:

```typescript
function criarCriterioDeTemperatura(
  limite: number,
): (registro: {
  equipamento: string;
  temperatura: number;
  aprovado: boolean;
}) => boolean {
  // retorne uma função que compare registro.temperatura com limite
}
```

Depois:

```typescript
const acimaDeCem = criarCriterioDeTemperatura(100);

const criticas = gerarRelatorio(
  inspecoes,
  acimaDeCem,
  (registro): string => `${registro.equipamento}: ${registro.temperatura} °C`,
  "Acima de 100 °C",
);
```

Explique por escrito:

- qual valor a função retornada preserva;
- em que momento esse valor foi definido;
- em que momento ele é reutilizado.

## Solução comentada

Só consulte depois de tentar.

<details>
<summary>Mostrar solução principal</summary>

```typescript
function gerarRelatorio(
  registros: {
    equipamento: string;
    temperatura: number;
    aprovado: boolean;
  }[],
  incluir: (registro: {
    equipamento: string;
    temperatura: number;
    aprovado: boolean;
  }) => boolean,
  formatar: (registro: {
    equipamento: string;
    temperatura: number;
    aprovado: boolean;
  }) => string,
  titulo = "Relatório",
): string[] {
  const linhas: string[] = [titulo];

  for (const registro of registros) {
    if (incluir(registro)) {
      linhas.push(formatar(registro));
    }
  }

  return linhas;
}
```

</details>

<details>
<summary>Mostrar solução do desafio</summary>

```typescript
function criarCriterioDeTemperatura(
  limite: number,
): (registro: {
  equipamento: string;
  temperatura: number;
  aprovado: boolean;
}) => boolean {
  return (registro): boolean => registro.temperatura > limite;
}
```

</details>
