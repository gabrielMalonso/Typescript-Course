const leituras: number[] = [18, 21, 19];

if (leituras.length > 0) {
    console.log(`Primeiro elemento: ${leituras[0]}`);
    console.log(`Último elemento: ${leituras[leituras.length - 1]}`);
} else {
    console.log(`Nenhuma leitura disponível.`);
}