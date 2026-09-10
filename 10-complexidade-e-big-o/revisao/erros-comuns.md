# Erros comuns — Perguntas para se corrigir

| Atalho de raciocínio | Pergunta que ajuda |
|---|---|
| “Dois loops são O(n²)” | Estão aninhados? Quais são seus limites reais? |
| “Percorrer metade é O(log n)” | Reduzo repetidamente o restante ou faço n/2 visitas? |
| “O return deixa tudo constante” | E se a resposta estiver no fim ou não existir? |
| “Método nativo não conta” | Quantas vezes a callback executa e o que faz por chamada? |
| “Só há uma variável, então O(1) de memória” | Essa variável aponta para um array que cresce? |
| “Toda cópia duplica os objetos” | Copiei referências ou os objetos internos também? |
| “A média de três tempos é o caso médio” | Qual é a distribuição das entradas e o custo em cada uma? |
| “O(n) sempre vence O(n²) em qualquer entrada” | Estou comparando crescimento ou constantes/tempo concreto? |
| “O vazio passou, então a função usa o parâmetro” | Outro array com resultado diferente também passa? |
| “Copiar saída é memória auxiliar” | Qual convenção estou usando e onde contabilizei a saída? |

Uma implementação incorreta pode ter uma análise de custo correta — e continuar incorreta. Verifique contrato e complexidade separadamente. Não elimine casos de borda apenas porque Big O olha o crescimento para entradas grandes.
