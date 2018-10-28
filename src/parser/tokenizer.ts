const temporarySpaceChar = '~'

export const tokenize = (input: string): Array<string> => {
  return normalize(input)
    .split(/\s/)
    .map(token => unguardSpaces(token))
}

export const normalize = (input: string): string => {
  return input
    .replace(/'.+'/g, str => guardSpaces(str))
    .trim()
    .replace(/\s\s+/g, ' ')
}

const guardSpaces = (input: string) => input.replace(/\s/g, temporarySpaceChar)

const unguardSpaces = (input: string) => input.replace(temporarySpaceChar, ' ')
