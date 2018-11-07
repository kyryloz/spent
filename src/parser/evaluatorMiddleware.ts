import * as moment from 'moment'
import { Dispatch, Store } from 'redux'
import { commandsActionCreator } from '../store/commands/actions'
import { Commands } from '../store/commands/interface'
import { App } from '../store/interface'
import { uuidv4 } from '../utils/math'
import { parseGrammar } from './parser'
import { runSemantic } from './semantic'

const evaluateCreate = (input: string, entityName: string, name: string): App.Action => {
  let action: Commands.Action

  switch (entityName) {
    case 'account':
      action = commandsActionCreator.addCommand<Commands.CreateAccount>({
        commandType: Commands.CommandType.CREATE_ACCOUNT,
        id: uuidv4(),
        timestamp: moment().unix(),
        raw: input,
        data: {
          name,
        },
      })
      break
    case 'category':
      action = commandsActionCreator.addCommand<Commands.CreateCategory>({
        commandType: Commands.CommandType.CREATE_CATEGORY,
        id: uuidv4(),
        timestamp: moment().unix(),
        raw: input,
        data: {
          name,
        },
      })
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
  const category = getState().categories.items.find(c => c.name === categoryName)
  const categoryId = category ? category.id : 'not found'

  const account = getState().accounts.items.find(a => a.name === accountName)
  const accountId = account ? account.id : 'not found'

  return commandsActionCreator.expenseCommand({
    id: uuidv4(),
    timestamp: moment().unix(),
    raw: input,
    data: {
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
  const account = getState().accounts.items.find(a => a.name === accountName)
  const accountId = account ? account.id : 'not found'

  return commandsActionCreator.addCommand<Commands.Income>({
    commandType: Commands.CommandType.INCOME,
    id: uuidv4(),
    timestamp: moment().unix(),
    raw: input,
    data: {
      accountId,
      amount,
    },
  })
}

const evaluateStatus = (input: string, what: string): App.Action => {
  return commandsActionCreator.addCommand<Commands.Status>({
    commandType: Commands.CommandType.STATUS,
    id: uuidv4(),
    timestamp: moment().unix(),
    raw: input,
    data: {
      what,
    },
  })
}

const evaluate = (input: string, { dispatch, getState }: Store<App.State, App.Action>) => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    console.error(parseResult.error)
    return
  }

  runSemantic(parseResult.match, {
    create: (entityName, name) => {
      dispatch(evaluateCreate(input, entityName, name))
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
