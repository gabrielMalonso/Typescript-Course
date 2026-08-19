const sensores: {
  id: string;
  valor: number;
  unidade: string;
  ativo: boolean;
  local: { sala: string };
  nota?: string;
}[] = [
  { id: "T1", valor: 21, unidade: "°C", ativo: true, local: { sala: "A" } },
  { id: "T2", valor: -3, unidade: "°C", ativo: true, local: { sala: "B" }, nota: "recalibrar" },
  { id: "P1", valor: 1.8, unidade: "bar", ativo: false, local: { sala: "A" } },
];

function contarAtivos (itens: { ativo: boolean }[]): number {
    let cont = 0;
    for (const item of itens) {
        if (item.ativo) {
            cont++;
        }
    }
    return cont;
}

function somarValoresAtivos(itens: { valor: number; ativo: boolean }[]): number {
    let soma = 0;
    for (const item of itens) {
        if (item.ativo) {
            soma += item.valor;
        }
    }
    return soma;
}

function criarResumo(item: {
  id: string;
  valor: number;
  unidade: string;
  nota?: string;
}): string {
    const { id, valor, unidade, nota } = item;
    return `${id}: ${valor} ${unidade} | ${nota ?? "sem nota"}`;
}

console.log(contarAtivos(sensores));
console.log(somarValoresAtivos(sensores));

for (const sensor of sensores) {
    if (sensor.ativo) {
        console.log(criarResumo(sensor));
    }
}

// teste com array sem ativos
const arraySemAtivos = [
    { id: "P1", valor: 1.8, unidade: "bar", ativo: false, local: { sala: "A" } },
    { id: "P2", valor: 5, unidade: "bar", ativo: false, local: { sala: "B" } },
    { id: "P3", valor: 10, unidade: "bar", ativo: false, local: { sala: "C" } },
    { id: "P4", valor: 15, unidade: "bar", ativo: false, local: { sala: "D" } },
    { id: "P5", valor: 16, unidade: "bar", ativo: false, local: { sala: "E" } },
];

console.log(contarAtivos(arraySemAtivos));
console.log(somarValoresAtivos(arraySemAtivos));

for (const sensor of arraySemAtivos) {
    if (sensor.ativo) {
        console.log(criarResumo(sensor));
    }
}