# Resultado da Prova — Capítulo 03: Operadores e Estruturas Condicionais

> Data: 2026-08-10  
> Aluno: Gabriel Alonso

---

## Resultado

**Nota: 8,7/10 — aprovado.**

| Questão | Pontuação | Resultado |
|---|---:|---|
| 1 | 0,60/1,00 | Valores corretos; faltou explicar a precedência |
| 2 | 1,00/1,00 | Correta |
| 3 | 1,00/1,00 | Correta |
| 4 | 1,00/1,00 | Correta |
| 5 | 1,15/1,50 | Correção correta; não identificou que `=` realiza atribuição |
| 6 | 1,45/2,00 | Faixa de atenção invertida; saída classificada como `NORMAL` |
| 7 | 2,50/2,50 | Correta |
| **Total** | **8,70/10,00** | **Aprovado** |

## Correção detalhada

### Questão 1

Os três valores estão corretos: `18`, `50` e `2`. Faltou explicar que a multiplicação é executada antes da soma em `resultadoA`, enquanto os parênteses antecipam a soma em `resultadoB`.

### Questões 2, 3 e 4

Respostas corretas. Você classificou os operadores, explicou a ausência de coerção implícita em `===`, avaliou a expressão lógica de dentro para fora e reconheceu corretamente os casos de truthy, falsy e `??`.

### Questão 5

A correção para `cargaAtual <= cargaLimite` e a explicação sobre a insuficiência de `===` estão corretas. Na análise do defeito original, porém, faltou dizer que `=` é o operador de atribuição: a linha tenta atribuir `cargaLimite` a `cargaAtual`, em vez de compará-los.

O código completo está correto, mas o arquivo obrigatório `questao05.ts` não foi criado.

### Questão 6

O cálculo da margem e o ternário de inspeção estão corretos. O erro está na faixa intermediária:

```typescript
} else if (vibracaoAtual <= 6) {
```

A regra solicitada é **maior ou igual a 6**. Portanto, deveria ser:

```typescript
} else if (vibracaoAtual >= 6) {
```

Com `6.8`, o programa entregue imprime `Classificação: NORMAL`, quando deveria imprimir `ATENÇÃO`.

### Questão 7

Todos os requisitos funcionais foram atendidos: condições menores, condição integrada, negação, `if/else`, `switch`, `??` e cálculo da margem. O arquivo compila e executa corretamente.

## Síntese

Você demonstrou bom domínio de operadores e estruturas condicionais, especialmente na integração de várias regras na Questão 7. O principal ponto para reforçar é testar os limites e um valor representativo de cada ramo da condição; isso teria revelado imediatamente a classificação incorreta de `6.8` na Questão 6.

## Observação de entrega

As respostas foram novamente registradas diretamente em `prova.md`, apesar da orientação para usar `resposta.md`, e `questao05.ts` ficou ausente. Isso não alterou adicionalmente a nota, mas preserve o enunciado e entregue todos os arquivos solicitados nas próximas provas.

O Capítulo 03 está concluído. Você está liberado para avançar ao Capítulo 04 — Estruturas de Repetição.
