# Notas do Professor

> Arquivo de controle do Claude - Observações livres sobre o curso

---

## Observações Gerais

### 2026-07-26 - Leitor de Aulas

**O que foi criado:**
- Pasta `leitor/` com React + Vite + TypeScript
- Home com índice estilo explorador do VS Code
- Página `/ler/...` com Markdown tipografado, highlight e prev/next
- Catálogo via `import.meta.glob` — novos capítulos `NN-*` entram sozinhos
- Exclusões: `.context/`, gabaritos, `correcoes.md`, `resultado.md`
- Progresso manual em `leitor/src/content/progress.json`

**Como o aluno usa:**
```bash
cd leitor && npm install && npm run dev
```
Celular na mesma rede: URL Network do Vite.

**Atualização:** dark mode (preferência + localStorage) e leitura desktop com coluna centralizada; índice sempre colapsável.

**Próximo passo pedagógico:** continuar Cap. 01 pela aula (teoria → sintaxe → exemplos → mini-projeto), agora podendo ler no leitor.

### 2026-07-26 - Geração do Capítulo 01

**Material criado:**
- Aula completa sobre `let`, `const`, `var`, nomenclatura, inferência, anotação e escopo
- Mini-projeto com contexto de engenharia
- 10 exercícios progressivos e 1 bônus
- Prova equilibrada em 40% teoria e 60% prática
- Guia de erros comuns, recursos e glossário

**Adaptações realizadas:**
- Reforço de nomes descritivos em `camelCase`
- Separação explícita entre erro de compilação, problema de saída e estilo
- Comparação entre vírgula e `+` no `console.log`
- Conferência do código salvo contra a versão realmente testada
- Template literals apenas como prévia, sem antecipar o Capítulo 02

**Próximo ponto de observação:**
- Verificar se o aluno escolhe `const` por padrão e usa `let` apenas quando há reatribuição
- Observar precisão na reprodução das saídas
- Avaliar compreensão prática de escopo de bloco

### 2026-07-26 - Dúvida sobre a Questão 6 da Prova

**Observação:**
- O aluno criou uma função `total(preco, quantidade)` para efetuar o cálculo
- A solução funciona, mas não atende literalmente ao requisito de armazenar o resultado em uma variável `total` tipada
- Reforçar a distinção entre função e variável e a leitura literal dos requisitos

### 2026-07-26 - Prova do Capítulo 00

**Resultado:** 9,5/10 — aprovado.

**Observações:**
- Excelente domínio dos conceitos teóricos e dos erros de tipo
- O arquivo `caderno.ts` estava correto, mas a versão copiada para a resposta da Q6 continha uma chave extra e chamava a variável `total` como função
- O aluno respondeu conforme o gabarito na Q7; esclarecer que ausência de `;` não era um erro real de compilação
- Capítulo 00 concluído e aluno liberado para o Capítulo 01

### 2025-01-12 - Sessão Inicial

**Impressões do aluno:**
- Gabriel demonstrou grande organização e visão de longo prazo
- Participou ativamente da construção da estrutura do curso
- Pesquisou cursos online antes de começar (atitude proativa)
- Entende suas limitações e quer construir uma base sólida

**Decisões tomadas:**
- Começar do zero absoluto (não assumir conhecimento prévio)
- Abordagem híbrida: teoria + prática imediata
- Geração de conteúdo sob demanda (capítulo por capítulo)
- Agentes sequenciais para garantir coerência do material

**Estrutura criada:**
- CLAUDE.md com diretrizes completas
- EMENTA.md com 31 capítulos + 3 bônus
- Sistema de pastas organizado
- Arquivos de controle em .context/

---

### 2025-01-25 - Primeira Entrega do Aluno

**Trabalho verificado:**
- Aluno estudou toda a aula do cap. 00 por conta própria
- Fez os exemplos práticos em pasta separada (03.exemplos-exercicios)
- Criou 5 arquivos: hello.ts, variaveis.ts, contador.ts, cronometro.ts, mini-projeto.ts

**Pontos positivos observados:**
- Testou quebra de tipos (comentou linhas para ver erros) - mostra curiosidade
- Usou `\n` para espaçamento no mini-projeto (iniciativa própria, não estava na aula)
- Organizou código com comentários (header, footer)
- Adicionou variáveis extras além do pedido (curso, capitulo)
- Escreveu resumo do que aprendeu no arquivo variaveis.ts

**Estilo de aprendizado:**
- Faz mais do que o mínimo pedido
- Experimenta por conta própria
- Documenta o que aprende

