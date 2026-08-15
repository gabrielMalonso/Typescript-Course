const temperaturas: number[] = [18, 21, 17, 24];

let total = 0;
let acimaDeVinte = 0;

for (const temperatura of temperaturas) {
    total += temperatura;
    if (temperatura > 20) {
        acimaDeVinte++;
    }
}

const mediaDeTemperaturas = total/temperaturas.length;
console.log(`Total: ${total}`);
console.log(`Acima de 20: ${acimaDeVinte}`);
console.log(`Média: ${mediaDeTemperaturas}`);