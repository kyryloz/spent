import * as ohm from 'ohm-js'
import { grammar } from './grammar'

const semantic = grammar.createSemantics()

semantic.addOperation('eval', {
  Exp: e => e.eval(),
  Create: (_, entity, name) => {
    console.log(`Create ${entity.sourceString} with name ${name.sourceString}`)
  },
  Expense: (_, value, _0, name) => {
    console.log(`Create expense ($${value.sourceString}) on ${name.sourceString}`)
  },
  name: node => node.sourceString,
  value: node => parseInt(node.sourceString),
})

export const runSemantic = (match: ohm.MatchResult) => {
  semantic(match).eval()
}
