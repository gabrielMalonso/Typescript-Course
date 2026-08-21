# Aula 02 — Sintaxe e contratos

## 1. Parâmetro opcional

```typescript
function formatarLeitura(valor: number, unidade?: string): string {
  if (unidade === undefined) {
    return `${valor}`;
  }

  return `${valor} ${unidade}`;
}

formatarLeitura(25);
formatarLeitura(25, "°C");
```

Regras:

- o `?` fica depois do nome;
- o valor pode ser `undefined` dentro da função;
- parâmetros obrigatórios não devem vir depois de um opcional.

```typescript
// Evite: obrigatório depois do opcional
// function exemplo(a?: number, b: number): void {}
```

## 2. Parâmetro com valor padrão

```typescript
function repetir(texto: string, vezes = 2): string {
  let resultado = "";

  for (let i = 0; i < vezes; i += 1) {
    resultado += texto;
  }

  return resultado;
}
```

O TypeScript infere `vezes` como `number`. Também é possível escrever `vezes: number = 2`, mas a anotação é redundante neste caso.

## 3. Rest parameter

```typescript
function maiorValor(inicial: number, ...outros: number[]): number {
  let maior = inicial;

  for (const valor of outros) {
    if (valor > maior) {
      maior = valor;
    }
  }

  return maior;
}
```

```text
maiorValor(8, 3, 12, 5)
           │  └───────┘
       inicial   outros = [3, 12, 5]
```

Regras:

- só pode existir um rest parameter;
- ele precisa ser o último;
- seu tipo é um array.

## 4. Tipando uma variável que guarda função

```typescript
const converter: (valor: number) => string = (
  valor: number,
): string => `${valor} kg`;
```

Leia o contrato da esquerda para a direita:

```text
converter recebe number e retorna string
```

Quando o contexto já informa os tipos, o TypeScript infere os parâmetros:

```typescript
const converter: (valor: number) => string = (valor) => `${valor} kg`;
```

## 5. Tipando callback `void`

```typescript
function executarAviso(
  mensagem: string,
  avisar: (mensagem: string) => void,
): void {
  avisar(mensagem);
}
```

`void` significa que a função controladora não depende de um valor retornado pelo callback.

```typescript
executarAviso("Pressão alta", (mensagem): void => {
  console.log(`ALERTA: ${mensagem}`);
});
```

## 6. Tipando callback com retorno

```typescript
function decidirAcesso(
  usuario: { nome: string; ativo: boolean },
  permitir: (usuario: { nome: string; ativo: boolean }) => boolean,
): string {
  if (permitir(usuario)) {
    return `Acesso liberado para ${usuario.nome}`;
  }

  return `Acesso negado para ${usuario.nome}`;
}
```

O contrato exige que o callback devolva `boolean`. Um callback que devolva `string` não serve, mesmo que receba o objeto correto.

## 7. Função nomeada ou arrow inline

As duas chamadas obedecem ao mesmo contrato:

```typescript
function somenteAtivo(usuario: { nome: string; ativo: boolean }): boolean {
  return usuario.ativo;
}

decidirAcesso({ nome: "Lia", ativo: true }, somenteAtivo);

decidirAcesso(
  { nome: "Caio", ativo: false },
  (usuario): boolean => usuario.ativo,
);
```

Prefira uma função nomeada quando a regra:

- será reutilizada;
- merece um nome explicativo;
- possui várias etapas.

Uma arrow inline funciona bem para uma regra curta e local.

## 8. Callback com mais de um argumento

```typescript
function percorrerMedicoes(
  medicoes: number[],
  visitar: (valor: number, indice: number) => void,
): void {
  for (let indice = 0; indice < medicoes.length; indice += 1) {
    visitar(medicoes[indice], indice);
  }
}
```

Na chamada interna, a ordem define o significado:

```typescript
percorrerMedicoes([12, 18], (valor, indice): void => {
  console.log(`${indice}: ${valor}`);
});
```

Os nomes podem mudar, mas as posições e os tipos precisam respeitar o contrato.

## 9. Array de objetos + callback

```typescript
function selecionarManualmente(
  itens: { codigo: string; disponivel: boolean }[],
  criterio: (item: { codigo: string; disponivel: boolean }) => boolean,
): { codigo: string; disponivel: boolean }[] {
  const selecionados: { codigo: string; disponivel: boolean }[] = [];

  for (const item of itens) {
    if (criterio(item)) {
      selecionados.push(item);
    }
  }

  return selecionados;
}
```

Este é um exercício de callbacks feito com ferramentas já conhecidas. No próximo capítulo, métodos de array oferecerão operações prontas para esse tipo de percurso.

## 10. Função que retorna função

O tipo de retorno pode ser outro contrato de função:

```typescript
function criarLimite(
  minimo: number,
): (valor: number) => boolean {
  return (valor: number): boolean => valor >= minimo;
}
```

```typescript
const peloMenosDez = criarLimite(10);
console.log(peloMenosDez(12)); // true
```

Não confunda:

```text
criarLimite           → função que recebe number e retorna função
criarLimite(10)       → função que recebe number e retorna boolean
criarLimite(10)(12)   → boolean
```

## 11. IIFE: forma tradicional e arrow

```typescript
(function (): void {
  console.log("inicialização única");
})();

((): void => {
  console.log("outra inicialização única");
})();
```

Os parênteses externos fazem a declaração ser tratada como expressão; os últimos parênteses executam a função.

## 12. Quadro de contratos

| Necessidade | Tipo |
|---|---|
| recebe número, não retorna valor útil | `(valor: number) => void` |
| recebe objeto, decide sim/não | `(item: { ativo: boolean }) => boolean` |
| recebe dois números, retorna número | `(a: number, b: number) => number` |
| não recebe argumentos, retorna texto | `() => string` |
| função que retorna outra função | `(fator: number) => (valor: number) => number` |

## 13. Erros de sintaxe e contrato

### Executar cedo demais

```typescript
// executarAviso("ok", console.log("agora"));
```

`console.log(...)` roda antes e seu retorno é `void`. O parâmetro esperava uma função.

### Tipar apenas o retorno

```typescript
// const regra: boolean = (valor: number) => valor > 0;
```

`regra` guarda a função inteira, não o booleano que uma futura chamada produzirá.

### Esquecer de retornar no callback

```typescript
// decidirAcesso(usuario, (item) => {
//   item.ativo; // expressão calculada, mas não retornada
// });
```

Com chaves, use `return` quando o contrato exige um valor.

### Confundir rest com array passado como um argumento

```typescript
function total(...valores: number[]): number {
  // ...
  return 0;
}

total(1, 2, 3);
// total([1, 2, 3]); // array não é number
```
