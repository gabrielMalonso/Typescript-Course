function converterHorasParaMinutos(horas: number): number {
    return horas * 60;
}

const criarEtiqueta = (minutos: number): string => `Duração: ${minutos} minutos.`;

// Conversão com 2.5 horas
const conversao = converterHorasParaMinutos(2.5);
const etiqueta = criarEtiqueta (conversao);
console.log(etiqueta);

// Conversão com 0 hora
const conversao2 = converterHorasParaMinutos(0);
const etiqueta2 = criarEtiqueta (conversao2);
console.log(etiqueta2);
