const veiculos = [
    {
        modelo: "Corolla",
        ano: 2022,
        km: 42000,
        disponivel: true,
        proprietario: {
            nome: "Carlos",
            cidade: "Recife",
        },
    },
    {
        modelo: "Civic",
        ano: 2019,
        km: 87000,
        disponivel: false,
        proprietario: {
            nome: "Marina",
            cidade: "Olinda",
        },
        observacao: "Em manutenção",
    },
    {
        modelo: "Onix",
        ano: 2023,
        km: 18000,
        disponivel: true,
        proprietario: {
            nome: "Pedro",
            cidade: "Recife",
        },
    },
    {
        modelo: "HB20",
        ano: 2020,
        km: 61000,
        disponivel: true,
        proprietario: {
            nome: "Fernanda",
            cidade: "Jaboatão",
        },
    },
];

function quantosVeiculosDisponiveis(lista: { disponivel: boolean }[]): number {
    let cont = 0;

    for (const veiculo of lista) {
        if (veiculo.disponivel) {
            cont++;
        }
    }
    return cont;
}

function quilometragemMediaDosVeiculosDisponiveis(lista: { km: number; disponivel: boolean; }[], quantidadeDisponivel: number): number {

    let kmTotal = 0;
    for (const veiculo of lista) {
        if (veiculo.disponivel) {
            kmTotal += veiculo.km;
        }
    }
    return kmTotal / quantidadeDisponivel;
}

function veiculosDisponiveisMenosRodados(lista: { km: number; disponivel: boolean; }[]): number {
    let contagem = 0;

    for (const veiculo of lista) {
        if (veiculo.disponivel && veiculo.km < 50000) {
            contagem++;
        }
    }
    return contagem;
}

function resumoFormatado(veiculo: {
  modelo: string;
  ano: number;
  km: number;
  proprietario: {
    nome: string;
    cidade: string;
  };
  observacao?: string;
}): string {
  return `${veiculo.modelo} (${veiculo.ano}) | ${veiculo.km} km | ${veiculo.proprietario.nome} - ${veiculo.proprietario.cidade} | ${veiculo.observacao ?? "sem observação"}`;
}

const numeroDeVeiculosDisponiveis = quantosVeiculosDisponiveis(veiculos);

console.log(`${numeroDeVeiculosDisponiveis} veículos disponíveis.`);
console.log(`A quilometragem média dos veículos disponíveis é de ${quilometragemMediaDosVeiculosDisponiveis(veiculos, numeroDeVeiculosDisponiveis)}`);
console.log(`Dos veículos disponíveis, ${veiculosDisponiveisMenosRodados(veiculos)} possuem menos de 50.000km rodados.`);

for (const veiculo of veiculos) {
  if (veiculo.disponivel && veiculo.km < 50000) {
    console.log(resumoFormatado(veiculo));
  }
}