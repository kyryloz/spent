const spaceGuard = '~'

export const tokenize = (input: string): Array<string> => {
  return normalize(input)
    .split(/\s/)
    .map(token => unguardSpaces(token))
}

export const normalize = (input: string): string => {
  return input
    .replace(/'(.+)'/g, (_, group) => guardSpaces(group))
    .trim()
    .replace(/\s\s+/g, ' ')
}

const guardSpaces = (input: string) => input.replace(/\s/g, spaceGuard)

const unguardSpaces = (input: string) => input.replace(spaceGuard, ' ')
