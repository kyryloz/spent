import * as moment from 'moment'
import { Dispatch, Store } from 'redux'
import { accountsSelector } from '../store/accounts/selectors'
import { categoriesSelector } from '../store/categories/selectors'
import { commandsActionCreator } from '../store/commands/actions'
import { Commands } from '../store/commands/interface'
import { App } from '../store/interface'
import { uuidv4 } from '../utils/math'
import { parseGrammar } from './parser'
import { runSemantic } from './semantic'

const evaluateCreate = (
  getState: () => App.State,
  input: string,
  entityName: string,
  name: string
): App.Action => {
  let action: App.Action

  switch (entityName) {
    case 'account':
      const account = accountsSelector.findByName(name)(getState())
      console.log(account)

      if (account) {
        action = {
          type: '@@evaluate/ERROR',
          payload: {
            error: `Account '${name}' is already existed`,
          }
        }
      } else {
        action = commandsActionCreator.addCreateAccountCommand({
          id: uuidv4(),
          timestamp: moment().unix(),
          raw: input,
          data: {
            dataType: Commands.DataType.CREATE_ACCOUNT,
            id: uuidv4(),
            name,
          },
        })
      }
      break
    case 'category':
      const category = categoriesSelector.findCategoryByName(name)(getState())

      if (category) {
        action = {
          type: '@@evaluate/ERROR',
          payload: {
            error: `Category '${name}' is already existed`,
          }
        }
      } else {
        action = commandsActionCreator.addCreateCategoryCommand({
          id: uuidv4(),
          timestamp: moment().unix(),
          raw: input,
          data: {
            dataType: Commands.DataType.CREATE_CATEGORY,
            id: uuidv4(),
            name,
          },
        })
      }
      break
    default:
      throw new Error(`Unknown entity name: '${entityName}'`)
  }

  return action
}

const evaluateExpense = (
  getState: () => App.State,
  input: string,
  categoryName: string,
  amount: number,
  accountName: string
): App.Action => {
  const category = categoriesSelector.findCategoryByName(categoryName)(getState())
  const categoryId = category ? category.id : 'not found'

  const account = accountsSelector.findByName(accountName)(getState())
  const accountId = account ? account.id : 'not found'

  return commandsActionCreator.addExpenseCommand({
    id: uuidv4(),
    timestamp: moment().unix(),
    raw: input,
    data: {
      dataType: Commands.DataType.EXPENSE,
      categoryId,
      accountId,
      amount,
    },
  })
}

const evaluateIncome = (
  getState: () => App.State,
  input: string,
  accountName: string,
  amount: number
): App.Action => {
  const account = accountsSelector.findByName(accountName)(getState())
  const accountId = account ? account.id : 'not found'

  return commandsActionCreator.addIncomeCommand({
    id: uuidv4(),
    timestamp: moment().unix(),
    raw: input,
    data: {
      dataType: Commands.DataType.INCOME,
      accountId,
      amount,
    },
  })
}

const evaluateStatus = (input: string, what: string): App.Action => {
  return commandsActionCreator.addStatusCommand({
    id: uuidv4(),
    timestamp: moment().unix(),
    raw: input,
    data: {
      dataType: Commands.DataType.STATUS,
      what,
    },
  })
}

const evaluate = (input: string, { dispatch, getState }: Store<App.State, App.Action>) => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    dispatch({
      type: '@@evaluate/ERROR',
      payload: {
        error: parseResult.message,
      }
    })
    return
  }

  runSemantic(parseResult.match, {
    create: (entityName, name) => {
      dispatch(evaluateCreate(getState, input, entityName, name))
    },
    expense: (category, amount, fromAccount) => {
      dispatch(evaluateExpense(getState, input, category, amount, fromAccount))
    },
    income: (accountName, amount) => {
      dispatch(evaluateIncome(getState, input, accountName, amount))
    },
    status: what => {
      dispatch(evaluateStatus(input, what))
    },
  })
}

export const evaluatorMiddleware = (store: Store<App.State, App.Action>) => (
  next: Dispatch<App.Action>
) => (action: App.Action) => {
  if (action.type === Commands.ActionTypes.COMMAND_EVALUATE) {
    evaluate(action.payload.input, store)
  } else {
    next(action)
  }
}
