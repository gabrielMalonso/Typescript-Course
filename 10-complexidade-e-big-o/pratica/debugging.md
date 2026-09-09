# Debugging — Testar a hipótese, corrigir e rechecar

Os códigos abaixo são **intencionalmente incorretos ou ineficientes**. Para cada um: escreva uma hipótese, um caso que reproduza o problema, a saída esperada e a observada, o diagnóstico, a correção e um teste de regressão. Não basta reescrever e dizer “agora funciona”. Entregue em `pratica/solucoes/debugging.md` e arquivos `.ts` separados.

## 1. O relatório que sempre parece igual

Contrato: somar todos os números recebidos. O teste existente passa, mas é insuficiente.

```typescript
const dados = [2, 4];
function somarRecebidos(valores: number[]): number {
  let soma = 0;
  for (const valor of dados) soma += valor;
  return soma;
}
console.log(somarRecebidos(dados)); // 6
```

Encontre uma entrada que revele a falha sem alterar a coleção externa. Depois da correção, justifique o custo em função do parâmetro recebido e mostre que vazio e uma coleção só de negativos funcionam.

## 2. A contagem do campeonato

Contrato: contar encontros entre jogadores diferentes; cada par só pode aparecer uma vez.

```typescript
function contarEncontros(n: number): number {
  let encontros = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) encontros++;
  }
  return encontros;
}
console.log(contarEncontros(3));
```

Assuma `n` inteiro entre 0 e 100. Mostre um caso mínimo revelador. Corrigir a contagem muda a família de crescimento? Justifique com os limites dos loops.

## 3. O resumo demorado

Contrato: devolver, para cada posição, a soma do array inteiro. Para `[2, 3]`, o resultado deve ser `[5, 5]`.

```typescript
function repetirTotal(valores: number[]): number[] {
  return valores.map(() => valores.reduce((total, valor) => total + valor, 0));
}
console.log(repetirTotal([2, 3])); // [5, 5]
```

A resposta está correta para o exemplo. Investigue o trabalho repetido e melhore a implementação preservando o contrato. Compare tempo, saída e espaço auxiliar antes/depois. Teste vazio, um elemento e negativos; explique por que a saída ainda ocupa memória proporcional à entrada.

Próximo: [retorno às suas tentativas](leetcode.md).
