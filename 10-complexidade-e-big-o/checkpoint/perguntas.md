# Checkpoint — Complexidade e Big O

Faça depois de entregar e discutir a prática. São quatro tarefas curtas, com estimativa flexível de 25–35 minutos. Não há nota numérica.

**Recursos permitidos:** suas anotações, aulas, documentação oficial e terminal para executar seu próprio código. Não consultar soluções prontas nem usar IA para resolver, validar ou corrigir tentativas durante o checkpoint. O professor pode apenas esclarecer ambiguidades do enunciado. Entregue tudo antes de pedir correção.

Crie `checkpoint/resposta.md`; para a tarefa 2, crie também `checkpoint/contagem.ts`. Não edite os enunciados.

## 1. Ler e justificar

```typescript
function analisar(n: number, m: number): number {
  let passos = 0;
  for (let i = 0; i < n; i++) passos++;
  for (let j = 0; j < m; j++) {
    for (let k = 0; k < 4; k++) passos++;
  }
  return passos;
}
```

Para inteiros não negativos, qual a contagem exata? Declare tempo em termos de `n` e `m`, espaço auxiliar e o efeito de dobrar ambos. Explique o raciocínio com os limites, não apenas o nome da classe.

## 2. Implementar e verificar

Receba um array de números finitos e um limite. Devolva a quantidade de valores menores ou iguais ao limite, sem alterar a entrada. Escreva testes para vazio, igualdade com o limite e negativos. Declare tempo e espaço auxiliar e explique o que cada teste verifica.

## 3. Julgar uma conclusão

Uma busca para no primeiro item que satisfaz um critério de custo constante. Uma execução encontra a resposta na primeira posição de um array com 10.000 itens. O autor conclui: “melhor, médio e pior caso são O(1)”. Avalie a conclusão. Diga quais dados/hipóteses seriam necessários para discutir caso médio e descreva um cenário que precise ser considerado na análise.

## 4. Transferir e comparar

O algoritmo A visita todos os pares de duas listas de tamanho `n`. O B faz `n` visitas em cada uma de `log₂ n` etapas, para `n` potência de dois. Compare as ordens e o crescimento ao passar de `n = 16` para `n = 32`, assumindo corpos de custo constante.

Separadamente, uma função recebe `n` números e devolve uma cópia transformada, com uma passagem e sem outro array intermediário. Separe entrada, saída, auxiliar e total no pico, usando a convenção da aula. Uma medida de tempo com `n = 16` basta para decidir qual algoritmo será melhor para todo tamanho? Justifique.

## Critérios publicados antes da entrega

A correção observa: contagem coerente com os limites; definição das entradas; correção e testes discriminantes; distinção entre casos e evidências; separação de memória e justificativa de crescimento. Não exige decorar APIs ou uma prova matemática formal.

**Domínio demonstrado:** competências essenciais justificadas e transferidas. **Reforço localizado:** lacuna específica, com atividade curta de rechecagem. **Revisão necessária:** dificuldades centrais impedem analisar uma variação. Não se repete o capítulo inteiro por um erro isolado. O resultado e o próximo passo serão registrados somente após sua entrega.
