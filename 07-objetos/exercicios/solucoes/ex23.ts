const conta = {
    saldo: 100,
    depositar (valor: number): number {
        if ( valor > 0 ) {
            this.saldo += valor;
        }
        return this.saldo;
    }
};

let retorno = conta.depositar(40);
console.log(retorno);

retorno = conta.depositar (-10);
console.log(retorno);

console.log(conta.saldo);