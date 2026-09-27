function totalNumbers(digits: number[]): number {
    let contagem = 0;
    const valoresEncontrados: number[] = [];

    for (let i = 0; i < digits.length; i++) {
        if (digits[i] !== 0) {
            const a = digits[i];

            for (let j = 0; j < digits.length; j++) {
                if (i !== j) {
                    const b = digits[j];

                    for (let k = 0; k < digits.length; k++) {
                        if ((digits[k] % 2 === 0) && (i !== k) && (j !== k)) {
                            const c = digits[k];
                            const valorFormado = a * 100 + b * 10 + c;
                            let jaExiste = false;

                            for (const valor of valoresEncontrados) {
                                if (valorFormado === valor) {
                                    jaExiste = true;
                                    break;
                                }
                            }
                            if (!jaExiste) {
                                contagem++;
                                valoresEncontrados.push(valorFormado);
                            }
                        }

                    }
                }
            }
        }

    }
    return contagem;
}