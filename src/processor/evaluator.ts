import { Syntax } from './Syntax'

export interface CommandTree {
  type: Syntax.ExpressionType
  value?: string | number
  name?: string
  operator?: CommandTree
  args?: Array<CommandTree>
}

const specialForms = Object.create(null)

export const evaluate = (expr: any, scope: any = []): any => {
  if (expr.type === Syntax.ExpressionType.VALUE) {
    return expr.value
  } else if (expr.type == Syntax.ExpressionType.KEYWORD) {
    if (expr.name in scope) {
      return scope[expr.name]
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`)
    }
  } else if (expr.type == Syntax.ExpressionType.FUNCTION) {
    let { operator, args } = expr
    if (operator.type == Syntax.ExpressionType.KEYWORD && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope)
    } else {
      let op = evaluate(operator, scope)
      if (typeof op == 'function') {
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

  console.log('aaa', args)

  throw new SyntaxError(`Unknown entity: ${args[0]}`)
}
