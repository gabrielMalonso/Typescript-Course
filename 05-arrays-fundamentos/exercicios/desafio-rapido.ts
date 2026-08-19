const ferramentas: string[] = ["chave", "alicate", "trena"];

// Adições ao array
ferramentas.push("multímetro"); // estado atual: ["chave", "alicate", "trena", "multímetro"]
ferramentas.unshift("luvas"); // estado atual: ["luvas", "chave", "alicate", "trena", "multímetro"]

ferramentas[2] = "torquímetro"; // estado atual: ["luvas", "chave", "torquímetro", "trena", "multímetro"]

// Remoções do array
const itemRetirado = ferramentas.shift(); // estado atual: ["chave", "torquímetro", "trena", "multímetro"]
const itemRemovidoDoFim = ferramentas.pop(); // estado atual: ["chave", "torquímetro", "trena"]

// Output - Resultado final
console.log(`Item retirado: ${itemRetirado}`);
console.log(`Item removido do fim: ${itemRemovidoDoFim}`);
console.log(`Primeiro item: ${ferramentas[0]}`);
console.log(`Último item: ${ferramentas[ferramentas.length - 1]}`);
console.log(ferramentas);
console.log(`Quantidade: ${ferramentas.length}`);