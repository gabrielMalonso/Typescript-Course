const pesoEmQuilogramas = 18;
const distanciaEmQuilometros = 120;
const entregaExpressa = true;
const regiao: string = "sudeste";

// Tarifa Base
const tarifaBase = pesoEmQuilogramas * 2;

// Adicional de Distância
const adicionalDeDistancia = distanciaEmQuilometros > 100 ? 15 : 0;

// Adicional Expresso
const adicionalExpresso = entregaExpressa ? 20 : 0;

// Valor total
const valorTotal = tarifaBase + adicionalDeDistancia + adicionalExpresso;

let prazoBase;
switch (regiao){
    case "sudeste":
        prazoBase = 3;
        break;
    case "sul":
        prazoBase = 4;
        break;
    case "nordeste":
        prazoBase = 6;
        break;
    default:
        prazoBase = 8;
}

if (entregaExpressa){
    prazoBase -= 1;
}
if (prazoBase < 1) {
    prazoBase = 1;
}


console.log(`Frete: R$ ${valorTotal}`);
console.log(`Prazo: ${prazoBase} dias`);
if(entregaExpressa){
    console.log(`Modalidade: expressa`);
} else {
    console.log(`Modalidade: padrão`);
}
