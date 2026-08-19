function classificarCarga(percentual) {
    if (percentual < 40) {
        return "leve";
    }
    else if (percentual <= 75) {
        return "moderada";
    }
    else {
        return "alta";
    }
}
function exibirCarga(percentual, classificacao) {
    console.log("Carga ".concat(percentual, "%: ").concat(classificacao));
}
var teste1 = 25;
var teste2 = 40;
var teste3 = 75;
var teste4 = 90;
var classificacao1 = classificarCarga(teste1);
exibirCarga(teste1, classificacao1);
var classificacao2 = classificarCarga(teste2);
exibirCarga(teste2, classificacao2);
var classificacao3 = classificarCarga(teste3);
exibirCarga(teste3, classificacao3);
var classificacao4 = classificarCarga(teste4);
exibirCarga(teste4, classificacao4);
