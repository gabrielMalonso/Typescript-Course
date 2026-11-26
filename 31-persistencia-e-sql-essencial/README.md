# Capítulo 31 — Persistência e SQL essencial

**Objetivo:** compreender por que arquivos JSON não bastam como persistência de uma API, modelar dados em um banco relacional com **tabelas, tipos, chaves primárias, chaves estrangeiras e restrições**, dominar as operações fundamentais em SQL (`INSERT`, `SELECT`, filtros com `WHERE`/`ORDER BY`/`LIMIT`, `UPDATE` e `DELETE`), proteger todas as consultas contra **SQL Injection** com **consultas parametrizadas**, estruturar uma **migração inicial** reproduzível e substituir o repositório em arquivo JSON da API do capítulo 30 por persistência real em **SQLite** usando o módulo nativo `node:sqlite` do Node.js.

Nos capítulos 29 e 30, você construiu uma API de Despesas em Node + TypeScript + Express com rotas organizadas, validação de fronteira em runtime com Zod, tratamento centralizado de erros e limites de requisição. Porém, toda vez que a API criava, atualizava ou removia uma única despesa, ela relia e reescrevia um arquivo JSON inteiro — um armazenamento frágil que pode perder dados sob requisições simultâneas. Neste capítulo, você substitui esse arquivo por um **banco de dados relacional com SQL**, preservando os endpoints, os status e o formato de erro que já construiu (com um único ajuste consciente no corpo das despesas, explicado na etapa 6).

**Percurso:** limites do arquivo JSON e tabelas/tipos no banco relacional → chaves primárias, chaves estrangeiras e restrições de integridade → operações essenciais (`INSERT`, `SELECT`, filtros, `UPDATE`, `DELETE`) → consultas parametrizadas e prevenção de SQL Injection → migração inicial versionada → substituição do repositório da API com `node:sqlite`. Em cada etapa, leia o recorte oficial indicado e use as explicações e exemplos para conectar o SQL ao TypeScript e ao Express que você já domina.

**Escopo:** focamos em persistência relacional essencial com SQLite (via `node:sqlite`) e nos conceitos de SQL padrão transferíveis para bancos cliente-servidor como PostgreSQL — tabelas, tipos, chaves, restrições, CRUD em SQL, filtros, consultas parametrizadas e migração inicial. Modelagem de relações entre múltiplas tabelas, `JOIN`, agregações (`COUNT`/`SUM`/`GROUP BY`), paginação e transações (`BEGIN`/`COMMIT`/`ROLLBACK`) entram no capítulo 32; integração completa com o frontend e testes automatizados do serviço em banco descartável, no capítulo 33; autenticação/autorização, senhas, CORS, segredos e deploy, no capítulo 34; segurança de software aprofundada, no capítulo 61; normalização e evolução avançada de esquemas, no capítulo 81; índices B/B+ e *query plans*, no capítulo 82; e ACID, níveis de isolamento, anomalias de concorrência e bancos NoSQL, no capítulo 83.

## 1. Do arquivo JSON ao banco relacional: tabelas, linhas, colunas e tipos

### O problema: por que um arquivo JSON quebra quando a aplicação cresce

No capítulo 29, usamos `node:fs/promises` para salvar um array em um arquivo `.json`. Aquela escolha serviu para aprender I/O assíncrono, mas traz quatro limites graves para qualquer API real:

1. **Custo O(n) em cada operação:** para atualizar o valor de **uma** despesa entre 10.000 registros, o servidor lê o arquivo inteiro, executa `JSON.parse` em tudo, cria um novo array, serializa tudo com `JSON.stringify` e reescreve o arquivo inteiro no disco.
2. **Condição de corrida (*race condition*) na escrita:** se duas requisições `POST` chegam quase juntas, ambas leem o mesmo estado inicial do arquivo e salvam por cima uma da outra — a segunda gravação apaga silenciosamente a primeira.
3. **Corrupção em caso de queda:** se o processo cair ou faltar energia no meio de `writeFile`, o arquivo JSON pode ficar cortado pela metade e impedir o servidor de voltar a ler os dados.
4. **Nenhuma proteção estrutural no armazenamento:** um arquivo de texto aceita qualquer coisa que alguém grave nele. Se um script auxiliar gravar `valor: -50` ou uma categoria inexistente, o arquivo não recusa.

Um **banco de dados relacional** (como **SQLite** ou **PostgreSQL**) existe justamente para resolver esses quatro problemas: ele organiza os dados em estruturas fixas no disco, atualiza apenas o que mudou, coordena leituras e escritas com segurança contra corrupção e rejeita dados que violem as regras do esquema.

### Leitura principal

