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

console.log("");
console.log("1. objetos ativos;".toUpperCase());  
const objetosAtivos = equipamentos.filter(equipamento => equipamento.ativo);
console.log(objetosAtivos);


console.log("");
console.log("2. nomes dos ativos;".toUpperCase());  
const nomesDosAtivos = equipamentos
    .filter(equipamento => equipamento.ativo)
    .map((equipamento, index) => `${index + 1}. ${equipamento.nome}`);
console.log(nomesDosAtivos);

console.log("");
console.log("3. primeiro ativo com pelo menos 150 horas;".toUpperCase());
const primeiroMaiorIgualA150 = equipamentos.find (equipamento => equipamento.horas >= 150 && equipamento.ativo);
console.log(primeiroMaiorIgualA150);

console.log("");
console.log("4. indice do primeiro inativo;".toUpperCase());
const indiceDoPrimeiroInativo = equipamentos.findIndex(equipamento => !equipamento.ativo);
console.log(indiceDoPrimeiroInativo);

console.log("");
console.log("5. existência de ativo acima de 100 horas;".toUpperCase());
const existenciaDeAtivoAcimaDe100Horas = equipamentos.some(equipamento => equipamento.ativo && equipamento.horas > 100);
console.log(existenciaDeAtivoAcimaDe100Horas);

console.log("");
console.log("6. confirmação de que todos possuem horas não negativas;".toUpperCase());
const todosPossuemHorasNaoNegativas = equipamentos.every(equipamento => equipamento.horas >= 0);
console.log(todosPossuemHorasNaoNegativas);

console.log("");
console.log("7. total de horas dos ativos;".toUpperCase());
const totalDeHorasDosAtivos = equipamentos
    .filter(equipamento => equipamento.ativo)
    .reduce ((total, equipamento) => total + equipamento.horas, 0);

console.log(totalDeHorasDosAtivos);

console.log("");
console.log("8. cópias dos ativos com 10 horas adicionais, sem alterar os originais;".toUpperCase());
const copiasDosAtivosCom10HorasAdicionais = equipamentos
    .filter (equipamento => equipamento.ativo)
    .map(equipamento => ({
        ...equipamento,
        horas: equipamento.horas + 10,
    }));
console.log(copiasDosAtivosCom10HorasAdicionais);
console.log(equipamentos); // original não alterado

console.log("");
console.log("9. uma linha numerada para cada cópia.".toUpperCase());
const umaLinhaNumeradaParaCadaCopia = copiasDosAtivosCom10HorasAdicionais
    .map ((equipamento, index) => `${index + 1}. Nome: ${equipamento.nome} | Horas: ${equipamento.horas} | Ativo ${equipamento.ativo ? "Sim" : "Não"}`);

umaLinhaNumeradaParaCadaCopia.forEach (linha => console.log(linha));

// retornos com array vazio:
// []
// []
// undefined
// -1
// false
// true
// 0
// []
// []