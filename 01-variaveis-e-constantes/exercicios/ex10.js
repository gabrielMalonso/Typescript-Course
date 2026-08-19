var explicacaoEscopoGlobal = "Variáveis e constantes const e let declarados globalmente no arquivo podem ser acessados também globalmente durante todo o código. Podem ser acessados dentro e fora de blocos e funções. - Isso faz sentido para uma constante que será reutilizada várias vezes ao longo de todo o código.";
var explicacaoEscopoDeBloco = "Variáveis e constantes const e let declaradas dentro do escopo de um bloco só podem ser acessadas dentro desse bloco. Se forem usadas fora, dá erro de compilação. - Isso faz sentido, por exemplo, pra uma variável ou constante que só vai ser usada em uma parte do código, não faz sentido guardar esses dados em todo o programa.";
var explicacaoEscopoDeFuncao = "Um nome declarado dentro de uma função só pode ser usado nela; isso faz sentido para guardar um resultado temporário usado apenas naquele cálculo.";
var nomeDoArquivo = "mapa.ts";
console.log("Arquivo:", nomeDoArquivo);
{
    var nomeDaSecao = "Escopos";
    console.log("Seção:", nomeDaSecao);
    console.log("Arquivo dentro do bloco:", nomeDoArquivo);
}
console.log("Arquivo ao final:", nomeDoArquivo);
console.log("Mapa de escopos concluído.");
