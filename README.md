# Formação pessoal em Ciência da Computação e Engenharia de Software

Currículo sequencial de Gabriel Alonso para aprender programação, algoritmos, estruturas de dados, matemática, sistemas, redes, bancos, segurança e engenharia de software. **TypeScript é a linguagem principal de implementação; a formação é o objetivo.**

## Onde estamos

Capítulos 00–08 formalmente concluídos. O 09 tem prática aprovada e está praticamente concluído, com fechamento formal da prova pendente: existem respostas, mas ainda não há resultado e a questão 08 está incompleta no arquivo salvo.

**Capítulo 10 concluído; capítulo 11 em andamento.** Os fundamentos de hashing foram estudados conforme relato de Gabriel. **Próximo passo:** [Set e Map na prática — etapa 3](11-set-map-e-hashing/README.md#etapa-3). A prática do 11 ainda não foi avaliada. A metodologia prioriza domínio prático e compreensão dos mecanismos; aprofundamento formal de baixo retorno é opcional.

## Mapa do curso

- [EMENTA.md](EMENTA.md): sequência única de 16 blocos após a base 00–09, pré-requisitos e quatro capstones.
- [AGENTS.md](AGENTS.md): diretrizes do professor, prática, avaliação, revisão e política de IA.
- [PROGRESSO.md](PROGRESSO.md): histórico de notas e situação atual.
- [DIARIO.md](DIARIO.md): anotações pessoais do aluno, preservadas.
- [Leitor de aulas](leitor/README.md): navegação pelos materiais criados.

## Evolução curricular — 09/09/2026

**Fase inicial:** fundamentos de programação usando TypeScript. **Fase atual:** expansão para Ciência da Computação e Engenharia de Software.

Os capítulos 00–09 preservam sua estrutura, trabalhos e referências históricas. Indicações antigas de Tuples no capítulo 10, projetos obrigatórios anteriores ou provas após cada capítulo não definem a nova sequência. Consulte a EMENTA e o PROGRESSO atuais. O nome histórico no diário e o caminho `Typescript-Course` foram preservados.

## Como estudar

A ementa define o que aprender e em qual sequência. O professor organiza referências excelentes em um roteiro personalizado: **videoaula → leitura orientada → esclarecimentos necessários → prática selecionada → LeetCode ou lab → feedback e revisão**. Cada capítulo começa por conhecimentos e experiências anteriores.

O **Guia de estudo** (`README.md`) conecta os materiais na ordem de uso: uma orientação curta, o link da leitura e a próxima atividade. Notas complementares aparecem somente no ponto necessário; exercícios ligam à página do enunciado nos recortes PDF disponíveis. CS50/Harvard é a primeira fonte de vídeo a consultar; MIT OCW e outras fontes acadêmicas entram conforme adequação. Em DSA, o livro-âncora inicial é CLRS, 3ª edição, com apoio do mapa de leituras do MIT 6.006 Fall 2011. Material próprio só preenche lacunas específicas.

A prática é selecionada prioritariamente do livro, MIT e CS50; LeetCode e labs integram a faixa inicial flexível de 8–15 atividades totais. Consolidação depende da necessidade e desafios são opcionais. O aluno pode entregar tentativas durante o percurso; o avanço ocorre por domínio demonstrado, sem provas ou checkpoints obrigatórios. Revisões reaparecem naturalmente nos exercícios futuros.

Há quatro capstones previstos e preservados, sem mini-projeto obrigatório a cada capítulo. Conteúdo é criado sob demanda e o próximo passo fica no contexto do professor. O MBA complementa a formação, sem ditar sua ordem. IA explica e oferece pistas graduais, preservando a tentativa própria; avaliações são corrigidas após a entrega.

Em 10/09/2026, o capítulo 10 foi reconstruído localmente como guia, notas de apoio e prática selecionada. Naquela data, o estudo ainda não havia sido avaliado; o fechamento posterior está registrado no PROGRESSO. O guia e a leitura PDF noturna da seção 1.2 foram publicados no site privado em 10/09/2026 (versão 32).

## Estrutura real e expansão

```text
AGENTS.md / EMENTA.md / PROGRESSO.md / DIARIO.md
.context/                  contexto atual para orientar o ensino
00-preparacao-do-ambiente/  início da base preservada
…
09-arrays-metodos-avancados/
projetos/                  somente .gitkeep; capstones sob demanda
leitor/                    aplicação de leitura dos Markdown
```

Os capítulos novos terão README central, com notas e arquivos de prática somente quando úteis, conforme AGENTS. Nenhuma pasta futura vazia foi criada. As soluções antigas continuam nos locais originais, mesmo onde diferem da convenção atual.

## Rodar um exercício

Na pasta do exercício, use:

```bash
ts-node ex23.ts
```

O comando verifica os tipos e executa o arquivo, sem precisar gerar um `.js` separado. A configuração em `tsconfig.json` usa ES2022 e modo estrito. Cada arquivo é tratado como módulo independente, permitindo repetir nomes entre exercícios.

Pré-requisitos: Node.js, TypeScript e ts-node (já instalados no ambiente atual). Em outro computador, instale as ferramentas com `npm install -g typescript ts-node`.

Use esse comando no lugar de `tsc arquivo.ts && node arquivo.js` nos materiais antigos. Passar um arquivo diretamente para `tsc` ignora o `tsconfig.json`; executar `tsc` sem argumentos verifica todos os exercícios, inclusive os incompletos. O leitor tem configuração própria.

## Sobre o aluno

Gabriel Monteiro Alonso, engenheiro mecânico, desenvolve projetos próprios e busca autonomia para resolver problemas, compreender sistemas e aprender novas tecnologias. O repositório registra estudos em andamento; não representa conclusão antecipada do currículo.

## Licença

Uso pessoal e educacional. Curso iniciado em Janeiro/2025; evolução curricular registrada em 09/09/2026.
