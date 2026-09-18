function maxProfit(prices: number[]): number {
    let menor = prices[0];
    let lucro = 0;

    for (let i = 0 ; i < prices.length ; i++) {
        if (menor > prices[i]) {
            menor = prices[i];
        }
        if (lucro < (prices[i] - menor)) {
            lucro = (prices[i] - menor);
        }
    }
    return lucro;
};