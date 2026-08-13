const totalDeFileiras = 2;
const totalDelugar = 3; // número de lugares em uma fileira
let totalDeLugares = 0; // Soma do número de lugares gerais

for (let fileira = 1; fileira <= totalDeFileiras; fileira++) {
    for( let lugar = 1; lugar <= totalDelugar; lugar++) {
        console.log(`F${fileira}-L${lugar}`);
        totalDeLugares++
    }
}

console.log(`Total: ${totalDeLugares}`);