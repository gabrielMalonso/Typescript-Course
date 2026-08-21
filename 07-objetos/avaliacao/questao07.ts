const tanque = {
    volume: 10,
    abastecer(litros: number): number {
        if (litros > 0) {
            this.volume += litros;
            if (this.volume > 50) {
                this.volume = 50;
            }
        }
        return this.volume;
    }
}

console.log(tanque.abastecer(30));
console.log(tanque.abastecer(-4));
console.log(tanque.abastecer(20));