# Prática — Stack e Queue

Use rascunhos TypeScript e envie uma tentativa por vez. As duas primeiras atividades exploram as implementações da aula; a terceira pede uma aplicação sem solução antecipada.

### 1. Duas pilhas independentes

Execute a implementação de `criarPilha` e crie duas pilhas. Na primeira, empilhe `0`, `-2` e `-2`; na segunda, empilhe `99`. Retire todos os itens da primeira e tente retirar mais uma vez. Antes de executar, preveja a sequência de retornos e o topo que deverá restar na segunda.

Confira também que consultar o topo duas vezes não altera o tamanho. Esse experimento verifica valores repetidos, estado vazio e se cada chamada da função realmente mantém estado independente. Se algo divergir da previsão, investigue a primeira operação em que os estados diferem.

### 2. Uma fila que continua recebendo pedidos

Copie a implementação de `criarFila` para um rascunho. Acrescente temporariamente um `console.log` dentro do ramo que usa `slice`, mostrando `inicio` e `itens.length` antes da cópia. Enfileire `"A"`, `"B"`, `"C"` e `"D"`, retire dois itens e enfileire `"E"` e `"F"`. Termine de esvaziar: a saída completa deve ser `A, B, C, D, E, F`, apesar das compactações.

Depois, mantenha três itens pendentes alternando uma retirada e uma entrada por 20 rodadas. Observe se a compactação acontece mesmo sem a fila esvaziar. Compare com a versão em que só se reinicia o armazenamento ao esvaziar: quantas posições ela acumularia nesse uso?

Finalize verificando retirada no vazio, reinserção de `""` e duas filas independentes. Use o teste `valor !== undefined` quando precisar distinguir item de ausência. Não cronometre os logs para inferir complexidade; acompanhe a quantidade de posições consumidas e copiadas.

### 3. Delimitadores bem formados

Implemente `delimitadoresValidos(texto: string): boolean`. A entrada contém somente os seis caracteres ASCII `(`, `)`, `[`, `]`, `{`, `}`. Um fechamento precisa corresponder à abertura ainda pendente mais recente. O texto vazio é válido.

| Entrada | Resultado |
|---|---|
| `""` | `true` |
| `"()[]{}"` | `true` |
| `"{[()]}"` | `true` |
| `"([)]"` | `false` |
| `"]"` | `false` |
| `"(("` | `false` |

Você pode usar um array de strings e funções, sem classes. Explique por que contar aberturas e fechamentos não basta e justifique tempo e espaço no pior caso em função de n, o comprimento do texto. Não use expressão regular para substituir a implementação da regra.

[Voltar ao guia de estudo](../README.md#etapa-4).
