import { Dispatch } from 'redux'
import { addTransaction, errorTransaction } from '../store/transactions/actions'
import { Transactions } from '../store/transactions/interface'
import { parseGrammar } from './parser'
import { evaluateAction } from './semantic'
import { addAccount, changeBalance } from '../store/accounts/actions';
import { addCategory } from '../store/categories/actions';

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
          dispatch(addAccount(name, 0))
          break
        case 'category':
          entity = Transactions.Entity.CATEGORY
          dispatch(addCategory(name))
          break
        default:
          throw new Error(`Unknown entity name: '${entityName}'`)
      }

      dispatch(
        addTransaction<Transactions.Create>(input, {
          transactionType: Transactions.TransactionType.CREATE,
          entity,
          name,
        })
      )
    },
    expense: (category, amount, fromAccount) => {
      dispatch(
        addTransaction<Transactions.Expense>(input, {
          transactionType: Transactions.TransactionType.EXPENSE,
          category,
          amount,
          fromAccount,
        })
      )
      if (fromAccount) {
        dispatch(changeBalance(fromAccount, -amount))
      }
    },
    income: (accountName, amount) => {
      dispatch(
        addTransaction<Transactions.Income>(input, {
          transactionType: Transactions.TransactionType.INCOME,
          accountName,
          amount,
        })
      )
      dispatch(changeBalance(accountName, amount))
    },
    status: what => {
      dispatch(
        addTransaction<Transactions.Status>(input, {
          transactionType: Transactions.TransactionType.STATUS,
          what,
        })
      )
    },
  })
}
