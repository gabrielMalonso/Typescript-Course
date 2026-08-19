var ferramentas = ["chave", "alicate", "trena"];
// Adições ao array
ferramentas.push("multímetro"); // estado atual: ["chave", "alicate", "trena", "multímetro"]
ferramentas.unshift("luvas"); // estado atual: ["luvas", "chave", "alicate", "trena", "multímetro"]
ferramentas[2] = "torquímetro"; // estado atual: ["luvas", "chave", "torquímetro", "trena", "multímetro"]
// Remoções do array
var itemRetirado = ferramentas.shift(); // estado atual: ["chave", "torquímetro", "trena", "multímetro"]
var itemRemovidoDoFim = ferramentas.pop(); // estado atual: ["chave", "torquímetro", "trena"]
// Output - Resultado final
console.log("Item retirado: ".concat(itemRetirado));
console.log("Item removido do fim: ".concat(itemRemovidoDoFim));
console.log("Primeiro item: ".concat(ferramentas[0]));
console.log("\u00DAltimo item: ".concat(ferramentas[ferramentas.length - 1]));
console.log(ferramentas);
console.log("Quantidade: ".concat(ferramentas.length));
