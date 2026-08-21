# Avaliação do capítulo 07
## Questão 01
1.  A estrutura `lista` é um array. A estrutura `ficha` é um objeto. No array, o critério de organização é a ordem informada na declaração. Já os objetos possuem um pouco mais de organização, cada item do objeto possui seu nome e pode ser acessado através desse nome.
2.  `lista[1]` e `ficha.codigo`.
3.  Ficha é um objeto. Mesmo reunindo vários valores, a forma de organização entre as estruturas é diferente. 

## Questão 02
1.  Porque outro.valor está apontando para um item do objeto, não para o objeto em si. É permitido fazer mudanças internas no objeto, mesmo para constantes. O que não é permitido é apontar a constante para outro objeto.
2.  sensor.valor === 25. `sensor` e `outro` estão apontados para o mesmo objeto. 
3.  true
4.  reatribuir sensor seria uma operação rejeitada.

## Questão 03
1.  `alerta.codigo` não vale nada imediatamente após a sua criação. Só se sabe que o tipo é number, mas não é atribuido nenhum valor.
2.  alerta.mensagem === alerta[campo]. Não há diferença além da notação, uma vez que a variável `campo` recebeu a string "mensagem".
3.  `alerta.campo` procuraria um item, dentro do objeto, chamado `campo`, o que não existe. 
4.  `??` seria útil caso se precisasse exibir ou utilizar `alerta.codigo` em algum momento. Como ele é opcional, se não não lhe for atribuído nenhum valor, ele será `undefined`. O `??` serviria para um tratamento de erro para esse item.

## Questão 04
1.  Não muda. Nesse caso, estamos criando um novo objeto, independente de `produto`. Estamos apenas utilizando os dados iniciais de `produto` e depois alterando somente em `promocao`. 
2.  Porque ele vem depois e reatribui a `promocao.preco` o valor de 16.
3.  `nome: string` extraída de `produto`
4.  `promocao` se trata de um objeto completo, `nome` se trata de uma variável, do tipo string, extraído de `produto`.