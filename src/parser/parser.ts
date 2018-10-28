import { Grammar } from './grammar/grammar'
import { CommandTree } from './evaluator';

export const parse = (input: string) => {
  let { parsed, rest } = parseInput(input)
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError(`Unexpected text in the end: ${rest}`)
  }
  return parsed
}

interface ParseResult {
  parsed: CommandTree
  rest: string
}

export const parseInput = (input: string): ParseResult => {
  input = skipSpace(input)
  let match: RegExpExecArray | null
  let result: CommandTree
  if (match = /^'([^"]*)'/.exec(input)) {
    // match: 'test'
    result = { type: Grammar.ExpressionType.VALUE, value: match[1] }
  } else if (match = /^\d+\b/.exec(input)) {
    // match: 42
    result = { type: Grammar.ExpressionType.VALUE, value: Number(match[0]) }
  } else if (match = /^[^\s(),#"']+/.exec(input)) {
    // match: test
    const name = match[0]
    if (name === 'account' || name === 'category') {
      result = { type: Grammar.ExpressionType.ENTITY, name: match[0] }
    } else {
      result = { type: Grammar.ExpressionType.KEYWORD, name: match[0] }
    }
  } else {
    throw new SyntaxError(`Unexpected syntax: ${input}`)
  }

  return parseFunction(result, input.slice(match[0].length))
}

const parseFunction = (result: CommandTree, restInput: string): ParseResult => {
  restInput = skipSpace(restInput)
  if (restInput[0] != '(') {
    return { parsed: result, rest: restInput }
  }

  restInput = skipSpace(restInput.slice(1))
  result = { type: Grammar.ExpressionType.FUNCTION, operator: result, args: [] }
  while (restInput[0] != ')') {
    let arg = parseInput(restInput)
    if (result.args) {
      result.args.push(arg.parsed)
    }
    restInput = skipSpace(arg.rest)
    if (restInput[0] == ',') {
      restInput = skipSpace(restInput.slice(1))
    } else if (restInput[0] != ')') {
      throw new SyntaxError("Expected ',' or ')'")
    }
  }
  return parseFunction(result, restInput.slice(1))
}

const skipSpace = (expression: string) => {
  let first = expression.search(/\S/)
  if (first === -1) {
    return ''
  }
  return expression.slice(first)
}
