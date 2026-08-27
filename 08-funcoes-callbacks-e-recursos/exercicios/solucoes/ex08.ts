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