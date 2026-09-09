# Resumo — Um roteiro para analisar código

1. Declare a entrada: `n` itens? Duas coleções independentes, `n` e `m`?
2. Declare o trabalho básico: visita, comparação, chamada de callback?
3. Diga qual caso está analisando; aqui, o padrão é pior caso.
4. Conte repetições, incluindo trabalho escondido em métodos e funções.
5. Simplifique a ordem depois da contagem, sem confundir isso com tempo real.
6. Separe entrada, saída e armazenamento auxiliar no pico.
7. Verifique com limites pequenos; use medições como evidência, não prova geral.

| Trabalho | Família, no modelo da aula |
|---|---|
| Quantidade fixa de operações | O(1) |
| Reduzir pela metade até 1 | O(log n) |
| n, 2n, n/2 visitas | O(n) |
| n itens × log n etapas | O(n log n) |
| n² ou n(n−1)/2 pares | O(n²) |
| Visitar 2ⁿ configurações com trabalho constante por visita | O(2ⁿ) |
| n + m visitas independentes | O(n + m) |
| Todas as n × m combinações, n e m positivos | O(nm) |

Big O é limite superior assintótico; procure um limite informativo. “Tem `return`”, “tem dois loops” e “usa método nativo” não são justificativas suficientes.

Tempo e memória podem melhorar sem mudar de classe. Armazenar resultados pode acelerar consultas, mas custa preparação, espaço e manutenção quando os dados mudam.

Use o resumo depois de tentar explicar sem consulta. A próxima etapa de conteúdo após demonstrar os pré-requisitos será 11 — Set, Map e hashing.
