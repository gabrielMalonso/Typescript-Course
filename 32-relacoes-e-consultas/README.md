# Capítulo 32 — Relações e consultas

**Objetivo:** modelar relacionamentos essenciais entre tabelas (**1:N**, **1:1** e **N:N** com tabela associativa) evoluindo o esquema via nova migração, consultar dados distribuídos em múltiplas tabelas com **`JOIN`** (`INNER JOIN`, `LEFT JOIN` e múltiplos *joins*), resumir registros diretamente no banco com **agregações** (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY` e `HAVING`), entregar listas grandes com segurança usando **paginação** (`LIMIT`/`OFFSET` e paginação por cursor) e proteger operações compostas com **transações básicas** (`BEGIN`, `COMMIT` e `ROLLBACK`) para garantir atualizações indivisíveis.

No capítulo 31, você substituiu o arquivo JSON da API de Despesas por um banco SQLite real com `node:sqlite`, criou a migração `001_inicial.sql` com `categorias` e `despesas`, protegeu consultas contra SQL Injection e implementou o CRUD básico. Porém, até agora cada consulta tocou apenas **uma tabela por vez**: `GET /despesas` devolve apenas `categoriaId` (sem o nome da categoria) e traz **todas** as linhas de uma vez; não há como calcular totais por categoria sem carregar tudo na RAM do Node; nem como garantir que uma operação com duas ou mais escritas (como transferir saldo entre contas ou salvar uma despesa junto com suas tags) nunca pare pela metade. Neste capítulo, você resolve exatamente esses quatro limites.

**Percurso:** modelagem relacional inicial (1:N, 1:1, N:N e migração `002`) → `JOIN` (`INNER`, `LEFT`, aliases e armadilhas) → agregações (`COUNT`, `SUM`, `GROUP BY`, `HAVING`) → paginação (`LIMIT`/`OFFSET` versus cursor/*keyset*) → transações básicas (`BEGIN IMMEDIATE`, `COMMIT`, `ROLLBACK`) → integração na API de Despesas em TypeScript. Em cada etapa, leia o recorte oficial indicado e conecte o SQL diretamente ao repositório `node:sqlite` que você já domina.

**Escopo:** focamos nos fundamentos práticos de modelagem relacional, consultas sobre múltiplas tabelas, agregações, paginação e atomicidade básica de transações em SQLite (com SQL padrão transferível para PostgreSQL). Integração completa com o frontend e testes automatizados (incluindo testes de *rollback* em banco descartável) entram no capítulo 33; autenticação, autorização, CORS, senhas e deploy, no capítulo 34; normalização formal (1NF–3NF), anomalias e desnormalização justificada, no capítulo 81; índices B/B+ e leitura de *query plans*, no capítulo 82; e ACID completo, níveis de isolamento, concorrência entre conexões e bancos NoSQL, no capítulo 83.

## 1. Modelagem relacional inicial: 1:N, 1:1 e N:N

### O problema: quando tentar enfiar tudo numa tabela só quebra o sistema

No capítulo 31, já evitamos repetir o nome da categoria em toda linha de `despesas` criando a tabela `categorias`. Agora imagine dois novos requisitos reais para a nossa API de Despesas:

1. **Etiquetas (*tags*) livres em despesas:** uma despesa (`"Passagem aérea"`) pode ter várias tags (`"trabalho"`, `"reembolsavel"`, `"viagem"`), e a tag `"trabalho"` pode aparecer em dezenas de despesas diferentes.
2. **Contas financeiras e transferências:** o usuário mantém saldos separados (`"Conta Corrente"`, `"Carteira"`, `"Reserva"`) e transfere valores entre elas.

Se você tentar resolver as tags dentro da própria tabela `despesas` — criando colunas `tag1, tag2, tag3` ou guardando um texto separado por vírgulas (`"trabalho,reembolsavel"`) — três problemas aparecem na hora:

- **Limite artificial ou texto frágil:** colunas numeradas travam em 3 tags; texto com vírgulas quebra quando alguém usa vírgula no nome ou quando você busca `"casa"` e o `LIKE '%casa%'` casa `"casamento"`.
- **Sem integridade referencial:** o banco não consegue checar por `FOREIGN KEY` se cada tag dentro de uma string separada por vírgula realmente existe.
- **Atualização espalhada (*anomalia de atualização*):** renomear a tag `"reembolsavel"` exigiria reescrever strings em milhares de linhas de `despesas`.

A modelagem relacional resolve isso representando **cada entidade em sua própria tabela** e escolhendo o formato correto de chave estrangeira conforme a **cardinalidade** da relação.

### Leitura principal

Em [5.5.5. Foreign Keys — PostgreSQL](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK), releia apenas a parte final sobre **chaves estrangeiras compostas** e **múltiplas referências entre tabelas** (como a tabela `order_items` ligando `orders` e `products`). Pule **5.5.6. Exclusion Constraints**.

### Modelo mental: as três cardinalidades no banco relacional

Antes de escrever `CREATE TABLE`, faça sempre duas perguntas nos dois sentidos: *"um A pode se ligar a quantos B?"* e *"um B pode se ligar a quantos A?"*. A resposta define onde vai a chave estrangeira:

```text
1. Um-para-muitos (1:N) — a FK fica SEMPRE no lado N
   categorias (1) ──────< despesas (N)
   [id PK]                [id PK, categoria_id FK -> categorias.id]
   Uma categoria tem várias despesas; cada despesa pertence a 1 categoria.

2. Um-para-um (1:1) — FK com UNIQUE (ou mesma tabela)
   contas (1) ─────────── detalhes_bancarios (0..1)
   [id PK]                [conta_id PK/FK UNIQUE -> contas.id, agencia, numero]
   Use tabela separada só quando houver motivo claro (dados opcionais raros,
   colunas muito grandes ou controle de acesso distinto). Caso contrário,
   mantenha na mesma tabela!

3. Muitos-para-muitos (N:N) — exige uma TABELA ASSOCIATIVA no meio
   despesas (1) ──< despesa_tags (N) >── (1) tags
   [id PK]          [despesa_id FK,       [id PK]
                     tag_id FK,
                     PRIMARY KEY (despesa_id, tag_id)]
   Uma despesa tem várias tags; uma tag aparece em várias despesas.
```

Observe dois detalhes importantes na **tabela associativa** (`despesa_tags`, também chamada de tabela de junção ou *join table*):

1. **Chave primária composta (`PRIMARY KEY (despesa_id, tag_id)`):** em vez de criar um UUID artificial só para o vínculo, a própria combinação `(despesa_id, tag_id)` identifica a linha e **impede automaticamente** que a mesma tag seja associada duas vezes à mesma despesa.
2. **`ON DELETE CASCADE` na tabela de junção:** diferente de `despesas.categoria_id` (onde usamos `ON DELETE RESTRICT` para impedir apagar uma categoria ainda usada), em `despesa_tags` faz sentido usar `ON DELETE CASCADE` — se uma despesa for excluída, os vínculos dela em `despesa_tags` não têm razão para existir sozinhos e somem automaticamente.

E note também que **uma mesma tabela pode ser referenciada duas vezes** em relações 1:N: em `transferencias`, tanto `conta_origem_id` quanto `conta_destino_id` apontam para `contas(id)` — e uma restrição `CHECK (conta_origem_id <> conta_destino_id)` proíbe transferir uma conta para ela mesma.

### Evoluindo o esquema com a regra de ouro das migrações (`migrations/002_relacoes_e_contas.sql`)

Lembre-se da regra do capítulo 31: **nunca edite `001_inicial.sql`** depois de aplicada. Criamos uma segunda migração numerada que convive com o esquema existente sem quebrar nenhuma rota do capítulo 31:

```sql
-- migrations/002_relacoes_e_contas.sql
CREATE TABLE tags (
  id TEXT PRIMARY KEY CHECK (length(trim(id)) >= 1),
  nome TEXT NOT NULL UNIQUE CHECK (length(trim(nome)) >= 1)
) STRICT;

-- Relação N:N entre despesas e tags
CREATE TABLE despesa_tags (
  despesa_id TEXT NOT NULL REFERENCES despesas(id) ON DELETE CASCADE,
  tag_id TEXT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (despesa_id, tag_id)
) STRICT;

-- Contas financeiras com proteção estrutural contra saldo negativo
CREATE TABLE contas (
  id TEXT PRIMARY KEY CHECK (length(trim(id)) >= 1),
  nome TEXT NOT NULL UNIQUE CHECK (length(trim(nome)) >= 1),
  saldo_centavos INTEGER NOT NULL CHECK (saldo_centavos >= 0)
) STRICT;

-- Duas chaves estrangeiras apontando para a mesma tabela (contas)
CREATE TABLE transferencias (
  id TEXT PRIMARY KEY,
  conta_origem_id TEXT NOT NULL REFERENCES contas(id) ON DELETE RESTRICT,
  conta_destino_id TEXT NOT NULL REFERENCES contas(id) ON DELETE RESTRICT,
  valor_centavos INTEGER NOT NULL CHECK (valor_centavos > 0 AND valor_centavos <= 100000000),
  criada_em TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  CHECK (conta_origem_id <> conta_destino_id)
) STRICT;

INSERT OR IGNORE INTO tags (id, nome) VALUES
  ('fixa', 'Fixa'),
  ('reembolsavel', 'Reembolsável'),
  ('trabalho', 'Trabalho'),
  ('urgente', 'Urgente');

INSERT OR IGNORE INTO contas (id, nome, saldo_centavos) VALUES
  ('corrente', 'Conta Corrente', 100000),
  ('carteira', 'Carteira', 25000),
  ('reserva', 'Reserva', 500000);
```

### Custos e limites da modelagem inicial

- **Menos duplicação versus mais `JOIN`s:** separar entidades elimina inconsistências ao atualizar dados (como o nome de uma categoria ou tag), mas exige combinar tabelas na leitura. Em bancos relacionais, essa troca é intencional — e vamos medir o custo real e o papel de índices no capítulo 82.
- **Limites deste estágio:** aqui você aprende a identificar 1:N, 1:1 e N:N com clareza. As regras formais de normalização (1NF, 2NF, 3NF), detecção sistemática de anomalias e quando vale a pena desnormalizar de propósito entram no **capítulo 81**.

## 2. Combinando tabelas com `JOIN`: `INNER JOIN`, `LEFT JOIN` e múltiplos *joins*

### O problema: o antipadrão N+1

No capítulo 31, cada despesa devolvida por `GET /despesas` trazia apenas `categoriaId: "alimentacao"`. Se a interface precisar exibir `"Alimentação"` (o `nome` da categoria), uma solução ingênua seria:

1. Rodar **1** consulta: `SELECT id, descricao, categoria_id, valor_centavos FROM despesas`.
2. Para cada uma das **N** despesas retornadas, rodar outro `SELECT nome FROM categorias WHERE id = ?`.

Esse erro clássico tem nome: **problema N+1**. Para 200 despesas, você executa **201 consultas** em vez de **1**. No SQLite local isso já desperdiça CPU e preparação repetida; em um banco pela rede como PostgreSQL, 201 viagens de ida e volta (*round-trips*) transformam uma tela rápida em uma tela lenta.

O comando **`JOIN`** resolve isso pedindo ao banco que combine as linhas relacionadas em **uma única consulta**.

### Leitura principal

Leia por completo [2.6. Joins Between Tables — PostgreSQL](https://www.postgresql.org/docs/current/tutorial-join.html) (atenção ao contraste entre *inner join* e `LEFT OUTER JOIN`, e ao uso de aliases curtos de tabela no final).

Em [7.2.1.1. Joined Tables — PostgreSQL](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN), leia apenas a lista de tipos de *join* (`INNER JOIN`, `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, `FULL OUTER JOIN`) e a nota sobre a diferença entre colocar uma condição no **`ON`** versus no **`WHERE`**. Pule `CROSS JOIN`, `NATURAL` (evite `NATURAL JOIN` em produção: ele liga colunas pelo nome silenciosamente e quebra quando novas colunas entram em migrações) e pule `7.2.1.3` em diante.

