# Guia de estudo — Set, Map e hashing

**Objetivo:** escolher como representar presença e associações, usar Set e Map em TypeScript e explicar o custo e os limites dessa escolha.

**Próximo passo: [aula de Set — etapa 3](#etapa-3).** Vídeos, leituras conceituais e exercício de chaining estão concluídos. Não é necessário refazê-los. Set e Map são a continuação, ainda sem domínio prático avaliado.

## 1. Vídeo já estudado — consulta

**Estudo concluído:** trechos da [CS50x 2026 — Week 5, David Malan](https://cs50.harvard.edu/x/2026/weeks/5/), gravação de 2025:

- [Dictionaries — 10:44–12:26](https://www.youtube.com/watch?v=PmAI76OGE_E&t=644s).
- [Hashing and Hash Tables — 1:36:47–1:53:51](https://www.youtube.com/watch?v=PmAI76OGE_E&t=5807s).

Os links permanecem para consulta. Reproduzir C, ponteiros ou listas ligadas não é necessário neste capítulo.

## 2. Fundamentos já estudados — consulta

Referência: **Introduction to Algorithms, CLRS, 3ª edição em inglês**. As páginas abaixo são as impressas; os PDFs preservam páginas completas.

**Estudo conceitual concluído:** [introdução e 11.1, pp. 253–255](leituras/clrs-11.1.pdf) e parte relevante de [11.2, pp. 256–260](leituras/clrs-11.2.pdf): endereçamento direto e seu custo de espaço, chave → hash → posição, colisões, encadeamento (*chaining*), fator de carga intuitivo e eficiência média/esperada versus pior caso.

A explicação guiada consolidou a leitura densa de 11.2, reconstruindo a progressão de array e busca linear até hashing, colisões e custo. O exercício **11.2-2, `h(k) = k mod 9`, com inserção no início das cadeias, está concluído**, conforme sua entrega e relato. Essa base basta para continuar. Os teoremas, suas demonstrações, esperança matemática e variáveis indicadoras das pp. 259–260 ficam como **aprofundamento opcional**, sem leitura ou entrega exigida. Não é preciso terminar a seção para avançar. A [atividade 1](pratica/atividades.md#atividade-1) fica preservada como referência do exercício feito, sem nova entrega.

## 3. Aula de Set — comece aqui

No capítulo 10, você reconheceu o custo das buscas repetidas em arrays. Leia a [aula autoral de Set](aula/01-set.md), que parte da pergunta “este valor está presente?” e desenvolve criação, consulta, alteração, identidade e custo em TypeScript.

Execute os exemplos separadamente, num arquivo de rascunho, com `ts-node arquivo.ts`, como nos exercícios do curso. Faça o [experimento de Set da atividade 2](pratica/atividades.md#experimento-de-set). Não precisa estudar Map para concluir esta etapa.

**Depois:** retome [Contains Duplicate — atividade 3](pratica/atividades.md#atividade-3) sem substituir a tentativa quadrática anterior. Escolha sua estratégia, teste e compare o custo. Pode enviar a tentativa para feedback antes de prosseguir; a aula não entrega a solução otimizada.

A MDN e a especificação fundamentam as aulas e estão ligadas ao fim de cada parte. Consulte-as se quiser verificar um comportamento ou esclarecer uma dúvida; não há leitura sequencial obrigatória dessas páginas.

## 4. Aula de Map — da presença à associação

Leia a [aula autoral de Map](aula/02-map.md). A ponte agora é: saber que um produto existe → recuperar seu preço → atualizar uma informação → representar uma quantidade ou índice de consulta.

Faça o [experimento de Map da atividade 2](pratica/atividades.md#experimento-de-map). Em seguida, passe à [atividade 4 — investigar uma consulta](pratica/atividades.md#atividade-4), [atividade 5 — Two Sum](pratica/atividades.md#atividade-5) e [atividade 6 — Valid Anagram](pratica/atividades.md#atividade-6), uma por vez, com feedback quando útil.

Comece com o que consegue construir. Depois de testar e entender o custo, procure trabalho repetido e tente melhorar. As representações e os algoritmos dos problemas ficam para você descobrir.

## 5. Escolher a representação num problema de software

Leia [Array, Set, Map e Object](aula/03-escolher-representacoes.md). A aula acompanha mudanças no requisito de um sistema de empréstimos: campos de um registro, histórico, presença e informação associada. Execute o pequeno experimento de atualização; não há tabela para decorar.

Aplique esse critério na [atividade 9 — empréstimos em memória](pratica/atividades.md#atividade-9). É um programa pequeno, sem interface ou banco. O objetivo é escolher representações e discutir uma decisão, não montar um projeto extenso.

## 6. Feedback e consolidação

A continuação essencial é **Set → experimento → Contains Duplicate → feedback → Map → experimento e atividades 4–6 → escolha de representação → atividade 9**. Envie partes conforme avançar; não espere concluir tudo para discutir.

A prática deve mostrar uso das coleções, tratamento de ausência e identidade, escolha de representação e custo com hipóteses claras. A compreensão dos fundamentos já estudados será conectada a essas decisões, sem prova matemática nem questionário obrigatório.

A [atividade 7](pratica/atividades.md#atividade-7) é consolidação adicional e a [atividade 8](pratica/atividades.md#atividade-8), desafio opcional. Use-as por interesse ou dificuldade observada, sem quota de exercícios. A continuação de Set/Map está preparada, mas ainda não foi estudada ou aprovada. **Permanecemos no capítulo 11.**
