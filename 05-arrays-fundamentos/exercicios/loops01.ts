const ferramentas: string[] = ["chave", "alicate", "multímetro"];
let quantidade = 0;

for (let indice = 0; indice < ferramentas.length; indice++) {
    console.log(`Índice: ${indice} - item ${indice + 1}: ${ferramentas[indice]}`);
    quantidade++;
}
console.log(`Quantidade: ${quantidade}`);
