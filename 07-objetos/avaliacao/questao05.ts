const pedido: { 
    cliente: string; 
    total: number; 
    pago: boolean 
} = {
    cliente: "Marina",
    total: 85,
    pago: false
};

console.log(`Nome do cliente: ${pedido.cliente}`);
console.log(`Total: ${pedido.total}`);
console.log(`Pago: ${pedido.pago}`);

pedido.pago = true;

console.log(`Pago ${pedido.pago}`);

// o objeto é o `pedido`. `pedido.total` é do tipo number
