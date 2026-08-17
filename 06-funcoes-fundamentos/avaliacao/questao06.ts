function classificarCarga(percentual: number): string {
    if (percentual < 40) {
        return "leve";
    } else if (percentual <= 75) {
        return "moderada";
    } else {
        return "alta";
    }
}

function exibirCarga(percentual: number, classificacao: string): void {
    console.log(`Carga ${percentual}%: ${classificacao}`);
}

const teste1 = 25;
const teste2 = 40;
const teste3 = 75;
const teste4 = 90;

const classificacao1 = classificarCarga(teste1);
exibirCarga(teste1, classificacao1);

const classificacao2 = classificarCarga(teste2);
exibirCarga(teste2, classificacao2);

const classificacao3 = classificarCarga(teste3);
exibirCarga(teste3, classificacao3);

const classificacao4 = classificarCarga(teste4);
exibirCarga(teste4, classificacao4);