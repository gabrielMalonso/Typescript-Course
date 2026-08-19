# Erros Comuns — Capítulo 01: Variáveis e Constantes

## Sobre Este Documento

Este guia separa três categorias que não devem ser confundidas:

| Categoria | O que acontece |
|---|---|
| Erro de compilação | O TypeScript rejeita o código e mostra uma mensagem. |
| Problema de execução ou saída | O código compila, mas o resultado não corresponde ao pedido. |
| Problema de estilo | O código pode funcionar, mas não segue a convenção adotada. |

---

## Erro 1: Usar `const` em um valor que precisa mudar

### O que acontece

A constante recebe um valor e depois o código tenta reatribuí-la.

### Código com erro

```typescript
const quantidadeEmEstoque = 20;
quantidadeEmEstoque = 18;
```

### Por que está errado

`const` impede que o nome receba outro valor. O TypeScript 5.9.3 informa:

```text
TS2588: Cannot assign to 'quantidadeEmEstoque' because it is a constant.
```

### Código corrigido

```typescript
let quantidadeEmEstoque = 20;
quantidadeEmEstoque = 18;
```

### Como evitar

Comece com `const`, mas troque para `let` quando a regra do problema exigir reatribuição.

---

## Erro 2: Usar `let` sem necessidade

### O que acontece

Um valor que permanece fixo é declarado como se fosse mudar.

### Código com problema

```typescript
let codigoDoProjeto = "ET-2026";
console.log("Código:", codigoDoProjeto);
```

### Por que é um problema

Esse código compila. Portanto, não é erro de compilação. A escolha por `let` apenas comunica uma possibilidade de mudança que não existe neste programa.

### Código melhorado

```typescript
const codigoDoProjeto = "ET-2026";
console.log("Código:", codigoDoProjeto);
```

### Como evitar

Use `const` como padrão e reserve `let` para nomes que realmente serão reatribuídos.

---

## Erro 3: Redeclarar ao tentar reatribuir

### O que acontece

A palavra `let` é repetida quando a intenção era apenas atualizar o valor.

### Código com erro

```typescript
let pecasRestantes = 10;
let pecasRestantes = 8;
```

### Por que está errado

A primeira linha já criou o nome. A segunda tenta criar outro nome igual no mesmo escopo. O compilador informa:

```text
TS2451: Cannot redeclare block-scoped variable 'pecasRestantes'.
```

### Código corrigido

```typescript
let pecasRestantes = 10;
pecasRestantes = 8;
```

### Como evitar

Lembre-se da diferença:

```text
declaração   → let nome = valor;
reatribuição → nome = novoValor;
```

---

## Erro 4: Atribuir um tipo incompatível

### O que acontece

O valor inicial faz o TypeScript inferir um tipo, mas uma atribuição posterior usa outro.

### Código com erro

```typescript
let temperaturaAtual = 24;
temperaturaAtual = "vinte e oito";
```

### Por que está errado

O tipo `number` foi inferido na primeira linha. A anotação não está escrita, mas a verificação continua ativa:

```text
TS2322: Type 'string' is not assignable to type 'number'.
```

### Código corrigido

```typescript
let temperaturaAtual = 24;
temperaturaAtual = 28;
```

### Como evitar

Observe o tipo do valor inicial e mantenha as reatribuições compatíveis. Não presuma que inferência significa ausência de tipo.

---

## Erro 5: Declarar `const` sem inicializar

### O que acontece

A constante é declarada sem receber um valor.

### Código com erro

```typescript
const codigoDoLote: string;
```

### Por que está errado

Como uma constante não pode ser reatribuída depois, ela precisa ser inicializada na declaração:

```text
TS1155: 'const' declarations must be initialized.
```

### Código corrigido

```typescript
const codigoDoLote: string = "LT-31";
```

Se o valor só estiver disponível depois, use `let` com um tipo explícito:

```typescript
let codigoDoLote: string;
codigoDoLote = "LT-31";
```

### Como evitar

Ao escrever `const`, complete a declaração com `= valor`.

---

## Erro 6: Usar um identificador inválido ou pouco claro

### O que acontece

O nome começa com número, contém espaço ou hífen, ou é tão abreviado que esconde seu significado.

### Código com erro

```typescript
const 2andar = 2;
const nome-aluno = "Bianca";
```

Exemplo válido, mas pouco claro:

```typescript
const qtd = 24;
```

### Por que está errado

Números não podem iniciar identificadores, e espaços e hífens não podem fazer parte deles. Já `qtd` compila, mas prejudica a leitura: isso é uma questão de nomenclatura, não de compilação.

### Código corrigido

```typescript
const numeroDoAndar = 2;
const nomeDaAluna = "Bianca";
const quantidadeDeParafusos = 24;
```

### Como evitar

Use nomes descritivos em `camelCase`. Pergunte: “Alguém entenderia este valor sem procurar outras linhas?”

---

## Erro 7: Acessar uma variável fora do escopo

### O que acontece

Um nome declarado com `let` ou `const` dentro de um bloco é usado depois do fechamento das chaves.

### Código com erro

