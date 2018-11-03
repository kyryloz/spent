import * as ohm from 'ohm-js'
import { grammar } from './grammar'

export interface SemanticCallback {
  create: (entity: string, name: string) => void
  expense: (category: string, amount: number, source: string) => void
  income: (accountName: string, amount: number) => void
  status: (what: string) => void
}

const semantic = grammar.createSemantics()

let actionCallback: SemanticCallback | undefined = undefined

semantic.addOperation('eval', {
  Create: (_, entity, name) => {
    if (actionCallback) {
      actionCallback.create(entity.sourceString, name.eval())
    }
    actionCallback = undefined
  },
  Expense: (_, amount, _0, category, _1, account) => {
    if (actionCallback) {
      actionCallback.expense(category.eval(), amount.eval(), account.eval())
    }
    actionCallback = undefined
  },
  Income: (_, amount, _0, account) => {
    if (actionCallback) {
      actionCallback.income(account.eval(), amount.eval())
    }
    actionCallback = undefined
  },
  Status: (_, entity) => {
    if (actionCallback) {
      actionCallback.status(entity.sourceString)
    }
    actionCallback = undefined
  },
  number: (value, _, fraction) => parseFloat(`${value.sourceString}${fraction.sourceString}`),
  string: (_, str, _0) => str.sourceString,
  word: function (this: any, _, _0) { return this.sourceString }
})

export const runSemantic = (match: ohm.MatchResult, callback: SemanticCallback) => {
  actionCallback = callback
  semantic(match).eval()
}
