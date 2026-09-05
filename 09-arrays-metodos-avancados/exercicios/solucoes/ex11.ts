const etapas: string[] = ["planejar", "construir", "testar"];
etapas.forEach((etapa, index) => {
    console.log(`${index + 1}. ${etapa}`);
});

const arrayVazio: string[] = [];
arrayVazio.forEach((vazio, index) => {
    console.log(`${index + 1}. ${vazio}`);
});

// nenhuma linha adicional aparece

// O retorno é void porque o objetivo do forEach é executar uma função para cada elemento do array, e não produzir um novo valor como resultado. Em um array vazio, a função passada ao forEach é executada zero vezes, então nenhum console.log acontece.
