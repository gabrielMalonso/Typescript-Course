function isValidSudoku(board: string[][]): boolean {
    // em cada uma das verificações, checar se os caracteres são válidos: 1-9.
    // verificar linhas
    for (let i = 0; i < board.length; i++) {
        let linhaSet = new Set<string>();
        for (let j = 0; j < board.length; j++) {
            const item = board[i][j];
            if (item === ".") continue;
            if (linhaSet.has(item)) return false;
            linhaSet.add(item);
        }
    }

    // verificar colunas
    for (let i = 0; i < board.length; i++) {
        let colunaSet = new Set<string>();
        for (let j = 0; j < board.length; j++) {
            const item = board[j][i];
            if (item === ".") continue;
            if (colunaSet.has(item)) return false;
            colunaSet.add(item);
        }
    }

    // verificar blocos 3x3. Os dois primeiros "for" são para setar o início dos quadrados 3x3
    for (let i = 0; i < board.length; i += 3) {
        for (let j = 0; j < board.length; j += 3) {
            let blocoSet = new Set<string>();
            for (let k = i; k < i + 3; k++) {
                //começando a andar o tabuleiro.
                for (let l = j; l < j + 3; l++) {
                    const item = board[k][l];
                    if (item === ".") continue;
                    if (blocoSet.has(item)) return false;
                    blocoSet.add(item);
                }
            }
        }
    }

    return true;
}

// Example 1:
// let board = [
//     ["5", "3", ".", ".", "7", ".", ".", ".", "."],
//     ["6", ".", ".", "1", "9", "5", ".", ".", "."],
//     [".", "9", "8", ".", ".", ".", ".", "6", "."],
//     ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
//     ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
//     ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
//     [".", "6", ".", ".", ".", ".", "2", "8", "."],
//     [".", ".", ".", "4", "1", "9", ".", ".", "5"],
//     [".", ".", ".", ".", "8", ".", ".", "7", "9"],
// ];
// console.log(isValidSudoku(board));
// Output: true
// Example 2:

let board = [
    ["8", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
console.log(isValidSudoku(board));
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