**Próximo passo:**
- Liberado para lista de exercícios (10 + bônus)
- Observar desempenho para ajustar dificuldade do cap. 01

---

### 2026-02-01 - Correção dos Exercícios do Cap. 00

**Desempenho geral:** Bom. Todos os 10 arquivos compilam. Conceitos centrais foram absorvidos.

**Pontos fortes confirmados:**
- Continua fazendo mais do que o mínimo pedido (ex06 com if/else, ex02 com variável tipada)
- Documenta o que faz (transcrições do terminal em quase todos os exercícios)
- Curiosidade ativa: descobriu sozinho que Node.js v24 roda .ts direto
- Reflexões escritas demonstram compreensão real, não apenas cópia

**Pontos de atenção identificados:**
- **Inconsistência com ponto e vírgula**: alterna entre usar e não usar. Precisa escolher uma convenção e manter
- **Atenção ao enunciado**: em 3+ exercícios a saída ficou diferente do formato pedido. Não é erro conceitual, mas mostra leitura superficial dos requisitos
- **Confusão erro de compilação vs estilo**: no ex06, identificou falta de `;` como "erro" quando é apenas convenção. Importante distinguir o que o compilador rejeita vs o que é boa prática
- **Nomes de variáveis**: tendência a abreviar (msg, dt, nExercicios no ex10). Reforçar nomes descritivos

**Para a prova:**
- Incluir pelo menos uma questão sobre a diferença entre erro de compilação e questão de estilo
- Observar se o padrão de "saída diferente do esperado" se repete

**Para o Cap. 01:**
- Reforçar concatenação com `+` vs vírgula no console.log
- Introduzir template literals como alternativa moderna
- Exercícios sobre convenções de nomes de variáveis

---

## Ideias para Adaptar o Curso

*Anotações de ajustes que podem ser feitos conforme o progresso*

- [ ] Se engenharia mecânica aparecer, usar analogias de física/mecânica
- [ ] Observar se prefere exemplos mais matemáticos ou mais do dia a dia
- [ ] Ajustar quantidade de exercícios baseado no desempenho inicial

---

## Conceitos para Reforçar

*Tópicos que podem precisar de atenção extra*

| Conceito | Motivo | Ação Sugerida |
|----------|--------|---------------|
| Ponto e vírgula (convenção) | Uso inconsistente nos exercícios | Reforçar no cap. 01 |
| Diferença console.log com `,` vs `+` | Usa `,` sem saber a diferença de formatação | Explicar no cap. 01 |
| Erro de compilação vs estilo | Confundiu `;` ausente com erro no ex06 | Questão na prova do cap. 00 |
| Comandos de arquivos no terminal | Pediu revisão de `mv`, `rm` e `rmdir` | Reforçar segurança antes de exclusões recursivas |

---

## Exercícios Extras Sugeridos

*Ideias de exercícios adicionais para reforço*

| Capítulo | Exercício | Objetivo |
|----------|-----------|----------|
| - | - | - |

---

## Feedback do Aluno

*Registro de feedbacks recebidos*

| Data | Feedback | Ação Tomada |
|------|----------|-------------|
| - | - | - |

---

## Ajustes na Ementa

*Registro de mudanças feitas na ementa original*

| Data | Mudança | Motivo |
|------|---------|--------|
| 2025-01-12 | Adicionado cap. Tuples | Pesquisa identificou importância |
| 2025-01-12 | Adicionado cap. Enums | Pesquisa identificou lacuna |
| 2025-01-12 | Adicionado cap. DOM | Prática imediata motivadora |
| 2025-01-12 | Adicionado cap. Type Assertions | Uso diário, essencial |
| 2025-01-12 | Adicionado cap. Function Overloading | Completude do curso |
| 2025-01-12 | Adicionado cap. Declaration Files | Trabalho com libs externas |

---

## Lembretes para Próximas Sessões

- [x] Verificar se aluno quer iniciar capítulo 00
- [x] Corrigir exercícios quando aluno entregar
- [x] Observar padrões de erro nos exercícios
- [ ] Publicar o leitor de aulas no Sites após confirmação do aluno
- [ ] Perguntar preferência de horário/frequência de estudo
- [ ] Observar estilo de comunicação preferido

---

## Métricas de Qualidade do Curso

| Aspecto | Status | Observação |
|---------|--------|------------|
| Clareza das aulas | A avaliar | - |
| Dificuldade dos exercícios | A avaliar | - |
| Relevância dos projetos | A avaliar | - |
| Ritmo do curso | A avaliar | - |

---

*Última atualização: 2026-07-26*
