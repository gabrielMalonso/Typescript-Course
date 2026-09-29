function searchRange(nums: number[], target: number): number[] {
    let inicio = 0;
    let fim = nums.length - 1;
    const limiteEsquerdo = inicio;
    const limiteDireito = fim;

    while (fim >= inicio) {
        let meio = inicio + Math.floor((fim - inicio) / 2);
        let valorDoMeio = nums[meio];

        // se encontrar o valor, verificar o index dele e dos arredores usando binary search para ambos os lados.
        if (valorDoMeio === target) {
            let primeiro = meio;
            fim = meio - 1;
            while (fim >= inicio) {
                let meio2 = inicio + Math.floor((fim - inicio) / 2);
                let valorDoMeio2 = nums[meio2];

                if (valorDoMeio2 === target) {
                    primeiro = meio2;
                    fim = meio2 - 1;
                } else {
                    inicio = meio2 + 1;
                }
            }
            inicio = limiteEsquerdo;
            fim = limiteDireito;

            let ultimo = meio;
            inicio = meio + 1;
            while (fim >= inicio) {
                let meio2 = inicio + Math.floor((fim - inicio) / 2);
                let valorDoMeio2 = nums[meio2];

                if (valorDoMeio2 === target) {
                    ultimo = meio2;
                    inicio = meio2 + 1;
                } else {
                    fim = meio2 - 1;
                }
            }
            return [primeiro, ultimo];
        }
        // se não encontrar `meio` não for o target, seguir a busca binária
        if (valorDoMeio < target) {
            inicio = meio + 1;
        } else {
            fim = meio - 1;
        }
    }

    return [-1, -1];
}

// Example 1:
let nums = [5, 7, 7, 8, 8, 10];
let target = 8;
console.log(searchRange(nums, target));
// Output: [3,4]

// Example 2:
nums = [5, 7, 7, 8, 8, 10];
target = 6;
console.log(searchRange(nums, target));
// Output: [-1,-1]

// Example 3:
nums = [];
target = 0;
console.log(searchRange(nums, target));
// Output: [-1,-1]
