import { Grammar } from './grammar/grammar'

export interface CommandTree {
  type: Grammar.ExpressionType
  value?: string | number
  name?: string
  operator?: CommandTree
  args?: Array<CommandTree>
}

const specialForms = Object.create(null)

export const evaluate = (expr: any, scope: any = []): any => {
  if (expr.type === Grammar.ExpressionType.VALUE) {
    return expr.value
  } else if (expr.type == Grammar.ExpressionType.KEYWORD) {
    if (expr.name in scope) {
      return scope[expr.name]
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`)
    }
  } else if (expr.type == Grammar.ExpressionType.FUNCTION) {
    let { operator, args } = expr
    if (operator.type == Grammar.ExpressionType.KEYWORD && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope)
    } else {
      let op = evaluate(operator, scope)
      if (typeof op === 'function') {
        return op(...args.map((arg: any) => evaluate(arg, scope)))
      } else {
        throw new TypeError('Applying a non-function.')
      }
    }
  }
}

specialForms.create = (args: any, scope: any) => {
  if (args.length !== 2) {
    throw new SyntaxError('Wrong number of args to create')
  }

  switch (args[0].name) {
    case 'account': {
      return `Account '${evaluate(args[1], scope)}' created`
    }
    case 'category': {
      return `Category '${evaluate(args[1], scope)}' created`
    }
  }

  throw new SyntaxError(`Unknown entity: ${args[0]}`)
}

specialForms.do = (args: any, scope: any) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};
