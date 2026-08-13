const tentativaCorreta = 3;
const maximoDeTentativas = 5;
let tentativaAtual = 1;
let acessoConcedido = false;

while (tentativaAtual <= maximoDeTentativas) {
    console.log(`Tentativa ${tentativaAtual}`);
    if (tentativaAtual === tentativaCorreta) {
        acessoConcedido = true;
        break;
    } else {
        tentativaAtual++;
    }
}

console.log(`Acesso Concedido: ${acessoConcedido}`);

/*
feito também o teste alternativo, usando `tentativaCorreta = 8`. Resultado:

tsc ex23.ts && node ex23.js
Tentativa 1
Tentativa 2
Tentativa 3
Tentativa 4
Tentativa 5
Acesso Concedido: false

*/