# Funções — Recursos e roteiro de revisão

O material do capítulo cobre todo o conteúdo exigido. Use a documentação para confirmar dúvidas específicas.

## Documentação essencial

1. [TypeScript Handbook — Functions](https://www.typescriptlang.org/docs/handbook/2/functions.html)  
   Consulte as seções sobre tipos de parâmetros e retorno. Recursos avançados da página ficam para capítulos futuros.

2. [MDN — Funções](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions)  
   Referência sobre declaração, expressão, chamada e escopo.

3. [MDN — Arrow functions](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions)  
   Consulte apenas a sintaxe básica e o retorno implícito por enquanto.

## Roteiro de revisão — 45 minutos

### Bloco 1 — Modelo mental (10 min)

Explique sem consultar:

- definir versus executar;
- parâmetro versus argumento;
- retornar versus exibir;
- função versus resultado da chamada.

### Bloco 2 — Três formas (10 min)

Escreva a mesma função `dobro` como:

1. declaração;
2. expressão;
3. arrow com bloco;
4. arrow concisa.

### Bloco 3 — Contratos (10 min)

Leia em voz alta:

```typescript
(valor: number) => string
(valores: number[]) => number
(mensagem: string) => void
```

Para cada tipo, diga entradas e saída.

### Bloco 4 — Prática (15 min)

Implemente uma função que soma um array e outra que formata o total. Teste array comum e vazio.

## Limite pedagógico

Não é necessário estudar agora:

- parâmetros opcionais ou com valor padrão;
- rest parameters;
- callbacks;
- closures;
- sobrecarga;
- `this` em funções;
- métodos avançados de arrays.

Esses temas aparecerão quando os pré-requisitos estiverem consolidados.
