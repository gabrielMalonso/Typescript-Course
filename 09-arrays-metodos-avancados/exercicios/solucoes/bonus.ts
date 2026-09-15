const equipamentos: {
    nome: string;
    horas: number;
    ativo: boolean;
}[] = [
        { nome: "Torno", horas: 120, ativo: true },
        { nome: "Fresa", horas: 80, ativo: false },
        { nome: "Prensa", horas: 200, ativo: true },
        { nome: "Serra", horas: 40, ativo: true },
    ];

function criarMinimoDeHoras(minimo: number): (tempo: {horas: number}) => boolean {
    return (tempo) => tempo.horas >= minimo;
}

const criterio80 = criarMinimoDeHoras(80);
const criterio150 = criarMinimoDeHoras(150);

const filtrar80 = equipamentos.filter(criterio80);
console.log(filtrar80);

const filtrar150 = equipamentos.filter(criterio150);
console.log(filtrar150);

// O valor mínimo é definido ao se utilizar a função criarMinimoDeHoras, em:
// const criterio80 = criarMinimoDeHoras(80);
// const criterio150 = criarMinimoDeHoras(150);

// Ele é reutilizado em `const filtrar80 = equipamentos.filter(criterio80);` e `const filtrar150 = equipamentos.filter(criterio150);`. 

// criarMinimoDeHoras(80) retorna uma função com contrato
// (objeto: { horas: number }) => boolean.
//
// Por isso, equipamentos.filter(criarMinimoDeHoras(80)) é válido:
// o filter recebe exatamente a função de que precisa.
//
// Já criarMinimoDeHoras(80)(equipamentos[0]) executa também a função retornada,
// produzindo um boolean. Esse boolean não pode ser passado como callback para filter. 