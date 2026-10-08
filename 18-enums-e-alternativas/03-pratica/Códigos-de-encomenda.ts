enum CodigoEncomenda {
    Recebida = 10,
    EmTransporte = 20,
    Entregue = 30,
}

type EstadoEncomenda = "recebida" | "em-transporte" | "entregue";

function interpretarCodigo(codigo: number): EstadoEncomenda | null {
    switch (codigo) {
        case CodigoEncomenda.Recebida:
            return "recebida";

        case CodigoEncomenda.EmTransporte:
            return "em-transporte";

        case CodigoEncomenda.Entregue:
            return "entregue";

        default:
            return null;
    }
}

console.log(interpretarCodigo(CodigoEncomenda.Recebida));
// "recebida"

console.log(interpretarCodigo(CodigoEncomenda.EmTransporte));
// "em-transporte"

console.log(interpretarCodigo(CodigoEncomenda.Entregue));
// "entregue"

console.log(interpretarCodigo(0));
// null

console.log(interpretarCodigo(99));
// null
