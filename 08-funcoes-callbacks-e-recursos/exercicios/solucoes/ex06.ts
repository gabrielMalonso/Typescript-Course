function repetirMensagem(
  mensagem: string,
  vezes: number,
  exibir: (texto: string, numero: number) => void,
): void {
    for (let index = 1; index <= vezes; index++) {
        exibir(mensagem, index);
    }
}

let contador = 0;
repetirMensagem("revisar contrato", 3, (texto, numero): void => {
    contador++;
    console.log(`${numero}/3: ${texto} `);
});

console.log(contador);

let contador2 = 0;
repetirMensagem("revisar contrato", 0, (texto, numero): void => {
    contador2++;
    console.log(`${numero}/3: ${texto} `);
});

console.log(contador2);