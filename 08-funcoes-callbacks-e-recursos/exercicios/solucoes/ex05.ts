function gerarCodigo(): string {
  return "TS-08";
}
const criar = gerarCodigo;
const codigo: string = gerarCodigo();

console.log(criar());
console.log(codigo);

// gerarCodigo -> () => string
// gerarCodigo() -> string
// criar  -> () => string
// criar() -> string