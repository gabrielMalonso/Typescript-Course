const converterMetrosParaCentimetros = (metros: number): number => metros * 100;

const testeUm = converterMetrosParaCentimetros (2.5);
const testeDois = converterMetrosParaCentimetros(0);

console.log(testeUm);
console.log(testeDois);