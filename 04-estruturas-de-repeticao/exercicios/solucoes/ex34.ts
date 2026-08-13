const tipoDoProblema =  "É um problema de loop infinito, ou seja, a condição para finalizar o loop nunca é alcançada.";
const causaDoProblema = "Isso acontece porque você usa o comando contínuo dentro do if. Se isso rolar, o loop volta ao começo sem atualizar o valor da `paginaAtual`. Isso faz com que o loop fique eternamente com o 3 atribuído e nunca finalize."
const formaDeCorrigir = "Para corrigir o código, basta adicionar `paginaAtual++;` antes do comando `continue`."

let paginaAtual = 1;

while (paginaAtual <= 5) {
  if (paginaAtual === 3) {
    paginaAtual++;
    continue;
  }

  console.log(`Página ${paginaAtual}`);
  paginaAtual++;
}