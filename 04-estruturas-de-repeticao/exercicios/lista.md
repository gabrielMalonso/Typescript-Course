# Exercícios — Capítulo 04: Estruturas de Repetição

## Instruções gerais

- Resolva os exercícios na ordem apresentada.
- Crie cada arquivo dentro de `exercicios/solucoes/`.
- Use apenas conteúdos estudados até este capítulo.
- Use nomes descritivos em `camelCase` e ponto e vírgula.
- Compile e execute cada solução.
- Antes de executar, tente prever a quantidade de iterações e a saída.
- Depois da saída principal, faça os testes alternativos solicitados.
- Os 12 exercícios são obrigatórios; o bônus é opcional.

---

## Nível 1 — Controlando a repetição

### Exercício 1.1: Contagem com `while`

**Arquivo:** `ex11.ts`

Declare `numero = 1` com `let`. Use `while` para exibir os números de `1` até `5`, incluindo os dois limites. Atualize a variável com `++`.

**Saída esperada:**

```text
Número: 1
Número: 2
Número: 3
Número: 4
Número: 5
```

**Teste alternativo:** depois de validar, troque o valor inicial para `6`. O corpo não deve executar.

### Exercício 1.2: Contagem regressiva com `for`

**Arquivo:** `ex12.ts`

Use `for` para contar de `5` até `1`. O contador deve ser declarado no cabeçalho e atualizado com `--`. Depois do loop, exiba `Começou!`.

**Saída esperada:**

```text
5
4
3
2
1
Começou!
```

### Exercício 1.3: Primeira execução garantida

**Arquivo:** `ex13.ts`

Declare `consultasRestantes = 0` com `let`. Use `do...while` para exibir `Consultando atualizações...` e depois diminuir `consultasRestantes` com `--`. A condição deve permitir repetição apenas enquanto o valor for maior que `0`.

**Saída esperada:**

```text
Consultando atualizações...
```

Depois explique em uma constante `string` por que a mensagem aparece mesmo com o valor inicial igual a zero.

### Exercício 1.4: Passos de dez

**Arquivo:** `ex14.ts`

Use `for` para exibir porcentagens de `0` até `100`, incluindo os limites, em passos de `10` com `+=`.

**Saída esperada:**

```text
Progresso: 0%
Progresso: 10%
Progresso: 20%
Progresso: 30%
Progresso: 40%
Progresso: 50%
Progresso: 60%
Progresso: 70%
Progresso: 80%
Progresso: 90%
Progresso: 100%
```

---

## Nível 2 — Alterando o fluxo

### Exercício 2.1: Ignorando múltiplos

**Arquivo:** `ex21.ts`

Percorra os números de `1` a `10` com `for`. Quando o número for múltiplo de `3`, use `continue` para não exibi-lo.

**Saída esperada:**

```text
1
2
4
5
7
8
10
```

**Conferência:** a condição de múltiplo deve usar `%` e igualdade estrita.

### Exercício 2.2: Busca interrompida

**Arquivo:** `ex22.ts`

Declare `codigoProcurado = 7` e `codigoEncontrado = false`. Percorra os códigos de `1` a `10` com `for`.

Em cada iteração:

1. exiba `Verificando código X`;
2. quando encontrar o código procurado, altere `codigoEncontrado` para `true`;
3. use `break` para impedir verificações posteriores.

Depois do loop, exiba o resultado booleano.

**Final da saída esperada:**

```text
Verificando código 7
Encontrado: true
```

Não devem aparecer verificações dos códigos `8`, `9` ou `10`.

### Exercício 2.3: Limite de tentativas

**Arquivo:** `ex23.ts`

Declare:

```typescript
const tentativaCorreta = 3;
const maximoDeTentativas = 5;
let tentativaAtual = 1;
let acessoConcedido = false;
```

Use `while` para testar as tentativas enquanto o limite não for ultrapassado. Em cada iteração:

- exiba `Tentativa X`;
- quando `tentativaAtual` for igual a `tentativaCorreta`, altere `acessoConcedido` para `true` e use `break`;
- caso contrário, aumente `tentativaAtual`.

Depois, exiba `Acesso concedido: true`.

**Teste alternativo:** use `tentativaCorreta = 8`. O loop deve terminar depois da tentativa `5` e exibir `false`.

### Exercício 2.4: Lugares de uma sala

