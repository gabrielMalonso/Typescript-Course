function uniqueOccurrences(arr: number[]): boolean {
    const arrMap = new Map<number, number>();
    const qtdSet = new Set<number>();

    // criar Map relacionando numeros do array e suas quantidades de repetições
    for (let i = 0 ; i < arr.length ; i++) {
            const qtdRepeticoes = arrMap.get(arr[i]) ?? 0; // isso já resolve o caso de já existir ou não o valor dentro do Map, eliminando a necessidade do `if/else`.
            arrMap.set(arr[i], qtdRepeticoes + 1);
    }

    // percorrer o Map, guardando as quantidades de repetições no Set e verificando se algum valor é repetido
    for (const qtd of arrMap.values()) {
        if (qtdSet.has(qtd)){
            return false;
        }
        qtdSet.add(qtd);
    }
    return true;
}

let arr = [1,2,2,1,1,3];
uniqueOccurrences(arr); // true
// Explanation: The value 1 has 3 occurrences, 2 has 2 and 3 has 1. No two values have the same number of occurrences.

arr = [1,2];
uniqueOccurrences(arr); // false

arr = [-3,0,1,-3,1,1,1,-3,10,0];
uniqueOccurrences(arr); // true