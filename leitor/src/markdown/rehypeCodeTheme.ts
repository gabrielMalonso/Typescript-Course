import type { Element, ElementContent, Root, RootContent, Text } from 'hast'

const TOKEN_PATTERN =
  /(=>|===|!==|>=|<=|&&|\|\||==|!=|\?\?|\?\.|\+\+|--|\*\*|[=+\-*/%><!&|^~]|[()[\]{}]|\b[$A-Za-z_][$\w]*\b)/g

const TYPE_NAMES = new Set([
  'any',
  'bigint',
  'boolean',
  'never',
  'number',
  'object',
  'string',
  'symbol',
  'unknown',
  'void',
])

const NON_PARAMETER_NAMES = new Set([
  ...TYPE_NAMES,
  'as',
  'async',
  'const',
  'function',
  'let',
  'readonly',
])

const OPERATOR_PATTERN =
  /^(?:=>|===|!==|>=|<=|&&|\|\||==|!=|\?\?|\?\.|\+\+|--|\*\*|[=+\-*/%><!&|^~])$/

const OPENING_BRACKETS = new Set(['(', '[', '{'])
const CLOSING_BRACKETS = new Map([
  [')', '('],
  [']', '['],
  ['}', '{'],
])

const UNTOUCHED_SCOPES = new Set([
  'hljs-code',
  'hljs-comment',
  'hljs-formula',
  'hljs-regexp',
  'hljs-string',
  'hljs-tag',
])

type Bracket = {
  character: string
  depth: number
}

function classesOf(node: Element) {
  const className = node.properties.className
  return Array.isArray(className) ? className.map(String) : []
}

function span(className: string, value: string): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: className.split(' ') },
    children: [{ type: 'text', value }],
  }
}

function textOf(node: Element): string {
  return node.children
    .map((child) => {
      if (child.type === 'text') return child.value
      if (child.type === 'element') return textOf(child)
      return ''
    })
    .join('')
}

function addParameterIdentifiers(value: string, parameterNames: Set<string>) {
  for (const match of value.matchAll(/[$A-Za-z_][$\w]*/g)) {
    if (!NON_PARAMETER_NAMES.has(match[0])) parameterNames.add(match[0])
  }
}

function collectParameterNames(code: Element): Set<string> {
  const parameterNames = new Set<string>()

  function visit(node: Element) {
    const classes = classesOf(node)
    if (classes.includes('hljs-params')) {
      for (const part of textOf(node).split(',')) {
        addParameterIdentifiers(part.split(/[:=]/, 1)[0], parameterNames)
      }
    }

    for (const child of node.children) {
      if (child.type === 'element') visit(child)
    }
  }

  visit(code)

  const source = textOf(code)
  const parenthesizedArrow = /\(([^()\n]*)\)\s*(?::\s*[$\w.[\]<>|& ]+)?\s*=>/g
  for (const match of source.matchAll(parenthesizedArrow)) {
    addParameterIdentifiers(match[1], parameterNames)
  }

  for (const match of source.matchAll(/\b([$A-Za-z_][$\w]*)\s*=>/g)) {
    parameterNames.add(match[1])
  }

  return parameterNames
}

function decorateText(
  node: Text,
  parameterNames: Set<string>,
  bracketStack: Bracket[],
): ElementContent[] {
  const parts = node.value.split(TOKEN_PATTERN)

  return parts.filter(Boolean).map((part) => {
    if (OPENING_BRACKETS.has(part)) {
      const depth = bracketStack.length
      bracketStack.push({ character: part, depth })
      return span(`syntax-bracket syntax-bracket-${depth % 5}`, part)
    }

    const matchingOpening = CLOSING_BRACKETS.get(part)
    if (matchingOpening) {
      const matchIndex = bracketStack.findLastIndex(
        ({ character }) => character === matchingOpening,
      )
      const match = matchIndex >= 0 ? bracketStack[matchIndex] : undefined
      if (matchIndex >= 0) bracketStack.splice(matchIndex)
      return span(`syntax-bracket syntax-bracket-${(match?.depth ?? 0) % 5}`, part)
    }

    if (OPERATOR_PATTERN.test(part)) return span('syntax-operator', part)
    if (TYPE_NAMES.has(part)) return span('syntax-type', part)
    if (parameterNames.has(part)) {
      return span('syntax-parameter', part)
    }

    return { type: 'text', value: part }
  })
}

function decorateChildren(
  node: Root | Element,
  parameterNames: Set<string>,
  bracketStack: Bracket[],
) {
  const nextChildren: RootContent[] = []

  for (const child of node.children) {
    if (child.type === 'text') {
      nextChildren.push(...decorateText(child, parameterNames, bracketStack))
      continue
    }

    if (child.type !== 'element') {
      nextChildren.push(child)
      continue
    }

    const classes = classesOf(child)
    const untouched = classes.some((className) => UNTOUCHED_SCOPES.has(className))
    if (!untouched) {
      decorateChildren(child, parameterNames, bracketStack)
    }
    nextChildren.push(child)
  }

  node.children = nextChildren
}

function decorateHighlightedBlocks(node: Root | Element) {
  if (node.type === 'element') {
    const classes = classesOf(node)
    if (node.tagName === 'code' && classes.includes('hljs')) {
      decorateChildren(node, collectParameterNames(node), [])
      return
    }
  }

  for (const child of node.children) {
    if (child.type === 'element') decorateHighlightedBlocks(child)
  }
}

export function rehypeCodeTheme() {
  return (tree: Root) => decorateHighlightedBlocks(tree)
}
