function criarFila() {
    /*
    enfileirar(valor)
    → adiciona ao final da fila

    desenfileirar()
    → retira e retorna o elemento mais antigo
    → undefined se vazia

    frente()
    → consulta o próximo a sair sem removê-lo

    tamanho()
    → quantidade de elementos pendentes

    estaVazia()
    → boolean
    */
    let item: number[] = [];
    let inicio: number = 0; // verificar se essa variável precisa ser disponível globalmente.
    function enfileirar(valor: number): void {
        item.push(valor);
    }

    function desenfileirar(): number | undefined {
        /*
    pensar em FIFO:
    - nao usar shift()
    - atualizar início
    - ao remover, verificar se ativos > length / 2
    - verificar se o numero de ativos é zero
    - lembrar de atualizar o inicio sempre que necessário
    */

        // 1. Varificação inicial
        if (item.length === inicio) return undefined;

        // 2. segura o valor inicial e depois avança com o ˋinicioˋ.
        const saida = item[inicio];
        inicio++;

        // após avançar com o valor ˋinicioˋ:
        // Checar se, após avançar com o valor inicial, o array ativo ficou vazio. Ficando vazio, podemos "limpar" o array e recomeçá-lo.
        if (item.length === inicio) {
            item = [];
            inicio = 0;

            // se não estiver vazio, verificar se é hora de compactar.
        } else if (inicio * 2 >= item.length) {
            item = item.slice(inicio);
            inicio = 0;
        }
        return saida; // a função deve retornar o valor que foi removido do array principal.
    }

    function frente(): number | undefined {
        return item[inicio];
    }

    function tamanho(): number {
        return item.length - inicio;
    }

    function estaVazia(): boolean {
        return item.length === inicio;
    }

    return {
        enfileirar,
        desenfileirar,
        frente,
        tamanho,
        estaVazia,
    };
}

const fila = criarFila();

fila.enfileirar(10);
fila.enfileirar(20);
fila.enfileirar(30);
fila.enfileirar(40);

console.log(fila.frente()); // 10
console.log(fila.tamanho()); // 4

console.log(fila.desenfileirar()); // 10
console.log(fila.frente()); // 20

console.log(fila.desenfileirar()); // 20
console.log(fila.tamanho()); // 2

console.log(fila.desenfileirar()); // 30
console.log(fila.desenfileirar()); // 40

console.log(fila.estaVazia()); // true
console.log(fila.desenfileirar()); // undefined