### Modelo mental: `INNER JOIN` versus `LEFT JOIN`

Suponha que temos três categorias (`alimentacao`, `transporte`, `moradia`), mas apenas duas têm despesas cadastradas (`moradia` ainda está vazia):

```text
categorias (esquerda)               despesas (direita)
┌───────────────┬──────────────┐    ┌────┬──────────┬───────────────┐
│ id            │ nome         │    │ id │ descricao│ categoria_id  │
├───────────────┼──────────────┤    ├────┼──────────┼───────────────┤
│ alimentacao   │ Alimentação  │◄───┤ d1 │ Almoço   │ alimentacao   │
│ transporte    │ Transporte   │◄───┤ d2 │ Metrô    │ transporte    │
│ moradia       │ Moradia      │    └────┴──────────┴───────────────┘
└───────────────┴──────────────┘      (nenhuma despesa para moradia!)
```

Veja o resultado de cada tipo de `JOIN`:

| Tipo de `JOIN` | Regra | Linhas retornadas no exemplo acima | Quando usar |
|---|---|---|---|
| **`INNER JOIN`** (ou apenas `JOIN`) | Devolve **somente** os pares que casam nos dois lados. | 2 linhas (`Alimentação + Almoço`, `Transporte + Metrô`). **`Moradia` some!** | Quando você quer apenas registros que realmente possuem correspondência (ex.: listar despesas com o nome da sua categoria obrigatória). |
| **`LEFT JOIN`** (ou `LEFT OUTER JOIN`) | Mantém **todas** as linhas da tabela da esquerda; quando não houver par à direita, preenche as colunas da direita com **`NULL`**. | 3 linhas (`Alimentação + Almoço`, `Transporte + Metrô`, **`Moradia + NULL`**). | Quando a ausência à direita é informação útil (ex.: listar todas as categorias, inclusive as sem despesas, ou despesas que ainda não têm tags). |

*(Na prática do dia a dia, `INNER JOIN` e `LEFT JOIN` cobrem mais de 95% das consultas. `RIGHT JOIN` é apenas um `LEFT JOIN` invertido — prefira reescrever com a tabela principal à esquerda usando `LEFT JOIN`, que é muito mais fácil de ler.)*

### Exemplos concretos em SQL

#### 1. `INNER JOIN` com aliases e desambiguação de colunas

Quando duas tabelas têm uma coluna com o mesmo nome (`id`), o SQL exige qualificar a coluna com o nome ou **alias** da tabela (`d.id`, `c.id`) e renomear com `AS` na projeção para evitar colisão de nomes no objeto retornado ao JavaScript:

```sql
SELECT
  d.id,
  d.descricao,
  d.categoria_id,
  c.nome AS categoria_nome,
  d.valor_centavos,
  d.criada_em
FROM despesas AS d
INNER JOIN categorias AS c ON c.id = d.categoria_id
WHERE d.valor_centavos >= ?
ORDER BY d.criada_em DESC, d.id DESC;
```

#### 2. Múltiplo `JOIN` na mesma tabela (`transferencias` → `contas` duas vezes)

Cada transferência aponta para **duas** contas diferentes (`conta_origem_id` e `conta_destino_id`). Sem aliases distintos (`co` e `cd`), o banco não saberia qual das duas instâncias de `contas` você está consultando:

