# Agentes de criação e revisão de aulas

A EMENTA define o conteúdo e a sequência do curso. Este documento define como os agentes transformam essa direção em material didático.

## 1. Fluxo de criação

Percurso preferencial:

**ementa → videoaula → leitura orientada → aula autoral em TypeScript → prática**

Adaptar quando alguma etapa não fizer sentido para o assunto.

O agente principal integra o capítulo. Curadoria e revisão podem ser delegadas quando houver trabalho independente útil.

Criar somente o capítulo solicitado e consultar capítulos anteriores apenas quando necessário para continuidade.

## 2. Curadoria

Para algoritmos e estruturas de dados:

- verificar primeiro CS50/Harvard para videoaula;
- usar o mapa do MIT 6.006 como ponto de partida para localizar o assunto no CLRS;
- inspecionar as seções correspondentes no exemplar canônico antes de definir a leitura;
- selecionar apenas o trecho necessário para os objetivos da ementa.

A ementa determina o percurso. MIT, CLRS e vídeo são fontes, não currículos a serem seguidos integralmente.

Preservar contato direto com boas fontes: a aula autoral deve mediar, conectar e aplicar o conteúdo, não simplesmente substituir ou resumir o material original.

Usar documentação oficial/MDN quando necessário para comportamento e APIs da linguagem.

Registrar no capítulo somente as fontes efetivamente utilizadas e os limites de leitura/vídeo.

## 3. Desenvolvimento da aula

Progressão preferencial:

**conhecido → problema → conceito/mecanismo → modelo mental → TypeScript → exemplo/experimento → custo/limitações → aplicação**

Preservar os fundamentos de Ciência da Computação, priorizando o que ajuda o aluno a implementar, escolher ferramentas, testar, depurar e analisar algoritmos.

Fazer explicitamente a ponte entre teoria e TypeScript/JavaScript.

Quando a linguagem oferecer uma abstração pronta, mostrar:

1. qual conceito ela representa;
2. como é utilizada;
3. o que ela abstrai;
4. quais custos continuam existindo.

Exemplo: uma chamada simples como `sort()` abstrai a implementação da ordenação, mas seu custo continua fazendo parte da análise do algoritmo.

Apresentar apenas o repertório de sintaxe necessário ou imediatamente útil. Não transformar a aula em documentação completa de APIs.

Usar TypeScript idiomático, tipos precisos, exemplos executáveis e explicações progressivas. Diagramas e rastreamentos entram quando melhorarem a compreensão.

## 4. Prática

Atividades próprias são opcionais.

Criá-las somente quando permitirem experimentar ou compreender algo que a aula e seus exemplos não cobrem bem.

Preferir tarefas pequenas e focadas. Evitar baterias extensas, partes A/B, muitas subperguntas, checkpoints e relatórios.

Problemas reais e exercícios externos podem assumir grande parte da prática posterior; o capítulo não precisa reproduzir essa bateria internamente.

## 5. Organização

O `README.md` do capítulo funciona como guia de estudo: objetivo, materiais, limites de leitura e próxima ação.

Estrutura disponível:

- `01-leituras-do-livro/`: recortes e metadados;
- `02-aulas-do-curso/`: aulas autorais;
- `03-pratica/`: somente quando necessária.

Não criar arquivos ou pastas apenas para satisfazer uma estrutura fixa.

Para recortes, metadados e integração com o leitor, seguir `leitor/README.md`.

## 6. Revisão

Antes da entrega, verificar:

- o capítulo atende à ementa;
- vídeo e leitura foram realmente inspecionados e delimitados;
- a aula desenvolve o conceito em vez de apenas resumir fontes;
- existe uma ponte clara entre teoria e código quando pertinente;
- abstrações prontas têm seus custos e limitações explicados;
- exemplos e links utilizados funcionam;
- atividades realmente acrescentam aprendizagem;
- não há repetição ou volume desnecessário.

Entregar um relato curto dos materiais alterados e das verificações realizadas.