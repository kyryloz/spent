import * as ohm from 'ohm-js'

const myGrammar = ohm.grammar(`
  Spent {
    Exp =
      | "create" entity name -- create
      | "expense" value "on" name -- expense
    entity = "account" | "category"
    name = letter+
    value = digit+
  }
`)

export const parseInput = (input: string) => {
  return myGrammar.match(input).succeeded()
}
