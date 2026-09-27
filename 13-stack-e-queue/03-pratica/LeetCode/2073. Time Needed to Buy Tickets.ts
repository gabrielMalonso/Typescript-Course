function timeRequiredToBuy(tickets: number[], k: number): number {
    let inicio = 0;
    let tempo = 0;

    while (true) {
        // pessoa atual compra
        tempo++;

        if (tickets[inicio] - 1 === 0) {
            // se a pessoa atendida vai finalizar agora
            if (inicio === k) return tempo; // se estamos falando da pessoa k, finalizamos.
        } else {
            // se a pessoa atendida não vai finalizar
            tickets.push(tickets[inicio] - 1); // volta pro fim da fila
            if (inicio === k) k = tickets.length - 1; // se tratando da pessoa k, atualizamos k
        }
        inicio++; // a fila anda
    }
}

// Example 1:
let tickets = [2, 3, 2];
let k = 2;
console.log(timeRequiredToBuy(tickets, k));
// Output: 6
// Explanation:
// The queue starts as [2,3,2], where the kth person is underlined.
// After the person at the front has bought a ticket, the queue becomes [3,2,1] at 1 second.
// Continuing this process, the queue becomes [2,1,2] at 2 seconds.
// Continuing this process, the queue becomes [1,2,1] at 3 seconds.
// Continuing this process, the queue becomes [2,1] at 4 seconds. Note: the person at the front left the queue.
// Continuing this process, the queue becomes [1,1] at 5 seconds.
// Continuing this process, the queue becomes [1] at 6 seconds. The kth person has bought all their tickets, so return 6.

// Example 2:
tickets = [5, 1, 1, 1];
k = 0;
console.log(timeRequiredToBuy(tickets, k));
// Output: 8
// Explanation:
// The queue starts as [5,1,1,1], where the kth person is underlined.
// After the person at the front has bought a ticket, the queue becomes [1,1,1,4] at 1 second.
// Continuing this process for 3 seconds, the queue becomes [4] at 4 seconds.
// Continuing this process for 4 seconds, the queue becomes [] at 8 seconds. The kth person has bought all their tickets, so return 8.
