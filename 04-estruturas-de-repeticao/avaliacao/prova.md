# Prova — Capítulo 04: Estruturas de Repetição

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
- Registre as respostas teóricas em `avaliacao/resposta.md`; não edite este enunciado.
- Mantenha `questao05.ts`, `questao06.ts` e `questao07.ts` na pasta `avaliacao/`.

---

## Parte 1 — Teoria (4 pontos)

### Questão 1: Previsão de execução (1 ponto)

Sem executar, informe exatamente quais números serão exibidos e quantas iterações chegam ao `console.log`:

```typescript
for (let numero = 1; numero <= 8; numero++) {
  if (numero === 3) {
    continue;
  }

  if (numero === 6) {
    break;
  }

  console.log(numero);
}
```

Explique separadamente o efeito de `continue` e de `break` nesse código.

### Questão 2: Escolha da estrutura (1 ponto)

Indique a estrutura geralmente mais clara para cada situação e justifique em uma frase:

1. exibir uma contagem de `1` a `20`, com início, limite e passo conhecidos;
2. repetir uma tentativa enquanto ainda houver créditos, podendo executar zero vezes;
3. mostrar um menu uma vez antes de decidir se ele será mostrado novamente.

Escolha entre `for`, `while` e `do...while`. Use cada estrutura uma vez.

### Questão 3: Verdadeiro ou falso (1 ponto)

Marque **V** ou **F** e justifique as falsas.

1. ( ) Um `while` pode executar zero vezes.
2. ( ) Um `do...while` testa a condição antes da primeira execução.
3. ( ) Em loops aninhados, um `break` simples encerra automaticamente todos os loops.
4. ( ) No `for`, a atualização do cabeçalho ainda ocorre depois de um `continue`.

### Questão 4: Segurança de um loop (1 ponto)

Explique as três verificações fundamentais que você faria antes de executar um loop para reduzir o risco de repetição infinita. Sua resposta deve mencionar condição, atualização e direção do avanço.

---

## Parte 2 — Prática (6 pontos)

### Questão 5: Diagnóstico e correção (1,5 ponto)

Crie `questao05.ts`. O código deveria exibir uma contagem regressiva de `3` até `0` e então terminar:

```typescript
let contador = 3;

while (contador >= 0) {
  console.log(contador);
  contador++;
}

console.log("Fim");
```

Responda em `resposta.md`:

1. Por que o loop não termina?
2. Qual parte está correta e qual atualização precisa mudar?
3. Quais valores devem aparecer depois da correção?

Entregue em `questao05.ts` o código completo corrigido usando `while`.

**Saída esperada:**

```text
3
2
1
0
Fim
```

### Questão 6: Seleção de números (2 pontos)

Crie `questao06.ts`. Percorra os números de `1` a `15` com `for`.

Requisitos:

- ignore os números pares usando `continue`;
- exiba e some apenas os números ímpares;
- encerre com `break` quando a soma ficar maior ou igual a `36`;
- depois do loop, exiba a soma final e o último número somado.

**Saída esperada:**

```text
Número somado: 1
Número somado: 3
Número somado: 5
Número somado: 7
Número somado: 9
Número somado: 11
Soma final: 36
Último número: 11
```

### Questão 7: Emissão de ingressos (2,5 pontos)

Crie `questao07.ts` para representar um teatro com `3` setores e `4` assentos por setor.

Dados obrigatórios:

```typescript
const totalDeSetores = 3;
const assentosPorSetor = 4;
const setorBloqueado = 2;
const assentoBloqueado = 2;
const limiteDeIngressos = 6;
```

Requisitos:

1. use dois loops `for` aninhados;
2. identifique a posição bloqueada combinando duas comparações com `&&`;
3. exiba a posição bloqueada e use `continue` para não emitir ingresso nela;
4. conte e exiba cada ingresso emitido;
5. ao atingir o limite, altere uma variável booleana e use `break` para sair do loop interno;
6. depois do loop interno, use a variável booleana para encerrar também o loop externo;
7. exiba o total e o estado final depois dos loops.

**Saída esperada:**

```text
Ingresso S1-A1
Ingresso S1-A2
Ingresso S1-A3
Ingresso S1-A4
Ingresso S2-A1
S2-A2 bloqueado
Ingresso S2-A3
Limite atingido.
Total emitido: 6
Emissão encerrada: true
```

---

## Entrega

Ao finalizar, a pasta `avaliacao/` deve conter:

```text
prova.md       → enunciado preservado, sem respostas
resposta.md    → respostas das questões 1 a 5
questao05.ts   → código completo da questão 5
questao06.ts   → código completo da questão 6
questao07.ts   → código completo da questão 7
```

Antes de entregar, execute os três arquivos `.ts` e compare cada linha funcional com a saída esperada.
