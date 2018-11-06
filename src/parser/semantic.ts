import * as ohm from 'ohm-js'
import { grammar } from './grammar'
import { App } from '../store/interface'
import { Store } from 'redux'

export interface SemanticCallback {
  create: (entity: string, name: string) => void
  expense: (category: string, amount: number, source: string) => void
  income: (accountName: string, amount: number) => void
  status: (what: string) => void
}

let semantic: ohm.Semantics | undefined = undefined

let semanticCallback: SemanticCallback | undefined = undefined

export const initSemantic = (store: Store<App.State>) => {
  semantic = grammar.createSemantics()

  semantic.addOperation('eval', {
    Create: (_, entity, name) => {
      if (semanticCallback) {
        semanticCallback.create(entity.sourceString, name.eval())
      }
      semanticCallback = undefined
    },
    Expense: (_, amount, _0, category, _1, account) => {
      if (semanticCallback) {
        semanticCallback.expense(category.eval(), amount.eval(), account.eval())
      }
      semanticCallback = undefined
    },
    Income: (_, amount, _0, account) => {
      if (semanticCallback) {
        semanticCallback.income(account.eval(), amount.eval())
      }
      semanticCallback = undefined
    },
    Status: (_, entity) => {
      if (semanticCallback) {
        semanticCallback.status(entity.sourceString)
      }
      semanticCallback = undefined
    },
    category: function(this: any, _) {
      const state = store.getState()
      const category = state.categories.items.find(item => item.name === this.sourceString)
      if (category) {
        return category.id
      }

      return null
    },
    number: (value, _, fraction) => parseFloat(`${value.sourceString}${fraction.sourceString}`),
    string: (_, str, _0) => str.sourceString,
    word: function(this: any, _, _0) {
      return this.sourceString
    },
  })
}

export const runSemantic = (match: ohm.MatchResult, callback: SemanticCallback) => {
  semanticCallback = callback
  if (semantic) {
    semantic(match).eval()
  } else {
    throw new Error('Semantic was not initialized')
  }
}
