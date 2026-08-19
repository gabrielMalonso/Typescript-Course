# Prova — Capítulo 05: Arrays — Fundamentos

> **PROVA PREPARADA, MAS AINDA NÃO LIBERADA.**
>
> Estudar este capítulo agora está permitido. Realize esta prova somente depois de:
>
> 1. concluir formalmente a parte prática e a prova do Capítulo 04;
> 2. concluir o Projeto 1;
> 3. receber a liberação expressa do professor.

## Informações

- **Duração sugerida:** 75–90 minutos
- **Consulta:** não permitida, exceto à documentação oficial
- **Pontuação:** 10 pontos
- **Aprovação:** mínimo 7 pontos
- **Composição:** 4 pontos de teoria e 6 pontos de prática

## Orientações

- Use somente os conteúdos estudados até este capítulo.
- Use loops somente na Questão 8.
- Não use métodos avançados de arrays, como `forEach`, `map`, `filter`, `find` ou `reduce`.
- Nas Questões 5–7, use apenas acesso por índice, `length`, `push`, `pop`, `shift` e `unshift`, além dos fundamentos anteriores.
- Use tipos precisos, nomes descritivos em `camelCase` e ponto e vírgula.
- Compile, execute e teste exatamente a versão entregue.
- Diferenças apenas cosméticas na forma como o terminal exibe arrays não são erro; os valores e a ordem devem estar corretos.
- Não escreva respostas neste enunciado.

## Arquivos obrigatórios

Cada parte possui um destino específico:

| Arquivo | Conteúdo obrigatório |
|---|---|
| `resposta.md` | Respostas completas das questões 1, 2, 3 e 4 |
| `questao05.ts` | Somente o código completo da questão 5 |
| `questao06.ts` | Somente o código completo da questão 6 |
| `questao07.ts` | Somente o código completo da questão 7 |
| `questao08.ts` | Somente o código completo da questão 8 |

Os cinco arquivos devem ficar em `05-arrays-fundamentos/avaliacao/`. Código copiado apenas para `resposta.md` não substitui o arquivo `.ts` solicitado.

---

## Parte 1 — Teoria (4 pontos)

Responda às quatro questões em `resposta.md`.

### Questão 1: Modelo mental e tipagem (1 ponto)

Responda com suas palavras:

1. O que significa dizer que um array é uma lista **ordenada**? Isso significa que seus valores são automaticamente classificados em ordem alfabética ou numérica?
2. O que o tipo `number[]` informa? Ele determina também quantos elementos o array terá?
3. Em um array não vazio com `length` igual a `6`, qual é o primeiro índice e qual é o último índice válido?
4. Por que o conteúdo de um array declarado com `const` pode mudar, embora a variável não possa receber outro array?

### Questão 2: Estado e valores retornados (1 ponto)

Sem executar, informe em ordem:

- o valor de `tamanhoA`;
- o valor de `tamanhoB`;
- o valor de `removidoDoInicio`;
- o valor de `removidoDoFim`;
- o conteúdo final de `etapas`;
- o `length` final.

```typescript
const etapas: string[] = ["beta", "gama"];

const tamanhoA = etapas.unshift("alfa");
const tamanhoB = etapas.push("delta");
const removidoDoInicio = etapas.shift();
etapas[1] = "GAMA REVISADA";
const removidoDoFim = etapas.pop();
```

Explique também por que `tamanhoA` e `tamanhoB` não contêm os textos adicionados.

### Questão 3: Referência compartilhada (1 ponto)

Analise o código:

```typescript
const fluxoPrincipal: string[] = ["rascunho", "revisão"];
const fluxoDaTela = fluxoPrincipal;

fluxoDaTela[1] = "teste";
fluxoPrincipal.push("publicação");

console.log(fluxoPrincipal);
console.log(fluxoDaTela);
console.log(fluxoPrincipal === fluxoDaTela);
```

Informe as três saídas conceituais e explique:

1. quantos arrays foram criados;
2. por que uma alteração feita por um nome aparece quando o outro nome é usado.

### Questão 4: Array vazio e leitura segura (1 ponto)

Considere:

```typescript
const alertas: string[] = [];
const alertaRemovido = alertas.pop();
const ultimoIndice = alertas.length - 1;
const ultimoAlerta = alertas[ultimoIndice];
```

Responda:

1. Qual é o valor de `alertaRemovido`?
2. Por que seu tipo pode ser escrito como `string | undefined`?
3. Qual é o valor de `ultimoIndice` e o que `ultimoAlerta` recebe em tempo de execução?
4. Qual condição simples, baseada em `length`, deve ser verificada antes de ler o primeiro e o último elemento de um array que pode estar vazio?

---

## Parte 2 — Prática (6 pontos)

### Questão 5: Registro temporário (1 ponto)

Crie `questao05.ts`.

