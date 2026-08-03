# Erros Comuns — Operadores e Estruturas Condicionais

## 1. Usar `=` quando queria comparar

```typescript
if (temperatura = limite) {
  console.log("No limite");
}
```

`=` atribui. Para comparar, use `===`:

```typescript
if (temperatura === limite) {
  console.log("No limite");
}
```

## 2. Trocar `&&` por `||`

Se a operação exige sensor ativo **e** proteção fechada:

```typescript
const podeOperar = sensorAtivo && protecaoFechada;
```

Com `||`, apenas uma condição verdadeira já liberaria a operação.

## 3. Esquecer limites inclusivos

“Até 75, inclusive” significa `<= 75`, não `< 75`. Teste sempre o valor exatamente no limite.

## 4. Ordenar faixas do menor para o maior

```typescript
if (nota >= 7) {
  console.log("Aprovado");
} else if (nota >= 9) {
  console.log("Excelente");
}
```

A segunda condição nunca é alcançada para notas 9 ou 10. Comece pela faixa mais restritiva.

## 5. Esquecer `break` no `switch`

Sem `break`, a execução continua pelos casos seguintes. Esse comportamento pode ser intencional, mas não é o que queremos nos exercícios iniciais.

## 6. Usar ternário para lógica extensa

Ternário é bom para escolher entre dois valores simples. Quando houver várias ações ou condições encadeadas, use `if`.

## 7. Confundir truthy com `true`

`"false"` é uma string não vazia e, portanto, truthy. `0` é um número válido, mas é falsy. Prefira condições explícitas quando o domínio exigir precisão.

## 8. Usar `||` no lugar de `??` para valores válidos falsy

`||` substitui `0`, `false` e `""`; `??` substitui apenas `null` e `undefined`. Para um contador cujo zero é válido, `??` comunica melhor a intenção.

## 9. Esquecer os parênteses na média

```typescript
const mediaErrada = leituraA + leituraB / 2;
const mediaCorreta = (leituraA + leituraB) / 2;
```

Divisão tem precedência sobre soma.

## 10. Declarar dentro do bloco algo necessário fora

```typescript
if (aprovado) {
  const mensagem = "Aprovado";
}

console.log(mensagem);
```

`mensagem` só existe dentro do bloco. Quando os caminhos precisam definir um resultado usado depois, declare uma variável antes da condicional e atribua dentro dos blocos.

## 11. Testar apenas o cenário fornecido

Um `if` pode funcionar no caminho verdadeiro e falhar no falso. Teste:

- um valor abaixo do limite;
- um valor exatamente no limite;
- um valor acima do limite;
- cada caso do `switch`, incluindo `default`.

## Checklist de depuração

```text
1. Os dados têm os valores esperados?
2. Cada condição menor produz o boolean correto?
3. E/OU/NÃO traduzem a frase do problema?
4. As faixas estão na ordem correta?
5. Todos os caminhos definem o resultado?
6. A saída revela qual caminho foi executado?
```