```sql
SELECT
  t.id,
  co.nome AS conta_origem_nome,
  cd.nome AS conta_destino_nome,
  t.valor_centavos,
  t.criada_em
FROM transferencias AS t
INNER JOIN contas AS co ON co.id = t.conta_origem_id
INNER JOIN contas AS cd ON cd.id = t.conta_destino_id
ORDER BY t.criada_em DESC, t.id DESC;
```

#### 3. `JOIN` atravessando uma relação N:N (`despesas` → `despesa_tags` → `tags`)

Para buscar todas as despesas que possuem uma tag específica (por exemplo `'trabalho'`), atravessamos a tabela associativa:

```sql
SELECT
  d.id,
  d.descricao,
  c.nome AS categoria_nome,
  d.valor_centavos
FROM despesas AS d
INNER JOIN categorias AS c ON c.id = d.categoria_id
INNER JOIN despesa_tags AS dt ON dt.despesa_id = d.id
INNER JOIN tags AS t ON t.id = dt.tag_id
WHERE t.id = ?
ORDER BY d.criada_em DESC, d.id DESC;
```

> **Atenção à multiplicação de linhas no N:N:** se você remover o `WHERE t.id = ?` acima para listar todas as despesas *junto* com todas as suas tags, uma despesa com 3 tags aparecerá **3 vezes** no resultado (uma linha por tag). Isso **quebra** `LIMIT`/`OFFSET` (você pede 20 despesas e recebe 7 despesas repetidas!) e **infla** somas em `SUM(...)`. Quando quiser listar despesas paginadas *com* suas tags, faça primeiro a consulta paginada de despesas (1 linha por despesa) e depois busque as tags apenas daqueles 20 IDs retornados (`WHERE dt.despesa_id IN (?, ?, ...)` — **2 consultas fixas**, nunca N+1!).

### A armadilha clássica: filtro no `WHERE` que destrói o `LEFT JOIN`

Compare cuidadosamente estas duas consultas para listar **todas as categorias** e apenas as despesas acima de R$ 50,00 (`5000` centavos):

```sql
-- ❌ ARMADILHA: o WHERE filtra DEPOIS do LEFT JOIN.
-- Categorias sem despesa têm d.valor_centavos = NULL.
-- Como (NULL >= 5000) é UNKNOWN, o WHERE joga fora essas categorias!
-- Na prática, o LEFT JOIN virou um INNER JOIN silenciosamente.
SELECT c.id, c.nome, d.descricao, d.valor_centavos
FROM categorias AS c
LEFT JOIN despesas AS d ON d.categoria_id = c.id
WHERE d.valor_centavos >= 5000;

-- ✅ CORRETO: o filtro da tabela direita entra no ON.
-- Só entram pares com valor >= 5000, mas categorias sem nenhuma despesa >= 5000
-- continuam aparecendo com d.descricao = NULL e d.valor_centavos = NULL!
SELECT c.id, c.nome, d.descricao, d.valor_centavos
FROM categorias AS c
LEFT JOIN despesas AS d
  ON d.categoria_id = c.id
  AND d.valor_centavos >= 5000;
```

Guarde essa regra mental: no `LEFT JOIN`, **condições que restringem quais linhas da tabela direita podem parear vão no `ON`**; condições que descartam linhas da tabela esquerda vão no `WHERE`.

### O que `JOIN` abstrai, custos e limitações

1. **Conceito que representa:** combinar relações por chaves correspondentes de forma declarativa (álgebra relacional).
2. **O que abstrai:** o algoritmo físico usado para parear linhas (*nested-loop join*, *index lookup*, *hash join* ou *merge join* — no SQLite, geralmente *nested-loop* apoiado por índices ou árvores temporárias).
3. **Custos que continuam existindo:** juntar duas tabelas sem índice na coluna de junção pode exigir varrer a segunda tabela repetidamente (**O(n × m)** no pior caso se o planejador não criar índice temporário). No `INNER JOIN despesas d ON c.id = d.categoria_id`, `c.id` já é `PRIMARY KEY` (índice automático), então buscar a categoria de cada despesa é rápido (**O(log |categorias|)**). Já ao partir de `categorias` para `despesas` em tabelas grandes, vale criar um índice em `despesas(categoria_id)` — o que estudaremos medindo planos reais no **capítulo 82**.

## 3. Agregação: `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY` e `HAVING`

### O problema: resumir milhares de linhas no JavaScript desperdiça memória e rede

Imagine um painel mostrando *"quanto gastei em cada categoria este mês e quantas despesas existem em cada uma"*. Se a API fizer `SELECT * FROM despesas`, trazer 50.000 objetos para a RAM do Node e rodar `.reduce(...)`, ela transfere e converte 50.000 linhas só para devolver **5 objetos** de resumo no JSON!

Com **funções de agregação** e **`GROUP BY`**, o banco percorre as linhas onde os dados já estão armazenados e devolve **apenas as 5 linhas resumidas**.

### Leitura principal

