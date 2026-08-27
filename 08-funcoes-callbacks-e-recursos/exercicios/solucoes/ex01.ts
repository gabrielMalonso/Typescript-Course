function identificarVisitante (nome: string, cracha?: number): string {
    if (cracha === undefined) {
        return `${nome} | visitante sem crachá`;
    }

        return `${nome} | crachá N ${cracha}`;
}

console.log(identificarVisitante("Marina", 42));
console.log(identificarVisitante("Ravi"));
console.log(identificarVisitante("Bia", 0));