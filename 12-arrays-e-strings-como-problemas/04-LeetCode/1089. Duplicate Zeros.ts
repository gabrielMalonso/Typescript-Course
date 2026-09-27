/**
 Do not return anything, modify arr in-place instead.
 */
function duplicateZeros(arr: number[]): void {
    let escritor: number = arr.length + 1;

    for (let i = arr.length ; i >= 0 ; i--){
        if (arr[i] !== 0){
            escritor--;
            console.log(`leitor: ${i} | escritor ${escritor}`);
        } else {
            arr[escritor] = arr[i];
            escritor--;
            console.log(`leitor: ${i} | escritor ${escritor}`);
        }
    }
    console.log(arr); 
}

// Example 1:
let arr = [1,0,2,3,0,4,5,0];
duplicateZeros(arr);
// Output: [1,0,0,2,3,0,0,4]
// Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

// Example 2:
// arr = [1,2,3];
// duplicateZeros(arr);
// Output: [1,2,3]
// Explanation: After calling your function, the input array is modified to: [1,2,3]
