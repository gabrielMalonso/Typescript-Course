const tempos: number[] = [42, 38, 45, 40];

let total = 0;

for (let indice = 0; indice < tempos.length; indice++) {
    console.log(`Medição ${indice+1}: ${tempos[indice]}`);
    total = total + tempos[indice];
}

console.log(`Total: ${total}`);