# Exercícios — Capítulo 03: Operadores e Estruturas Condicionais

## Instruções gerais

- Resolva na ordem apresentada.
- Crie cada arquivo dentro de `exercicios/solucoes/`.
- Use apenas conteúdos estudados até este capítulo.
- Use nomes descritivos em `camelCase` e ponto e vírgula.
- Compile e execute cada solução.
- Confira primeiro a lógica e depois a saída.
- Os 14 exercícios são obrigatórios; o bônus é opcional.

---

## Nível 1 — Construindo condições

### Exercício 1.1: Precedência de operadores

**Arquivo:** `ex11.ts`

Declare `valorA = 12`, `valorB = 4` e `valorC = 2`. Calcule:

- `resultadoSemParenteses` como `valorA + valorB * valorC`;
- `resultadoComParenteses` como `(valorA + valorB) * valorC`.

Não escreva os resultados diretamente.

**Saída esperada:**

```text
Sem parênteses: 20
Com parênteses: 32
```

### Exercício 1.2: Resto e paridade

**Arquivo:** `ex12.ts`

Declare `numero = 27`. Calcule `restoDaDivisao` usando `%` e crie `numeroPar` comparando o resto com zero por igualdade estrita.

**Saída esperada:**

```text
Resto: 1
É par: false
```

### Exercício 1.3: Atualização de produção

**Arquivo:** `ex13.ts`

Declare `quantidadeProduzida` com `let` e valor `120`. Atualize a mesma variável, nesta ordem:

1. some `35` com `+=`;
2. subtraia `10` com `-=`;
3. multiplique por `2` com `*=`;
4. divida por `5` com `/=`.

**Saída esperada:**

```text
Produção final: 58 unidades
```

### Exercício 1.4: Comparações de limite

**Arquivo:** `ex14.ts`

Declare `pressaoAtual = 7.5` e `pressaoLimite = 7.5`. Crie quatro booleanos usando, respectivamente, `>`, `>=`, `===` e `!==`.

**Saída esperada:**

```text
Acima do limite: false
No limite ou acima: true
Exatamente no limite: true
Diferente do limite: false
```

---

## Nível 2 — Tomando decisões

### Exercício 2.1: Temperatura segura

**Arquivo:** `ex21.ts`

Declare `temperaturaAtual = 72` e `temperaturaMaxima = 75`. Use `if/else` para exibir uma única mensagem.

**Saída esperada:**

```text
Temperatura segura.
```

### Exercício 2.2: Faixas de reservatório

**Arquivo:** `ex22.ts`

Declare `nivelDoReservatorio = 28`. Classifique com `if / else if / else`:

- `Nível alto.` para valor maior ou igual a `80`;
- `Nível operacional.` para valor maior ou igual a `30`;
- `Nível baixo.` nos demais casos.

**Saída esperada:**

```text
Nível baixo.
```

### Exercício 2.3: Liberação de acesso

**Arquivo:** `ex23.ts`

Declare `cracháValido = true`, `treinamentoConcluido = true` e `sistemaBloqueado = false`. Crie `acessoLiberado` exigindo as duas primeiras condições e negando a terceira. Use `if/else`.

**Saída esperada:**

```text
Acesso liberado.
```

### Exercício 2.4: Estado com ternário

**Arquivo:** `ex24.ts`

Declare `ensaioAprovado = false`. Use um único ternário para criar `estadoDoEnsaio` com `APROVADO` ou `REPROVADO`.

**Saída esperada:**

```text
Estado do ensaio: REPROVADO
```

### Exercício 2.5: Turno com `switch`

**Arquivo:** `ex25.ts`

Declare `codigoDoTurno: string = "N"`. A anotação amplia o valor para `string`, permitindo testar os diferentes casos. Use `switch` com:

- `M` → `Turno da manhã`;
- `T` → `Turno da tarde`;
- `N` → `Turno da noite`;
- `default` → `Turno inválido`.

Use `break` em todos os casos necessários e exiba uma única linha.

**Saída esperada:**

```text
Turno da noite
```

---

## Nível 3 — Integrando regras

