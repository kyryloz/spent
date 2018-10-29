import * as ohm from 'ohm-js'

const myGrammar = ohm.grammar(`
  Spent {
    Exp = Create | Expense
    Create = "create" entity name
    Expense = "expense" value "on" name
    entity = "account" | "category"
    name = letter+
    value = digit+
  }
`)

export const parseInput = (input: string) => {
  const semantic = myGrammar.createSemantics()
  semantic.addOperation('allOperations', {
    Exp: function(e) {
      return e.allOperations()
    },
    Create: (_, entity, name) => {
      console.log(`Create ${entity.sourceString} with name ${name.sourceString}`)
    },
    Expense: (_, value, _0, name) => {
      console.log(`Create expense ($${value.sourceString}) on ${name.sourceString}`)
    },
    name: function(_) {
      return this.sourceString.toString()
    },
    value: function(_) {
      return parseInt(this.sourceString.toString())
    },
  })
  console.log('TEST TEST TEST')
  const adapter = semantic(myGrammar.match(input))
  return adapter.allOperations()
}
