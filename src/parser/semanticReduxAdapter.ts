import { Dispatch } from 'redux'
import { addTransaction, errorTransaction } from '../store/transactions/actions'
import { parseGrammar } from './parser'
import { evaluateAction } from './semantic'
import { Transactions } from '../store/transactions/interface'

export const processInput = (input: string, dispatch: Dispatch) => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    dispatch(errorTransaction(parseResult.message || 'unknown error'))
    return
  }

  evaluateAction(parseResult.match, {
    create: (entityName, name) => {
      let entity: Transactions.Entity
      switch (entityName) {
        case 'account':
          entity = Transactions.Entity.ACCOUNT
          break
        case 'category':
          entity = Transactions.Entity.CATEGORY
          break
        default:
          throw new Error(`Unknown entity name: '${entityName}'`)
      }

      dispatch(
        addTransaction<Transactions.Create>(input, {
          type: 'create',
          entity,
          name,
        })
      )
    },
    expense: (category, amount, fromAccount) => {
      dispatch(
        addTransaction<Transactions.Expense>(input, {
          type: 'expense',
          category,
          amount,
          fromAccount,
        })
      )
    },
    income: (accountName, amount) => {
      dispatch(
        addTransaction<Transactions.Income>(input, {
          type: 'income',
          accountName,
          amount,
        })
      )
    },
    status: what => {
      dispatch(
        addTransaction<Transactions.Status>(input, {
          type: 'status',
          what,
        })
      )
    },
  })
}
