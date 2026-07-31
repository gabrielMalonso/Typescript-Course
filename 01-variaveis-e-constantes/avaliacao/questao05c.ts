const codigoDoLote = "LT-31";
let temperaturaAtual = 20;

{
  const localDaMedicao = "Câmara A";
  temperaturaAtual = 24;
  console.log("Local:", localDaMedicao);
}

console.log("Lote:", codigoDoLote);
console.log("Temperatura: " + temperaturaAtual + " °C");