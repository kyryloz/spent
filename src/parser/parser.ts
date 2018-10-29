import { Grammar } from './grammar/grammar'
import { Token } from './tokenizer'

export interface SpecialForm {
  (args: Array<Token>): Action
}

export interface Entity {
  type: Grammar.ExpressionType.ENTITY,
  name: string
}

export interface Value {
  type: Grammar.ExpressionType.VALUE,
  value: string
}

export interface Action {
  action: Grammar.ActionWord
  args: Array<Entity | Value>
}

const specialForms = Object.create(null)

export const parse = (tokens: Array<Token>): Action => {
  return parseTokens(tokens, 0)
}

const parseTokens = (tokens: Array<Token>, from: number): Action => {
  const command = tokens[from]
  if (command.value in specialForms) {
    return (<SpecialForm>specialForms[command.value])(tokens.slice(from + 1))
  } else {
    throw new SyntaxError()
  }
}

specialForms.create = (args: Array<Token>): Action => {
  if (args.length >= 2) {
    return {
      action: 'create',
      args: [
        {
          type: Grammar.ExpressionType.ENTITY,
          name: args[0].value
        },
        {
          type: Grammar.ExpressionType.VALUE,
          value: args[1].value
        }
      ]
    }
  } else {
    throw new SyntaxError()
  }
}
