const pressaoAtual = 7.5;
const pressaoLimite = 7.5;

const acimaDoLimite = pressaoAtual > pressaoLimite;
const noLimiteOuAcima = pressaoAtual >= pressaoLimite;
const ExatamenteNoLimite = pressaoAtual === pressaoLimite;
const DiferenteDoLimite = pressaoAtual !== pressaoLimite;

console.log(`Acima do limite: ${acimaDoLimite}`);
console.log(`No limite ou acima: ${noLimiteOuAcima}`);
console.log(`Exatamente no limite: ${ExatamenteNoLimite}`);
console.log(`Diferente do limite: ${DiferenteDoLimite}`);