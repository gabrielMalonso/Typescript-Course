# Prova — Capítulo 03: Operadores e Estruturas Condicionais

## Informações

- **Duração sugerida:** 60–75 minutos
- **Consulta:** não permitida, exceto à documentação oficial
- **Pontuação:** 10 pontos
- **Aprovação:** mínimo 7 pontos

## Orientações

- Use somente os conteúdos estudados até este capítulo.
- Use nomes descritivos em `camelCase` e ponto e vírgula.
- Nas questões práticas, entregue o código completo.
- Compile, execute e teste exatamente a versão entregue.
- Registre as respostas em `avaliacao/resposta.md`; não edite este enunciado.

---

## Parte 1 — Teoria (4 pontos)

### Questão 1: Aritmética e precedência (1 ponto)

Considere:

```typescript
const resultadoA = 8 + 2 * 5;
const resultadoB = (8 + 2) * 5;
const resto = resultadoB % 6;
```

Informe os valores das três constantes e explique por que `resultadoA` e `resultadoB` são diferentes.
Respostas:
ResultadoA = 18
ResultadoB = 50
Resto = 2

### Questão 2: Comparação e atribuição (1 ponto)

Classifique cada operador como **atribuição**, **comparação estrita de igualdade**, **comparação estrita de diferença** ou **comparação relacional**:

1. `=` - atribuição
2. `===` - comparação estrita de igualdade
3. `!==` - comparação estrita de diferença
4. `>=` - comparação relacional

Depois explique por que preferimos `===` a `==`.

RESPOSTA: O operador `===` faz a comparação restrita de igualdade. Já o operador `==`, Pode converter tipos antes da comparação, ou seja, ele não alerta sobre comparações entre tipos incompatíveis, como string e number, por exemplo. No TypeScript, o operador `===` faz essa distinção muito bem, por isso é preferível sempre usar essa comparação restrita de igualdade.

### Questão 3: Lógica e prioridade (1 ponto)

Considere:

```typescript
const sensorAtivo = true;
const temperaturaSegura = false;
const modoManual = true;

const resultado = sensorAtivo && (temperaturaSegura || modoManual);
```

Qual é o valor de `resultado`? Explique a avaliação de dentro para fora.
RESPOSTA: resultado = true. Observamos primeiramente os itens dentro dos parênteses com as constantes temperaturaSegura || (ou) modoManual. No caso, o modoManual = true, portanto todo esse termo retorna true. Ao analisar sensorAtivo && esse termo dentro dos parênteses que analisamos antes, ambos são true, então o resultado retorna true.

### Questão 4: Verdadeiro ou falso (1 ponto)

Marque **V** ou **F** e justifique as falsas.

1. (V) O valor `0` é falsy em uma condição.
2. (F) A string `"false"` é falsy porque seu texto diz “false”. - JUSTIFICATIVA: A string "false" é considerada truthy. Já o valor `false` é considerado como falsy.
3. (V) `??` usa o valor alternativo quando a esquerda é `null` ou `undefined`.
4. (F) Em uma cadeia `if / else if / else`, todos os blocos verdadeiros são executados. - JUSTIFICATIVA: Apenas o primeiro bloco verdadeiro será executado, os demais serão pulados.

---

## Parte 2 — Prática (6 pontos)

### Questão 5: Diagnóstico e correção (1,5 ponto)

O código deveria aprovar uma carga de 80 kg cujo limite é 100 kg:

```typescript
const cargaAtual = 80;
const cargaLimite = 100;
const dentroDoLimite = cargaAtual = cargaLimite;

if (dentroDoLimite) {
  console.log("Carga aprovada.");
} else {
  console.log("Carga rejeitada.");
}
```

Responda:

a) Qual é o problema da terceira linha? RESPOSTA: O problema é que, provavelmente, o dev esqueceu de o operador `<`. O correto seria: 
```typescript
const dentroDoLimite = cargaAtual <= cargaLimite;
```

b) Por que igualdade estrita também não representaria toda a regra? RESPOSTA: A igualdade estrita não representaria a regra porque o desenvolvedor desse código deseja adicionar a carga limite como o limite, ou seja, a carga atual deverá ser menor ou igual à carga limite. Por essa razão, a igualdade estrita não faria sentido.
c) Entregue o código completo corrigido usando o operador relacional adequado.

```typescript
const cargaAtual = 80;
const cargaLimite = 100;
const dentroDoLimite = cargaAtual <= cargaLimite;

if (dentroDoLimite) {
  console.log("Carga aprovada.");
} else {
  console.log("Carga rejeitada.");
}
```

**Saída esperada:**

```text
Carga aprovada.
```

### Questão 6: Classificação de vibração (2 pontos)

Crie `questao06.ts` com `vibracaoAtual = 6.8`. Classifique com `if / else if / else`:

- maior que `8` → `CRÍTICA`;
- maior ou igual a `6` → `ATENÇÃO`;
- abaixo de `6` → `NORMAL`.

Calcule `margemAteCritica` subtraindo a vibração atual de `8`. Use um ternário para criar `exigeInspecao`, com os textos `sim` ou `não`, considerando que qualquer valor a partir de `6` exige inspeção.

**Saída esperada:**

```text
=== ANÁLISE DE VIBRAÇÃO ===
Classificação: ATENÇÃO
Margem até crítica: 1.2000000000000002 mm/s
Exige inspeção: sim
```

> O decimal longo é consequência da representação de ponto flutuante estudada no Capítulo 02; não arredonde.

### Questão 7: Liberação de linha industrial (2,5 pontos)

Crie `questao07.ts` com:

- `codigoDaLinha = "L-04"`;
- `temperaturaAtual = 73` e `temperaturaMaxima = 75`;
- `pressaoAtual = 8.2`, `pressaoMinima = 5` e `pressaoMaxima = 8.5`;
- `protecaoFechada = true`;
- `paradaDeEmergencia = false`;
- `turno: string = "N"`;
- `nomeDoSupervisor: undefined = undefined`.

Requisitos:

1. Crie condições separadas para temperatura segura e pressão dentro da faixa inclusiva.
2. Crie `linhaLiberada`, exigindo temperatura e pressão seguras, proteção fechada e ausência de parada de emergência.
3. Use `if/else` para definir a mensagem `LINHA LIBERADA` ou `LINHA BLOQUEADA`.
4. Use `switch` para definir `nomeDoTurno`: `Manhã`, `Tarde`, `Noite` ou `Inválido` para os códigos `M`, `T`, `N` e demais valores.
5. Use `??` para exibir `Não informado` quando o supervisor estiver ausente.
6. Calcule `margemDeTemperatura` por subtração.

**Saída esperada:**

```text
=== LINHA L-04 ===
Estado: LINHA LIBERADA
Turno: Noite
Margem de temperatura: 2 °C
Supervisor: Não informado
```

---

## Entrega

Crie `resposta.md` com as respostas teóricas e os códigos completos. Mantenha também `questao05.ts`, `questao06.ts` e `questao07.ts` na pasta `avaliacao/` para validação.
