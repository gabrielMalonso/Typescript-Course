// Trecho A
const trechoA: string = `1. Tipo inferido na primeira linha: number
2. A atribuição posterior é aceita ou rejeitada pelo TypeScript? - RESPOSTA: A atribuição posterior é aceita, pois se trata do mesmo tipo.
3. Por que os tipos são compatíveis ou incompatíveis? - RESPOSTA: Ambos são do tipo Number, por isso os tipos são compatíveis.`;

// Trecho B
const trechoB: string = `1. Tipo inferido na primeira linha: number
2. A atribuição posterior é aceita ou rejeitada pelo TypeScript? - RESPOSTA: A atribuição posterior não será aceita, pois se tratam de tipos diferentes.
3. Por que os tipos são compatíveis ou incompatíveis? - RESPOSTA: Os tipos são incompatíveis, uma vez que a atribuição posterior atribuiu uma string a um identificador previamente inferido como number.`;

// Trecho C
const trechoC: string = `1. Tipo inferido na primeira linha: string
2. A atribuição posterior é aceita ou rejeitada pelo TypeScript? - RESPOSTA: A atribuição posterior é aceita por esse trato do mesmo tipo. 
3. Por que os tipos são compatíveis ou incompatíveis? - RESPOSTA: O tipo inferido na primeira linha foi string e a atribuição posterior também se trata de um string.`;

// Trecho D
const trechoD: string = `1. Tipo inferido na primeira linha: string
2. A atribuição posterior é aceita ou rejeitada pelo TypeScript? - RESPOSTA: A atribuição posterior não será aceita, pois ela se trata de um boolean. 
3. Por que os tipos são compatíveis ou incompatíveis? - RESPOSTA: Os tipos são incompatíveis, uma vez que a atribuição posterior atribuiu um boolean ao identificador previamente inferido como string.`;


const explicacaoDeValidacao:string = `Validar uma atribuição significa avaliar se aquela atribuição é compatível ou incompatível com o tipo inferido na declaração da constante ou variável.`;

console.log(`Análise de validação registrada.`);
