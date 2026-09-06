const sensores: { codigo: string; ativo: boolean }[] = [
    { codigo: "T1", ativo: true },
    { codigo: "T2", ativo: false },
];

const copiaDoArray = [...sensores];

console.log(sensores === copiaDoArray); // false
console.log(sensores);      //  [ { codigo: 'T1', ativo: true }, { codigo: 'T2', ativo: false } ]
console.log(copiaDoArray);  //  [ { codigo: 'T1', ativo: true }, { codigo: 'T2', ativo: false } ]

for (let index = 0; index < sensores.length; index++) {
    console.log(sensores[index] === copiaDoArray[index]);
}

// Os arrays são diferentes, mas os objetos armazenados
// dentro deles são os mesmos (mesmas referências).

const copiaDosObjetos = sensores.map ((sensor) => ({
    ... sensor
}));

console.log(copiaDosObjetos);
console.log(sensores[0] === copiaDosObjetos[0]); //false

copiaDosObjetos[0].ativo = false;

console.log(copiaDosObjetos); //    [ { codigo: 'T1', ativo: false }, { codigo: 'T2', ativo: false } ]
console.log(sensores);        //    [ { codigo: 'T1', ativo: true }, { codigo: 'T2', ativo: false } ]