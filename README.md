# Formação pessoal em Ciência da Computação e Engenharia de Software

Curso pessoal de Gabriel Alonso, com TypeScript como linguagem principal de implementação.

## Documentação

- [Ementa](EMENTA.md): conteúdo, sequência e pré-requisitos do curso.
- [Diretrizes do repositório](AGENTS.md): responsabilidades e regras gerais.
- [Agentes de criação e revisão](.context/prompts-agentes.md): metodologia para produzir novos capítulos.
- [Leitor de aulas](leitor/README.md): aplicação de leitura e integração dos materiais.
- [Catálogo de algoritmos](CATALOGO.md): consulta avulsa; atualmente contém insertion sort em TypeScript.

Cada capítulo tem seu próprio README, apresentado como **Guia de estudo**. Os materiais e trabalhos anteriores permanecem nas pastas dos capítulos.

## Rodar um exercício

Na pasta do exercício:

```bash
ts-node ex23.ts
```

Pré-requisitos: Node.js, TypeScript e ts-node. A configuração em `tsconfig.json` usa ES2022 e modo estrito. Cada arquivo é tratado como módulo independente.

Executar `tsc` sem argumentos verifica também exercícios incompletos; passar um arquivo diretamente para `tsc` ignora o `tsconfig.json`. O leitor tem configuração própria.
