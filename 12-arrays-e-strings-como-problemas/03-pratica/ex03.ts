function compactarEspacos(texto: string): string {
    const arraySaida: string[] = [];
    let ultimaAdicao = " ";

    for (const caractere of texto) {
        if (ultimaAdicao === " " && caractere === " ") {
            continue;
        }
        arraySaida.push(caractere);
        ultimaAdicao = caractere;
    }
    if (arraySaida[arraySaida.length - 1] === " ") arraySaida.pop();
    console.log(arraySaida);
    return arraySaida.join("");
}

// sem espaços nas extremidades
// exatamente um espaço entre grupos de letras
let texto = " um dia  bom  ";
compactarEspacos(texto);

texto = "";
compactarEspacos(texto);

texto = " ";
compactarEspacos(texto);

texto = "a   b";
compactarEspacos(texto);

texto = "   "
compactarEspacos(texto);

texto = "   casa   "
compactarEspacos(texto);

