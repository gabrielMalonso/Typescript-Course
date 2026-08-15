# Funções — Erros comuns

## 1. Definir e esquecer de chamar

```typescript
function iniciar(): void {
  console.log("Iniciado");
}
```

Nada será exibido enquanto `iniciar()` não for executada. A definição apenas cria a regra.

## 2. Confundir parâmetro com argumento

```typescript
function dobro(valor: number): number {
  return valor * 2;
}

dobro(5);
```

`valor` é parâmetro; `5` é argumento. O parâmetro é o nome genérico da entrada, e o argumento é o dado concreto da chamada.

## 3. Trocar a ordem dos argumentos

```typescript
function dividir(total: number, quantidade: number): number {
  return total / quantidade;
}

dividir(100, 4); // 25
dividir(4, 100); // 0.04
```

Os tipos iguais não permitem que o TypeScript descubra uma troca semântica. Nomes claros e conferência da assinatura são importantes.

## 4. Usar `console.log` no lugar de `return`

```typescript
function somar(a: number, b: number): void {
  console.log(a + b);
}
```

Essa função exibe a soma, mas não permite reutilizá-la em outro cálculo. Quando o resultado precisa continuar no programa, retorne-o.

## 5. Esquecer `return` em arrow function com chaves

```typescript
const dobroErrado = (valor: number): number => {
  valor * 2;
};
```

Com chaves, escreva `return`:

```typescript
const dobro = (valor: number): number => {
  return valor * 2;
};
```

Ou retire as chaves para usar retorno implícito:

```typescript
const dobroConciso = (valor: number): number => valor * 2;
```

## 6. Deixar um caminho sem retorno

```typescript
function classificar(valor: number): string {
  if (valor > 0) {
    return "positivo";
  }
}
```

Quando `valor <= 0`, a função termina sem `string`. Garanta retorno em todos os caminhos.

## 7. Confundir função com resultado

```typescript
function obterCodigo(): string {
  return "A-10";
}

const funcao = obterCodigo;
const codigo = obterCodigo();
```

- `funcao` guarda `() => string`;
- `codigo` guarda uma `string`.

Procure os parênteses para identificar a chamada.

## 8. Tentar acessar variável local fora da função

```typescript
function calcular(): number {
  const resultado = 10 + 5;
  return resultado;
}

// console.log(resultado); // não existe neste escopo
```

Guarde o retorno da chamada se precisar do valor fora:

```typescript
const resultadoFinal = calcular();
```

## 9. Depender de dado externo sem necessidade

Menos reutilizável:

```typescript
const valores: number[] = [1, 2, 3];

function somar(): number {
  let total = 0;
  for (const valor of valores) total += valor;
  return total;
}
```

Mais previsível:

```typescript
function somar(valores: number[]): number {
  let total = 0;
  for (const valor of valores) total += valor;
  return total;
}
```

A segunda forma declara sua dependência como parâmetro.

## 10. Antecipar callbacks sem dominar o básico

Neste capítulo, guardar uma função em uma variável é suficiente. Receber uma função como parâmetro muda o contrato e será estudado no Capítulo 08. Use loops explícitos nos exercícios com arrays.

## Checklist de diagnóstico

- [ ] A função foi realmente chamada?
- [ ] Parâmetros e argumentos estão na ordem correta?
- [ ] O tipo de cada argumento corresponde à assinatura?
- [ ] Preciso exibir ou devolver o resultado?
- [ ] Todo caminho retorna o tipo prometido?
- [ ] Uma arrow com chaves possui `return`?
- [ ] Guardei a função ou o resultado da chamada?
- [ ] Estou tentando usar uma variável fora do seu escopo?
