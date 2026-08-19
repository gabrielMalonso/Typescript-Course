var configuracaoPrincipal = ["som", "vídeo"];
var configuracaoDaTela = configuracaoPrincipal;
configuracaoDaTela.push("controles");
configuracaoPrincipal[0] = "audio";
var mesmaReferencia = configuracaoPrincipal === configuracaoDaTela;
console.log(configuracaoDaTela);
console.log(configuracaoDaTela);
console.log("Mesma refer\u00EAncia: ".concat(mesmaReferencia));