**Arquivo:** `ex24.ts`

Use dois loops `for` aninhados para representar `2` fileiras com `3` lugares em cada uma. Use os nomes `fileira` e `lugar` como contadores.

**Saída esperada:**

```text
F1-L1
F1-L2
F1-L3
F2-L1
F2-L2
F2-L3
```

Crie também `totalDeLugares` com `let`, aumente-o no loop interno e exiba `Total: 6` no final.

---

## Nível 3 — Integrando regras

### Exercício 3.1: Soma seletiva

**Arquivo:** `ex31.ts`

Percorra os números de `1` a `20`. Ignore números pares com `continue`. Some apenas os números ímpares em `somaDosImpares`.

O loop deve ser interrompido com `break` assim que a soma ficar maior ou igual a `25`.

Exiba cada número que realmente foi somado e o total final.

**Saída esperada:**

```text
Somando: 1
Somando: 3
Somando: 5
Somando: 7
Somando: 9
Soma final: 25
```

### Exercício 3.2: Páginas e blocos

**Arquivo:** `ex32.ts`

Um editor possui `3` páginas com `4` blocos em cada página. Use loops aninhados para percorrer todas as posições, mas considere `página 2, bloco 3` como indisponível.

Requisitos:

- use `continue` no loop interno para o bloco indisponível;
- exiba `Página 2, bloco 3: indisponível`;
- para os demais, exiba `Página X, bloco Y: revisado`;
- conte apenas os blocos revisados;
- exiba `Blocos revisados: 11` no final.

### Exercício 3.3: Meta de publicações

**Arquivo:** `ex33.ts`

Declare:

```typescript
const diasDisponiveis = 7;
const metaDePublicacoes = 4;
const diaSemPublicacao = 3;
let publicacoesFeitas = 0;
let metaAtingida = false;
```

Percorra os dias com `for`.

- No dia sem publicação, exiba `Dia 3: pausa` e use `continue`.
- Nos demais dias, aumente e exiba o total de publicações.
- Ao atingir a meta, altere `metaAtingida` para `true`, exiba `Meta atingida no dia X` e use `break`.
- Depois do loop, exiba `Publicações: 4` e `Meta atingida: true`.

**Teste alternativo:** troque a meta para `10`. Todos os sete dias devem ser analisados, e a meta deve terminar como `false`.

### Exercício 3.4: Diagnóstico de loop

**Arquivo:** `ex34.ts`

Analise este código sem executá-lo:

```typescript
let paginaAtual = 1;

while (paginaAtual <= 5) {
  if (paginaAtual === 3) {
    continue;
  }

  console.log(`Página ${paginaAtual}`);
  paginaAtual++;
}
```

Crie três constantes `string`:

- `tipoDoProblema`: classifique o problema;
- `causaDoProblema`: explique por que o valor fica preso em `3`;
- `formaDeCorrigir`: descreva onde a atualização precisa ocorrer.

Depois escreva e execute uma versão corrigida que mostre as páginas `1`, `2`, `4` e `5`, usando `continue` para ignorar a página `3`.

---

## Exercício bônus — Emissão de convites

**Arquivo:** `bonus.ts`

Um evento possui `3` setores e `4` lugares por setor. O setor `2`, lugar `2`, está bloqueado. O sistema deve emitir no máximo `7` convites.

Requisitos:

- use loops `for` aninhados;
- use `continue` para ignorar a posição bloqueada;
- conte os convites emitidos;
- use `break` no loop interno ao alcançar o limite;
- use uma variável booleana e outro `break` para encerrar também o loop externo;
- exiba cada posição emitida, a posição bloqueada e o total final.

**Saída esperada:**

```text
Convite S1-L1
Convite S1-L2
Convite S1-L3
Convite S1-L4
Convite S2-L1
S2-L2 bloqueado
Convite S2-L3
Convite S2-L4
Limite de convites atingido.
Total emitido: 7
```

## Checklist de entrega

- [ ] Criei os 12 arquivos obrigatórios e, se desejado, o bônus.
- [ ] Usei o tipo de loop solicitado em cada exercício.
- [ ] Atualizei corretamente todas as variáveis de controle.
- [ ] Testei valores iniciais, limites e caminhos alternativos.
- [ ] Verifiquei se `break` encerra e `continue` apenas pula a iteração.
- [ ] Comparei a saída realmente executada com a previsão.
