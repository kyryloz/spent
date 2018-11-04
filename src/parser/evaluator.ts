import { Dispatch } from 'redux'
import { accountsActionCreator } from '../store/accounts/actions'
import { categoriesActionCreator } from '../store/categories/actions'
import { App } from '../store/interface'
import { transactionsActionCreator } from '../store/transactions/actions'
import { Transactions } from '../store/transactions/interface'
import { parseGrammar } from './parser'
import { runSemantic } from './semantic'

const evaluateCreate = (
  input: string,
  entityName: string,
  name: string
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  let entity: Transactions.Entity
  let entityAction: App.Action
  switch (entityName) {
    case 'account':
      entity = Transactions.Entity.ACCOUNT
      entityAction = accountsActionCreator.addAccount(name, 0)
      break
    case 'category':
      entity = Transactions.Entity.CATEGORY
      entityAction = categoriesActionCreator.addCategory(name)
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

  actions.push(entityAction)

  return actions
}

const evaluateExpense = (
  input: string,
  category: string,
  amount: number,
  fromAccount: string
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  actions.push(
    transactionsActionCreator.addTransaction<Transactions.Expense>(input, {
      transactionType: Transactions.TransactionType.EXPENSE,
      category,
      amount,
      fromAccount,
    })
  )
  actions.push(accountsActionCreator.changeBalance(fromAccount, -amount))

  return actions
}

const evaluateIncome = (
  input: string,
  accountName: string,
  amount: number
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  actions.push(
    transactionsActionCreator.addTransaction<Transactions.Income>(input, {
      transactionType: Transactions.TransactionType.INCOME,
      accountName,
      amount,
    })
  )
  actions.push(accountsActionCreator.changeBalance(accountName, amount))

  return actions
}

const evaluateStatus = (input: string, what: string): Array<App.Action> => {
  const actions: Array<App.Action> = []

  actions.push(
    transactionsActionCreator.addTransaction<Transactions.Status>(input, {
      transactionType: Transactions.TransactionType.STATUS,
      what,
    })
  )

  return actions
}

export const evaluate = (input: string, dispatch: Dispatch) => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    dispatch(transactionsActionCreator.errorTransaction(parseResult.message || 'unknown error'))
    return
  }

  runSemantic(parseResult.match, {
    create: (entityName, name) => evaluateCreate(input, entityName, name).forEach(a => dispatch(a)),
    expense: (category, amount, fromAccount) =>
      evaluateExpense(input, category, amount, fromAccount).forEach(a => dispatch(a)),
    income: (accountName, amount) =>
      evaluateIncome(input, accountName, amount).forEach(a => dispatch(a)),
    status: what => evaluateStatus(input, what).forEach(a => dispatch(a)),
  })
}
