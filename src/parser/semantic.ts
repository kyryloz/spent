import * as ohm from 'ohm-js'
import { grammar } from './grammar'

const semantic = grammar.createSemantics()

semantic.addOperation('eval', {
  Create: (_, entity, identifier) => {
    console.log(`Create ${entity.sourceString} with name '${identifier.sourceString}'`)
  },
  Expense: (_, value, _0, identifier, _1, account) => {
    const from = account ? account.sourceString : ''
    console.log(`Create expense ($${value.sourceString}) on ${identifier.sourceString} ${from}`)
  },
  Income: (_, value, _0, account) => {
    console.log(`Income ($${value.sourceString}) to '${account.sourceString}'`)
  },
  Status: (_, entity) => {
    console.log(`Show status of ${entity.sourceString}`)
  },
})

export const runSemantic = (match: ohm.MatchResult) => {
  semantic(match).eval()
}
