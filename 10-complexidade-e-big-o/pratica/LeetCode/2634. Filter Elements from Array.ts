type Fn = (n: number, i: number) => any

function filter(arr: number[], fn: Fn): number[] {
    // A ideia central é avaliar, para cada item do array arr, se ele é verdadeiro usando a função fn.
    const filteredArr: number [] = [];
    for (let i = 0 ; i < arr.length ; i++) {
        const shouldInclude = fn(arr[i], i);    
        // No caso de filter ser verdadeiro, ou seja, se a função fn for verdadeira, vamos fazer o push daquele valor no array filteredArr.
        if (shouldInclude) {
            filteredArr.push(arr[i]);
        }
    }
    return filteredArr;
}