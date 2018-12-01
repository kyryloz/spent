import { parseGrammar } from 'parser/parser'
import { runSemantic } from 'parser/semantic'
import { Dispatch, Middleware } from 'redux'
import { accountsSelector } from 'store/model/accounts/selectors'
import { categoriesSelector } from 'store/model/categories/selectors'
import { CommandsActionCreator, CommandsActionTypes } from 'store/model/commands/actions'
import { Commands } from 'store/model/commands/interface'
import { commandsSelector } from 'store/model/commands/selectors'
import { App } from 'store/interface'
import { smartInputSelector } from 'store/model/ui/smartInput/selectors'
import { capitalizeFirstLetter } from 'utils/stringUtils'
import { EvaluationActionCreators } from 'store/evaluation/actions';

export const evaluationMiddleware: Middleware<
  {},
  App.State,
  Dispatch<App.Action>
> = store => next => action => {
  if (action.type === CommandsActionTypes.EVALUATE) {
    const state = store.getState()
    const input = smartInputSelector.input(state)

    evaluate(input, next, state)
  } else {
    next(action)
  }
}

const evaluate = (input: string, dispatch: Dispatch<App.Action>, state: App.State) => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    let message = 'Unknown error'
    if (parseResult.match.shortMessage) {
      message = parseResult.match.shortMessage.split(':')[1].trim()
      message = capitalizeFirstLetter(message)
    }

    dispatch(CommandsActionCreator.error(message))
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
        action = CommandsActionCreator.error(`Account '${name}' is already existed`)
      } else {
        action = EvaluationActionCreators.createAccount(input, name)
      }
      break
    case 'category':
      const category = categoriesSelector.findByName(name)(state)

      if (category) {
        action = CommandsActionCreator.error(`Category '${name}' is already existed`)
      } else {
        action = EvaluationActionCreators.createCategory(input, name)
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
    return CommandsActionCreator.error(`Category '${categoryName}' not found`)
  }

  if (!accountId) {
    return CommandsActionCreator.error(`Account '${accountName}' not found`)
  }

  return EvaluationActionCreators.expense(input, {
    categoryId,
    accountId,
    amount,
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

  return EvaluationActionCreators.income(input, {
    accountId,
    amount,
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

  return EvaluationActionCreators.status(input, { entity })
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
        action = CommandsActionCreator.error(`You do not have '${oldName}' account`)
      } else {
        action = EvaluationActionCreators.renameEntity(input, {
          entity: Commands.Entity.ACCOUNT,
          entityId: account.id,
          entityOldName: oldName,
          entityNewName: newName,
        })
      }
      break
    }
    case 'category': {
      const category = categoriesSelector.findByName(oldName)(state)

      if (!category) {
        action = CommandsActionCreator.error(`You do not have '${oldName}' category`)
      } else {
        action = EvaluationActionCreators.renameEntity(input, {
          entity: Commands.Entity.CATEGORY,
          entityId: category.id,
          entityOldName: oldName,
          entityNewName: newName,
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
        actions.push(CommandsActionCreator.error(`You do not have '${name}' account`))
      } else {
        actions.push(...account.commandIds.map(id => CommandsActionCreator.removeCommand(id)))
        actions.push(
          EvaluationActionCreators.deleteEntity(input, {
            entity: Commands.Entity.ACCOUNT,
            entityId: account.id,
            entityName: name,
          })
        )
      }
      break
    case 'category':
      const category = categoriesSelector.findByName(name)(state)

      if (!category) {
        actions.push(CommandsActionCreator.error(`You do not have '${name}' category`))
      } else {
        actions.push(...category.commandIds.map(id => CommandsActionCreator.removeCommand(id)))
        actions.push(
          EvaluationActionCreators.deleteEntity(input, {
            entity: Commands.Entity.CATEGORY,
            entityId: category.id,
            entityName: name,
          })
        )
      }
      break
    case 'transaction':
      const command = commandsSelector.findById(name)(state)

      if (!command) {
        actions.push(CommandsActionCreator.error(`Can't find a transaction with id '${name}'`))
      } else {
        actions.push(CommandsActionCreator.removeCommand(command.id))
      }
      break
    default:
      throw new Error(`Unknown entity name: '${entity}'`)
  }

  return actions
}
