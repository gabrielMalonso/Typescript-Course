var carga = 82; // kg
var cargaLimite = 100; // kg
var margem = cargaLimite - carga; // 1
var cargaSegura = carga <= cargaLimite; // true
var resultado = cargaSegura ? "Dentro do limite" : "Acima do limite";
console.log("Margem ".concat(margem, " kg"));
console.log("Estado: ".concat(resultado));
