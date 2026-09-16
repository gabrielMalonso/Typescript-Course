/** Keep published URLs and PDF annotation identities stable when folders are renamed. */
export function canonicalCoursePath(path: string): string {
  return path
    .replace(/\/01-leituras-do-livro\//g, '/leituras/')
    .replace(/\/02-aulas-do-curso\//g, '/aula/')
    .replace(/\/03-pratica\//g, '/pratica/')
}
