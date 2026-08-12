# while / do ... while / for
## Estrutura:
1. Inicialização
2. Condição
3. Instruções
4. Atualização

## while:

```typescript
inicializacao;

while (condicao){
    instrucoes;
    atualizacao;    
}
```

## do ... while

```typescript
inicializacao;

do {
    instrucoes;
    atualizacao;
} while (condicao);
```

## for

```typescript
for(inicializacao; condicao; atualizacao){
    instrucoes;
}

// quando precisar do contador fora do loop, declarar antes:
let inicializacao;

for (; condicao; atualizacao){
    instrucoes;
}

console.log(`Valor pode ser utilizado após o loop: ${inicializacao}`);

// Evitar de deixar partes do cabeçalho vazias para o "for", só usar esse recurso quando necessário. Um for incompleto pode ser mais difícil de ler do que um while. 


```

## Formas de atualização
```typescript
contador++ || ++contador
contador--

contador += 2;
contador -+ 5;
```

## break
Exemplo: A saída contém 1, 2 e 3. Quando codigo chega a 4, o loop termina antes do console.log:
```typescript
for (let codigo = 1; codigo <=10; codigo++){
    if (codigo === 4){
        break;
    }
    console.lot(codigo);
}
```

## continue
Exemplo: A saída contém 1, 2, 4 e 5. (3 foi pulado):

```typescript
for (let numero = 1; numero <= 5; numero++) {
  if (numero === 3) {
    continue;
  }

  console.log(numero);
}
```