const nivelDoReservatorio = 28;

if (nivelDoReservatorio >= 80){
    console.log(`Nível Alto.`);
} else if (nivelDoReservatorio >= 30) {
    console.log(`Nível operacional.`);
} else {
    console.log(`Nível baixo.`);
}