### Exercício 3.1: Divisibilidade industrial

**Arquivo:** `ex31.ts`

Um lote possui `48` peças. Crie `divisivelPorTres` e `divisivelPorQuatro` usando `%` e `===`. Depois, crie `divisivelPorDoze` combinando os dois resultados com `&&`.

**Saída esperada:**

```text
Divisível por 3: true
Divisível por 4: true
Divisível por 12: true
```

### Exercício 3.2: Faixa operacional inclusiva

**Arquivo:** `ex32.ts`

Declare pressão mínima `4.5`, máxima `8.5` e atual `8.5`. Crie `pressaoDentroDaFaixa` usando duas comparações inclusivas e `&&`. Use um ternário para formar o texto final.

**Saída esperada:**

```text
Pressão: dentro da faixa
```

### Exercício 3.3: Diagnóstico com prioridade

**Arquivo:** `ex33.ts`

Declare:

```typescript
const emergenciaAtiva = false;
const temperaturaAtual = 92;
const vibracaoAtual = 6.5;
```

Use `if / else if / else` nesta prioridade:

1. emergência ativa → `PARADA DE EMERGÊNCIA`;
2. temperatura acima de `90` **ou** vibração acima de `7` → `INSPEÇÃO IMEDIATA`;
3. demais casos → `OPERAÇÃO NORMAL`.

**Saída esperada:**

```text
Diagnóstico: INSPEÇÃO IMEDIATA
```

### Exercício 3.4: Valor ausente e valor zero

**Arquivo:** `ex34.ts`

Declare:

```typescript
const observacao: null = null;
const quantidadeDeFalhas = 0;
```

Use `??` para criar `observacaoExibida` com o padrão `Sem observação`. Exiba `quantidadeDeFalhas` diretamente e explique em uma constante `string` que `??` preservaria zero porque ele não é `null` nem `undefined`.

**Saída esperada:**

```text
Observação: Sem observação
Falhas: 0
```

### Exercício 3.5: Controle de compressor

**Arquivo:** `ex35.ts`

Declare:

- `pressaoAtual = 6.8`;
- `pressaoMinima = 5`;
- `pressaoMaxima = 8`;
- `temperaturaAtual = 74`;
- `temperaturaMaxima = 75`;
- `protecaoFechada = true`;
- `manutencaoPendente = false`.

Crie condições menores e depois `partidaLiberada`, que exige pressão dentro da faixa, temperatura segura, proteção fechada e ausência de manutenção. Use `if/else` para definir `mensagemDePartida`.

Calcule também `margemDeTemperatura` por subtração.

**Saída esperada:**

```text
=== COMPRESSOR ===
Margem de temperatura: 1 °C
Partida liberada.
```

---

## Exercício bônus — Simulador de frete

**Arquivo:** `bonus.ts`

Declare `pesoEmQuilogramas = 18`, `distanciaEmQuilometros = 120`, `entregaExpressa = true` e `regiao: string = "sudeste"`.

Calcule:

- tarifa base: `pesoEmQuilogramas * 2`;
- adicional de distância: `15` quando a distância for maior que `100`, senão `0`;
- adicional expresso: `20` quando a entrega for expressa, senão `0`;
- valor total pela soma das três parcelas.

Use `switch` para criar `prazoBase`:

- `sudeste` → `3` dias;
- `sul` → `4` dias;
- `nordeste` → `6` dias;
- demais regiões → `8` dias.

Se a entrega for expressa, subtraia `1` do prazo com `-=`. Não permita prazo menor que `1`: use uma condicional para corrigir se necessário.

**Saída esperada:**

```text
Frete: R$ 71
Prazo: 2 dias
Modalidade: expressa
```

---

## Checklist de entrega

- [ ] Criei os 14 arquivos obrigatórios e, se desejado, o bônus.
- [ ] Usei operadores de acordo com o mecanismo solicitado.
- [ ] Testei limites inclusivos, prioridades e caminhos alternativos.
- [ ] Compilei e executei cada arquivo.
- [ ] Revisei os requisitos e a saída separadamente.
