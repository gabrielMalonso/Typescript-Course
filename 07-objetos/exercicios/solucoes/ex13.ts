const clima: { cidade: string; temperatura: number } = {cidade: "Curitiba", temperatura: 14};

console.log(clima.cidade);

const campo = "temperatura";

console.log(clima[campo]);

// clima.campo procuraria um item chamado `campo` dentro do objeto `clima`. Como esse item não existe, teríamos um erro.