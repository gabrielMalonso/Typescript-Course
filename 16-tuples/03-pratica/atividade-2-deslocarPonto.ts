function deslocarPonto(
    ponto: readonly [x: number, y: number, z?: number],
    deslocamento: readonly [dx: number, dy: number, dz: number],
): readonly [x: number, y: number, z: number] {
    const [x, y, z = 0] = ponto;
    const [dx, dy, dz] = deslocamento;

    return [x + dx, y + dy, z + dz];
}

console.log(deslocarPonto([2, 3], [1, -2, 4]));
// esperado: [3, 1, 4]

console.log(deslocarPonto([2, 3, 5], [1, -2, 4]));
// esperado: [3, 1, 9]

console.log(deslocarPonto([0, 0, 0], [0, 0, 0]));
// esperado: [0, 0, 0]
