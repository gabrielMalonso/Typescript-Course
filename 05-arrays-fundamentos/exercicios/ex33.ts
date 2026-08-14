const assentos: string[][] = [
  ["A1", "A2", "A3"],
  ["B1", "B2", "B3"],
];

console.log(`Quantidade de fileiras: ${assentos.length}`);
console.log(`Lugares na primeira fileira: ${assentos[0].length}`);
console.log(`Último lugar na fileira A: ${assentos[0][2]}`);
console.log(`Primeiro lugar na fileira B: ${assentos[1][0]}`);

const explicacao: string =
  "Em assentos[1][0], o índice 1 escolhe a segunda fileira e o índice 0 escolhe o primeiro lugar dessa fileira.";
