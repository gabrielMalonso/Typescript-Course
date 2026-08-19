# Recursos Adicionais — Capítulo 02: Tipos Primitivos

Use estes materiais como consulta depois de estudar a aula e tentar os exercícios. Algumas páginas abrangem assuntos futuros; siga o roteiro para manter o foco.

## Documentação Oficial

- [TypeScript Handbook — Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) — Leia as seções sobre `string`, `number`, `boolean`, anotações, inferência e `null`/`undefined`.
- [TypeScript Handbook — Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) — Explica como o compilador deduz tipos a partir dos valores e do contexto.
- [TypeScript Handbook — Symbols](https://www.typescriptlang.org/docs/handbook/symbols.html) — Referência para reconhecer `symbol`; não é necessário estudar os usos avançados agora.
- [MDN — Tipos e estruturas de dados](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Data_structures) — Visão oficial dos valores primitivos da linguagem executada após a compilação.
- [MDN — `Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) — Limites, precisão e valores numéricos especiais.
- [MDN — Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) — Crases, interpolação com `${...}` e strings em várias linhas.
- [MDN — `BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) — Consulta breve sobre inteiros grandes e a incompatibilidade direta com `number`.
- [MDN — `Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) — Consulta breve sobre identificadores únicos.

## Roteiro de Leitura

1. No *Everyday Types*, leia apenas “The primitives” e “Type Annotations on Variables”.
2. Revise na MDN a tabela de tipos primitivos e compare texto, número, booleano e ausência.
3. Leia os exemplos iniciais de *Template literals* e reproduza dois deles no Playground.
4. Consulte a página de `Number` apenas nas partes sobre representação numérica e precisão.
5. Leia somente a introdução de `BigInt` e `Symbol`; eles são apresentados para reconhecimento neste capítulo.
6. Deixe arrays, objetos, funções, unions e narrowing para os capítulos correspondentes.

## Playgrounds e Ferramentas

- [TypeScript Playground](https://www.typescriptlang.org/play) — Editor oficial para testar inferência, anotações e mensagens do compilador.
- [`noEmit` no TSConfig](https://www.typescriptlang.org/tsconfig/noEmit.html) — Referência oficial para verificar tipos sem gerar JavaScript.
- `tsc arquivo.ts` — Compila e mostra erros de tipo ou sintaxe.
- `tsc arquivo.ts --noEmit` — Verifica o arquivo sem gerar `.js`.
- `node arquivo.js` — Executa o JavaScript gerado para conferir cálculos e saída.

Ao investigar um problema, altere um item por vez. Depois faça duas verificações separadas: compilação e fidelidade ao enunciado.

## Exercícios Extras

### Exercício Extra 1: Auditoria de Tipos

Declare, com anotação explícita, os valores de uma inspeção:

- temperatura: `31.5`;
- setor: `Laboratório B`;
- inspeção concluída: `false`;
- observação confirmada como ausente;
- código externo ainda não definido.

Exiba uma linha para cada valor. Depois confira se textos estão entre aspas e se `false`, `null` e `undefined` estão sem aspas.

### Exercício Extra 2: Soma ou Concatenação?

Crie quatro constantes que produzam, respectivamente:

```text
30
1020
Sensor-12
Leitura: 12 bar
```

Use `10 + 20`, concatenação entre as strings `"10"` e `"20"`, concatenação de texto com número e um template literal. Antes de executar, registre em uma constante `string` se cada resultado será `number` ou `string`.

### Exercício Extra 3: Revisão em Duas Etapas

Crie um relatório de duas medições, `14.5` e `19.5`. Calcule a soma e a diferença, registre o estado booleano `true` e exiba exatamente:

```text
=== MEDIÇÕES ===
Primeira: 14.5 mm
Segunda: 19.5 mm
Total: 34 mm
Diferença: 5 mm
Conferido: true
```

Revise primeiro os tipos e cálculos. Depois compare rótulos, espaços, acentos, unidades e pontuação caractere por caractere.

## Conceitos Relacionados

*Prévia breve de conexões futuras:*

- **Operadores e expressões** (Capítulo 03): aprofundará precedência e outros operadores usados com valores primitivos.
- **Union types** (capítulo posterior): permitirão declarar conscientemente que um dado aceita, por exemplo, um valor ou uma ausência.
- **Objetos** (capítulo posterior): combinarão vários valores tipados em uma estrutura maior.

Não é necessário estudar esses assuntos antecipadamente.

## Glossário do Capítulo

| Termo | Definição |
|---|---|
| Tipo primitivo | Categoria básica de valor, como número, texto ou estado lógico. |
| `number` | Tipo usado para inteiros, decimais e notação científica. |
| Notação científica | Escrita como `2.5e3`, que representa `2.5 × 1000`. |
| Ponto flutuante | Forma usada para representar números, sujeita a pequenas limitações de precisão decimal. |
| `string` | Sequência de caracteres delimitada por aspas ou crases. |
| Concatenação | União de textos com o operador `+`. |
| Template literal | String entre crases que pode interpolar valores com `${...}`. |
| Interpolação | Inserção do resultado de uma expressão dentro de um template literal. |
| `boolean` | Tipo com apenas dois valores: `true` e `false`. |
| `null` | Valor usado no capítulo para comunicar ausência intencional. |
| `undefined` | Valor usado no capítulo para comunicar que algo ainda não foi definido. |
| `bigint` | Tipo de inteiro grande cujo literal termina em `n`. |
| `symbol` | Tipo primitivo usado para criar identificadores únicos. |
| Inferência de tipo | Dedução automática do tipo a partir do valor inicial. |
| Anotação de tipo | Tipo escrito explicitamente depois do nome, como `: number`. |
| Compatibilidade | Relação que determina se um valor pode ser atribuído a determinado tipo. |
| Erro de compilação | Problema que faz o TypeScript rejeitar o código. |
| Saída incorreta | Resultado executado que não corresponde ao comportamento ou formato pedido. |
| Problema de estilo | Escrita que funciona, mas reduz clareza ou contraria uma convenção do curso. |