```typescript
{
  const localDaMedicao = "Câmara A";
  console.log("Local:", localDaMedicao);
}

console.log("Local final:", localDaMedicao);
```

### Por que está errado

`localDaMedicao` só existe dentro do bloco. Fora dele, o compilador informa:

```text
TS2304: Cannot find name 'localDaMedicao'.
```

### Código corrigido

Se o nome só é necessário no bloco, não o use fora:

```typescript
{
  const localDaMedicao = "Câmara A";
  console.log("Local:", localDaMedicao);
}
```

Se precisa ser usado nas duas regiões, declare-o fora:

```typescript
const localDaMedicao = "Câmara A";

{
  console.log("Local:", localDaMedicao);
}

console.log("Local final:", localDaMedicao);
```

### Como evitar

Localize as chaves que cercam a declaração. Um nome externo pode ser acessado em um bloco interno; um nome interno não fica disponível fora dele.

---

## Erro 8: Usar `var` esperando escopo de bloco

### O que acontece

Um nome declarado com `var` dentro de um bloco continua acessível fora dele.

### Código surpreendente

```typescript
{
  var operadorAtual = "Rafael";
}

console.log(operadorAtual);
```

### Por que é um problema

Esse exemplo pode compilar e executar. `var` possui escopo de função, mas não de bloco, e por isso a etiqueta “vaza” das chaves. O problema é a menor previsibilidade, não uma rejeição obrigatória do compilador.

### Código melhorado

```typescript
{
  const operadorAtual = "Rafael";
  console.log(operadorAtual);
}
```

### Como evitar

Não use `var` em código novo. Escolha `const` ou `let` de acordo com a necessidade de reatribuição.

---

## Erro 9: Tratar ponto e vírgula como erro de compilação

### O que acontece

Uma instrução sem `;` é classificada automaticamente como inválida.

### Código sem ponto e vírgula

```typescript
const material = "Aço"
const quantidade = 12
```

### Por que a classificação está errada

Essas linhas normalmente compilam por causa das regras de inserção automática de ponto e vírgula do JavaScript. Neste curso, finalizar instruções com `;` é uma convenção para manter consistência, não uma afirmação de que toda ausência gera erro.

### Código conforme o estilo do curso

```typescript
const material = "Aço";
const quantidade = 12;
```

### Como evitar

Faça duas perguntas separadas: “o compilador rejeita?” e “o código segue a convenção do projeto?”

---

## Erro 10: Criar espaços extras no `console.log`

### O que acontece

A string já termina com espaço e a vírgula adiciona a separação visual entre os argumentos.

### Código com saída divergente

```typescript
const raio = 5;
console.log("Raio: ", raio);
```

Dependendo do ambiente, a saída terá dois espaços entre `:` e `5`:

```text
Raio:  5
```

### Por que está errado

O código compila. O problema é que a saída não corresponde exatamente a `Raio: 5`.

### Código corrigido

Com argumentos separados:

```typescript
const raio = 5;
console.log("Raio:", raio);
```

Com concatenação:

```typescript
const raio = 5;
console.log("Raio: " + raio);
```

### Como evitar

Ao usar vírgula, normalmente termine o texto logo após `:`. Ao usar `+`, inclua explicitamente o espaço na string. Sempre execute e compare a saída caractere por caractere.

---

## Checklist Anti-Erros

Antes de finalizar seu código, verifique:

- [ ] Usei `const` nos valores fixos e `let` somente nos que mudam.
- [ ] Reatribuí sem repetir `let`.
- [ ] Mantive o mesmo tipo nas reatribuições.
- [ ] Inicializei todas as constantes.
- [ ] Usei identificadores válidos, descritivos e em `camelCase`.
- [ ] Acessei cada nome somente dentro de seu escopo.
- [ ] Evitei `var`.
- [ ] Mantive ponto e vírgula de forma consistente sem confundi-lo com regra universal de compilação.
- [ ] Comparei a saída real, incluindo espaços, acentos e pontuação.
- [ ] Conferi se o arquivo salvo é exatamente a versão que compilei e executei.

## Mensagens de Erro do Compilador

As mensagens abaixo correspondem ao TypeScript 5.9.3. O texto pode variar um pouco em outra versão ou conforme o trecho ao redor.

| Mensagem | Significado | Solução |
|---|---|---|
| `TS2588: Cannot assign to 'nome' because it is a constant.` | Houve tentativa de reatribuir uma `const`. | Mantenha o valor ou use `let` se a mudança for necessária. |
| `TS2451: Cannot redeclare block-scoped variable 'nome'.` | O mesmo nome foi declarado novamente no mesmo escopo. | Remova a segunda palavra-chave e apenas reatribua, ou escolha outro nome quando forem dados distintos. |
| `TS2322: Type 'string' is not assignable to type 'number'.` | O valor atribuído é incompatível com o tipo declarado ou inferido. | Use um valor do tipo correto. |
| `TS1155: 'const' declarations must be initialized.` | Uma `const` foi criada sem valor inicial. | Atribua o valor na própria declaração. |
| `TS2304: Cannot find name 'nome'.` | O nome não existe nessa região ou foi escrito incorretamente. | Confira a grafia e declare-o em um escopo adequado. |

