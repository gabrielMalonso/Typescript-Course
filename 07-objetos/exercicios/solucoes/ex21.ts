const alerta: { mensagem: string; codigo?: number } = { mensagem: "Falha de leitura" };

console.log(alerta.codigo ?? "sem código");

alerta.codigo = 503; 
console.log(alerta.codigo ?? "sem código");