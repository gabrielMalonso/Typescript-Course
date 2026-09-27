function isValid(s: string): boolean {
    function parentesisType(char: string): string {
        if (char === "(" || char === ")") return "parentesis";
        if (char === "[" || char === "]") return "colchetes";
        if (char === "{" || char === "}") return "chaves";
        throw new Error("Caractere inválido");
    }

    function isAbertura(char: string): boolean {
        if (char === "(" || char === "[" || char === "{") return true;
        return false;
    }

    const controleAberturas: string[] = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const tipoDeParentesis = parentesisType(char);
        const aberturaOuFechamento = isAbertura(char);

        // se o array está vazio e o próximo char é fechamento, return false
        if (controleAberturas.length === 0 && !aberturaOuFechamento)
            return false;

        // push() - só se for uma abertura
        if (aberturaOuFechamento) {
            controleAberturas.push(char);
            continue;
        }

        // pop() - remoção = fechamentos.
        if (
            !aberturaOuFechamento &&
            tipoDeParentesis ===
                parentesisType(controleAberturas[controleAberturas.length - 1])
        ) {
            controleAberturas.pop();
            continue;
        }
        if (
            !aberturaOuFechamento &&
            tipoDeParentesis !==
                parentesisType(controleAberturas[controleAberturas.length - 1])
        ) {
            return false;
        }
    }
    return controleAberturas.length === 0;
}

// // Example 1:
// let s = "()";
// console.log(isValid(s));
// // Output: true

// Example 2:
// let s = "()[]{}";
// console.log(isValid(s));
// Output: true

// Example 3:
// let s = "(]";
// console.log(isValid(s));
// Output: false

// Example 4:
// let s = "([])";
// console.log(isValid(s));
// Output: true

// Example 5:
// let s = "())";
// console.log(isValid(s));
// Output: false
