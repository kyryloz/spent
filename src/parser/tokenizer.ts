const spaceGuard = '~'

export interface Token {
  value: string
}

export const tokenize = (input: string): Array<Token> => {
  return normalize(input)
    .split(/\s/)
    .map(token => unguardSpaces(token))
    .map(value => ({ value }))
}

export const normalize = (input: string): string => {
  return input
    .replace(/'(.+)'/g, (_, group) => guardSpaces(group))
    .trim()
    .replace(/\s\s+/g, ' ')
}

const guardSpaces = (input: string) => input.replace(/\s/g, spaceGuard)

const unguardSpaces = (input: string) => input.replace(spaceGuard, ' ')
