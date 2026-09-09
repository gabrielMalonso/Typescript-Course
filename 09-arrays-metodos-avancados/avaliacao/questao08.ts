const ordens: {
    codigo: string;
    quantidade: number;
    preco: number;
    aprovada: boolean;
}[] = [
        { codigo: "A1", quantidade: 2, preco: 10, aprovada: true },
        { codigo: "B2", quantidade: 0, preco: 40, aprovada: true },
        { codigo: "C3", quantidade: 3, preco: 5, aprovada: false },
        { codigo: "D4", quantidade: 1, preco: 50, aprovada: true },
    ];

function ordemValida (ordens: {
    codigo: string;
    quantidade: number;
    preco: number;
    aprovada: boolean;
}[]): {
    codigo: string;
    quantidade: number;
    preco: number;
    aprovada: boolean;
}[] {
    const filtrada: {
        codigo: string;
        quantidade: number;
        preco: number;
        aprovada: boolean;
    }[] = ordens.filter (ordem => (ordem.quantidade > 0 && ordem.aprovada));
    return filtrada;
};

const filtrarOrdens = ordemValida(ordens).map((ordem) => ({ordem.codigo, codigo.}));
console.log (filtrarOrdens);