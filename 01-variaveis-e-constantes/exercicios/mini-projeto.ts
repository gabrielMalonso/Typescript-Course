//Declaração de constantes e variáveis
const nomeProjeto: string = "Eixo de Transmissão";
const codProjeto: string = "ET-2026";
const material: string = "Aço Carbono";
const diametroNominal: number = 40;
const comprimento: number = 250;
const tempInicial: number = 22;
let tempAtual: number = 28;
let statusRegistro: string = "atualizado";

//Exibição das informações do projeto
console.log("=== PAINEL DO PROJETO ===");
console.log("Projeto: " + nomeProjeto);
console.log("Código: " + codProjeto);
console.log("Material: " + material);
console.log("Diâmetro Nominal: " + diametroNominal + " mm");
console.log("Comprimento: " + comprimento + " mm");
console.log("Temperatura Inicial: " + tempInicial + " °C");
console.log("Temperatura Atual: " + tempAtual + " °C");
console.log("Status do Registro: " + statusRegistro);


/*
Resposta final:

Código Final Completo
Antes de copiar este código, compare-o com os passos anteriores. Depois de copiar, compile e execute exatamente esta versão.


const nomeDoProjeto = "Eixo de Transmissão";
const codigoDoProjeto: string = "ET-2026";
const materialDoEixo = "Aço carbono";
const diametroNominal: number = 40;
const comprimentoDoEixo = 250;

let temperaturaAtual: number = 22;
let statusDoRegistro = "inicial";

console.log("=== PAINEL DO PROJETO ===");
console.log("Projeto:", nomeDoProjeto);
console.log("Código:", codigoDoProjeto);
console.log("Material:", materialDoEixo);

{
  const unidadeDeComprimento = "mm";

  console.log("Diâmetro nominal:", diametroNominal, unidadeDeComprimento);
  console.log("Comprimento:", comprimentoDoEixo, unidadeDeComprimento);
}

console.log("Temperatura inicial: " + temperaturaAtual + " °C");

temperaturaAtual = 28;
statusDoRegistro = "atualizado";

console.log("Temperatura atual: " + temperaturaAtual + " °C");
console.log("Status do registro:", statusDoRegistro);

---
OBS: embora não tenha utilizado o bloco de código para a unidade de comprimento, o resultado final é o mesmo. A utilização do bloco de código é apenas uma forma de organizar melhor o código, mas não é obrigatória.
*/
