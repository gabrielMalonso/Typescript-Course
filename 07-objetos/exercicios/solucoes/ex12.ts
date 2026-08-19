const marcador: { pagina: number; concluido: boolean } = {pagina: 1, concluido: false};

marcador.pagina = 12;
marcador.concluido = true;

console.log(`Página atualizada: ${marcador.pagina}`);
console.log(`Concluído: ${marcador.concluido}`);

// const permitiu a alteração pois é permitida a atualização e modificação de objetos apontados pela constante. O que não é permitido é apontar a constante para um outro objeto.