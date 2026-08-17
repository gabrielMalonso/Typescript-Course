const atingiuMeta = (realizado: number, meta:number): boolean => realizado >= meta;

const teste1 = atingiuMeta (8, 10);
const teste2 = atingiuMeta (10, 10);
const teste3 = atingiuMeta (12, 10);

console.log(`atingiuMeta(8, 10) → ${teste1};`);
console.log(`atingiuMeta(10, 10) → ${teste2};`);
console.log(`atingiuMeta(12, 10) → ${teste3};`);