# 10 — Complexidade e Big O

Você já sabe escrever uma solução com arrays e loops. Agora a pergunta muda: **quanto trabalho ela faz quando a entrada cresce?**

| Campo | Neste capítulo |
|---|---|
| Objetivo | Explicar e comparar crescimento de tempo e memória antes de otimizar |
| Área e bloco | DSA · Bloco 1 — Fundamentos algorítmicos (10–15) |
| Pré-requisitos | Loops (04), arrays (05/09), funções e callbacks (06/08), objetos (07) |
| Conhecimentos-âncora | Percursos, acumuladores, retorno antecipado e métodos de arrays |
| Ponte | Dois loops conhecidos → muitas comparações → contar trabalho → Big O |
| Por que importa | Um resultado correto em poucos dados pode ficar inviável em entradas maiores |
| Aplicação profissional | Avaliar buscas repetidas, processamento de listas e cópias em relatórios/APIs |
| Conexões | Retoma os custos escondidos nos métodos do 09; prepara Set/Map no 11 |

Seu relato de Contains Duplicate e Time Limit Exceeded abre a investigação. Os exemplos da aula usam outros problemas; você volta às próprias tentativas depois, sem receber a solução pronta.

## Após este capítulo, você deve ser capaz de…

- Definir o tamanho da entrada e a operação contada.
- Diferenciar loops sequenciais, aninhados e com limite fixo.
- Justificar O(1), O(log n), O(n), O(n log n), O(n²) e reconhecer crescimento exponencial.
- Declarar o caso analisado; não chamar uma medição isolada de “caso médio”.
- Separar entrada, saída e espaço auxiliar e explicar uma troca entre tempo e memória.
- Criar um experimento pequeno, prever seu resultado e investigar divergências.

**Critério de domínio:** analisar uma variação sem decorar a aparência do código, justificar a contagem, testar limites e explicar o que uma medição permite concluir. Ler o material ou obter Accepted não substitui essa demonstração. O checkpoint não tem nota numérica: domínio demonstrado, reforço localizado ou revisão necessária. Uma lacuna específica recebe uma rechecagem curta; o avanço ao 11 depende dos pré-requisitos demonstrados.

## Aula complementar recomendada

- **Aula:** Week 3 — Algorithms, CS50x 2026, com David J. Malan.
- **Instituição/fonte:** Harvard University — CS50 OpenCourseWare.
- **Link oficial:** [Week 3 — Algorithms](https://cs50.harvard.edu/x/2026/weeks/3/) — verificado em 10/09/2026; página com vídeo, notas, slides e transcrição.
- **Partes relacionadas ao capítulo:** busca linear e busca binária para comparar crescimento linear e logarítmico; discussão de eficiência e notação assintótica, principalmente Big O. As notações Ω e Θ aparecem como contexto, sem exigência de formalização adicional aqui.
- **Por que assistir:** as demonstrações concretas ajudam a perceber como o trabalho cresce antes de organizar a análise na leitura. Você pode assistir primeiro e depois retomar os exemplos em TypeScript deste capítulo. Ordenação e recursão também aparecem no vídeo, mas são apenas um primeiro contato; sua implementação fica para os capítulos 14 e 15.

A videoaula é complementar e opcional; este material continua autossuficiente. **Gabriel relata já ter assistido a essa aula**; não é necessário revê-la inteira. Retome somente os trechos que ajudarem com uma dúvida. Esse relato não equivale a avaliação de domínio do capítulo.

## Roteiro único

1. [Do código que funciona ao trabalho que cresce](aula/01-do-problema-a-contagem.md).
2. [Big O e famílias de crescimento](aula/02-big-o-e-crescimento.md).
3. [Memória e custos escondidos](aula/03-memoria-e-custos-escondidos.md).
4. [Experimentos e limites da medição](aula/04-experimentos.md).
5. [Fundamentos](pratica/01-fundamentos.md) → [aplicação](pratica/02-aplicacao.md) → [desafio](pratica/03-desafios.md) → [debugging](pratica/debugging.md) → [retorno ao LeetCode](pratica/leetcode.md).
6. Entregue a prática para correção. Depois faça o [checkpoint](checkpoint/perguntas.md), de forma independente.
7. Consulte o [resumo](revisao/resumo.md), os [erros comuns](revisao/erros-comuns.md), a [revisão espaçada](revisao/revisitar.md) e as [referências](recursos/referencias.md).

Crie seus arquivos em `pratica/solucoes/`; as instruções de cada etapa indicam a entrega. Para executar um arquivo, use `ts-node caminho/do/arquivo.ts` no terminal do curso, como no 09. Não é necessário instalar bibliotecas. Não existe mini-projeto obrigatório aqui.

Na aula, pode pedir explicações alternativas. Na prática, faça uma tentativa antes de pedir ajuda; começaremos pela menor pista necessária. No checkpoint, consulte o material e a documentação, mas não peça validação ou resolução por IA durante a execução.

**Próximo arquivo:** [aula/01-do-problema-a-contagem.md](aula/01-do-problema-a-contagem.md).
