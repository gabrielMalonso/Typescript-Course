type Identificador = string | number;
function formatarId(id: Identificador): string {
    if (typeof id === "string") return `texto: ${id.toUpperCase()}`;
    return `numero: ID-${id}`;
}

console.log(formatarId("ab12"));
// "AB12"

console.log(formatarId(42));
// "ID-42"
