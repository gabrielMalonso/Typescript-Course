const participantes: string[] = ["Lia", "Ravi", "Maya"];
const pontuacoes: number[] = [12, 18, 15];
const presencas: boolean [] = [true, false, true];

console.log(`Primeiro participante: ${participantes[0]}`);
console.log(`Primeira pontuação: ${pontuacoes[0]}`);
console.log(`Primeira Presença: ${presencas[0]}`);

console.log(`Quantidade de participantes: ${participantes.length}`);
console.log(`Quantidade de pontuações: ${pontuacoes.length}`);
console.log(`Quantidade de presenças: ${presencas.length}`);

const explicacao: string = (`pontuacoes.push("vinte") Seria rejeitado pelo simples fato de que o array de pontuações é uma constante tipo number, isso torna os tipos incompatíveis.`);