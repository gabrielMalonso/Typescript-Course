const etiqueta = (() => {
  const projeto = "Curso TS";
  const capitulo = 8;
  return `${projeto} | capítulo ${capitulo}`;
})();

/*

Registre em comentários:

1. qual trecho representa a função; 

(() => {
  const projeto = "Curso TS";
  const capitulo = 8;
  return `${projeto} | capítulo ${capitulo}`;
}

2. quais parênteses realizam a chamada imediata; Os parêntesis no final, logo antes do ponto e vírgula final.

3. o tipo de etiqueta; `string`
4. se etiqueta guarda uma função ou o retorno da chamada; Etiqueta guarda somente o retorno da chamada, a string final. 

5. por que projeto não pode ser acessado depois fora da IIFE: projeto é const dentro do corpo. Escopo local. O return não devolve essa variável; devolve só o texto já montado. Por isso do lado de fora existe etiqueta (a string) e não existe projeto. 

*/

console.log(etiqueta);