Leia a seção curta [2.3. Creating a New Table — PostgreSQL](https://www.postgresql.org/docs/current/tutorial-table.html) para ver o modelo clássico de tabelas, colunas e tipos em SQL padrão.

Em [Datatypes In SQLite — SQLite](https://www.sqlite.org/datatype3.html), leia apenas **1. Datatypes In SQLite** e **2. Storage Classes and Datatypes** (incluindo **2.1. Boolean Datatype** e **2.2. Date and Time Datatype**). Pule **3. Type Affinity** em diante — usaremos tabelas `STRICT` para evitar a tipagem dinâmica legada do SQLite.

Em [STRICT Tables — SQLite](https://www.sqlite.org/stricttables.html), leia **1. Introduction** e **2. STRICT Tables**. Pule **3. The ANY datatype** e **4. Backwards Compatibility** em diante.

### Modelo mental: tabela, linha, coluna e SQLite versus PostgreSQL

Se você já domina arrays de objetos em TypeScript (capítulo 7), o modelo relacional tem uma correspondência direta:

```text
TypeScript (em memória)                Banco relacional (persistido no disco)
────────────────────────────────       ──────────────────────────────────────────────────────
interface Despesa {                    Tabela: despesas
  id: string;                          ┌──────────┬───────────┬──────────────┬────────────────┐
  descricao: string;                   │ id (TXT) │ descricao │ categoria_id │ valor_centavos │
  categoriaId: string;                 ├──────────┼───────────┼──────────────┼────────────────┤
  valorCentavos: number;       ◄────►  │ "a1..."  │ "Almoço"  │ "alimentacao"│ 4590           │  ◄─ linha (row)
}                                      │ "b2..."  │ "Metrô"   │ "transporte" │ 500            │  ◄─ linha (row)
                                       └──────────┴───────────┴──────────────┴────────────────┘
const lista: Despesa[] = ...                ▲          ▲             ▲                ▲
                                          coluna     coluna        coluna           coluna
```

- **Tabela (*table*):** representa um tipo de entidade (como `categorias` ou `despesas`).
- **Coluna (*column*):** representa um atributo com nome, tipo e regras próprias (como `descricao TEXT NOT NULL`).
- **Linha (*row* ou registro):** representa uma instância concreta daquela entidade (uma despesa específica).

Neste bloco usaremos **SQLite** — um banco relacional completo que vive embutido dentro do processo Node e grava tudo em um único arquivo local (como `./dados/despesas.sqlite`) ou em memória (`:memory:`). Compare onde ele se encaixa diante de um SGBD cliente-servidor como **PostgreSQL**:

| Aspecto | SQLite (este bloco) | PostgreSQL (cliente-servidor) |
|---|---|---|
| **Como roda** | Embutido no próprio processo Node (um arquivo no disco). | Processo servidor independente, acessado via rede (TCP/IP). |
| **Configuração inicial** | Zero infraestrutura externa — ideal para aprender SQL, apps locais e testes rápidos. | Exige instalar/rodar um servidor (ou serviço gerenciado) e gerenciar conexão/pool. |
| **Linguagem SQL** | SQL padrão (`CREATE TABLE`, `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `JOIN`, transações). | O mesmo SQL padrão, com tipos adicionais ricos e recursos avançados. |
| **Escrita simultânea** | Um escritor por vez no arquivo (leitores concorrentes com WAL). | Alta concorrência de escritas simultâneas e múltiplos servidores de API compartilhando o mesmo banco. |

A grande vantagem de começar pelo SQLite é focar 100% no **SQL e na modelagem relacional**, sabendo exatamente o que muda quando você migrar para PostgreSQL depois.

### Tipos de dados essenciais e duas armadilhas clássicas

Por compatibilidade histórica, uma tabela comum no SQLite usa tipagem flexível (permite gravar texto em uma coluna declarada como `INTEGER`). Ao adicionar a palavra-chave **`STRICT`** ao final do `CREATE TABLE` (disponível desde o SQLite 3.37+), o SQLite passa a **rejeitar tipos incompatíveis** — aproximando-se do comportamento rigoroso do PostgreSQL.

Em tabelas `STRICT` do SQLite, cada coluna usa um dos tipos base abaixo (com seu paralelo direto em PostgreSQL):

| Dado que queremos guardar | Tipo em SQLite `STRICT` | Equivalente comum em PostgreSQL | Observação prática |
|---|---|---|---|
| Números inteiros (contagens, centavos) | `INTEGER` | `INTEGER` ou `BIGINT` | Exato, sem erro de arredondamento. |
| Textos (nomes, descrições, UUIDs, datas ISO) | `TEXT` | `TEXT` ou `VARCHAR(n)` | UTF-8; tamanhos máximos são garantidos com `CHECK`. |
| Números decimais aproximados (medidas, notas) | `REAL` | `DOUBLE PRECISION` | Ponto flutuante binário (IEEE 754) — **evite para dinheiro**. |
| Booleanos (`true`/`false`) | `INTEGER` (`0` ou `1`) | `BOOLEAN` | Em SQLite, valide com `CHECK (ativo IN (0, 1))`. |
| Datas e horários | `TEXT` (ISO 8601 UTC) | `TIMESTAMPTZ` | Ex.: `'2026-11-26T13:24:46.314Z'` — ordena cronologicamente até como texto! |
| Bytes brutos (hashes binários, pequenos buffers) | `BLOB` | `BYTEA` | Pouco usado em CRUDs iniciais; arquivos grandes ficam fora do banco. |

Preste atenção especial em **duas decisões reais de engenharia** logo no começo:

1. **Nunca guarde dinheiro em ponto flutuante (`REAL`):** em IEEE 754 (o mesmo `number` do JavaScript — veremos o mecanismo em bits no capítulo 71), `0.1 + 0.2` resulta em `0.30000000000000004`. No PostgreSQL, usa-se `NUMERIC(10, 2)` (decimal exato). No SQLite `STRICT`, a solução limpa e exata é guardar valores monetários em **centavos inteiros** (`valor_centavos INTEGER`, onde `R$ 45,90` é `4590`) e fazer a conversão para reais apenas na fronteira da API (`Math.round(valor * 100)` na entrada; `valor_centavos / 100` na saída).
2. **Guarde datas em UTC no formato ISO 8601:** gravar `'2026-11-26T13:24:46.314Z'` (sempre com ano-mês-dia e sufixo `Z` de UTC) evita bugs de fuso horário e garante que `ORDER BY criada_em DESC` ordene corretamente da despesa mais recente para a mais antiga.

## 2. Chaves primárias, chaves estrangeiras e restrições

### O problema: regras que só existem no código vazam quando o banco é acessado por outro caminho

No capítulo 30, protegemos as rotas HTTP com Zod. Mas pense no que acontece se você abrir o banco por um script de importação, uma tarefa agendada ou uma segunda rota esquecida: se o banco aceitar `descricao` vazia, `valor_centavos` negativo ou uma despesa apontando para uma categoria que não existe, os dados corrompidos entram e quebram relatórios e telas depois.

Em bancos relacionais, **restrições (*constraints*)** movem as garantias estruturais essenciais para dentro do próprio banco. Mesmo que alguém tente gravar dados errados por fora da API, o banco recusa a operação.

### Leitura principal

Em [5.5. Constraints — PostgreSQL](https://www.postgresql.org/docs/current/ddl-constraints.html), leia as seções curtas **5.5.1. Check Constraints**, **5.5.2. Not-Null Constraints**, **5.5.3. Unique Constraints**, **5.5.4. Primary Keys** e **5.5.5. Foreign Keys**. Pule **5.5.6. Exclusion Constraints**.

Em [SQLite Foreign Key Support — SQLite](https://www.sqlite.org/foreignkeys.html), leia **1. Introduction to Foreign Key Constraints**, **2. Enabling Foreign Key Support** e a visão geral de **4.3. ON DELETE and ON UPDATE Actions** (foco em `RESTRICT`, `CASCADE` e `SET NULL`). Pule **4.2. Deferred Foreign Key Constraints** e **6. Limits and Unsupported Features**.

### Modelo mental: identidade, referência e defesa estrutural

Cada restrição cumpre um papel específico e fácil de lembrar:

| Restrição | O que garante | Exemplo na API de Despesas |
|---|---|---|
| **`PRIMARY KEY`** | Identifica cada linha de forma **única** e **nunca nula** (`UNIQUE` + `NOT NULL`). | `id TEXT PRIMARY KEY` (UUID gerado pelo servidor). |
| **`FOREIGN KEY (...) REFERENCES ...`** | Garante que o valor exista na tabela referenciada (**integridade referencial** — sem registros órfãos). | `categoria_id TEXT NOT NULL REFERENCES categorias(id)` — toda despesa pertence a uma categoria cadastrada. |
| **`NOT NULL`** | Proíbe ausência (`NULL`) naquela coluna. | `descricao TEXT NOT NULL` — nenhuma despesa nasce sem descrição. |
| **`UNIQUE`** | Proíbe valores duplicados na coluna (ou combinação de colunas). | `nome TEXT NOT NULL UNIQUE` em `categorias` — não existem duas categorias `"Alimentação"`. |
| **`CHECK (...)`** | Exige que uma condição booleana seja verdadeira em toda inserção ou atualização. | `CHECK (valor_centavos > 0)` — impede despesa zerada ou negativa. |
| **`DEFAULT ...`** | Preenche um valor padrão quando o `INSERT` omite a coluna. | `DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))` em `criada_em`. |

Veja como a chave estrangeira conecta `despesas` à tabela `categorias`:

```text
Tabela pai: categorias                         Tabela filha: despesas
┌───────────────┬───────────────┐              ┌──────────┬───────────┬───────────────┬────────────────┐
│ id (PK)       │ nome (UNIQUE) │              │ id (PK)  │ descricao │ categoria_id  │ valor_centavos │
├───────────────┼───────────────┤              ├──────────┼───────────┼───────────────┼────────────────┤
│ "alimentacao" │ "Alimentação" │◄─────────────┤ "d1..."  │ "Almoço"  │ "alimentacao" │ 4590           │
│ "transporte"  │ "Transporte"  │◄─────────────┤ "d2..."  │ "Metrô"   │ "transporte"  │ 500            │
│ "moradia"     │ "Moradia"     │              └──────────┴───────────┴───────────────┴────────────────┘
└───────────────┴───────────────┘                                            ▲
                                                                   FOREIGN KEY REFERENCES
                                                                       categorias(id)
                                                     (tentar inserir categoria_id = "viagem" FALHA!)
```

> **Por que criar uma tabela `categorias` separada em vez de repetir texto solto?**
> No capítulo 30, a lista de categorias vivia fixa no código (`CATEGORIAS`). Promovê-la a uma tabela própria garante integridade referencial no banco (nenhuma despesa aponta para uma categoria inexistente), impede que alguém exclua uma categoria ainda usada por despesas (`ON DELETE RESTRICT`) e prepara o terreno para o **capítulo 32**, onde combinaremos `despesas` e `categorias` com `JOIN` e calcularemos totais por categoria com `GROUP BY`.

Dois detalhes práticos essenciais sobre chaves:

1. **UUID (`TEXT PRIMARY KEY`) versus inteiro sequencial (`INTEGER PRIMARY KEY`):** no capítulo 30, o servidor já gerava UUIDs com `randomUUID()`. Manter `id TEXT PRIMARY KEY` com UUID evita expor a contagem total de registros na URL (`/despesas/1`, `/despesas/2`) e preserva compatibilidade direta com o `despesaIdParamsSchema` (`z.uuid()`). Já `INTEGER PRIMARY KEY` (ou `GENERATED ALWAYS AS IDENTITY` no PostgreSQL) ocupa menos espaço e é ótimo para tabelas internas ou chaves sequenciais. Ambas são escolhas válidas — o importante é saber o trade-off.
2. **O que acontece quando tentamos apagar a linha pai (`ON DELETE`):**
   - `ON DELETE RESTRICT` (ou `NO ACTION`, o padrão): **impede** apagar uma categoria enquanto existir qualquer despesa apontando para ela. É a opção mais segura por padrão.
   - `ON DELETE CASCADE`: apaga automaticamente todas as despesas filhas quando a categoria é removida — poderoso, mas perigoso se usado sem intenção clara.
   - `ON DELETE SET NULL`: mantém as despesas, trocando `categoria_id` para `NULL` (só funciona se a coluna permitir `NULL`).
3. **Atenção ao SQLite com chaves estrangeiras:** por razões históricas, o motor SQLite desabilita a checagem de chaves estrangeiras por padrão em novas conexões. O módulo `node:sqlite` do Node 24 já ativa essa verificação automaticamente (`enableForeignKeyConstraints: true`), mas executar explicitamente `PRAGMA foreign_keys = ON;` ao abrir a conexão continua sendo uma boa prática universal — especialmente quando você inspecionar o banco pela CLI `sqlite3` ou usar outro driver.

### Exemplo em SQL: definindo `categorias` e `despesas`

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE categorias (
  id TEXT PRIMARY KEY CHECK (length(trim(id)) >= 1),
  nome TEXT NOT NULL UNIQUE CHECK (length(trim(nome)) >= 1)
) STRICT;

CREATE TABLE despesas (
  id TEXT PRIMARY KEY,
  descricao TEXT NOT NULL CHECK (length(trim(descricao)) BETWEEN 1 AND 100),
  categoria_id TEXT NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
  valor_centavos INTEGER NOT NULL CHECK (valor_centavos > 0 AND valor_centavos <= 100000000),
  criada_em TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
) STRICT;
```

### Custos e limitações das restrições

- **Restrições no banco NÃO substituem o Zod na API:** o Zod valida o JSON **antes** de encostar no banco e devolve um `400 Bad Request` detalhado por campo (`fieldErrors`). As restrições do banco são a **última linha de defesa** garantindo que nenhum código (nem um bug novo, nem uma migração, nem outro serviço) consiga corromper os dados armazenados.
- **Custo de verificação:** a cada `INSERT` ou `UPDATE`, o banco verifica `CHECK`, `UNIQUE` e `FOREIGN KEY`. Para `UNIQUE` e `PRIMARY KEY`, o banco cria índices internos automaticamente (custo logarítmico rápido). Para `FOREIGN KEY`, a checagem de existência no pai usa o índice da `PRIMARY KEY` do pai; já apagar um pai exige conferir se há filhos usando aquela chave (por isso, em tabelas grandes, costuma-se criar um índice na coluna da chave estrangeira — assunto do capítulo 82).

## 3. Operações essenciais em SQL: `INSERT`, `SELECT`, filtros, `UPDATE` e `DELETE`

### O problema: parar de trazer tudo para a RAM e filtrar no JavaScript

No capítulo 30, nosso `GET /despesas?categoria=alimentacao&valorMin=50` carregava **todas** as despesas do disco para um array em memória e filtrava com `.filter(...)`. Em SQL, fazemos o inverso: **descrevemos declarativamente o conjunto de linhas desejado** e deixamos o banco fazer a busca, a filtragem, a ordenação e a modificação no armazenamento.

### Leitura principal

Leia as quatro seções curtas e diretas do tutorial oficial do PostgreSQL (toda a sintaxe abaixo é SQL padrão e funciona igualmente no SQLite):

- [2.4. Populating a Table With Rows — PostgreSQL](https://www.postgresql.org/docs/current/tutorial-populate.html) (leia até o exemplo de `INSERT` com lista explícita de colunas; pule `COPY`).
- [2.5. Querying a Table — PostgreSQL](https://www.postgresql.org/docs/current/tutorial-select.html) (leia por completo: `SELECT`, `WHERE`, `AND`/`OR`, `ORDER BY` e `DISTINCT`).
- [2.8. Updates — PostgreSQL](https://www.postgresql.org/docs/current/tutorial-update.html) (leia por completo).
- [2.9. Deletions — PostgreSQL](https://www.postgresql.org/docs/current/tutorial-delete.html) (leia por completo — repare no aviso sobre omitir `WHERE`).

### Modelo mental: o mapa direto do CRUD HTTP para SQL

Cada operação da API do capítulo 30 corresponde diretamente a um comando DML (*Data Manipulation Language*) do SQL:

| Operação HTTP (Cap. 30) | Comando SQL | Papel |
|---|---|---|
| `POST /despesas` | `INSERT INTO despesas (...) VALUES (...)` | Insere uma nova linha na tabela. |
| `GET /despesas` e `GET /despesas/:id` | `SELECT ... FROM despesas WHERE ... ORDER BY ... LIMIT ...` | Consulta linhas específicas e apenas as colunas necessárias. |
| `PATCH /despesas/:id` | `UPDATE despesas SET ... WHERE id = ...` | Modifica colunas das linhas que satisfazem `WHERE`. |
| `DELETE /despesas/:id` | `DELETE FROM despesas WHERE id = ...` | Remove as linhas que satisfazem `WHERE`. |

Veja exemplos concretos de cada operação sobre nossas tabelas `categorias` e `despesas`:

```sql
-- 1. INSERT: sempre liste explicitamente as colunas (nunca dependa da ordem física da tabela)
INSERT INTO categorias (id, nome)
VALUES
  ('alimentacao', 'Alimentação'),
  ('transporte', 'Transporte');

-- Inserir uma despesa e já receber a linha gravada (incluindo criada_em preenchido por DEFAULT)
INSERT INTO despesas (id, descricao, categoria_id, valor_centavos)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Almoço executivo', 'alimentacao', 4590)
RETURNING id, descricao, categoria_id, valor_centavos, criada_em;

-- 2. SELECT com filtros, ordenação e limite (prefira listar colunas a usar SELECT *)
SELECT id, descricao, categoria_id, valor_centavos, criada_em
FROM despesas
WHERE categoria_id = 'alimentacao'
  AND valor_centavos >= 2000
ORDER BY criada_em DESC, id ASC
LIMIT 20;

-- 3. UPDATE direcionado por chave primária
UPDATE despesas
SET descricao = 'Almoço com cliente',
    valor_centavos = 6200
WHERE id = '550e8400-e29b-41d4-a716-446655440000'
RETURNING id, descricao, categoria_id, valor_centavos, criada_em;

-- 4. DELETE direcionado por chave primária
DELETE FROM despesas
WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

### Filtros essenciais e quatro regras que evitam bugs silenciosos

1. **Nunca esqueça `WHERE` em `UPDATE` e `DELETE`:**
   Executar `DELETE FROM despesas;` ou `UPDATE despesas SET valor_centavos = 100;` sem `WHERE` é sintaticamente válido e modifica ou apaga **todas as linhas da tabela** sem pedir confirmação! Antes de rodar um `UPDATE`/`DELETE` manual no banco, teste a mesma cláusula `WHERE` em um `SELECT` para conferir exatamente quais linhas serão afetadas.
2. **Ordem de escrita versus ordem lógica de avaliação do `SELECT`:**
   Embora você escreva `SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT ...`, o banco avalia logicamente nessa sequência:
   ```text
   FROM despesas       ──► 1. escolhe a tabela de origem
     └─► WHERE ...     ──► 2. filtra as linhas que atendem às condições
         └─► SELECT    ──► 3. projeta (escolhe/calcula) as colunas finais
             └─► ORDER BY ──► 4. ordena o resultado (sem ORDER BY, a ordem NÃO é garantida!)
                 └─► LIMIT    ──► 5. recorta no máximo N linhas
   ```
   Por isso, se você quiser ordem determinística, **sempre declare `ORDER BY`** (e, em caso de empate como duas despesas no mesmo milissegundo, inclua um desempate único como `id ASC`).
3. **`NULL` não é igual a `NULL` (lógica de três valores):**
   Em SQL, `NULL` significa *"valor ausente ou desconhecido"*. Comparar `coluna = NULL` ou `coluna <> NULL` **nunca** resulta em verdadeiro — resulta em `UNKNOWN`, que o `WHERE` descarta! Para testar ausência, use sempre **`IS NULL`** ou **`IS NOT NULL`**.
4. **Operadores de filtro mais usados no dia a dia:**
   - Comparação: `=`, `<>` (diferente), `<`, `<=`, `>`, `>=`.
   - Composição lógica: `AND`, `OR`, `NOT`. Como `AND` tem precedência maior que `OR`, **use parênteses sempre que misturar os dois**: `WHERE (categoria_id = 'alimentacao' OR categoria_id = 'transporte') AND valor_centavos >= 5000`.
   - Pertencimento e faixa: `categoria_id IN ('alimentacao', 'transporte')` e `valor_centavos BETWEEN 1000 AND 5000` (inclusivo nos dois extremos).
   - Padrão de texto: `descricao LIKE '%café%'` (`%` casa qualquer sequência de caracteres; `_` casa exatamente um caractere). *(Nota: no SQLite, `LIKE` ignora maiúsculas/minúsculas apenas para letras ASCII — `A`–`Z` — e não normaliza acentos; buscas textuais avançadas exigem técnicas específicas vistas mais adiante.)*

### Custos e limites iniciais das consultas

- **Por que evitar `SELECT *` em código de aplicação:** listar explicitamente `id, descricao, categoria_id, valor_centavos, criada_em` torna o contrato da consulta óbvio, evita trafegar colunas pesadas ou sensíveis adicionadas em futuras migrações (como um hash de senha ou um texto longo) e reduz surpresas ao validar o resultado com Zod.
- **Custo de busca sem índice:** buscar por chave primária (`WHERE id = ?`) usa o índice interno da `PRIMARY KEY` (rápido, típico **O(log n)**). Já filtrar por uma coluna sem índice (como `WHERE valor_centavos >= 5000`) faz uma varredura completa da tabela (*full table scan*, **O(n)**). Para milhares de registros locais isso ainda leva menos de 1 ms — e aprenderemos a criar índices e ler *query plans* com critério no capítulo 82.

## 4. Consultas parametrizadas e prevenção de SQL Injection

### O problema: misturar texto do usuário dentro da string SQL

Imagine alguém escrevendo a busca por categoria concatenando o parâmetro da URL direto na string SQL:

```ts
// ❌ NUNCA FAÇA ISSO — VULNERÁVEL A SQL INJECTION!
const sql = `SELECT id, descricao, categoria_id, valor_centavos, criada_em
             FROM despesas
             WHERE categoria_id = '${categoriaId}'`;
```

Se um cliente mal-intencionado enviar na URL `categoriaId = ' OR '1'='1`, a string SQL montada vira:

```sql
SELECT id, descricao, categoria_id, valor_centavos, criada_em
FROM despesas
WHERE categoria_id = '' OR '1'='1'
```

Como `'1'='1'` é sempre verdadeiro, o filtro foi **anulado** e a consulta devolve **todas as linhas da tabela**! Em contextos piores (por exemplo, ao usar `db.exec(...)` que aceita múltiplos comandos separados por `;`, ou em consultas de login/exclusão), uma entrada como `'; DROP TABLE despesas; --` pode destruir tabelas inteiras ou burlar autenticação.

Esse ataque se chama **SQL Injection** — e acontece sempre que **dados vindos de fora são interpretados como código SQL**.

### Leitura principal

Em [SQL Injection Prevention Cheat Sheet — OWASP](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html), leia **Introduction**, **Examples of injections** → **Basic SQL injection**, **Primary Defenses** → **Parameterized Queries** e **Allow-List Input Validation**. Pule **Stored Procedures**, **SQL Injection in ORM Query Languages** e **Hardening** por enquanto (aprofundaremos segurança no capítulo 61).

### Modelo mental: separar código SQL de dados com *prepared statements*

A defesa primária e universal contra SQL Injection é usar **consultas parametrizadas (*prepared statements*)**. Compare o que acontece dentro do motor do banco:

```text
CONCATENAÇÃO DE STRING (vulnerável):
  "WHERE categoria_id = '" + "' OR '1'='1" + "'"
          │
          ▼  (o banco recebe UMA string só e faz parsing de tudo junto)
  WHERE categoria_id = '' OR '1'='1'   ◄── a entrada ALTEROU a gramática do SQL!

CONSULTA PARAMETRIZADA (segura):
  1. SQL fixo enviado para compilação:  WHERE categoria_id = ?
                                                              ▲ (slot de VALOR)
  2. Dado vinculado separadamente:      param[1] = "' OR '1'='1"
          │
          ▼  (o motor busca literalmente uma categoria cujo id seja o texto "' OR '1'='1")
  Resultado: 0 linhas encontradas — o dado NUNCA vira comando SQL!
```

Com consultas parametrizadas, mesmo textos legítimos com aspas (como `"Café d'Água"` ou `"Livro 'Clean Code'"`) são gravados e buscados perfeitamente sem quebrar a sintaxe SQL e sem precisar tentar "escapar aspas na mão" (prática desencorajada pela OWASP por ser frágil).

> **Sintaxe de *placeholders* entre bancos:** no SQLite (`node:sqlite`), você pode usar placeholders posicionais **`?`** (passando argumentos na ordem) ou nomeados como **`:categoriaId`** / **`$categoriaId`** (passando um objeto). No PostgreSQL (`pg`), os placeholders posicionais usam **`$1`**, **`$2`**, **`$3`**. A mecânica de segurança é idêntica em todos eles.

### O que a parametrização NÃO cobre: identificadores dinâmicos (*allow-list*)

*Placeholders* (`?`, `:nome`, `$1`) servem **apenas para valores de dados** (o que vai depois de `=`, `>=`, `VALUES`, `SET col = ?`, `LIMIT ?`). Você **não** pode passar nome de tabela, nome de coluna nem direção de ordenação (`ASC`/`DESC`) como parâmetro.

Se a API permitir que o cliente escolha a ordenação (por exemplo `GET /despesas?ordenar=valor_desc`), **nunca** interpole `req.query.ordenar` na string SQL. Mapeie o valor validado em uma ***allow-list* fechada** controlada pelo seu código:

```ts
// src/ordenacao.ts
const CLAUSULAS_ORDENACAO = {
  recentes: "criada_em DESC, id ASC",
  antigas: "criada_em ASC, id ASC",
  maior_valor: "valor_centavos DESC, id ASC",
  menor_valor: "valor_centavos ASC, id ASC",
} as const;

export type OrdenacaoDespesas = keyof typeof CLAUSULAS_ORDENACAO;

export function resolverOrderBy(ordenacao: OrdenacaoDespesas = "recentes"): string {
  // Apenas strings constantes do próprio código-fonte chegam ao SQL
  return CLAUSULAS_ORDENACAO[ordenacao];
}
```

Combinando **Zod na entrada** + **consultas parametrizadas para valores** + ***allow-list* fixa para ordenação/colunas**, você fecha completamente a porta para SQL Injection.

## 5. Migração inicial: versionando o esquema do banco

### O problema: criar tabelas manualmente não é reproduzível

Se você cria tabelas digitando comandos `CREATE TABLE` manualmente em um terminal SQLite na sua máquina, dois problemas surgem imediatamente:

1. **Ambiente não reproduzível:** quando outra pessoa clona o repositório (ou quando você sobe a API em um servidor novo ou cria um banco descartável nos testes do capítulo 33), o banco nasce vazio e a API quebra com `no such table: despesas`.
2. **`CREATE TABLE IF NOT EXISTS` solto não acompanha mudanças:** colocar um único `CREATE TABLE IF NOT EXISTS` no `server.ts` até cria o banco na primeira vez, mas não ajuda quando, duas semanas depois, você precisar adicionar uma coluna `observacao` ou uma tabela nova — porque a tabela antiga já existe e o `IF NOT EXISTS` é ignorado.

A solução padrão de engenharia de software são **migrações (*migrations*)**: arquivos `.sql` numerados e versionados no Git que descrevem cada passo de criação e evolução do esquema, acompanhados de uma tabela de controle dentro do próprio banco registrando quais migrações já foram aplicadas.

### Modelo mental: o fluxo de um executor simples de migrações

```text
Pasta no repositório (versionada no Git)         Banco SQLite (arquivo ou :memory:)
migrations/                                      Tabela schema_migrations:
├── 001_inicial.sql                              ┌─────────────────┬──────────────────────────┐
└── (futuro) 002_orcamento_categorias.sql        │ versao (PK)     │ aplicada_em              │
          │                                      ├─────────────────┼──────────────────────────┤
          ▼  ao iniciar o servidor:              │ 001_inicial.sql │ 2026-11-26T13:30:00.000Z │
  1. Garante tabela schema_migrations            └─────────────────┴──────────────────────────┘
  2. Lê arquivos .sql em ordem alfabética/numérica
  3. Para cada arquivo:
       ├── já está em schema_migrations? ──► PULA (idempotente!)
       └── ainda não rodou? ──► executa SQL + grava versão em schema_migrations
```

Repare na propriedade de **idempotência**: você pode reiniciar o servidor 50 vezes seguidas e a migração `001_inicial.sql` roda **exatamente uma vez**. E quando você abrir um banco descartável em memória (`:memory:`) para testar a API no capítulo 33, o mesmo executor aplica `001_inicial.sql` em milissegundos e deixa o banco de teste idêntico ao de produção.

### Exemplo concreto: `migrations/001_inicial.sql` e `src/migrar.ts`

Primeiro, criamos o arquivo SQL da migração inicial — incluindo a carga inicial (*seed* estrutural) das categorias padrão com `INSERT OR IGNORE` (no PostgreSQL, `ON CONFLICT DO NOTHING`):

```sql
-- migrations/001_inicial.sql
CREATE TABLE categorias (
  id TEXT PRIMARY KEY CHECK (length(trim(id)) >= 1),
  nome TEXT NOT NULL UNIQUE CHECK (length(trim(nome)) >= 1)
) STRICT;

CREATE TABLE despesas (
  id TEXT PRIMARY KEY,
  descricao TEXT NOT NULL CHECK (length(trim(descricao)) BETWEEN 1 AND 100),
  categoria_id TEXT NOT NULL REFERENCES categorias(id) ON DELETE RESTRICT,
  valor_centavos INTEGER NOT NULL CHECK (valor_centavos > 0 AND valor_centavos <= 100000000),
  criada_em TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
) STRICT;

INSERT OR IGNORE INTO categorias (id, nome) VALUES
  ('alimentacao', 'Alimentação'),
  ('assinaturas', 'Assinaturas'),
  ('transporte', 'Transporte'),
  ('moradia', 'Moradia'),
  ('outros', 'Outros');
```

Agora, escrevemos o executor enxuto em TypeScript (`src/migrar.ts`), reaproveitando `node:fs/promises`, `node:path` (capítulo 29) e `DatabaseSync` de `node:sqlite`:

```ts
// src/migrar.ts
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { DatabaseSync } from "node:sqlite";

export async function executarMigracoes(
  db: DatabaseSync,
  pastaMigracoes: string,
): Promise<string[]> {
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      versao TEXT PRIMARY KEY,
      aplicada_em TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    ) STRICT;
  `);

  const arquivos = (await readdir(pastaMigracoes))
    .filter((nome) => nome.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));

  const verificarAplicada = db.prepare(
    "SELECT 1 FROM schema_migrations WHERE versao = ?",
  );
  const registrarAplicada = db.prepare(
    "INSERT INTO schema_migrations (versao) VALUES (?)",
  );

  const aplicadasAgora: string[] = [];

  for (const arquivo of arquivos) {
    const jaAplicada = verificarAplicada.get(arquivo);
    if (jaAplicada !== undefined) {
      continue;
    }

    const sql = await readFile(path.join(pastaMigracoes, arquivo), "utf8");

    // Envolvemos a migração em BEGIN/COMMIT para que, se alguma instrução falhar
    // no meio, o banco volte intacto (estudaremos transações em detalhe no cap. 32).
    db.exec("BEGIN");
    try {
      db.exec(sql);
      registrarAplicada.run(arquivo);
      db.exec("COMMIT");
      aplicadasAgora.push(arquivo);
    } catch (erro: unknown) {
      db.exec("ROLLBACK");
      throw erro;
    }
  }

  return aplicadasAgora;
}
```

### Regra de ouro e limites de migrações

- **Nunca edite uma migração que já foi aplicada em outros ambientes:** se `001_inicial.sql` já rodou no banco de outra pessoa ou em produção, editar esse arquivo não altera bancos existentes (porque `001_inicial.sql` já está registrado em `schema_migrations`). Para evoluir o esquema depois, crie um novo arquivo `002_adicionar_observacao.sql` usando `ALTER TABLE` (aprofundaremos evolução segura de esquemas no capítulo 81).
- **O que ferramentas prontas abstraem:** bibliotecas como Drizzle Kit, Prisma Migrate ou Knex automatizam exatamente esse mecanismo (além de gerar SQL a partir de schemas, manter checksums e suportar vários bancos). Escrever essas 45 linhas agora tira toda a "mágica" antes de adotar qualquer ferramenta no futuro.

## 6. Conectando TypeScript e Express ao SQLite com `node:sqlite`

### O problema: trocar a persistência sem quebrar o contrato da API

No capítulo 30, construímos uma API de Despesas com cinco endpoints (`GET /despesas`, `GET /despesas/:id`, `POST /despesas`, `PATCH /despesas/:id`, `DELETE /despesas/:id`), validação em *middleware* com Zod e tratamento centralizado de erros. Agora vamos substituir o armazenamento em arquivo JSON pelo SQLite nativo do Node (`node:sqlite`), mantendo a separação limpa entre **camada HTTP** (rotas/Express) e **camada de persistência** (banco/repositório).

### Leitura principal

Em [SQLite (`node:sqlite`) — Node.js v24 Documentation](https://nodejs.org/docs/latest-v24.x/api/sqlite.html), leia a introdução, **Type conversion between JavaScript and SQLite**, **Class: `DatabaseSync`** (`new DatabaseSync`, `close`, `exec`, `prepare`) e **Class: `StatementSync`** (`run`, `get`, `all`). Pule `Session`, `SQLTagStore`, `backup` e extensões.

Em [Write-Ahead Logging — SQLite](https://www.sqlite.org/wal.html), leia apenas **1. Overview** e **2.2. Concurrency** para entender o papel de `PRAGMA journal_mode = WAL`.

### Modelo mental: abrindo o banco e isolando o SQL no repositório

A estrutura do projeto evolui com mínimas mudanças de arquitetura em relação ao capítulo 30:

```text
api-despesas/
├── migrations/
│   └── 001_inicial.sql          # esquema versionado (etapa 5)
└── src/
    ├── config.ts                # troca DATA_FILE por DATABASE_PATH (ex.: ./dados/despesas.sqlite)
    ├── banco.ts                 # abre DatabaseSync, aplica PRAGMAs e roda migrações
    ├── migrar.ts                # executor de migrações (etapa 5)
    ├── schemas.ts               # contratos HTTP + schema de linha do banco
    ├── validacao.ts             # fábrica de middleware do capítulo 30 (intacta!)
    ├── erros.ts                 # envelope único de erro do capítulo 30 (+ conflito/FK se útil)
    ├── repositorio-despesas.ts  # consultas SQL parametrizadas (substitui o repositório JSON!)
    ├── rotas-despesas.ts        # apenas chama o repositório e responde HTTP
    ├── app.ts                   # recebe o repositório/banco pronto e monta o Express
    └── server.ts                # abre o banco, sobe o servidor e fecha o banco no encerramento
```

Repare no ganho de modularidade: **as rotas não conhecem SQL**, e **o repositório não conhece `req` nem `res` do Express**.

#### 1. Inicialização do banco (`src/banco.ts`)

```ts
// src/banco.ts
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { executarMigracoes } from "./migrar.ts";

export async function abrirBanco(
  caminhoBanco: string,
  pastaMigracoes: string,
): Promise<DatabaseSync> {
  const emMemoria = caminhoBanco === ":memory:";

  if (!emMemoria) {
    // Garante que a pasta pai exista antes de criar o arquivo .sqlite
    await mkdir(path.dirname(caminhoBanco), { recursive: true });
  }

  const db = new DatabaseSync(caminhoBanco, {
    enableForeignKeyConstraints: true,
  });

  // Garante integridade referencial e espera até 5s se outra operação breve estiver gravando
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec("PRAGMA busy_timeout = 5000;");

  if (!emMemoria) {
    // WAL permite leituras concorrentes enquanto uma escrita acontece
    db.exec("PRAGMA journal_mode = WAL;");
  }

  await executarMigracoes(db, pastaMigracoes);
  return db;
}
```

#### 2. O ajuste no contrato (`src/schemas.ts`)

Como as categorias agora vivem em uma tabela, o corpo da despesa passa a referenciar a categoria pelo seu identificador (`categoriaId: "alimentacao"`) em vez do nome fixo no código (`categoria: "Alimentação"`). E, como o banco guarda centavos inteiros, a API passa a recusar valores com mais de duas casas decimais (`45.905` não tem conversão exata para centavos). As respostas também ganham o campo `criadaEm`. Essa é uma mudança de contrato: atualize a tabela de endpoints do capítulo 30 e avise quem consome a API (o seu frontend, no capítulo 33).

```ts
// Trecho atualizado em src/schemas.ts
export const criarDespesaSchema = z.object({
  descricao: z
    .string()
    .trim()
    .min(1, "A descrição é obrigatória.")
    .max(100, "A descrição deve ter no máximo 100 caracteres."),
  // A existência da categoria é conferida pelo banco (FOREIGN KEY), não pelo schema
  categoriaId: z.string().trim().min(1, "Informe a categoria."),
  valor: z
    .number()
    .positive("O valor deve ser maior que zero.")
    .max(1_000_000, "O valor excede o limite permitido.")
    .multipleOf(0.01, "Use no máximo duas casas decimais."),
});
```

Repare na divisão de responsabilidades: o Zod confere o **formato** (`categoriaId` é um texto não vazio), e o banco confere o **estado** (aquela categoria existe em `categorias`). Os schemas de atualização e de parâmetros seguem o mesmo padrão do capítulo 30, derivados deste.

#### 3. Repositório SQLite com consultas parametrizadas e fronteira validada (`src/repositorio-despesas.ts`)

Assim como um arquivo JSON lido do disco no capítulo 29, **linhas vindas do banco de dados também cruzam uma fronteira externa**: `StatementSync.get()` e `StatementSync.all()` devolvem objetos genéricos (`Record<string, SQLOutputValue>`), que validamos com um schema Zod interno (`linhaDespesaSchema`) sem usar casts `as`.

Note também dois cuidados importantes no código abaixo:
- Na fronteira do repositório, convertemos `valor` (reais recebidos pela API, validados com até 2 casas decimais pelo `multipleOf(0.01)` acima) ↔ `valor_centavos` (`INTEGER` exato no SQLite).
- O `categoriaId` da despesa referencia `categorias(id)` por chave estrangeira: se alguém enviar um `categoriaId` que não existe em `categorias`, capturamos o código de erro do SQLite (`errcode === 787` — `SQLITE_CONSTRAINT_FOREIGNKEY`) de forma explícita em vez de deixar estourar `500` sem explicação.

```ts
// src/repositorio-despesas.ts
import { randomUUID } from "node:crypto";
import type { DatabaseSync, SQLInputValue } from "node:sqlite";
import * as z from "zod";
import { resolverOrderBy, type OrdenacaoDespesas } from "./ordenacao.ts";

const linhaDespesaSchema = z.object({
  id: z.uuid(),
  descricao: z.string(),
  categoria_id: z.string(),
  valor_centavos: z.number().int().positive(),
  criada_em: z.string(),
});

export interface Despesa {
  readonly id: string;
  readonly descricao: string;
  readonly categoriaId: string;
  readonly valor: number;
  readonly criadaEm: string;
}

export interface NovaDespesaInput {
  readonly descricao: string;
  readonly categoriaId: string;
  readonly valor: number;
}

export interface AtualizarDespesaInput {
  readonly descricao?: string;
  readonly categoriaId?: string;
  readonly valor?: number;
}

export interface FiltroDespesas {
  readonly categoriaId?: string;
  readonly valorMin?: number;
  readonly busca?: string;
  readonly ordenar?: OrdenacaoDespesas;
}

export type ResultadoEscrita<T> =
  | { readonly ok: true; readonly dado: T }
  | { readonly ok: false; readonly motivo: "CATEGORIA_INVALIDA" | "NAO_ENCONTRADO" };

const COLUNAS_DESPESA =
  "id, descricao, categoria_id, valor_centavos, criada_em";

function paraCentavos(valorEmReais: number): number {
  return Math.round(valorEmReais * 100);
}

function mapearLinhaParaDespesa(linhaBruta: unknown): Despesa {
  const linha = linhaDespesaSchema.parse(linhaBruta);
  return {
    id: linha.id,
    descricao: linha.descricao,
    categoriaId: linha.categoria_id,
    valor: linha.valor_centavos / 100,
    criadaEm: linha.criada_em,
  };
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

export function criarRepositorioDespesas(db: DatabaseSync) {
  const stmtBuscarPorId = db.prepare(
    `SELECT ${COLUNAS_DESPESA} FROM despesas WHERE id = ?`,
  );

  const stmtInserir = db.prepare(`
    INSERT INTO despesas (id, descricao, categoria_id, valor_centavos)
    VALUES (?, ?, ?, ?)
    RETURNING ${COLUNAS_DESPESA}
  `);

  const stmtRemover = db.prepare("DELETE FROM despesas WHERE id = ?");

  return {
    listar(filtro: FiltroDespesas = {}): Despesa[] {
      const condicoes: string[] = [];
      const parametros: SQLInputValue[] = [];

      if (filtro.categoriaId !== undefined) {
        condicoes.push("categoria_id = ?");
        parametros.push(filtro.categoriaId);
      }

      if (filtro.valorMin !== undefined) {
        condicoes.push("valor_centavos >= ?");
        parametros.push(paraCentavos(filtro.valorMin));
      }

      if (filtro.busca !== undefined) {
        condicoes.push("descricao LIKE ?");
        parametros.push(`%${filtro.busca}%`);
      }

      const where = condicoes.length > 0 ? `WHERE ${condicoes.join(" AND ")}` : "";
      const orderBy = resolverOrderBy(filtro.ordenar);

      // Apenas trechos fixos do código entram no SQL; todos os valores vão via `?`
      const stmt = db.prepare(
        `SELECT ${COLUNAS_DESPESA} FROM despesas ${where} ORDER BY ${orderBy}`,
      );

      const linhas = stmt.all(...parametros);
      return linhas.map(mapearLinhaParaDespesa);
    },

    buscarPorId(id: string): Despesa | null {
      const linha = stmtBuscarPorId.get(id);
      return linha === undefined ? null : mapearLinhaParaDespesa(linha);
    },

    criar(entrada: NovaDespesaInput): ResultadoEscrita<Despesa> {
      try {
        const linha = stmtInserir.get(
          randomUUID(),
          entrada.descricao,
          entrada.categoriaId,
          paraCentavos(entrada.valor),
        );
        return { ok: true, dado: mapearLinhaParaDespesa(linha) };
      } catch (erro: unknown) {
        if (ehViolacaoForeignKey(erro)) {
          return { ok: false, motivo: "CATEGORIA_INVALIDA" };
        }
        throw erro;
      }
    },

    atualizar(
      id: string,
      mudancas: AtualizarDespesaInput,
    ): ResultadoEscrita<Despesa> {
      const atribuicoes: string[] = [];
      const parametros: SQLInputValue[] = [];

      if (mudancas.descricao !== undefined) {
        atribuicoes.push("descricao = ?");
        parametros.push(mudancas.descricao);
      }

      if (mudancas.categoriaId !== undefined) {
        atribuicoes.push("categoria_id = ?");
        parametros.push(mudancas.categoriaId);
      }

      if (mudancas.valor !== undefined) {
        atribuicoes.push("valor_centavos = ?");
        parametros.push(paraCentavos(mudancas.valor));
      }

      if (atribuicoes.length === 0) {
        const atual = this.buscarPorId(id);
        return atual === null
          ? { ok: false, motivo: "NAO_ENCONTRADO" }
          : { ok: true, dado: atual };
      }

      parametros.push(id);

      try {
        const stmtAtualizar = db.prepare(`
          UPDATE despesas
          SET ${atribuicoes.join(", ")}
          WHERE id = ?
          RETURNING ${COLUNAS_DESPESA}
        `);
        const linha = stmtAtualizar.get(...parametros);

        if (linha === undefined) {
          return { ok: false, motivo: "NAO_ENCONTRADO" };
        }

        return { ok: true, dado: mapearLinhaParaDespesa(linha) };
      } catch (erro: unknown) {
        if (ehViolacaoForeignKey(erro)) {
          return { ok: false, motivo: "CATEGORIA_INVALIDA" };
        }
        throw erro;
      }
    },

    remover(id: string): boolean {
      const resultado = stmtRemover.run(id);
      return Number(resultado.changes) > 0;
    },
  };
}
```

> **Atenção ao tipo genérico `ResultadoEscrita<T>`:** como já usamos `Response<Corpo, Locals>` no capítulo 30 e `useState<T>` no React, aqui usamos a mesma notação de tipo genérico apenas para não repetir duas interfaces de retorno (`criar` e `atualizar`). Aprofundaremos como projetar suas próprias abstrações genéricas no capítulo 49.

#### 4. Como a rota fica ainda mais limpa e como o servidor fecha o banco

Nas rotas (`src/rotas-despesas.ts`), o handler de `POST /despesas` agora apenas repassa `res.locals.body` ao repositório e traduz o resultado para HTTP:

```ts
// Trecho ilustrativo em src/rotas-despesas.ts
router.post(
  "/",
  validar("body", criarDespesaSchema),
  (_req: Request, res: Response<unknown, { body: NovaDespesaInput }>) => {
    const resultado = repositorio.criar(res.locals.body);

    if (!resultado.ok) {
      responderErro(
        res,
        400,
        "DADOS_INVALIDOS",
        `A categoria '${res.locals.body.categoriaId}' não existe.`,
      );
      return;
    }

    res.status(201).json(resultado.dado);
  },
);
```

E em `src/server.ts`, abrimos o banco com `await abrirBanco(...)` antes de chamar `app.listen(...)` e garantimos o fechamento limpo (`db.close()`) ao encerrar com `Ctrl+C` (`SIGINT`) ou sinal de parada (`SIGTERM`):

```ts
// Trecho ilustrativo em src/server.ts
const db = await abrirBanco(config.databasePath, pastaMigracoes);
const app = criarApp(config, db);

const server = app.listen(config.port, config.host, () => {
  console.log(`${config.appName} rodando em http://${config.host}:${config.port}`);
});

function encerrar(): void {
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on("SIGINT", encerrar);
process.on("SIGTERM", encerrar);
```

### O que `node:sqlite` (`DatabaseSync`) abstrai, custos e limitações

1. **Conceito que representa:** motor de banco de dados relacional SQLite embarcado diretamente no processo Node.js, sem precisar instalar pacotes externos nem compilar extensões nativas.
2. **O que abstrai:** armazenamento estruturado em páginas B-tree no disco, *Write-Ahead Logging* (WAL) contra corrupção parcial, compilação de *prepared statements*, checagem de chaves/restrições e conversão de tipos entre JavaScript e SQLite.
3. **Custos e limitações que continuam existindo:**
   - **Execução síncrona na *thread* principal (`DatabaseSync`):** diferente de drivers de rede como `pg` (PostgreSQL), onde toda consulta é assíncrona (`await pool.query(...)`), o `DatabaseSync` executa consultas **sincronamente**. Para consultas bem filtradas em bancos locais pequenos ou médios, isso leva microssegundos — mas uma consulta pesada sem índice (varrendo milhões de linhas) **bloqueia o *event loop*** e atrasa todas as outras requisições HTTP enquanto não terminar (aprofundaremos o *event loop* no capítulo 76 e índices/planos de execução no capítulo 82).
   - **Um escritor por vez e um único servidor:** o modo `WAL` permite múltiplos leitores simultâneos sem travar escritas, mas apenas uma escrita ocorre por vez no arquivo. Além disso, como o banco é um arquivo local no disco da máquina, duas instâncias da API rodando em máquinas separadas não podem compartilhar o mesmo arquivo SQLite. Quando o sistema exige várias instâncias de API ou escritas altamente concorrentes, a arquitetura evolui para um banco cliente-servidor como **PostgreSQL** — reaproveitando quase todo o SQL, os conceitos de migração e o isolamento do repositório que você construiu aqui.
   - **Consultas com várias etapas ainda não são atômicas sozinhas:** se uma operação precisar atualizar duas tabelas juntas (por exemplo, registrar uma transferência debitando de uma conta e creditando em outra), rodar dois `UPDATE` soltos ainda permite falha no meio — por isso o **capítulo 32** introduz **transações** (`BEGIN`/`COMMIT`/`ROLLBACK`) junto com `JOIN`, agregações e paginação.

**Experimente:** em um script rápido usando `new DatabaseSync(":memory:")`, execute o SQL da migração `001_inicial.sql` com `db.exec(...)` e teste quatro situações seguidas: (1) inserir uma despesa válida e inspecionar o objeto devolvido por `RETURNING *`; (2) tentar inserir uma despesa com `categoria_id = 'inexistente'` e observar o erro `FOREIGN KEY constraint failed`; (3) tentar inserir `valor_centavos = 0` e observar o erro `CHECK constraint failed`; e (4) tentar inserir `'abc'` em `valor_centavos` e observar o erro da tabela `STRICT`. Depois, troque `:memory:` por `./dados/teste.sqlite`, encerre o script e rode um segundo script apenas com `SELECT` para confirmar que os dados sobreviveram ao reinício do processo.

## Erros comuns a evitar

| Erro comum | Por que causa problema | Como evitar |
|---|---|---|
| **Concatenar entrada do usuário na string SQL** | Abre vulnerabilidade crítica de **SQL Injection** e quebra quando o texto contém aspas. | Usar sempre consultas parametrizadas (`?` / `:nome`) para valores e *allow-list* fixa para colunas/ordenação. |
| **Rodar `UPDATE` ou `DELETE` sem `WHERE`** | Atualiza ou apaga **todas as linhas** da tabela sem pedir confirmação. | Sempre especificar `WHERE` (em geral pela chave primária) e validar a condição com `SELECT` em operações manuais. |
| **Usar `= NULL` ou `<> NULL` no `WHERE`** | Em SQL, comparações com `NULL` resultam em `UNKNOWN` e nunca retornam linhas. | Usar sempre `IS NULL` e `IS NOT NULL`. |
| **Guardar dinheiro em `REAL` (ponto flutuante)** | Gera erros de arredondamento binário (`0.1 + 0.2 !== 0.3`) em somas e comparações. | Armazenar centavos inteiros em `INTEGER` no SQLite (ou `NUMERIC` no PostgreSQL). |
| **Esquecer `STRICT` ou `PRAGMA foreign_keys = ON` no SQLite** | Sem `STRICT`, tipos inválidos passam; sem `foreign_keys = ON` em clientes SQLite, chaves estrangeiras são ignoradas silenciosamente. | Declarar tabelas com `STRICT` e ativar `PRAGMA foreign_keys = ON` ao abrir qualquer conexão. |
| **Editar uma migração já aplicada** | Bancos que já registraram aquela versão em `schema_migrations` não executam a alteração de novo e ficam dessincronizados. | Tratar migrações aplicadas como imutáveis e criar sempre uma nova migração numerada (`002_...sql`). |
| **Assumir ordem fixa sem `ORDER BY` ou usar `SELECT *` na API** | O banco não garante ordem sem `ORDER BY`, e `SELECT *` pode vazar colunas adicionadas futuramente. | Listar explicitamente as colunas no `SELECT` e declarar `ORDER BY` com critério de desempate. |

## Ao terminar

Antes de avançar para o capítulo 32 (Relações e consultas), confira se você consegue explicar:

- quais quatro limitações do arquivo JSON (custo O(n), condição de corrida na escrita, corrupção parcial e falta de integridade) motivam a troca por um banco de dados relacional, e qual a diferença prática entre SQLite (embarcado) e PostgreSQL (cliente-servidor);
- como funcionam tabelas, linhas, colunas e os tipos de dados em tabelas `STRICT` do SQLite (incluindo por que guardamos dinheiro em `INTEGER` de centavos e datas em `TEXT` ISO 8601 UTC);
- qual o papel de `PRIMARY KEY`, `FOREIGN KEY ... REFERENCES ...`, `NOT NULL`, `UNIQUE`, `CHECK` e `DEFAULT`, por que restrições do banco complementam (sem substituir) a validação com Zod na API, e por que `PRAGMA foreign_keys = ON` é indispensável no ecossistema SQLite;
- como `INSERT`, `SELECT` (`WHERE`, `AND`/`OR` com parênteses, `IS NULL`, `IN`, `LIKE`, `ORDER BY`, `LIMIT`), `UPDATE` e `DELETE` mapeiam para o CRUD HTTP, qual o risco de omitir `WHERE` em `UPDATE`/`DELETE` e por que evitar `SELECT *`;
- como funcionam **consultas parametrizadas** (*prepared statements*) para separar código SQL de dados e impedir **SQL Injection**, e por que ordenação ou nomes de colunas dinâmicos exigem uma ***allow-list*** fixa em vez de *placeholders*;
- como uma **migração inicial** (`migrations/001_inicial.sql` + tabela `schema_migrations`) torna o esquema reproduzível e idempotente, por que não editamos migrações já aplicadas, e quais são os custos e limites do `node:sqlite` (`DatabaseSync` síncrono e escrita única por arquivo) que preparam a ponte para transações, `JOIN` e PostgreSQL.
