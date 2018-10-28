// create account 'Wallet'
// create category 'Groceries'
// expence 100 on 'Groceries' from 'Credit Card'
// income 100 to 'Wallet'
// transfer 100 from 'Credit Card' to 'Wallet'

export namespace Syntax {
  export type Keyword =
    | 'expence'
    | 'income'
    | 'on'
    | 'budget'
    | 'transfer'
    | 'create'
    | 'account'
    | 'category'
    | 'to'
    | 'from'
    | 'save'
    | 'restore'
    | 'undo'
    | 'redo'

  export type ActionWord = 'expence' | 'income' | 'transfer' | 'create'

  export type PrepositionWord = 'on' | 'to' | 'from'

  export type EntityWord = 'account' | 'category'

  export enum Expression {
    KEYWORD = 'keyword',
    ENTITY = 'entity',
    FUNCTION = 'function',
    VALUE = 'value',
  }
}

export const parse = (input: string) => {
  input = skipSpace(input)
  let match
  let result
  if ((match = /^'([^"]*)'/.exec(input))) {
    // match: 'test'
    result = { type: Syntax.Expression.VALUE, value: match[1] }
  } else if ((match = /^\d+\b/.exec(input))) {
    // match: 42
    result = { type: Syntax.Expression.VALUE, value: Number(match[0]) }
  } else if ((match = /^[^\s(),#"']+/.exec(input))) {
    // match: test
    const name = match[0]
    if (name === 'account' || name === 'category') {
      result = { type: Syntax.Expression.ENTITY, name: match[0] }
    } else {
      result = { type: Syntax.Expression.KEYWORD, name: match[0] }
    }
  } else {
    throw new SyntaxError('Unexpected syntax: ' + input)
  }

  return parseFunction(result, input.slice(match[0].length))
}

const parseFunction = (result: any, restInput: any): any => {
  restInput = skipSpace(restInput)
  if (restInput[0] != '(') {
    return { parsed: result, rest: restInput }
  }

  restInput = skipSpace(restInput.slice(1))
  result = { type: Syntax.Expression.FUNCTION, operator: result, args: [] }
  while (restInput[0] != ')') {
    let arg = parse(restInput)
    result.args.push(arg.parsed)
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
    return expression
  }
  return expression.slice(first)
}
