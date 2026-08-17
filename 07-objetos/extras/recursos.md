# Objetos — Recursos e roteiro de revisão

O material do capítulo cobre todo o conteúdo exigido. Use a documentação para confirmar dúvidas específicas.

## Documentação essencial

1. [TypeScript Handbook — Object Types](https://www.typescriptlang.org/docs/handbook/2/objects.html)  
   Consulte propriedades, opcionais e tipos escritos inline. `interface` e index signatures ficam para capítulos futuros.

2. [MDN — Trabalhando com objetos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Working_with_objects)  
   Referência sobre literais, ponto, colchetes e métodos.

3. [MDN — Spread em objetos](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax)  
   Consulte a cópia de propriedades. Rest parameters de função ficam para o Capítulo 08.

4. [MDN — Destructuring](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring)  
   Extração de propriedades para variáveis e parâmetros.

## Roteiro de revisão — 45 minutos

### Bloco 1 — Modelo mental (10 min)

Explique sem consultar:

- array versus objeto;
- objeto versus propriedade;
- `const` versus mutação de campo;
- alias versus cópia com spread.

### Bloco 2 — Sintaxe (10 min)

Escreva o mesmo dado como:

1. literal tipado;
2. leitura com ponto e com colchetes;
3. propriedade opcional ausente e depois preenchida;
4. objeto aninhado.

### Bloco 3 — Transformações (10 min)

Leia em voz alta:

```typescript
const next = { ...atual, preco: 16 };
const { nome, preco } = next;
```

Diga o que foi copiado, o que foi substituído e o que cada variável guarda.

### Bloco 4 — Prática (15 min)

Implemente uma função que recebe `{ quantidade: number; ativa: boolean }[]`, soma somente itens ativos com quantidade maior que `0` e devolve um objeto-resumo `{ quantidade: number; totalDeItens: number }`. Teste lista comum, item inativo, zero e array vazio.

## Limite pedagógico

Não é necessário estudar agora:

- `type` e `interface`;
- classes e `constructor`;
- callbacks como parâmetros;
- `map`, `filter`, `find` e `reduce`;
- `this` além do método chamado com ponto;
- utility types como `Partial`.

Esses temas aparecerão quando os pré-requisitos estiverem consolidados.
