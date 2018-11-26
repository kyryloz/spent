import * as moment from 'moment'
import { parseGrammar } from 'parser/parser'
import { runSemantic } from 'parser/semantic'
import { Dispatch, Store } from 'redux'
import { accountsSelector } from 'store/accounts/selectors'
import { categoriesSelector } from 'store/categories/selectors'
import { commandsActionCreator } from 'store/commands/actions'
import { Commands } from 'store/commands/interface'
import { commandsSelector } from 'store/commands/selectors'
import { App } from 'store/interface'
import { uuidv4 } from 'utils/mathUtils'
import { capitalizeFirstLetter } from 'utils/stringUtils'

export const evaluatorMiddleware = (store: Store<App.State, App.Action>) => (
  next: Dispatch<App.Action>
) => (action: App.Action) => {
  if (action.type === Commands.ActionTypes.COMMAND_EVALUATE) {
    evaluate(action.payload.input, next, store.getState())
  } else {
    next(action)
  }
}

const evaluate = (input: string, dispatch: Dispatch<App.Action>, state: App.State) => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    let human = 'Unknown error'
    if (parseResult.match.shortMessage) {
      human = parseResult.match.shortMessage.split(':')[1].trim()
      human = capitalizeFirstLetter(human)
    }

    dispatch(commandsActionCreator.error({ human }))
    return
  }

  runSemantic(parseResult.match, {
    create: (entityName, name) => {
      dispatch(evaluateCreate(state, input, entityName, name))
    },
    expense: (category, amount, fromAccount) => {
      dispatch(evaluateExpense(state, input, category, amount, fromAccount))
    },
    income: (accountName, amount) => {
      dispatch(evaluateIncome(state, input, accountName, amount))
    },
    status: what => {
      dispatch(evaluateStatus(input, what))
    },
    remove: (entity, name) => {
      evaluateRemove(state, input, entity, name).forEach(dispatch)
    },
    rename: (entity, oldName, newName) => {
      dispatch(evaluateRename(state, input, entity, oldName, newName))
    },
  })
}

const evaluateCreate = (
  state: App.State,
  input: string,
  entityName: string,
  name: string
): App.Action => {
  let action: App.Action

  switch (entityName) {
    case 'account':
      const account = accountsSelector.findByName(name)(state)

      if (account) {
        action = commandsActionCreator.error({ human: `Account '${name}' is already existed` })
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
      const category = categoriesSelector.findByName(name)(state)

      if (category) {
        action = commandsActionCreator.error({ human: `Category '${name}' is already existed` })
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
  state: App.State,
  input: string,
  categoryName: string,
  amount: number,
  accountName: string
): App.Action => {
  const category = categoriesSelector.findByName(categoryName)(state)
  const categoryId = category && category.id

  const account = accountsSelector.findByName(accountName)(state)
  const accountId = account && account.id

  if (!categoryId) {
    return commandsActionCreator.error({ human: `Category '${categoryName}' not found` })
  }

  if (!accountId) {
    return commandsActionCreator.error({ human: `Account '${accountName}' not found` })
  }

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
  state: App.State,
  input: string,
  accountName: string,
  amount: number
): App.Action => {
  const account = accountsSelector.findByName(accountName)(state)
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
  let entity
  switch (what) {
    case 'categories':
      entity = Commands.Entity.CATEGORY
      break
    case 'accounts':
      entity = Commands.Entity.ACCOUNT
      break
    default:
      throw new Error(`Unknown entity: ${what}`)
  }

  return commandsActionCreator.addStatusCommand({
    id: uuidv4(),
    timestamp: moment().unix(),
    raw: input,
    data: {
      dataType: Commands.DataType.STATUS,
      entity,
    },
  })
}

const evaluateRename = (
  state: App.State,
  input: string,
  entity: string,
  oldName: string,
  newName: string
): App.Action => {
  let action: App.Action

  switch (entity) {
    case 'account': {
      const account = accountsSelector.findByName(oldName)(state)

      if (!account) {
        action = commandsActionCreator.error({ human: `You do not have '${oldName}' account` })
      } else {
        action = commandsActionCreator.addRenameEntityCommand({
          id: uuidv4(),
          timestamp: moment().unix(),
          raw: input,
          data: {
            dataType: Commands.DataType.RENAME_ENTITY,
            entity: Commands.Entity.ACCOUNT,
            entityId: account.id,
            entityOldName: oldName,
            entityNewName: newName,
          },
        })
      }
      break
    }
    case 'category': {
      const category = categoriesSelector.findByName(oldName)(state)

      if (!category) {
        action = commandsActionCreator.error({ human: `You do not have '${oldName}' category` })
      } else {
        action = commandsActionCreator.addRenameEntityCommand({
          id: uuidv4(),
          timestamp: moment().unix(),
          raw: input,
          data: {
            dataType: Commands.DataType.RENAME_ENTITY,
            entity: Commands.Entity.CATEGORY,
            entityId: category.id,
            entityOldName: oldName,
            entityNewName: newName,
          },
        })
      }
      break
    }
    default: {
      throw new Error(`Unknown entity name: '${entity}'`)
    }
  }

  return action
}

const evaluateRemove = (
  state: App.State,
  input: string,
  entity: string,
  name: string
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  switch (entity) {
    case 'account':
      const account = accountsSelector.findByName(name)(state)

      if (!account) {
        actions.push(commandsActionCreator.error({ human: `You do not have '${name}' account` }))
      } else {
        actions.push(...account.commandIds.map(id => commandsActionCreator.remove({ id })))
        actions.push(
          commandsActionCreator.addDeleteEntityCommand({
            id: uuidv4(),
            timestamp: moment().unix(),
            raw: input,
            data: {
              dataType: Commands.DataType.DELETE_ENTITY,
              entity: Commands.Entity.ACCOUNT,
              entityId: account.id,
              entityName: name,
            },
          })
        )
      }
      break
    case 'category':
      const category = categoriesSelector.findByName(name)(state)

      if (!category) {
        actions.push(commandsActionCreator.error({ human: `You do not have '${name}' category` }))
      } else {
        actions.push(...category.commandIds.map(id => commandsActionCreator.remove({ id })))
        actions.push(
          commandsActionCreator.addDeleteEntityCommand({
            id: uuidv4(),
            timestamp: moment().unix(),
            raw: input,
            data: {
              dataType: Commands.DataType.DELETE_ENTITY,
              entity: Commands.Entity.CATEGORY,
              entityId: category.id,
              entityName: name,
            },
          })
        )
      }
      break
    case 'transaction':
      const command = commandsSelector.findById(name)(state)

      if (!command) {
        actions.push(
          commandsActionCreator.error({ human: `Can't find a transaction with id '${name}'` })
        )
      } else {
        actions.push(commandsActionCreator.remove(command))
      }
      break
    default:
      throw new Error(`Unknown entity name: '${entity}'`)
  }

  return actions
}
