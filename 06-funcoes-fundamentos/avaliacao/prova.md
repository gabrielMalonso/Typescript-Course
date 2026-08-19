# Prova — Capítulo 06: Funções — Fundamentos

> **PROVA PREPARADA, MAS AINDA NÃO LIBERADA.**
>
> Realize somente depois de concluir a aula, o mini-projeto, a lista e receber a liberação do professor.

## Informações

- **Duração sugerida:** 75–90 minutos
- **Consulta:** não permitida, exceto à documentação oficial
- **Pontuação:** 10 pontos
- **Aprovação:** mínimo 7 pontos
- **Composição:** 4 pontos de teoria e 6 pontos de prática

## Orientações

- Use somente conteúdos estudados até este capítulo.
- Declare tipos precisos para parâmetros e retornos.
- Não use parâmetros opcionais, defaults, rest parameters, callbacks ou métodos avançados de arrays.
- Não altere este enunciado.
- Compile, execute e teste exatamente os arquivos entregues.

## Arquivos obrigatórios

| Arquivo | Conteúdo |
|---|---|
| `resposta.md` | Questões 1 a 4 |
| `questao05.ts` | Questão 5 |
| `questao06.ts` | Questão 6 |
| `questao07.ts` | Questão 7 |
| `questao08.ts` | Questão 8 |

Todos devem ficar em `06-funcoes-fundamentos/avaliacao/`.

---

## Parte 1 — Teoria (4 pontos)

### Questão 1 — Definição, chamada, parâmetros e argumentos (1 ponto)

Analise:

```typescript
function calcularDistancia(velocidade: number, tempo: number): number {
  return velocidade * tempo;
}

const distancia = calcularDistancia(80, 2);
```

Explique:

1. qual trecho define a função e qual trecho a executa;
2. quais são os parâmetros;
3. quais são os argumentos;
4. qual é o valor e o tipo de `distancia`.

### Questão 2 — Retorno e `void` (1 ponto)

Compare:

```typescript
function criarMensagem(codigo: number): string {
  return `Código: ${codigo}`;
}

function exibirMensagem(codigo: number): void {
  console.log(`Código: ${codigo}`);
}
```

Explique a diferença entre retornar e exibir, diga qual resultado pode ser guardado como `string` e informe quando `void` é apropriado.

### Questão 3 — Função ou resultado? (1 ponto)

Considere:

```typescript
function dobro(valor: number): number {
  return valor * 2;
}

const itemA = dobro;
const itemB = dobro(7);
```

Informe o que cada variável guarda, seu tipo conceitual e o resultado de `itemA(4)`. Explique o papel dos parênteses.

### Questão 4 — Caminhos de retorno (1 ponto)

O que há de errado e como corrigir sem alterar o tipo de retorno?

```typescript
function classificarNivel(nivel: number): string {
  if (nivel >= 5) {
    return "alto";
  }
}
```

Explique por que o problema só aparece em determinado caminho.

---

## Parte 2 — Prática (6 pontos)

### Questão 5 — Conversor de duração (1 ponto)

Crie `questao05.ts`.

1. Declare `converterHorasParaMinutos(horas: number): number` como declaração de função.
2. Declare `criarEtiqueta(minutos: number): string` como arrow function concisa.
3. Converta `2.5` horas.
4. Passe o resultado para `criarEtiqueta`.
5. Exiba `Duração: 150 minutos`.
6. Teste também `0` horas e exiba `Duração: 0 minutos`.

### Questão 6 — Classificação e exibição (1,5 ponto)

Crie `questao06.ts` com:

```typescript
function classificarCarga(percentual: number): string
function exibirCarga(percentual: number, classificacao: string): void
```

Regras:

- abaixo de `40`: `"leve"`;
- de `40` a `75`, inclusive: `"moderada"`;
- acima de `75`: `"alta"`.

`exibirCarga` deve produzir `Carga 75%: moderada`.

Teste `25`, `40`, `75` e `90`. A classificação deve ser calculada pela primeira função e entregue à segunda como argumento.

### Questão 7 — Função armazenada (1,5 ponto)

Crie `questao07.ts`.

```typescript
function calcularMetade(valor: number): number {
  return valor / 2;
}
```

1. Declare `operacao` com tipo explícito `(entrada: number) => number`.
2. Guarde `calcularMetade` sem executá-la.
3. Calcule e exiba os resultados para `20` e `7`.
4. Exiba se `operacao === calcularMetade`.
5. Em comentário, explique a diferença entre `calcularMetade` e `calcularMetade(20)`.

Saída conceitual:

```text
10
3.5
true
```

### Questão 8 — Resumo de medições (2 pontos)

Crie `questao08.ts` com:

```typescript
const medicoes: number[] = [14, 0, 22, 18, 0, 26];
```

Crie quatro funções:

```typescript
function somarMedicoesValidas(valores: number[]): number
function contarMedicoesValidas(valores: number[]): number
const calcularMedia = (total: number, quantidade: number): number => ...
const criarResumo = function (total: number, quantidade: number, media: number): string { ... }
```

Regras:

- somente valores maiores que `0` são válidos;
- as duas primeiras funções usam loops e não alteram o array;
- `calcularMedia` retorna `0` quando a quantidade é `0`;
- `criarResumo` retorna, sem exibir, a string final;
- o programa principal chama as quatro funções e exibe o resumo.

Saída esperada:

```text
Total: 80 | Quantidade: 4 | Média: 20
```

Depois, teste com um array vazio e exiba:

```text
Total: 0 | Quantidade: 0 | Média: 0
```

## Checklist final

- [ ] Entreguei os cinco arquivos obrigatórios.
- [ ] Não alterei `prova.md`.
- [ ] Todos os parâmetros e retornos estão tipados.
- [ ] Diferenciei funções que calculam de funções que exibem.
- [ ] Não confundi guardar uma função com executar uma chamada.
- [ ] Compilei e executei os quatro arquivos TypeScript.
