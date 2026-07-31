# Gabarito - Prova Capítulo 00: Preparação do Ambiente

## Questão 1
**Resposta:** [b]

## Questão 2
**Resposta:** [b]

## Questão 3
- (V) O comando `tsc --watch` recompila automaticamente o arquivo TypeScript sempre que ele é salvo.
- (V) O Node.js é necessário para executar arquivos JavaScript gerados pelo compilador TypeScript.
- (F) Arquivos TypeScript têm a extensão `.js` e arquivos JavaScript têm a extensão `.ts`.
- (V) O TypeScript detecta erros de tipo durante a compilação, antes do código ser executado.

## Questão 4
A principal vantagem do TypeScript é a tipagem estática, que permite detectar erros de tipo antes da execução, melhorando a qualidade do código, facilitando a manutenção e proporcionando melhor autocompletar e documentação no editor.

## Questão 5

**a)** Não irá compilar. A idade foi declarada como number, mas foi atribuída a ela um valor do tipo string.

**b)** A linha problemática é a linha 2. O erro é que a variável idade foi declarada como number, mas foi atribuída a ela um valor do tipo string.

**c)**
```typescript
let nome: string = "Gabriel";
let idade: number = 25;
let ativo: boolean = true;

console.log(nome + " tem " + idade + " anos");
```

## Questão 6
```typescript
let produto: string = "Caderno";
let preco: number = 15.90;
let quantidade: number = 3;
let total: number = preco * quantidade;

console.log("O total de " + quantidade + " " + produto + "(s) é R$ " + total);
```

## Questão 7

**a)**
- Erro 1: `let cidade: string = "São Paulo"` - Falta o ponto e vírgula no final da linha.
- Erro 2: `let populacao: string = 12000000;` - A variável foi tipada como string, mas recebeu um valor do tipo number.
- Erro 3: `let capital: boolean = "true";` - A variável foi tipada como boolean, mas recebeu uma string em vez de um valor booleano (true ou false sem aspas).

**b)**
```typescript
let cidade: string = "São Paulo";
let populacao: number = 12000000;
let capital: boolean = true;

console.log(cidade + " tem " + populacao + " habitantes");
console.log("É capital: " + capital);
```
