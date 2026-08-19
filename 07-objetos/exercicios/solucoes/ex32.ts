const viagem: { 
    destino: string;
    dias: number;
    diaria: number;
 } = { 
    destino: "Gramado", 
    dias: 4, 
    diaria: 220 
};

let {destino, dias} = viagem;
const custo = dias * viagem.diaria;
console.log(`${destino}: ${custo}`);

// renomeando destino para cidade
const { destino: cidade } = viagem;
console.log(`${cidade}: ${custo}`);

// testando com dias: 0
dias = 0;

const custo2 = dias * viagem.diaria;
console.log(`${cidade}: ${custo2}`);