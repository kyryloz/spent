import { fromPairs } from 'lodash'
import * as ohm from 'ohm-js'
import { grammar } from 'parser/grammar'

export interface Values {
  [valueName: string]: any
}

export interface SemanticCallback {
  create: (entity: string, name: string) => void
  expense: (category: string, amount: number, source: string) => void
  income: (accountName: string, amount: number) => void
  status: (what: string) => void
  remove: (entity: string, name: string) => void
  rename: (entity: string, oldName: string, newName: string) => void
  updateTransaction: (id: string, values: Values) => void
}

let semantic: ohm.Semantics | undefined = undefined

let semanticCallback: SemanticCallback | undefined = undefined

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
  Delete: (_, entity, name) => {
    if (semanticCallback) {
      semanticCallback.remove(entity.sourceString, name.eval())
    }
    semanticCallback = undefined
  },
  Rename: (_, entity, oldName, _0, newName) => {
    if (semanticCallback) {
      semanticCallback.rename(entity.sourceString, oldName.eval(), newName.eval())
    }
    semanticCallback = undefined
  },
  UpdateTransaction: (_, identifier, _0, values) => {
    if (semanticCallback) {
      semanticCallback.updateTransaction(identifier.eval(), values.eval())
    }
    semanticCallback = undefined
  },
  TransactionSetters: values => fromPairs(values.asIteration().eval()),
  TransactionSetter: (name, _, value) => [name.sourceString, value.eval()],
  number: node => parseFloat(node.sourceString),
  string: (_, str, _0) => str.sourceString,
  word: node => node.sourceString,
})

export const runSemantic = (match: ohm.MatchResult, callback: SemanticCallback) => {
  semanticCallback = callback
  if (semantic) {
    semantic(match).eval()
  } else {
    throw new Error('Semantic was not initialized')
  }
}
