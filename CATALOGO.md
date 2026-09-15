# Catálogo de algoritmos e estruturas de dados

Consulta rápida. Organizado por categoria e, dentro dela, por nome. Acrescente entradas conforme estudar, manualmente ou pedindo ao professor.

Formato: **nome → ideia → quando usar → custo → código → referência**. Inclua apenas os critérios relevantes para cada item.

## Ordenação

### Insertion Sort — ordenação por inserção

**Ideia:** pegar o próximo elemento e inseri-lo na posição correta da parte já ordenada, como organizar cartas na mão.

| Situação | Adequação |
|---|---|
| Poucos elementos | Boa opção pela simplicidade |
| Muitos elementos desordenados | Geralmente pouco adequado: pode exigir trabalho quadrático |
| Já ordenado | Muito favorável: uma passagem, sem deslocamentos |
| Quase ordenado | Favorável quando exige poucos deslocamentos |
| Ordem inversa, valores distintos | Pior caso: cada elemento atravessa toda a parte anterior |
| Pouca memória disponível | Usa espaço auxiliar constante e altera o próprio array |

**Tempo:** melhor Θ(n); médio Θ(n²), considerando permutações igualmente prováveis de valores distintos; pior Θ(n²). **Espaço auxiliar:** O(1). `n` é a quantidade de elementos.

**Contrato:** ordena números finitos em ordem crescente, modifica o array recebido e devolve a mesma referência. É estável: elementos iguais mantêm sua ordem relativa.

```typescript
function insertionSort(valores: number[]): number[] {
  for (let j = 1; j < valores.length; j++) {
    const atual = valores[j];
    let i = j - 1;

    // Abre espaço para inserir o elemento na parte já ordenada.
    while (i >= 0 && valores[i] > atual) {
      valores[i + 1] = valores[i];
      i--;
    }

    valores[i + 1] = atual;
  }

  return valores;
}

insertionSort([5, 2, 4, 6, 1, 3]); // [1, 2, 3, 4, 5, 6]
```

**Referência:** [CLRS, 3ª edição, seção 2.1](10-complexidade-e-big-o/leituras/clrs-2.1.pdf), pp. 16–18. Adaptação para TypeScript com índices começando em zero.