Leia por completo [2.7. Aggregate Functions — PostgreSQL](https://www.postgresql.org/docs/current/tutorial-agg.html) (observe por que agregações não podem ir no `WHERE`, como `GROUP BY` forma os grupos e a diferença entre `WHERE`, `HAVING` e `FILTER`).

Em [Built-in Aggregate Functions — SQLite](https://www.sqlite.org/lang_aggfunc.html), consulte apenas **2. List of built-in aggregate functions** e, na seção **3**, as descrições de `count`, `sum`, `total` e `avg` (atenção ao tratamento de `NULL` e à diferença entre `sum()` e `total()` no SQLite).

### Modelo mental: a ordem lógica completa do `SELECT`

No capítulo 31 vimos o fluxo simples de `SELECT`. Agora, com `JOIN`, `GROUP BY` e `HAVING`, o banco avalia a consulta nesta ordem lógica:

```text
1. FROM + JOIN     ──► monta o conjunto combinado de linhas
2. WHERE           ──► descarta linhas individuais ANTES de agrupar
3. GROUP BY        ──► separa as linhas restantes em "baldes" (grupos)
4. HAVING          ──► descarta GRUPOS inteiros usando resultados agregados
5. SELECT          ──► projeta as colunas do grupo e os cálculos (COUNT, SUM, AVG...)
6. ORDER BY        ──► ordena as linhas finais (já agrupadas)
7. LIMIT / OFFSET  ──► recorta a fatia final
```

Essa ordem explica de uma vez por todas duas dúvidas comuns de quem começa com SQL:

- **Por que `WHERE SUM(valor_centavos) > 50000` dá erro de sintaxe?** Porque no passo 2 (`WHERE`) os grupos ainda nem existem! Para filtrar sobre uma agregação, use **`HAVING`** (passo 4).
- **Por que toda coluna no `SELECT` que não está dentro de uma função agregada deve aparecer no `GROUP BY`?** Porque cada grupo vira **uma única linha** na saída: se o grupo `"alimentacao"` reúne 12 despesas com 12 descrições diferentes, pedir `SELECT c.nome, d.descricao, SUM(d.valor_centavos) ... GROUP BY c.nome` é ambíguo (qual das 12 descrições exibir?). No PostgreSQL isso é erro imediato; no SQLite padrão ele escolheria uma linha arbitrária — então **sempre liste no `GROUP BY` todas as colunas não agregadas do `SELECT`** para manter o SQL correto e portável.

### Quatro regras que evitam relatórios errados

1. **`COUNT(*)` versus `COUNT(coluna)` com `LEFT JOIN`:**
   - `COUNT(*)` conta **todas as linhas** do grupo — inclusive linhas vindas de um `LEFT JOIN` onde o lado direito é `NULL`!
   - `COUNT(d.id)` conta **apenas linhas em que `d.id` não é `NULL`**.
   - Se a categoria `"Moradia"` não tem despesas, o `LEFT JOIN` gera 1 linha com `c.nome = 'Moradia'` e `d.id = NULL`: `COUNT(*)` devolve **`1`** (mentira!), enquanto **`COUNT(d.id)`** devolve **`0`** (verdade!).
2. **`SUM` em grupo vazio devolve `NULL` (use `COALESCE`):**
   - `SUM(d.valor_centavos)` para `"Moradia"` (sem despesas) retorna **`NULL`**, não `0`.
   - Envolver em **`COALESCE(SUM(d.valor_centavos), 0)`** troca `NULL` por `0`, funciona igualmente no SQLite e no PostgreSQL e mantém o valor como inteiro exato (`INTEGER`). *(No SQLite existe `total()`, mas ela retorna ponto flutuante `REAL` e não existe no PostgreSQL — prefira `COALESCE(SUM(...), 0)`.)*
3. **Prefira `WHERE` antes de `HAVING` sempre que o filtro for por linha:**
   - Se você quer o resumo apenas das despesas de novembro de 2026 (`d.criada_em >= ?`), filtre no `WHERE` (ou no `ON`, se for `LEFT JOIN`) — o banco descarta linhas indesejadas *antes* de agrupá-las. Reserve `HAVING` para condições sobre o agregado (ex.: `HAVING COALESCE(SUM(d.valor_centavos), 0) >= 50000`).
4. **Cuidado com a soma duplicada após `JOIN` 1:N / N:N:**
   - Se uma despesa de R$ 100,00 tem 3 tags em `despesa_tags` e você fizer `SELECT SUM(d.valor_centavos) FROM despesas d JOIN despesa_tags dt ON dt.despesa_id = d.id`, o valor `10000` aparecerá em 3 linhas e o `SUM` devolverá **`30000` (R$ 300,00)**!
   - **Regra prática:** antes de usar `SUM` ou `COUNT` após um `JOIN`, pergunte *"esse `JOIN` pode multiplicar as linhas da tabela que estou somando?"*. Se sim, filtre com `EXISTS` (ex.: `WHERE EXISTS (SELECT 1 FROM despesa_tags dt WHERE dt.despesa_id = d.id AND dt.tag_id = ?)`) ou agregue cada relação separadamente antes de combinar.

### Exemplo concreto em SQL: resumo financeiro por categoria

Veja todas essas regras juntas na consulta que alimentará `GET /resumo/categorias`:

```sql
SELECT
  c.id AS categoria_id,
  c.nome AS categoria_nome,
  COUNT(d.id) AS quantidade,
  COALESCE(SUM(d.valor_centavos), 0) AS total_centavos,
  COALESCE(ROUND(AVG(d.valor_centavos)), 0) AS media_centavos,
  COALESCE(MAX(d.valor_centavos), 0) AS maior_centavo
FROM categorias AS c
LEFT JOIN despesas AS d
  ON d.categoria_id = c.id
  AND d.criada_em >= ?
GROUP BY c.id, c.nome
HAVING COUNT(d.id) >= ?
ORDER BY total_centavos DESC, c.id ASC;
```

Repare em cada detalhe cuidadoso nessa consulta:
- `LEFT JOIN` + filtro de data no **`ON`** mantém categorias sem despesas no período com `quantidade = 0` e `total_centavos = 0`.
- `COUNT(d.id)` conta despesas reais (nunca `1` falso para categorias vazias).
- `COALESCE(..., 0)` garante números limpos para o contrato JSON e para o Zod.
- Passando `0` no parâmetro do `HAVING`, aparecem todas as categorias; passando `1`, aparecem apenas categorias com ao menos uma despesa.

### Custos e limitações das agregações

- **Varredura e agrupamento:** agregar `n` linhas filtradas custa pelo menos **O(n)** em tempo (o banco precisa ler todas as linhas que entram na soma) e memória/ordenação proporcional ao número de grupos distintos.
- **`AVG` e precisão:** `AVG(valor_centavos)` retorna número de ponto flutuante (`REAL`). Usar `ROUND(AVG(valor_centavos))` devolve um valor arredondado em centavos (no SQLite, `ROUND` retorna `REAL`, então vale converter/validar na fronteira ou usar `CAST(ROUND(...) AS INTEGER)`).

## 4. Paginação: `LIMIT`/`OFFSET` e paginação por cursor (*keyset*)

### O problema: listas sem limite derrubam API e navegador

Quando o banco tem 15 despesas, `GET /despesas` devolvendo todas elas parece inofensivo. Quando o banco chegar a 50.000 despesas:

- O SQLite lê e materializa 50.000 linhas de uma vez (travando o *event loop* do Node, já que `DatabaseSync` é síncrono!).
- O Express serializa vários megabytes de JSON na resposta.
- O navegador trava tentando renderizar milhares de linhas na tela.

Toda coleção que pode crescer precisa de **paginação** — e de um **teto máximo por página** validado pelo servidor (nunca confie em `?limite=9999999` enviado pelo cliente).

### Leitura principal

Leia por completo a seção curta [7.6. LIMIT and OFFSET — PostgreSQL](https://www.postgresql.org/docs/current/queries-limit.html) (atenção especial aos dois últimos parágrafos: **ordenação determinística obrigatória** e **custo de `OFFSET` grande**).

Em [Row Values — SQLite](https://www.sqlite.org/rowvalue.html), leia apenas **1. Definitions** e **3.1. Scrolling Window Queries** para ver como comparações de tuplas `(a, b) < (?, ?)` simplificam a paginação por cursor. Pule o restante da página.

### Modelo mental 1: paginação por página (`LIMIT` + `OFFSET`)

É a forma mais direta e familiar (página 1, 2, 3...):

- O cliente envia `?pagina=2&limite=20`.
- O servidor valida no Zod (`pagina >= 1`, `limite` entre `1` e `100`) e calcula `offset = (pagina - 1) * limite`.
- A consulta **sempre** define um `ORDER BY` determinístico terminado por uma coluna única (`id`), para que duas despesas criadas no mesmo milissegundo nunca troquem de lugar entre uma página e outra:

```sql
-- 1. Total de itens com os MESMOS filtros WHERE (para calcular totalPaginas)
SELECT COUNT(*) AS total
FROM despesas AS d
WHERE d.categoria_id = ?;

-- 2. Itens da página atual (ex.: pagina = 2, limite = 20 -> OFFSET 20)
SELECT
  d.id,
  d.descricao,
  d.categoria_id,
  c.nome AS categoria_nome,
  d.valor_centavos,
  d.criada_em
FROM despesas AS d
INNER JOIN categorias AS c ON c.id = d.categoria_id
WHERE d.categoria_id = ?
ORDER BY d.criada_em DESC, d.id DESC
LIMIT ? OFFSET ?;
```

E o contrato HTTP devolve tanto os itens quanto os metadados de navegação:

```json
{
  "itens": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "descricao": "Almoço",
      "categoriaId": "alimentacao",
      "categoriaNome": "Alimentação",
      "valor": 45.9,
      "criadaEm": "2026-11-26T12:00:00.000Z"
    }
  ],
  "paginacao": {
    "pagina": 2,
    "limite": 20,
    "total": 85,
    "totalPaginas": 5,
    "temProxima": true
  }
}
```

### Os dois limites reais de `LIMIT`/`OFFSET`

`LIMIT`/`OFFSET` é ótimo para tabelas pequenas/médias e interfaces com números de página, mas tem **dois custos reais** que todo engenheiro precisa conhecer:

1. **Custo O(offset + limit):** para entregar `LIMIT 20 OFFSET 10000`, o banco **não pula magicamente** para a linha 10.001 — ele precisa percorrer e descartar as 10.000 primeiras linhas. Quanto mais profunda a página, mais lenta fica a consulta.
2. **Deriva de página (*drift*):** observe o que acontece quando uma nova despesa (`X`) entra no topo enquanto o usuário muda da página 1 para a página 2 (com `limite = 3`):

```text
Momento 1 — Usuário lê Página 1 (LIMIT 3 OFFSET 0):
  [ A, B, C ] | D, E, F
    ^^^^^^^ exibidos na página 1

Novo registro X é inserido no topo antes do clique em "Próxima página":
  X, A, B, C, D, E, F

Momento 2 — Usuário pede Página 2 (LIMIT 3 OFFSET 3):
  X, A, B | [ C, D, E ] | F
              ▲
              └── C apareceu DUPLICADO (estava na pág. 1 e voltou na pág. 2)!
```

(E, no sentido inverso, se um item da página 1 for removido, `D` desliza para a posição 3 e é **pulado** silenciosamente!)

### Modelo mental 2: paginação por cursor (*keyset pagination*)

Para evitar tanto a deriva quanto o custo crescente de `OFFSET`, a **paginação por cursor** (ou *keyset pagination*) muda a pergunta: em vez de *"pule 20 linhas"*, dizemos *"dê-me as próximas 20 linhas **depois** da última linha que eu vi"* — identificada pela sua chave de ordenação `(criada_em, id)`.

Veja como o SQL fica elegante usando *row values* (funciona igualmente no SQLite e no PostgreSQL quando todas as colunas do `ORDER BY` têm a mesma direção, aqui `DESC`):

```sql
-- Primeira página (sem cursor ainda): pede limite + 1 linhas!
SELECT
  d.id,
  d.descricao,
  d.categoria_id,
  c.nome AS categoria_nome,
  d.valor_centavos,
  d.criada_em
FROM despesas AS d
INNER JOIN categorias AS c ON c.id = d.categoria_id
ORDER BY d.criada_em DESC, d.id DESC
LIMIT ?; -- passa limite + 1 (ex.: 21)

-- Próxima página (recebendo o último criada_em e o último id da página anterior):
SELECT
  d.id,
  d.descricao,
  d.categoria_id,
  c.nome AS categoria_nome,
  d.valor_centavos,
  d.criada_em
FROM despesas AS d
INNER JOIN categorias AS c ON c.id = d.categoria_id
WHERE (d.criada_em, d.id) < (?, ?)
ORDER BY d.criada_em DESC, d.id DESC
LIMIT ?; -- passa limite + 1 (ex.: 21)
```

Repare em dois truques profissionais dessa consulta:

1. **Mesma direção no `ORDER BY` (`DESC, DESC`):** a comparação de tupla `(d.criada_em, d.id) < (?, ?)` equivale exatamente a `(d.criada_em < ?) OR (d.criada_em = ? AND d.id < ?)`. Se você misturasse `criada_em DESC, id ASC`, a tupla `<` estaria errada e você precisaria escrever o `OR` manualmente (`d.criada_em < ? OR (d.criada_em = ? AND d.id > ?)`).
2. **Truque do `LIMIT limite + 1`:** pedir 21 linhas quando a página tem 20 elimina a necessidade de rodar um `SELECT COUNT(*)` separado só para saber se existe próxima página: se voltaram 21 linhas, `temProxima = true` e você devolve apenas as 20 primeiras (`linhas.slice(0, limite)`), usando o 20º item como próximo cursor!

### Quando escolher `LIMIT`/`OFFSET` versus cursor

| Critério | `LIMIT` + `OFFSET` | Cursor (*keyset*) |
|---|---|---|
| **Pular para página arbitrária (`"Ir para pág. 7"`)** | Sim, direto. | Não — navega sequencialmente (`próxima` / `anterior`). |
| **Exibir `"Total: 85 itens"`** | Natural (já roda `COUNT(*)`). | Opcional (evitar `COUNT(*)` é justamente parte do ganho). |
| **Estabilidade sob inserções/remoções** | Sofre *drift* (duplicação ou pulo). | Estável — continua exatamente após o último item visto. |
| **Desempenho em páginas profundas** | Degrada (**O(offset + limit)**). | Constante na página (**O(limit + log n)** com índice em `(criada_em, id)`). |
| **Quando escolher** | Painéis administrativos, relatórios pequenos/médios com paginação numerada. | Feeds, extratos longos, rolagem infinita, APIs com alto volume ou escritas frequentes. |

## 5. Transações básicas (`BEGIN`, `COMMIT`, `ROLLBACK`): operações indivisíveis

### O problema: quando duas escritas precisam acontecer juntas — ou nenhuma

Considere transferir `R$ 150,00` (`15000` centavos) da conta `'corrente'` para a conta `'reserva'`. Essa única ação de negócio exige **três comandos SQL**:

1. Debitar `15000` de `'corrente'`.
2. Creditar `15000` em `'reserva'`.
3. Inserir o histórico na tabela `transferencias`.

O que acontece se você rodar esses três comandos soltos (fora de uma transação) e o passo 2 ou 3 falhar — por exemplo, a conta de destino não existir, uma restrição `CHECK` falhar ou o processo Node cair no meio?

```text
SEM TRANSAÇÃO (perigoso!):
  1. UPDATE contas SET saldo = saldo - 15000 WHERE id = 'corrente'  ──► ✅ GRAVADO NO DISCO!
  2. UPDATE contas SET saldo = saldo + 15000 WHERE id = 'inexistente' ──► ❌ 0 linhas / ERRO!
  Resultado: R$ 150,00 DESAPARECERAM da conta corrente e nunca chegaram a lugar nenhum!
```

O mesmo vale para criar uma despesa com tags: se o `INSERT INTO despesas` gravar no disco e o segundo `INSERT INTO despesa_tags` falhar porque uma tag não existe, sobra no banco uma despesa "pela metade", sem as tags que o usuário pediu.

Uma **transação** agrupa vários comandos SQL em **uma única unidade indivisível (atômica)**: ou **todos** são confirmados juntos (`COMMIT`), ou **todos** são desfeitos (`ROLLBACK`) como se nada tivesse ocorrido.

### Leitura principal

Leia [3.4. Transactions — PostgreSQL](https://www.postgresql.org/docs/current/tutorial-transactions.html) até a explicação de `BEGIN`, `COMMIT` e `ROLLBACK` na transferência entre contas (a parte final sobre `SAVEPOINT` é leitura complementar opcional).

Em [Transaction Control — SQLite](https://www.sqlite.org/lang_transaction.html), leia **2. Transactions**, **2.2. DEFERRED, IMMEDIATE, and EXCLUSIVE transactions** e **2.3. Implicit versus explicit transactions**. Pule a seção **3** por enquanto (aprofundaremos tratamento de concorrência e isolamento no capítulo 83).

### Modelo mental: o bloco tudo-ou-nada

```text
BEGIN IMMEDIATE                     ──► inicia a transação e reserva o direito de escrita
  │
  ├── 1. Debita conta origem (verificando saldo suficiente)
  ├── 2. Credita conta destino (verificando que a conta existe)
  └── 3. Registra linha em transferencias
        │
        ├── tudo OK ─────────────────► COMMIT   (todas as mudanças viram permanentes juntas)
        └── qualquer erro/exceção ───► ROLLBACK (desfaz passos 1 e 2; banco volta 100% intacto)
```

Entenda **três mecanismos essenciais** de transações no SQLite (e no `node:sqlite`):

1. **Transações implícitas (*autocommit*) versus explícitas:** quando você executa um `INSERT` ou `UPDATE` fora de um bloco `BEGIN`, o SQLite envolve *aquele único comando* em uma transação automática. Por isso:
   - Dois `UPDATE` soltos são **duas transações separadas** (não são atômicos entre si).
   - Inserir 1.000 linhas em 1.000 `INSERT` soltos força o banco a confirmar no disco 1.000 vezes; agrupar os 1.000 `INSERT` dentro de **uma** transação explícita (`BEGIN` ... `COMMIT`) confirma no disco uma única vez e costuma ser dezenas ou centenas de vezes mais rápido!
2. **Por que usar `BEGIN IMMEDIATE` em transações de escrita no SQLite:** o `BEGIN` simples (que significa `BEGIN DEFERRED`) adia a reserva de escrita até o primeiro `INSERT`/`UPDATE`. Se duas conexões começarem com `BEGIN DEFERRED`, ambas lerem primeiro e depois ambas tentarem escrever, o SQLite não pode deixar as duas promoverem o bloqueio ao mesmo tempo e falha uma delas imediatamente com `SQLITE_BUSY` (mesmo com `busy_timeout` configurado!). Usando **`BEGIN IMMEDIATE`**, a transação reserva a escrita logo na entrada — e, se outra escrita estiver acontecendo, ela respeita o `busy_timeout` aguardando sua vez com limpeza.
3. **Nunca faça I/O externo dentro de uma transação aberta:** nunca chame `fetch(...)`, leia arquivos pesados nem aguarde `setTimeout` enquanto uma transação estiver aberta. Além de segurar o bloqueio de escrita do banco por tempo indeterminado, no `node:sqlite` (`DatabaseSync`) a conexão é compartilhada e **síncrona**: se uma função `async` pausar num `await` no meio de uma transação, outra requisição HTTP chegando ao Express usaria a *mesma* conexão `db` e misturaria consultas dentro da transação da primeira requisição! **Regra de ouro:** toda transação em `DatabaseSync` deve ser **100% síncrona e curta**.

### Helper reutilizável em TypeScript (`src/transacao.ts`)

Em vez de repetir `BEGIN IMMEDIATE` / `try` / `COMMIT` / `catch` / `ROLLBACK` em cada método do repositório (e correr o risco de esquecer o `ROLLBACK` em algum caminho de erro), encapsulamos o padrão em uma pequena função auxiliar:

```ts
// src/transacao.ts
import type { DatabaseSync } from "node:sqlite";

export function executarTransacao<T>(
  db: DatabaseSync,
  operacao: () => T,
): T {
  db.exec("BEGIN IMMEDIATE");
  try {
    const resultado = operacao();
    db.exec("COMMIT");
    return resultado;
  } catch (erro: unknown) {
    // `db.isTransaction` (Node 24) evita lançar um segundo erro caso o SQLite
    // já tenha desfeito a transação automaticamente (ex.: erro de disco/I/O).
    if (db.isTransaction) {
      db.exec("ROLLBACK");
    }
    throw erro;
  }
}
```

> **Nota sobre o genérico `<T>`:** assim como `ResultadoEscrita<T>` no capítulo 31, usamos `<T>` apenas para preservar o tipo exato devolvido por `operacao()` sem precisar de `any` ou casts. Construiremos abstrações genéricas próprias em profundidade no capítulo 49.

### O que transações abstraem, custos e limitações

1. **Conceito que representa:** **atomicidade** (tudo ou nada) e preservação de **consistência** estrutural entre múltiplas alterações relacionadas.
2. **O que abstrai:** o log de reversão (*rollback journal* ou *WAL*) que permite ao banco desfazer alterações parciais sem corromper páginas no disco, mesmo em caso de queda súbita de energia.
3. **Limites neste estágio:**
   - Uma transação protege **operações no mesmo banco de dados**. Se você precisar debitar no banco *e* chamar uma API externa de pagamento, o `ROLLBACK` do SQL não desfaz a chamada HTTP externa (lidar com falhas parciais entre serviços separados entra no **capítulo 87**).
   - Aqui focamos no uso básico de `BEGIN`/`COMMIT`/`ROLLBACK` em um banco local. As quatro propriedades **ACID** completas, níveis de isolamento (`READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`), *deadlocks* e anomalias de concorrência entre múltiplos clientes serão aprofundados no **capítulo 83**.

## 6. Integrando relações, agregações, paginação e transações na API

Agora vamos conectar todas as peças do capítulo na evolução da `api-despesas` do capítulo 31, mantendo a mesma arquitetura limpa: **rotas HTTP** validam entradas com Zod e traduzem respostas/status; **repositórios** concentram o SQL parametrizado, as transações e a validação das linhas retornadas pelo banco.

### 1. Contratos atualizados na fronteira (`src/schemas.ts`)

Acrescentamos os schemas para listagem paginada, criação de despesa com lista opcional de `tagIds`, consulta de resumo e transferência entre contas:

```ts
// Trechos adicionados em src/schemas.ts, abaixo do criarDespesaSchema do capítulo 31
export const criarDespesaComTagsSchema = criarDespesaSchema.extend({
  tagIds: z
    .array(z.string().trim().min(1))
    .max(10, "Informe no máximo 10 tags por despesa.")
    .default([]),
});

export const listarDespesasPaginadasQuerySchema = z.object({
  categoriaId: z.string().trim().min(1).optional(),
  tagId: z.string().trim().min(1).optional(),
  pagina: z.coerce.number().int().min(1).default(1),
  // Sempre imponha um teto no servidor para impedir `?limite=1000000`
  limite: z.coerce.number().int().min(1).max(100).default(20),
});

export const criarTransferenciaSchema = z
  .object({
    contaOrigemId: z.string().trim().min(1, "Informe a conta de origem."),
    contaDestinoId: z.string().trim().min(1, "Informe a conta de destino."),
    valor: z
      .number()
      .positive("O valor da transferência deve ser maior que zero.")
      .max(1_000_000, "O valor excede o limite permitido.")
      .multipleOf(0.01, "Use no máximo duas casas decimais."),
  })
  .refine((dados) => dados.contaOrigemId !== dados.contaDestinoId, {
    message: "A conta de destino deve ser diferente da conta de origem.",
    path: ["contaDestinoId"],
  });

export type NovaDespesaComTagsInput = z.infer<typeof criarDespesaComTagsSchema>;
export type ListarDespesasPaginadasQuery = z.infer<
  typeof listarDespesasPaginadasQuerySchema
>;
export type NovaTransferenciaInput = z.infer<typeof criarTransferenciaSchema>;
```

Repare mais uma vez na defesa em camadas: o `.refine(...)` no Zod rejeita `contaOrigemId === contaDestinoId` logo na borda HTTP com `400 Bad Request` detalhado, e o `CHECK (conta_origem_id <> conta_destino_id)` no SQL garante a mesma regra dentro do banco.

### 2. Consultas com `JOIN`, paginação, agregação e escrita atômica (`src/repositorio-relacoes.ts`)

Observe como cada operação usa exatamente a técnica certa — sem N+1, sem SQL concatenado, sem casts `as` e com transações síncronas curtas:

```ts
// src/repositorio-relacoes.ts
import { randomUUID } from "node:crypto";
import type { DatabaseSync, SQLInputValue } from "node:sqlite";
import * as z from "zod";
import { executarTransacao } from "./transacao.ts";

const linhaDespesaDetalhadaSchema = z.object({
  id: z.uuid(),
  descricao: z.string(),
  categoria_id: z.string(),
  categoria_nome: z.string(),
  valor_centavos: z.number().int().positive(),
  criada_em: z.string(),
});

const linhaTotalSchema = z.object({
  total: z.number().int().nonnegative(),
});

const linhaResumoCategoriaSchema = z.object({
  categoria_id: z.string(),
  categoria_nome: z.string(),
  quantidade: z.number().int().nonnegative(),
  total_centavos: z.number().int().nonnegative(),
});

const linhaTransferenciaSchema = z.object({
  id: z.uuid(),
  conta_origem_id: z.string(),
  conta_destino_id: z.string(),
  valor_centavos: z.number().int().positive(),
  criada_em: z.string(),
});

export interface DespesaDetalhada {
  readonly id: string;
  readonly descricao: string;
  readonly categoriaId: string;
  readonly categoriaNome: string;
  readonly valor: number;
  readonly criadaEm: string;
}

export interface RespostaPaginada<T> {
  readonly itens: readonly T[];
  readonly paginacao: {
    readonly pagina: number;
    readonly limite: number;
    readonly total: number;
    readonly totalPaginas: number;
    readonly temProxima: boolean;
  };
}

export interface ResumoPorCategoria {
  readonly categoriaId: string;
  readonly categoriaNome: string;
  readonly quantidade: number;
  readonly total: number;
}

export interface Transferencia {
  readonly id: string;
  readonly contaOrigemId: string;
  readonly contaDestinoId: string;
  readonly valor: number;
  readonly criadaEm: string;
}

export type ResultadoTransferencia =
  | { readonly ok: true; readonly transferencia: Transferencia }
  | {
      readonly ok: false;
      readonly motivo:
        | "MESMA_CONTA"
        | "CONTA_ORIGEM_INEXISTENTE"
        | "CONTA_DESTINO_INEXISTENTE"
        | "SALDO_INSUFICIENTE";
    };

function paraCentavos(valorEmReais: number): number {
  return Math.round(valorEmReais * 100);
}

function ehViolacaoForeignKey(erro: unknown): boolean {
  return (
    typeof erro === "object" &&
    erro !== null &&
    "code" in erro &&
    erro.code === "ERR_SQLITE_ERROR" &&
    "errcode" in erro &&
    erro.errcode === 787
  );
}

export function criarRepositorioRelacoes(db: DatabaseSync) {
  const stmtResumoCategorias = db.prepare(`
    SELECT
      c.id AS categoria_id,
      c.nome AS categoria_nome,
      COUNT(d.id) AS quantidade,
      COALESCE(SUM(d.valor_centavos), 0) AS total_centavos
    FROM categorias AS c
    LEFT JOIN despesas AS d ON d.categoria_id = c.id
    GROUP BY c.id, c.nome
    ORDER BY total_centavos DESC, c.id ASC
  `);

  const stmtInserirDespesa = db.prepare(`
    INSERT INTO despesas (id, descricao, categoria_id, valor_centavos)
    VALUES (?, ?, ?, ?)
    RETURNING id
  `);

  const stmtVincularTag = db.prepare(`
    INSERT OR IGNORE INTO despesa_tags (despesa_id, tag_id)
    VALUES (?, ?)
  `);

  const stmtBuscarConta = db.prepare("SELECT id FROM contas WHERE id = ?");

  const stmtDebitarConta = db.prepare(`
    UPDATE contas
    SET saldo_centavos = saldo_centavos - ?
    WHERE id = ? AND saldo_centavos >= ?
  `);

  const stmtCreditarConta = db.prepare(`
    UPDATE contas
    SET saldo_centavos = saldo_centavos + ?
    WHERE id = ?
  `);

  const stmtInserirTransferencia = db.prepare(`
    INSERT INTO transferencias (id, conta_origem_id, conta_destino_id, valor_centavos)
    VALUES (?, ?, ?, ?)
    RETURNING id, conta_origem_id, conta_destino_id, valor_centavos, criada_em
  `);

  return {
    // 1. JOIN + Paginação por página com ORDER BY determinístico
    listarPaginado(opcoes: {
      categoriaId?: string;
      tagId?: string;
      pagina: number;
      limite: number;
    }): RespostaPaginada<DespesaDetalhada> {
      const condicoes: string[] = [];
      const parametros: SQLInputValue[] = [];

      if (opcoes.categoriaId !== undefined) {
        condicoes.push("d.categoria_id = ?");
        parametros.push(opcoes.categoriaId);
      }

      if (opcoes.tagId !== undefined) {
        // EXISTS evita duplicar linhas de despesas caso a consulta evolua com mais tags
        condicoes.push(
          "EXISTS (SELECT 1 FROM despesa_tags AS dt WHERE dt.despesa_id = d.id AND dt.tag_id = ?)",
        );
        parametros.push(opcoes.tagId);
      }

      const where =
        condicoes.length > 0 ? `WHERE ${condicoes.join(" AND ")}` : "";
      const offset = (opcoes.pagina - 1) * opcoes.limite;

      const linhaTotal = db
        .prepare(`SELECT COUNT(*) AS total FROM despesas AS d ${where}`)
        .get(...parametros);
      const { total } = linhaTotalSchema.parse(linhaTotal);

      const linhas = db
        .prepare(`
          SELECT
            d.id,
            d.descricao,
            d.categoria_id,
            c.nome AS categoria_nome,
            d.valor_centavos,
            d.criada_em
          FROM despesas AS d
          INNER JOIN categorias AS c ON c.id = d.categoria_id
          ${where}
          ORDER BY d.criada_em DESC, d.id DESC
          LIMIT ? OFFSET ?
        `)
        .all(...parametros, opcoes.limite, offset);

      const itens = linhas.map((bruta) => {
        const l = linhaDespesaDetalhadaSchema.parse(bruta);
        return {
          id: l.id,
          descricao: l.descricao,
          categoriaId: l.categoria_id,
          categoriaNome: l.categoria_nome,
          valor: l.valor_centavos / 100,
          criadaEm: l.criada_em,
        };
      });

      const totalPaginas = Math.ceil(total / opcoes.limite);

      return {
        itens,
        paginacao: {
          pagina: opcoes.pagina,
          limite: opcoes.limite,
          total,
          totalPaginas,
          temProxima: opcoes.pagina < totalPaginas,
        },
      };
    },

    // 2. Agregação com LEFT JOIN mantendo categorias zeradas
    resumoPorCategoria(): ResumoPorCategoria[] {
      return stmtResumoCategorias.all().map((bruta) => {
        const l = linhaResumoCategoriaSchema.parse(bruta);
        return {
          categoriaId: l.categoria_id,
          categoriaNome: l.categoria_nome,
          quantidade: l.quantidade,
          total: l.total_centavos / 100,
        };
      });
    },

    // 3. Transação atômica: cria despesa + vincula tags (tudo ou nada)
    criarDespesaComTags(entrada: {
      descricao: string;
      categoriaId: string;
      valor: number;
      tagIds: readonly string[];
    }):
      | { readonly ok: true; readonly id: string }
      | { readonly ok: false; readonly motivo: "REFERENCIA_INVALIDA" } {
      try {
        const id = executarTransacao(db, () => {
          const novoId = randomUUID();
          stmtInserirDespesa.get(
            novoId,
            entrada.descricao,
            entrada.categoriaId,
            paraCentavos(entrada.valor),
          );

          for (const tagId of entrada.tagIds) {
            // Se alguma tag não existir, a FK lança erro e o ROLLBACK desfaz
            // automaticamente o INSERT da despesa acima!
            stmtVincularTag.run(novoId, tagId);
          }

          return novoId;
        });

        return { ok: true, id };
      } catch (erro: unknown) {
        if (ehViolacaoForeignKey(erro)) {
          return { ok: false, motivo: "REFERENCIA_INVALIDA" };
        }
        throw erro;
      }
    },

    // 4. Transação indivisível: débito + crédito + registro da transferência
    transferirEntreContas(entrada: {
      contaOrigemId: string;
      contaDestinoId: string;
      valor: number;
    }): ResultadoTransferencia {
      if (entrada.contaOrigemId === entrada.contaDestinoId) {
        return { ok: false, motivo: "MESMA_CONTA" };
      }

      const valorCentavos = paraCentavos(entrada.valor);

      return executarTransacao(db, (): ResultadoTransferencia => {
        if (stmtBuscarConta.get(entrada.contaOrigemId) === undefined) {
          return { ok: false, motivo: "CONTA_ORIGEM_INEXISTENTE" };
        }

        if (stmtBuscarConta.get(entrada.contaDestinoId) === undefined) {
          return { ok: false, motivo: "CONTA_DESTINO_INEXISTENTE" };
        }

        // Atualiza somente se houver saldo suficiente — dentro da mesma transação
        const debito = stmtDebitarConta.run(
          valorCentavos,
          entrada.contaOrigemId,
          valorCentavos,
        );
        if (Number(debito.changes) === 0) {
          return { ok: false, motivo: "SALDO_INSUFICIENTE" };
        }

        stmtCreditarConta.run(valorCentavos, entrada.contaDestinoId);

        const linhaBruta = stmtInserirTransferencia.get(
          randomUUID(),
          entrada.contaOrigemId,
          entrada.contaDestinoId,
          valorCentavos,
        );
        const linha = linhaTransferenciaSchema.parse(linhaBruta);

        return {
          ok: true,
          transferencia: {
            id: linha.id,
            contaOrigemId: linha.conta_origem_id,
            contaDestinoId: linha.conta_destino_id,
            valor: linha.valor_centavos / 100,
            criadaEm: linha.criada_em,
          },
        };
      });
    },
  };
}
```

Note dois detalhes sutis — e muito importantes — no método `transferirEntreContas`:

1. **Verificação e débito dentro da mesma transação `BEGIN IMMEDIATE`:** se você verificasse o saldo *antes* de abrir a transação e debitasse depois, outra escrita poderia alterar o saldo no intervalo. Com `BEGIN IMMEDIATE` + `WHERE id = ? AND saldo_centavos >= ?`, leitura e atualização acontecem sob a mesma trava de escrita, garantindo que o saldo nunca fique negativo (e o `CHECK (saldo_centavos >= 0)` no esquema ainda atua como rede de segurança!).
2. **Erros de negócio devolvidos como união discriminada (`ResultadoTransferencia`) versus exceções:** no retorno `SALDO_INSUFICIENTE`, ainda não fizemos nenhuma alteração no banco — então sair normalmente da transação faz um `COMMIT` vazio (nenhuma linha mudou) e a rota devolve **`409 Conflict`** (ou `422`) com o formato de erro padronizado do capítulo 30. Já se ocorrer qualquer falha *depois* do débito (por exemplo, um erro inesperado ao inserir em `transferencias`), a exceção cai no `catch` de `executarTransacao`, dispara **`ROLLBACK`** e devolve os centavos à conta de origem automaticamente!

### Experimente (sem precisar alterar sua API ainda)

Em um script isolado com `new DatabaseSync(":memory:", { enableForeignKeyConstraints: true })`, aplique o SQL das migrações `001_inicial.sql` e `002_relacoes_e_contas.sql` e observe três comportamentos direto no terminal:

1. **`COUNT(*)` versus `COUNT(d.id)` no `LEFT JOIN`:** insira 2 despesas apenas em `'alimentacao'` e execute o resumo de `categorias` comparando `COUNT(*)` com `COUNT(d.id)`. Veja `'moradia'` marcar `1` em `COUNT(*)` e `0` em `COUNT(d.id)`.
2. **Multiplicação de linhas em N:N:** associe 3 tags à mesma despesa de `4590` centavos e compare `SUM(d.valor_centavos)` fazendo `JOIN despesa_tags` (vai somar `13770`!) contra a soma usando `WHERE EXISTS (...)` (soma corretamente `4590`).
3. **Atomicidade com `ROLLBACK`:** tente chamar `criarDespesaComTags` passando `tagIds: ["trabalho", "tag-que-nao-existe"]` e confirme com `SELECT COUNT(*) FROM despesas` que **nem a despesa nem o primeiro vínculo `'trabalho'` permaneceram no banco**. Depois faça o mesmo forçando um erro após o débito na transferência e confirme que o saldo da conta de origem continuou exatamente `100000`.

## Erros comuns a evitar

| Erro comum | Por que causa problema | Como evitar |
|---|---|---|
| **Guardar listas em texto separado por vírgulas (`"a,b,c"`)** | Impede `FOREIGN KEY`, complica atualizações e gera falsos positivos em `LIKE`. | Modelar relação **N:N** com tabela associativa e `PRIMARY KEY` composta `(despesa_id, tag_id)`. |
| **Fazer `SELECT` dentro de um loop (problema N+1)** | Dispara dezenas ou centenas de consultas extras em vez de uma única operação. | Combinar entidades relacionadas com `INNER JOIN` / `LEFT JOIN` (ou `IN (...)` em 2 consultas fixas para N:N). |
| **Colocar filtro da tabela direita no `WHERE` após um `LEFT JOIN`** | Descarta linhas com `NULL` à direita e transforma silenciosamente o `LEFT JOIN` em `INNER JOIN`. | Mover condições que filtram o lado direito do pareamento para a cláusula **`ON`**. |
| **Usar `COUNT(*)` em vez de `COUNT(coluna)` com `LEFT JOIN`** | Conta linhas sem correspondência (preenchidas com `NULL`) como `1` em vez de `0`. | Usar `COUNT(d.id)` (coluna não nula da tabela direita) e `COALESCE(SUM(...), 0)`. |
| **Somar (`SUM`) depois de um `JOIN` que multiplica linhas** | Cada despesa repetida por múltiplas tags ou itens filhos é somada várias vezes, inflando totais. | Usar `EXISTS` para filtrar sem multiplicar linhas, ou agregar antes de fazer o `JOIN`. |
| **Paginar sem `ORDER BY` determinístico ou sem teto de `limite`** | Linhas empatadas mudam de página entre requisições, e `?limite=999999` derruba o servidor. | Sempre terminar `ORDER BY` com coluna única (`id`) e validar `limite` máximo (ex.: `100`) no Zod. |
| **Rodar escritas dependentes fora de transação (ou misturar `await` dentro dela)** | Falha no meio deixa o banco inconsistente (dinheiro some ou registro fica incompleto); `await` mistura requisições na mesma conexão `DatabaseSync`. | Envolver escritas relacionadas em `executarTransacao` com `BEGIN IMMEDIATE`, mantendo a operação curta e 100% síncrona. |

## Ao terminar

Antes de avançar para o capítulo 33 (Integração e testes do serviço), confira se você consegue explicar:

- como escolher entre relações **1:N** (FK no lado N), **1:1** (FK com `UNIQUE` ou mesma tabela) e **N:N** (tabela associativa com `PRIMARY KEY` composta e `ON DELETE CASCADE`), e por que evoluímos o banco criando `002_relacoes_e_contas.sql` sem alterar `001_inicial.sql`;
- como **`INNER JOIN`** e **`LEFT JOIN`** eliminam o problema **N+1**, quando usar aliases diferentes para a mesma tabela (como origem e destino em `transferencias`), e por que filtrar a tabela direita no `WHERE` quebra um `LEFT JOIN`;
- como a ordem lógica do `SELECT` (`FROM` → `JOIN` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`) explica a diferença entre `WHERE` e `HAVING`, por que usar **`COUNT(d.id)`** e **`COALESCE(SUM(...), 0)`** após `LEFT JOIN`, e como evitar somas infladas em relações N:N;
- como implementar **paginação por página (`LIMIT`/`OFFSET`)** com ordenação determinística e teto no Zod, quais são seus dois limites reais (**O(offset + limit)** e **deriva/*drift***), e como a **paginação por cursor (*keyset*)** com `(criada_em, id) < (?, ?)` e `LIMIT limite + 1` resolve esses limites;
- por que duas ou mais escritas dependentes exigem uma **transação** (`BEGIN IMMEDIATE` / `COMMIT` / `ROLLBACK`) para garantir atomicidade (tudo-ou-nada), por que nunca misturar I/O assíncrono dentro de uma transação aberta em `DatabaseSync`, e o que fica para aprofundamento em ACID/isolamento no capítulo 83.
