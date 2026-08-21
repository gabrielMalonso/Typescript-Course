# Erros comuns — Funções, callbacks e recursos

Use este arquivo como diagnóstico: encontre o sintoma, confira o contrato e só depois altere o código.

## 1. Descrever uma função apenas pelo retorno

```typescript
function calcularTotal(valor: number, taxa: number): number {
  return valor + taxa;
}
```

Dizer que `calcularTotal` é `number` confunde a função com o resultado de uma chamada.

```typescript
calcularTotal             // (valor: number, taxa: number) => number
calcularTotal(20, 5)      // number
```

O contrato completo informa:

- quantos parâmetros entram;
- o tipo de cada parâmetro;
- o tipo que sai.

Antes de usar uma função como valor ou callback, escreva mentalmente o contrato inteiro.

## 2. Confundir referência com chamada

```typescript
function positivo(valor: number): boolean {
  return valor > 0;
}

function verificar(
  valor: number,
  criterio: (entrada: number) => boolean,
): boolean {
  return criterio(valor);
}

verificar(4, positivo);    // correto: entrega a função
verificar(4, positivo(4)); // erro: entrega o boolean true
```

Sem parênteses, `positivo` é a referência da função. Com parênteses, `positivo(4)` executa agora e produz um resultado.

Pergunte: **o parâmetro espera uma função para chamar depois ou o valor já calculado?**

## 3. Esquecer o `return` em uma arrow com bloco

Uma arrow concisa retorna a expressão implicitamente:

```typescript
const par = (valor: number): boolean => valor % 2 === 0;
```

Ao abrir um bloco com `{}`, o retorno deixa de ser implícito:

```typescript
const par = (valor: number): boolean => {
  valor % 2 === 0; // calcula e descarta o resultado
};
```

Correção:

```typescript
const par = (valor: number): boolean => {
  return valor % 2 === 0;
};
```

Se o callback precisa produzir `boolean`, `number`, `string` ou outro valor, confira se todo caminho realmente retorna esse tipo.

## 4. Tratar opcional, padrão e rest como se fossem iguais

Os três recursos resolvem problemas diferentes:

```typescript
function registrar(
  nome: string,
  setor?: string,
  prioridade = "normal",
  ...codigos: number[]
): void {
  // setor: string | undefined
  // prioridade: string
  // codigos: number[]
}
```

### Parâmetro opcional

`setor?: string` pode continuar `undefined` dentro da função. Não use um teste de verdade quando `0`, `false` ou `""` puderem ser valores válidos; teste a ausência explicitamente.

```typescript
codigo === undefined
```

Um parâmetro obrigatório não deve vir depois de um opcional.

### Valor padrão

O padrão substitui argumento omitido ou `undefined`. Dentro da função, `prioridade` é `string`, não `string | undefined`.

Quando for preciso pular um argumento anterior e ainda fornecer os seguintes, passe `undefined` explicitamente:

```typescript
registrar("reinício", undefined, undefined, 4, 6);
```

### Rest parameter

O rest reúne argumentos separados em um array:

```typescript
function somar(...valores: number[]): number {
  // valores é number[]
  return 0;
}

somar(2, 4, 6);    // correto
somar([2, 4, 6]);  // erro: um array não é um number
```

Só pode existir um rest parameter, e ele deve ser o último.

## 5. Ignorar a diferença entre callback `void` e callback com retorno

Callback `void`: a controladora usa o efeito da chamada.

```typescript
function visitar(exibir: (texto: string) => void): void {
  exibir("pronto");
}
```

Callback com retorno: a controladora precisa capturar e usar o valor produzido.

```typescript
function decidir(criterio: (valor: number) => boolean): string {
  const aprovado = criterio(10);
  return aprovado ? "sim" : "não";
}
```

Erros frequentes:

- declarar `void` quando a decisão depende de um `boolean`;
- chamar um callback com retorno, mas descartar o resultado;
- esperar que o `return` do callback saia diretamente da função controladora;
- somar ou exibir algo dentro do callback quando o contrato pede que ele devolva o valor.

O `return` volta primeiro para o ponto em que o callback foi chamado.

## 6. Achar que closure copia um resultado pronto

```typescript
function criarMinimo(minimo: number): (valor: number) => boolean {
  return (valor): boolean => valor >= minimo;
}

const peloMenos70 = criarMinimo(70);
```

`peloMenos70` guarda uma função. Essa função preserva acesso ao ambiente em que foi criada, inclusive ao valor `70` de `minimo`. A comparação só ocorre quando `peloMenos70(...)` é chamada depois.

Para analisar uma closure, localize:

1. a função externa;
2. a função interna retornada;
3. o valor externo usado pela função interna;
4. quando esse valor é definido;
5. quando ele volta a ser usado.

Não confunda criar o critério com aplicá-lo:

```typescript
const criterio = criarMinimo(70); // cria e guarda uma função
const resultado = criterio(85);  // aplica a função e guarda true
```

## 7. Testar só o caso principal

Um exemplo bem-sucedido não comprova a regra inteira. Neste capítulo, teste também:

- array vazio;
- critério que rejeita todos;
- callback `void` que deve ser chamado zero vezes;
- valor exatamente no limite, como `30` em uma regra `<= 30`;
- valor logo abaixo e logo acima do limite;
- `0` quando ele é um valor válido, não ausência;
- chamada sem argumentos reunidos pelo rest;
- preservação do array e dos objetos originais.

Exemplo de teste de limite:

```typescript
const ate30 = criarLimiteDeDuracao(30);

console.log(ate30({ nome: "A", minutos: 29 })); // true
console.log(ate30({ nome: "B", minutos: 30 })); // true
console.log(ate30({ nome: "C", minutos: 31 })); // false
```

Isso diferencia uma regra `<=` de uma regra `<` e evita implementar apenas os valores da amostra.

## 8. Confundir quantidade, soma e transformação

Ao percorrer objetos com callbacks, confirme o resultado pedido:

- **contar**: acrescenta `1` por item aprovado;
- **somar**: acrescenta o número retornado pelo callback;
- **selecionar**: adiciona o item aprovado a um novo array;
- **transformar**: adiciona o texto ou valor produzido pelo callback.

Um critério `(item) => boolean` decide se entra. Ele não decide automaticamente o que deve ser somado ou produzido.

## 9. Alterar os dados quando bastava produzir um resultado novo

Os exercícios deste capítulo pedem percursos que contam, selecionam ou produzem descrições sem modificar a entrada.

```typescript
const selecionados: { nome: string; ativo: boolean }[] = [];

for (const item of itens) {
  if (criterio(item)) {
    selecionados.push(item);
  }
}
```

O novo array é independente, mas os objetos inseridos continuam sendo as mesmas referências. Não mude propriedades se o requisito é apenas selecionar. Ao final, exiba dados do array original para comprovar que ele foi preservado.

## Checklist de diagnóstico

Antes de concluir:

- [ ] Escrevi o contrato completo de cada função e callback?
- [ ] Entreguei uma referência onde a controladora espera uma função?
- [ ] Toda arrow com bloco e retorno obrigatório possui `return`?
- [ ] Diferenciei opcional, padrão e rest?
- [ ] Usei o retorno dos callbacks que produzem valores?
- [ ] Identifiquei o valor preservado pela closure?
- [ ] Testei vazio, nenhum aprovado, limites e valores alternativos?
- [ ] Conferi a saída do arquivo realmente entregue?
- [ ] Preservei os dados originais quando solicitado?

