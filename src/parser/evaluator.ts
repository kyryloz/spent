import * as moment from 'moment'
import { Dispatch } from 'redux'
import { commandsActionCreator } from '../store/commands/actions'
import { Commands } from '../store/commands/interface'
import { App } from '../store/interface'
import { uuidv4 } from '../utils/math'
import { parseGrammar } from './parser'
import { runSemantic } from './semantic'

const evaluateCreate = (input: string, entityName: string, name: string): Array<App.Action> => {
  const actions: Array<App.Action> = []

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

  actions.push(action)

  return actions
}

const evaluateExpense = (
  input: string,
  categoryName: string,
  amount: number,
  accountName: string
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  actions.push(
    commandsActionCreator.addCommand<Commands.Expense>({
      commandType: Commands.CommandType.EXPENSE,
      id: uuidv4(),
      timestamp: moment().unix(),
      raw: input,
      data: {
        categoryName,
        accountName,
        amount,
      },
    })
  )

  return actions
}

const evaluateIncome = (input: string, accountName: string, amount: number): Array<App.Action> => {
  const actions: Array<App.Action> = []

  actions.push(
    commandsActionCreator.addCommand<Commands.Income>({
      commandType: Commands.CommandType.INCOME,
      id: uuidv4(),
      timestamp: moment().unix(),
      raw: input,
      data: {
        accountName,
        amount,
      },
    })
  )

  return actions
}

const evaluateStatus = (input: string, what: string): Array<App.Action> => {
  const actions: Array<App.Action> = []

  actions.push(
    commandsActionCreator.addCommand<Commands.Status>({
      commandType: Commands.CommandType.STATUS,
      id: uuidv4(),
      timestamp: moment().unix(),
      raw: input,
      data: {
        what,
      },
    })
  )

  return actions
}

export const evaluate = (input: string, dispatch: Dispatch) => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    console.error(parseResult.error)
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
