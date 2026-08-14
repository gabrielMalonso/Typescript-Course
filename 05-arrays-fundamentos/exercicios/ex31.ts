const configuracaoPrincipal: string[] = ["som", "vídeo"];
const configuracaoDaTela = configuracaoPrincipal;

configuracaoDaTela.push("controles");
configuracaoPrincipal[0] = "audio";

const mesmaReferencia = configuracaoPrincipal === configuracaoDaTela;

console.log(configuracaoDaTela);
console.log(configuracaoPrincipal);
console.log(`Mesma referência: ${mesmaReferencia}`);

// Foi criado apenas um array.
// Os dois nomes exibem o mesmo conteúdo.
// Isso acontece porque ambos apontam para o mesmo array na memória.