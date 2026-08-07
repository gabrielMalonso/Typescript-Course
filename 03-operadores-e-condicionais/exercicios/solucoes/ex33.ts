const emergenciaAtiva = false;
const temperaturaAtual = 92;
const vibracaoAtual = 6.5;

if (emergenciaAtiva){
    console.log(`Diagnóstico: PARADA DE EMERGÊNCIA`);
} else if (temperaturaAtual > 90 || vibracaoAtual > 7){
    console.log(`Diagnóstico: INSPEÇÃO IMEDIATA`);
} else {
    console.log(`Diagnóstico: OPERAÇÃO NORMAL`);
}
