function montarRegistro(
    evento: string,
    responsavel?: string,
    categoria = "geral",
    ...codigos: number[]
): string {
    const textoResponsavel = responsavel ?? "sem responsável";
    let total = 0;

    for (const codigo of codigos) {
        total += codigo;
    }

    return `${categoria} | ${evento} | ${textoResponsavel} | soma ${total}`;
}

const registro1 = montarRegistro("reinício", undefined, undefined, 4, 6);
console.log(registro1);

const registro2 = montarRegistro("inspeção", "Lia", "segurança", 3, -3, 5);
console.log(registro2);

const registro3 = montarRegistro("encerramento", "Caio");
console.log(registro3);

// Os argumentos são posicionais. O primeiro `undefined` omite `responsavel`; o
// segundo alcança `categoria` e aciona seu valor padrão. Assim, os códigos 4 e 6
// podem ser fornecidos depois deles e reunidos pelo rest parameter.
