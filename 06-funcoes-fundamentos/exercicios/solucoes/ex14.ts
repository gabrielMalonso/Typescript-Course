function classificarPressao (pressao: number):  string {
    if (pressao < 90) {
        return "baixa";
    } else if (pressao <= 120) {
        return "normal";
    } else {
        return "alta";
    }
}

const teste1 = classificarPressao(80);
const teste2 = classificarPressao(90);
const teste3 = classificarPressao(120);
const teste4 = classificarPressao(135);

console.log(`Teste 1: 80 - ${teste1}`);
console.log(`Teste 2: 90 - ${teste2}`);
console.log(`Teste 3: 120 - ${teste3}`);
console.log(`Teste 4: 135 - ${teste4}`);
