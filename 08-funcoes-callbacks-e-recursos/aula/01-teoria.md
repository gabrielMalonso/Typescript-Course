# Aula 01 — Funções que recebem funções

## 1. Antes do callback: o contrato completo

Uma função não é descrita apenas pelo tipo que retorna. Seu contrato inclui:

```text
NOME + PARÂMETROS + TIPOS DE ENTRADA + TIPO DE RETORNO
```

```typescript
function calcularArea(largura: number, altura: number): number {
  return largura * altura;
}
```

O valor `calcularArea` possui o tipo:

```typescript
(largura: number, altura: number) => number
```

Já `calcularArea(4, 3)` é a chamada e produz um `number`.

```text
calcularArea          → função → (number, number) => number
calcularArea(4, 3)    → retorno da chamada → number
```

Essa distinção é a base de callbacks.

## 2. Funções são valores

Como já visto no Capítulo 06, uma função pode ser guardada sem ser executada:

```typescript
const somar = (a: number, b: number): number => a + b;
const operacao = somar;

console.log(operacao(8, 2)); // 10
```

Não há parênteses em `const operacao = somar`. A referência da função foi copiada. Os parênteses aparecem depois, quando `operacao(8, 2)` a executa.

## 3. Funções anônimas

Uma função anônima não possui nome próprio na sua definição:

```typescript
const dobrar = function (valor: number): number {
  return valor * 2;
};
```

A função é anônima, embora a variável `dobrar` dê um nome pelo qual podemos alcançá-la.

Arrow functions também são frequentemente anônimas:

```typescript
const triplicar = (valor: number): number => valor * 3;
```

Elas são úteis como argumentos quando a regra é curta e usada naquele lugar:

```typescript
executarCalculo(5, (valor: number): number => valor * 3);
```

## 4. Uma função pode receber outra

Veja uma função que recebe um número e uma regra:

```typescript
function executarCalculo(
  valor: number,
  calcular: (entrada: number) => number,
): number {
  return calcular(valor);
}
```

O segundo parâmetro não é um `number`. Ele precisa ser uma função que:

1. recebe um `number`;
2. retorna um `number`.

```text
calcular: (entrada: number) => number
          └──── entrada ────┘  └retorno┘
```

A chamada pode entregar uma função já existente:

```typescript
function dobrar(valor: number): number {
  return valor * 2;
}

const resultado = executarCalculo(7, dobrar);
```

O fluxo é:

```text
executarCalculo(7, dobrar)
         │         │
         │         └── função entregue, ainda sem executar
         ↓
calcular(valor)
         │
         └── agora dobrar(7) é executada
         ↓
        14
```

## 5. O que é um callback

Callback é uma função passada como argumento para outra função. A função que a recebe decide quando chamá-la e quais argumentos entregar.

```typescript
function anunciar(
  mensagem: string,
  exibir: (texto: string) => void,
): void {
  exibir(`Aviso: ${mensagem}`);
}

anunciar("inspeção concluída", (texto: string): void => {
  console.log(texto);
});
```

### Contrato e implementação são partes diferentes

Este trecho não implementa uma função:

```typescript
exibir: (texto: string) => void
```

Ele declara o parâmetro `exibir` e seu **contrato**: o valor recebido precisa ser uma função que aceite uma `string` e retorne `void`. A implementação concreta chega como segundo argumento da chamada:

```text
mensagem ← "inspeção concluída"
exibir   ← (texto) => console.log(texto)
```

O callback apenas foi entregue. Ele será executado quando `anunciar` chegar a `exibir(...)`. Nesse momento, recebe `"Aviso: inspeção concluída"` e executa `console.log(texto)`.

| Parte | Decide |
|---|---|
| `anunciar` | **quando** chamar e **qual argumento** entregar |
| callback | **o que fazer** quando for chamado |

### Passar não é chamar

```typescript
function mostrar(texto: string): void {
  console.log(texto);
}

anunciar("ok", mostrar);            // entrega a função
anunciar("ok", mostrar("agora")); // erro: entrega o retorno void
```

Sem parênteses, `mostrar` representa a própria função. Com parênteses, `mostrar("agora")` executa imediatamente e produz `void`, que não satisfaz o contrato esperado.

> **A assinatura do callback descreve o formato da função que será recebida; a implementação chega como argumento na chamada.**

### Modelo mental: preenche → substitui → executa

[![Cartilha do fluxo de um callback void: a chamada preenche os parâmetros mensagem e exibir, anunciar substitui os valores e então executa o callback com o texto produzido.](/images/capitulo-08/modelo-mental-callback-void.png)](/images/capitulo-08/modelo-mental-callback-void.png)

*Clique ou toque na cartilha para abrir em tamanho original.*

## 6. O retorno do callback importa

Um callback pode produzir um valor que a função controladora reutiliza:

```typescript
function aplicarTaxa(
  valor: number,
  calcularTaxa: (base: number) => number,
): number {
  const taxa = calcularTaxa(valor);
  return valor + taxa;
}
```