1. Declare `codigos` como um `string[]` vazio.
2. Adicione `"M-20"` ao fim e guarde o retorno em `tamanhoDepoisDoPush`.
3. Adicione `"A-10"` ao início e guarde o retorno em `tamanhoDepoisDoUnshift`.
4. Remova o primeiro código e guarde-o em `retiradoDoInicio`.
5. Remova o último código e guarde-o em `retiradoDoFim`.
6. Tente remover novamente do fim e guarde o retorno em `retiradaExtra`, deixando o TypeScript inferir o tipo.
7. Exiba os dois tamanhos retornados, os três retornos das remoções, o array final e seu `length`.

**Saída conceitual esperada:**

```text
Tamanho depois do push: 1
Tamanho depois do unshift: 2
Retirado do início: A-10
Retirado do fim: M-20
Retirada extra: undefined
[]
Quantidade final: 0
```

### Questão 6: Etapas de uma entrega (1,5 ponto)

Crie `questao06.ts` com este estado inicial:

```typescript
const entrega: string[] = ["briefing", "design", "teste"];
```

Execute exatamente nesta ordem:

1. adicione `"publicação"` ao fim;
2. adicione `"planejamento"` ao início;
3. substitua o elemento de índice `2` por `"implementação"`;
4. remova o último elemento e guarde o retorno em `etapaAdiada`;
5. remova o primeiro elemento e guarde o retorno em `etapaConcluida`;
6. crie `ultimoIndice` usando `length - 1`;
7. exiba os dois elementos removidos, o primeiro elemento restante, o último elemento restante, o array final e seu `length`.

Antes do código executável, registre em comentários o estado previsto depois de cada uma das cinco mutações.

**Saída conceitual esperada:**

```text
Etapa adiada: publicação
Etapa concluída: planejamento
Primeira restante: briefing
Última restante: teste
[ 'briefing', 'implementação', 'teste' ]
Quantidade final: 3
```

### Questão 7: Painel compartilhado de incidentes (1,5 ponto)

Crie `questao07.ts` com:

```typescript
const filaPrincipal: string[] = ["INC-102", "INC-205"];
const painelDaEquipe = filaPrincipal;
```

Execute exatamente nesta ordem:

1. usando `painelDaEquipe`, adicione `"INC-001"` ao início e guarde o novo tamanho em `tamanhoAposUrgente`;
2. usando `filaPrincipal`, altere o índice `1` para `"INC-102-R"`;
3. usando `painelDaEquipe`, remova o primeiro item e guarde-o em `incidenteAtendido`;
4. usando `filaPrincipal`, adicione `"INC-330"` ao fim e guarde o novo tamanho em `tamanhoAposNovo`;
5. crie `mesmaReferencia` comparando as duas variáveis com `===`;
6. leia o primeiro e o último incidente da fila final por índice; calcule o índice do último com `length - 1`;
7. exiba os dois tamanhos retornados, o incidente atendido, `mesmaReferencia`, os dois arrays, o primeiro e o último incidente e o `length` final.

**Saída conceitual esperada:**

```text
Tamanho após urgente: 3
Incidente atendido: INC-001
Tamanho após novo: 3
Mesma referência: true
[ 'INC-102-R', 'INC-205', 'INC-330' ]
[ 'INC-102-R', 'INC-205', 'INC-330' ]
Primeiro incidente: INC-102-R
Último incidente: INC-330
Quantidade final: 3
```

Em um comentário final, explique por que os dois arrays exibem o mesmo conteúdo. Não crie uma cópia independente e não use recursos ainda não apresentados.

### Questão 8: Percorrendo registros (2 pontos)

Crie `questao08.ts` com:

```typescript
const registros: number[] = [12, 0, 18, 25, 0, 15];
```

Considere `0` como um registro sem medição. Use um único `for` tradicional para:

1. começar no índice `0` e percorrer o array usando `registros.length`;
2. ignorar os valores iguais a `0` com `continue`;
3. para cada valor válido, exibir sua posição original no array em formato humano e seu valor;
4. somar os valores válidos em `totalValido`;
5. contar os valores válidos em `quantidadeValida`.

Crie os dois acumuladores antes do loop, ambos começando em `0`. Depois do loop, exiba o total e a quantidade. Não altere o array.

**Saída conceitual esperada:**

```text
Registro 1: 12
Registro 3: 18
Registro 4: 25
Registro 6: 15
Total válido: 70
Quantidade válida: 4
```

Em um comentário final, explique por que `indice + 1` é usado somente no rótulo, enquanto o acesso ao elemento continua usando `registros[indice]`.

---

## Checklist de entrega

- [ ] Não alterei `prova.md`.
- [ ] Respondi integralmente às questões 1–4 em `resposta.md`.
- [ ] Criei separadamente `questao05.ts`, `questao06.ts`, `questao07.ts` e `questao08.ts`.
- [ ] Usei loop somente na Questão 8 e não usei métodos avançados de arrays.
- [ ] Compilei e executei os quatro arquivos `.ts` entregues.
- [ ] Conferi valores, ordem, retornos e quantidades finais.
- [ ] Verifiquei que a versão entregue é a mesma que foi testada.
