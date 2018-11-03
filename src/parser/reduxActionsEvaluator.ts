import { accountsActionCreator } from '../store/accounts/actions'
import { categoriesActionCreator } from '../store/categories/actions'
import { Application } from '../store/interface'
import { transactionsActionCreator } from '../store/transactions/actions'
import { Transactions } from '../store/transactions/interface'
import { parseGrammar } from './parser'
import { evaluateAction } from './semantic'

export const getActions = (input: string): Array<Application.Action> => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    return [transactionsActionCreator.errorTransaction(parseResult.message || 'unknown error')]
  }

  const actions: Array<Application.Action<any, any>> = []

  evaluateAction(parseResult.match, {
    create: (entityName, name) => {
      let entity: Transactions.Entity
      switch (entityName) {
        case 'account':
          entity = Transactions.Entity.ACCOUNT
          actions.push(accountsActionCreator.addAccount(name, 0))
          break
        case 'category':
          entity = Transactions.Entity.CATEGORY
          actions.push(categoriesActionCreator.addCategory(name))
          break
        default:
          throw new Error(`Unknown entity name: '${entityName}'`)
      }

      actions.push(
        transactionsActionCreator.addTransaction<Transactions.Create>(input, {
          transactionType: Transactions.TransactionType.CREATE,
          entity,
          name,
        })
      )
    },
    expense: (category, amount, fromAccount) => {
      actions.push(
        transactionsActionCreator.addTransaction<Transactions.Expense>(input, {
          transactionType: Transactions.TransactionType.EXPENSE,
          category,
          amount,
          fromAccount,
        })
      )
      actions.push(accountsActionCreator.changeBalance(fromAccount, -amount))
    },
    income: (accountName, amount) => {
      actions.push(
        transactionsActionCreator.addTransaction<Transactions.Income>(input, {
          transactionType: Transactions.TransactionType.INCOME,
          accountName,
          amount,
        })
      )
      actions.push(accountsActionCreator.changeBalance(accountName, amount))
    },
    status: what => {
      actions.push(
        transactionsActionCreator.addTransaction<Transactions.Status>(input, {
          transactionType: Transactions.TransactionType.STATUS,
          what,
        })
      )
    },
  })

  return actions
}
