const filaPrincipal: string[] = ["INC-102", "INC-205"];
const painelDaEquipe = filaPrincipal;

const tamanhoAposUrgente = painelDaEquipe.unshift("INC-001");
filaPrincipal[1] = "INC-102-R";
const incidenteAtendido = painelDaEquipe.shift();
const tamanhoAposNovo = filaPrincipal.push("INC-330");
const mesmaReferencia = filaPrincipal === painelDaEquipe;

console.log(`Tamanho após urgente: ${tamanhoAposUrgente}`);
console.log(`Incidente Atendido: ${incidenteAtendido}`);
console.log(`Tamanho após novo: ${tamanhoAposNovo}`);
console.log(`Mesma referência: ${mesmaReferencia}`);
console.log(filaPrincipal);
console.log(painelDaEquipe);
console.log(`Primeiro incidente: ${filaPrincipal[0]}`);
console.log(`Último incidente: ${painelDaEquipe[painelDaEquipe.length - 1]}`);
console.log(`Quantidade final: ${filaPrincipal.length}`);

// Os dois arrays exibem o mesmo conteúdo porque ambos apontam para o mesmo array na memória.