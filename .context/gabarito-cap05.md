# Gabarito — Prova Capítulo 05: Arrays — Fundamentos

**DOCUMENTO CONFIDENCIAL — APENAS PARA CORREÇÃO**

> A prova só pode ser aplicada após a conclusão formal do Capítulo 04, do Projeto 1 e a liberação expressa do professor.

## Parte 1 — Teoria (4 pontos)

### Questão 1: Modelo mental e tipagem (1 ponto)

1. Um array ordenado preserva a posição de cada elemento. Isso não significa classificação alfabética ou numérica automática.
2. `number[]` informa que os elementos aceitos são números. O tipo não fixa a quantidade; o array pode inclusive estar vazio.
3. O primeiro índice é `0`; com `length` igual a `6`, o último índice válido é `5`, calculado por `length - 1`.
4. `const` impede que a variável seja reatribuída para outro array, mas não congela nem torna imutável o conteúdo do array já referenciado.

| Critério | Pontos |
|---|---:|
| Distingue ordem armazenada de classificação automática | 0,25 |
| Explica o alcance de `number[]` sem confundi-lo com tamanho | 0,25 |
| Informa os índices `0` e `5` | 0,20 |
| Distingue reatribuição da variável de mutação do conteúdo | 0,30 |

### Questão 2: Estado e valores retornados (1 ponto)

Valores, na ordem pedida:

```text
tamanhoA: 3
tamanhoB: 4
removidoDoInicio: alfa
removidoDoFim: delta
etapas: ["beta", "GAMA REVISADA"]
length: 2
```

`unshift` e `push` retornam o novo tamanho do array, não o elemento adicionado. A substituição em `etapas[1]` muda um valor sem mudar o tamanho.

| Critério | Pontos |
|---|---:|
| Dois tamanhos retornados corretos | 0,20 |
| Dois elementos removidos corretos | 0,20 |
| Array final com valores e ordem corretos | 0,25 |
| `length` final correto | 0,10 |
| Explica o retorno de `unshift` e `push` | 0,25 |

### Questão 3: Referência compartilhada (1 ponto)

Saídas conceituais:

```text
[ 'rascunho', 'teste', 'publicação' ]
[ 'rascunho', 'teste', 'publicação' ]
true
```

Somente um array foi criado. `fluxoDaTela = fluxoPrincipal` copia a referência; ambos os nomes apontam para a mesma estrutura, portanto as mutações são visíveis pelos dois nomes.

| Critério | Pontos |
|---|---:|
| Primeiro array correto | 0,20 |
| Segundo array correto | 0,20 |
| Comparação resulta em `true` | 0,15 |
| Identifica que foi criado apenas um array | 0,15 |
| Explica corretamente a referência compartilhada | 0,30 |

### Questão 4: Array vazio e leitura segura (1 ponto)

1. `alertaRemovido` vale `undefined`.
2. `pop` pode devolver uma `string` quando há um elemento ou `undefined` quando o array está vazio.
3. `ultimoIndice` vale `-1`; a leitura `alertas[-1]` resulta em `undefined` em tempo de execução.
4. Deve-se verificar `alertas.length > 0` antes de acessar o primeiro e o último elemento.

| Critério | Pontos |
|---|---:|
| Valor de `alertaRemovido` | 0,20 |
| Explicação de `string \| undefined` | 0,30 |
| Valores de `ultimoIndice` e `ultimoAlerta` | 0,25 |
| Condição `length > 0` | 0,25 |

## Parte 2 — Prática (6 pontos)

### Questão 5: Registro temporário (1,5 ponto)

Solução compilável:

```typescript
const codigos: string[] = [];

const tamanhoDepoisDoPush = codigos.push("M-20");
const tamanhoDepoisDoUnshift = codigos.unshift("A-10");
const retiradoDoInicio = codigos.shift();
const retiradoDoFim = codigos.pop();
const retiradaExtra = codigos.pop();

console.log(`Tamanho depois do push: ${tamanhoDepoisDoPush}`);
console.log(`Tamanho depois do unshift: ${tamanhoDepoisDoUnshift}`);
console.log(`Retirado do início: ${retiradoDoInicio}`);
console.log(`Retirado do fim: ${retiradoDoFim}`);
console.log(`Retirada extra: ${retiradaExtra}`);
console.log(codigos);
console.log(`Quantidade final: ${codigos.length}`);
```

