# Respostas da Avaliação do Capítulo 06
## Questão 1
1.  Trecho que define a função: 
    ```ts
    function calcularDistancia(velocidade: number, tempo: number): number {
    return velocidade * tempo;
    }
    ```

    Trecho que que executa: 
    ```ts
    const distancia = calcularDistancia(80, 2);
    ```

2.  Parâmetros: (velocidade: number, tempo: number)
3.  Argumentos: (80, 2)
4.  Valor: 160; tipo `number`

## Questão 2
- A diferença entre retornar e exibir é que, quando se retorna um valor, ou nesse caso uma string, essa string pode ser reaproveitada por outras partes e componentes do código. Já a função que apenas exibe a mensagem, essa mensagem não pode ser usada depois. O resultado da criação da mensagem e do retorno da mensagem deverá ser uma string, porque uma string está sendo salva. Já o void é apropriado para a função exibir mensagem, porque essa função não tem nenhum retorno.

## Questão 3
- itemA -> Essa variável guarda a função dobro completa. O tipo conceitual é o tipo number, que é o tipo de return da função.
- itemB -> A variável guarda o resultado do tipo number do retorno da função dobro com o argumento sete. Valor: 14.
- itemA(4) = 8 -> já que a variável guardou a função `dobro`, a variável se passa a possuir o mesmo contrato da função `dobro`. 

## Questão 4
- Uma função precisa ter um retorno válido em qualquer hipótese. Já que se o nível for maior ou igual a 5, o retorno é alto. Se acontecer de o nível ser menor do que 5, a função fica sem retorno.
- Correção:
```ts
function classificarNivel(nivel: number): string {
  if (nivel >= 5) {
    return "alto";
  } else {
    return "baixo";
  }
}
```
- A conversão acima não altera o tipo de retorno.