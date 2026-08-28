function executarVerificacao(
  valor: number,
  verificar: (entrada: number) => boolean,
): string {
  return verificar(valor) ? "válido" : "inválido";
}

function positivo(valor: number): boolean {
  return valor > 0;
}

const regra = positivo;
const resultado = executarVerificacao(-2, positivo);

const outroResultado = executarVerificacao(4, (valor): boolean => {
  return valor % 2 === 0;
});

console.log(resultado);
console.log(outroResultado);

// Erro 1: o contrato de `positivo` é (valor: number) => boolean, ou seja, uma
// referência de função. Anotar `regra` como `boolean` confundia o tipo da
// função com o tipo do retorno. Sem os `()`, `regra` guarda a referência.
//
// Erro 2: `positivo()` é uma chamada e devolve `boolean`. O segundo parâmetro
// de `executarVerificacao` pede a referência `positivo`, para a controladora
// chamar o callback depois, por dentro.
//
// Erro 3: a arrow tinha contrato `(valor: number) => boolean`, mas a expressão
// `valor % 2 === 0` não era retornada. Sem `return`, o callback devolve
// `undefined` em vez do boolean previsto no contrato.
