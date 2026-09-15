const velocidades: number[] = [0, 36, 72, -1, 18];

const greaterThanZero = velocidades.filter(velocidade => velocidade > 0);
console.log(greaterThanZero);

const convertToMS = greaterThanZero.map(velocidade => velocidade / 3.6);
console.log(convertToMS);

const convertToMSEncadeamento = velocidades
    .filter(velocidade => velocidade > 0)
    .map(velocidade => velocidade / 3.6);
console.log(convertToMSEncadeamento);