| Critério | Pontos |
|---|---:|
| Array vazio com tipo `string[]` explícito | 0,20 |
| Inclusões e tamanhos retornados corretos | 0,30 |
| Remoções das extremidades na ordem correta | 0,30 |
| `retiradaExtra` inferida corretamente e igual a `undefined` | 0,25 |
| Saída completa, array final e `length` | 0,20 |
| Código compila e executa | 0,25 |

### Questão 6: Etapas de uma entrega (2 pontos)

Solução compilável:

```typescript
const entrega: string[] = ["briefing", "design", "teste"];

// Início: ["briefing", "design", "teste"]
entrega.push("publicação");
// Depois do push: ["briefing", "design", "teste", "publicação"]
entrega.unshift("planejamento");
// Depois do unshift: ["planejamento", "briefing", "design", "teste", "publicação"]
entrega[2] = "implementação";
// Depois da alteração: ["planejamento", "briefing", "implementação", "teste", "publicação"]
const etapaAdiada = entrega.pop();
// Depois do pop: ["planejamento", "briefing", "implementação", "teste"]
const etapaConcluida = entrega.shift();
// Depois do shift: ["briefing", "implementação", "teste"]

const ultimoIndice = entrega.length - 1;

console.log(`Etapa adiada: ${etapaAdiada}`);
console.log(`Etapa concluída: ${etapaConcluida}`);
console.log(`Primeira restante: ${entrega[0]}`);
console.log(`Última restante: ${entrega[ultimoIndice]}`);
console.log(entrega);
console.log(`Quantidade final: ${entrega.length}`);
```

| Critério | Pontos |
|---|---:|
| Estado inicial e tipo corretos | 0,15 |
| Cinco mutações corretas e na ordem exigida | 0,60 |
| Previsões de estado completas e corretas | 0,35 |
| Retornos de `pop` e `shift` guardados corretamente | 0,25 |
| Primeiro, último e `length` lidos corretamente | 0,25 |
| Saída final completa e correta | 0,15 |
| Código compila e executa | 0,25 |

### Questão 7: Painel compartilhado de incidentes (2,5 pontos)

Solução compilável:

```typescript
const filaPrincipal: string[] = ["INC-102", "INC-205"];
const painelDaEquipe = filaPrincipal;

const tamanhoAposUrgente = painelDaEquipe.unshift("INC-001");
filaPrincipal[1] = "INC-102-R";
const incidenteAtendido = painelDaEquipe.shift();
const tamanhoAposNovo = filaPrincipal.push("INC-330");
const mesmaReferencia = filaPrincipal === painelDaEquipe;
const primeiroIncidente = filaPrincipal[0];
const ultimoIndice = filaPrincipal.length - 1;
const ultimoIncidente = filaPrincipal[ultimoIndice];

console.log(`Tamanho após urgente: ${tamanhoAposUrgente}`);
console.log(`Incidente atendido: ${incidenteAtendido}`);
console.log(`Tamanho após novo: ${tamanhoAposNovo}`);
console.log(`Mesma referência: ${mesmaReferencia}`);
console.log(filaPrincipal);
console.log(painelDaEquipe);
console.log(`Primeiro incidente: ${primeiroIncidente}`);
console.log(`Último incidente: ${ultimoIncidente}`);
console.log(`Quantidade final: ${filaPrincipal.length}`);

// Os dois nomes apontam para o mesmo array, por isso exibem o mesmo conteúdo.
```

| Critério | Pontos |
|---|---:|
| Estado inicial tipado e referência compartilhada | 0,30 |
| `unshift` e primeiro tamanho retornado | 0,25 |
| Alteração por índice e `shift` pelo outro nome | 0,35 |
| `push` e segundo tamanho retornado | 0,25 |
| Comparação de referência resulta em `true` | 0,25 |
| Primeiro, último e `length` finais corretos | 0,30 |
| Dois arrays e demais saídas completos | 0,25 |
| Explicação da referência compartilhada | 0,20 |
| Código compila e executa | 0,35 |

## Resumo

| Parte | Pontuação |
|---|---:|
| Teoria | 4,0 |
| Prática | 6,0 |
| **Total** | **10,0** |

Aplicar crédito parcial por conceitos corretos. Diferenças cosméticas não devem dominar a avaliação, salvo quando ocultarem valores, ordem, retornos, estado final ou um requisito funcional. Confirmar os quatro arquivos obrigatórios antes de considerar a entrega completa.
