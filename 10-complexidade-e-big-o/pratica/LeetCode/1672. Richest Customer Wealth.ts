function maximumWealth(accounts: number[][]): number {
    // O pulo do gato, para o exercício, nesse caso, é compreender de fato o que é representado por i e j. i representa o array interno em si. Exemplo: accounts = [[1,2,3], [3,2,1]]. i = 0 representará o primeiro array,[1, 2, 3], Enquanto o J, que representa o looping mais interno, nesse caso, representaria um, dois ou três, dependendo da posição.

    // Para esse exercício, prevejo dois FOR alinhados com o objetivo do FOR externo representar o cliente em si e o FOR interno representar as contas bancárias daquele cliente.

    let maximumWealth: number = 0;

    for (let i = 0 ; i < accounts.length ; i++) {
        let clientWealth = 0;

        // Prevejo outro problema: a utilização do length. Não tenho certeza de como usar o length em arrays multidimensionais. Minha intuição me diz pra usar accounts[i].length, já que é um length do array dentro de i.
        for (let j = 0 ; j < accounts[i].length ; j++) {
            clientWealth += accounts[i][j];
        }
        if (clientWealth > maximumWealth) {
            maximumWealth = clientWealth;
        }
    }
    return maximumWealth;
}