```typescript
const total = aplicarTaxa(100, (base: number): number => base * 0.1);
console.log(total); // 110
```

O `return` do callback retorna para `aplicarTaxa`, não diretamente para o restante do programa:

```text
callback retorna 10
        ↓
aplicarTaxa recebe 10 e calcula 100 + 10
        ↓
aplicarTaxa retorna 110
```

### Modelo mental: o retorno volta para quem chamou o callback

[![Cartilha em seis etapas: aplicarTaxa recebe o valor e o callback, chama calcularTaxa com 100, recebe 10, calcula 110 e devolve o total para a chamada externa.](/images/capitulo-08/modelo-mental-callback-retorno.png)](/images/capitulo-08/modelo-mental-callback-retorno.png)

*Clique ou toque na cartilha para abrir em tamanho original.*

## 7. Callback com objeto

O argumento do callback pode ser um objeto completo:

```typescript
function avaliarEquipamento(
  equipamento: { nome: string; temperatura: number },
  regra: (item: { nome: string; temperatura: number }) => boolean,
): boolean {
  return regra(equipamento);
}
```

```typescript
const estaQuente = avaliarEquipamento(
  { nome: "Forno", temperatura: 180 },
  (item): boolean => item.temperatura > 100,
);
```

O nome `item` é local ao callback. O que precisa coincidir é o contrato: forma do objeto recebido e tipo devolvido.

## 8. Callback com array de objetos — sem métodos avançados

Podemos criar nossa própria função controladora e usar `for...of`:

```typescript
function contarEquipamentos(
  equipamentos: { nome: string; ativo: boolean }[],
  atende: (item: { nome: string; ativo: boolean }) => boolean,
): number {
  let quantidade = 0;

  for (const equipamento of equipamentos) {
    if (atende(equipamento)) {
      quantidade += 1;
    }
  }

  return quantidade;
}
```

A função controla o percurso. O callback controla a decisão:

```typescript
const ativos = contarEquipamentos(
  [
    { nome: "Bomba", ativo: true },
    { nome: "Motor", ativo: false },
  ],
  (item): boolean => item.ativo,
);
```

```text
contarEquipamentos → decide QUANDO percorrer e contar
callback            → decide QUAL condição um item deve cumprir
```

Esse modelo prepara o Capítulo 09 sem usar seus métodos antes da hora.

## 9. Parâmetro opcional e valor padrão não são iguais

Parâmetro opcional pode não receber argumento:

```typescript
function criarEtiqueta(nome: string, codigo?: string): string {
  return codigo === undefined ? nome : `${codigo} - ${nome}`;
}
```

Dentro da função, `codigo` é `string | undefined`.

Valor padrão também permite omitir o argumento, mas substitui a ausência:

```typescript
function criarSaudacao(nome: string, prefixo = "Olá"): string {
  return `${prefixo}, ${nome}!`;
}
```

Dentro da função, `prefixo` é `string`.

```text
opcional `codigo?`       → pode continuar undefined
default `prefixo = ...`  → recebe um valor quando omitido
```

## 10. Rest parameters: quantidade variável de argumentos

Um rest parameter reúne os argumentos restantes em um array:

```typescript
function somarTudo(...valores: number[]): number {
  let total = 0;

  for (const valor of valores) {
    total += valor;
  }

  return total;
}

somarTudo(2, 4, 6); // valores será [2, 4, 6]
```

O `...` fica no último parâmetro. Aqui ele coleta argumentos; não é o spread de objetos visto no capítulo anterior.

## 11. Closure: uma função lembra do ambiente

Uma função interna pode continuar acessando valores da função externa mesmo depois que a externa terminou:

```typescript
function criarMultiplicador(fator: number): (valor: number) => number {
  return (valor: number): number => valor * fator;
}

const triplicar = criarMultiplicador(3);
console.log(triplicar(4)); // 12
```

### As duas funções são chamadas em momentos diferentes

Neste exemplo existem duas chamadas:

```typescript
const triplicar = criarMultiplicador(3); // chamada 1
console.log(triplicar(4));               // chamada 2
```

Na primeira chamada, `fator` recebe `3` e `criarMultiplicador` cria e devolve a função interna. O cálculo `valor * fator` ainda não acontece, porque o corpo dessa função interna ainda não foi executado.

```text
criarMultiplicador(3)
        │
        ├── fator recebe 3
        ├── cria a função (valor) => valor * fator
        └── devolve essa função para triplicar
```

Na segunda chamada, `triplicar(4)` executa a função que havia sido devolvida. Agora `valor` recebe `4`, enquanto `fator` continua acessível com o valor `3`:

```text
triplicar(4)
     │
     ├── valor recebe 4
     ├── fator continua sendo 3
     └── 4 × 3 → 12
```

Portanto, `criarMultiplicador(3)` não calcula `3` vezes algum valor. Ela monta e devolve a “máquina” que fará esse cálculo depois. Quem efetivamente calcula é `triplicar(4)`.

### Onde está a closure?

A closure é a combinação de:

```text
função interna
      +
acesso ao ambiente em que ela foi criada
```

Quando `criarMultiplicador(3)` termina, sua variável local `fator` normalmente deixaria de ser necessária. Porém, a função interna usa essa variável. Por isso, enquanto a função devolvida existir, ela preserva acesso ao ambiente em que `fator` está.

Não é preciso imaginar que o código da função foi reescrito como `valor * 3`. Isso pode ajudar como simplificação inicial, mas o mecanismo real é o acesso preservado à variável `fator`, não uma substituição de texto nem uma cópia congelada.

Cada chamada da função externa cria um ambiente independente:

```typescript
const dobrar = criarMultiplicador(2);
const triplicar = criarMultiplicador(3);

console.log(dobrar(5));     // 10 — fator = 2
console.log(triplicar(5));  // 15 — fator = 3
```

`dobrar` e `triplicar` foram criadas por chamadas diferentes. Cada função lembra do seu próprio `fator`.

Para reconhecer uma closure, procure estas três peças:

1. função externa;
2. variável do ambiente externo;
3. função interna que continua usando essa variável depois.

> **Closure é uma função acompanhada do acesso ao ambiente em que foi criada.**

## 12. Extra: IIFE

IIFE significa *Immediately Invoked Function Expression*: uma expressão de função executada imediatamente após ser criada.

Antes de olhar a execução imediata, separe o contrato da função:

```typescript
function teste(objeto: { dentroDoObjeto: string }): string {
  return "teste";
}
```

```text
(objeto: { dentroDoObjeto: string })  → entrada: um parâmetro objeto
: string                              → saída: uma string
```

Se os parênteses da definição estão vazios, a função aceita zero parâmetros. Ela continua tendo um contrato de entrada: esse contrato apenas diz que nenhuma entrada é esperada.

```typescript
const criarModo = function (): { modo: string } {
  const modo = "seguro";
  return { modo };
};
```

```text
()                  → entrada: zero parâmetros
: { modo: string }  → saída: objeto com a propriedade modo do tipo string
```

Essa função é anônima porque não existe um nome entre `function` e `()`. A variável `criarModo` apenas oferece uma forma de alcançá-la; isso não altera seu contrato. O trecho `{ modo: string }`, depois dos parâmetros, é o tipo de retorno prometido pela função. O `return { modo }` entrega um objeto que cumpre essa promessa.

Uma função anônima escrita com `function` não pode ficar sozinha como uma declaração:

```typescript
function (): { modo: string } { // erro de sintaxe: declaração sem nome
  return { modo: "seguro" };
}
```

Ela precisa aparecer onde uma expressão é permitida, por exemplo depois de `=`, como no exemplo de `criarModo`, ou agrupada entre parênteses, como na IIFE a seguir.

### Guardar a função ou guardar o resultado

Sem a chamada final, a variável guarda a própria função:

```typescript
const criarConfiguracao = function (): { modo: string } {
  const modo = "seguro";
  return { modo };
};

const configuracao = criarConfiguracao();
```

```text
criarConfiguracao  → função do tipo () => { modo: string }
configuracao       → resultado do tipo { modo: string }
```

A IIFE reúne a criação e a chamada da função na mesma expressão:

```typescript
const configuracao = (function (): { modo: string } {
  const modo = "seguro";
  return { modo };
})();
```

Leia as três partes separadamente:

```text
function () { ... }    → cria a função anônima
(                     ) → agrupa a expressão de função
                       () → chama a função imediatamente
```

Portanto, `configuracao` não recebe a função. Ela recebe o objeto devolvido pela chamada:

```text
(function (): { modo: string } { ... })  → a função
(function (): { modo: string } { ... })() → o retorno da função
```

Os parênteses de agrupamento ao redor de `function` são a forma tradicional de deixar evidente que temos uma expressão de função pronta para ser chamada. Em uma atribuição, a função já está em posição de expressão e poderia ser guardada sem esse agrupamento:

```typescript
const criarConfiguracao = function (): { modo: string } {
  return { modo: "seguro" };
};
```

O que torna o primeiro exemplo uma IIFE é especificamente o `()` final: ele executa a função no mesmo momento em que ela é criada.

Ao ler uma IIFE, pergunte:

1. O que aparece entre os parênteses dos parâmetros?
2. Qual tipo aparece depois deles como retorno?
3. Onde estão os `()` que fazem a chamada?
4. A variável externa guardará a função ou o resultado dessa chamada?

IIFEs eram muito usadas para criar isolamento antes dos módulos modernos. Hoje são menos comuns. Saiba reconhecer o contrato e a chamada; não precisa usá-las por reflexo.

## 13. Checklist de leitura

Ao encontrar um callback, pergunte:

1. Qual função recebe outra função?
2. Qual parâmetro representa o callback?
3. Qual é o contrato completo desse callback?
4. Onde ele é chamado?
5. Quais argumentos recebe nessa chamada?
6. O retorno é ignorado ou reutilizado?
7. Existe algum valor externo preservado por closure?
