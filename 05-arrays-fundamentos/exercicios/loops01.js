var ferramentas = ["chave", "alicate", "multímetro"];
var quantidade = 0;
for (var indice = 0; indice < ferramentas.length; indice++) {
    console.log("\u00CDndice: ".concat(indice, " - item ").concat(indice + 1, ": ").concat(ferramentas[indice]));
    quantidade++;
}
console.log("Quantidade: ".concat(quantidade));
