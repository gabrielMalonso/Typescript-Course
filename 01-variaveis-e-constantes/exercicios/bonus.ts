const passageiro = "Gabriel Alonso";
const voo:string = "TS-101";
let portao = 7;
const embarqueLiberado:boolean = true;

console.log("=== CARTÃO DE EMBARQUE ===");
console.log("Passageiro:", passageiro);
console.log("Voo:", voo);
console.log("Portão inicial:", portao);

{
    const setorDoTerminal:string = "B";
    console.log ("Setor do terminal:", setorDoTerminal);
}

const observacaoDeEstilo:string = "Omitir um ponto e vírgula em uma das declarações normalmente não é uma questão; não seria um problema pra compilação, porque o compilador entende a falta e adiciona no código JavaScript final.";

portao = 9;

console.log("Portão atualizado:", portao);
console.log("Embarque liberado:", embarqueLiberado);
