# Resultado da Prova — Capítulo 00: Preparação do Ambiente

**Aluno:** Gabriel Alonso  
**Data da correção:** 26/07/2026  
**Nota:** **9,5 / 10,0**  
**Resultado:** **Aprovado**

## Pontuação

| Questão | Nota | Máximo | Feedback |
|---------|------|--------|----------|
| 1 | 1,0 | 1,0 | Alternativa correta. |
| 2 | 1,0 | 1,0 | Sequência de compilação e execução correta. |
| 3 | 1,0 | 1,0 | Todas as afirmações foram classificadas corretamente. |
| 4 | 1,0 | 1,0 | Explicou tipagem e detecção de erros antes da execução. |
| 5 | 1,5 | 1,5 | Identificou, explicou e corrigiu corretamente o erro de tipo. |
| 6 | 1,5 | 2,0 | O cálculo e as declarações estão corretos, mas o código no documento não compila. |
| 7 | 2,5 | 2,5 | Identificou os itens esperados e apresentou código corrigido. |
| **Total** | **9,5** | **10,0** | |

## Questão 6

No documento de respostas, há dois problemas:

```typescript
let total: number = preco * quantidade;
}
```

A chave `}` está sobrando. Além disso, `total` é uma variável do tipo `number`, portanto não pode ser chamada como função:

```typescript
total(preco, quantidade)
```

A versão correta é:

```typescript
let produto: string = "Caderno";
let preco: number = 15.90;
let quantidade: number = 3;

let total: number = preco * quantidade;

console.log(
    "O total de " + quantidade + " " + produto +
    "(s) é R$ " + total.toFixed(2)
);
```

O arquivo `caderno.ts` contém essa lógica correta e foi compilado com sucesso. O desconto considera apenas a divergência entre esse arquivo e a resposta oficial.

## Questão 7

A ausência de ponto e vírgula foi tratada como um dos três itens esperados pelo enunciado, então sua resposta recebeu pontuação integral. Tecnicamente, porém, omitir o `;` nessa linha não impede a compilação: é uma questão de convenção de estilo, não um erro de tipo ou de sintaxe nesse caso.

## Avaliação Geral

Você demonstrou domínio dos objetivos do capítulo: entende o fluxo TypeScript → JavaScript, reconhece incompatibilidades de tipos e consegue escrever programas tipados simples. O principal ponto de atenção continua sendo testar exatamente o código que será copiado para o documento final.

