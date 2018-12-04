import { parseGrammar } from 'parser/parser'
import { runSemantic } from 'parser/semantic'
import { Dispatch, Middleware } from 'redux'
import { AccountSelector } from 'store/model/account/selectors'
import { CategorySelector } from 'store/model/category/selectors'
import { CommandActionCreator, CommandActionType } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'
import { CommandSelector } from 'store/model/command/selectors'
import { App } from 'store/interface'
import { SmartInputSelector } from 'store/model/ui/smartInput/selectors'
import { capitalizeFirstLetter } from 'utils/stringUtils'
import { EvaluationActionCreator } from 'store/evaluation/actions';

export const evaluationMiddleware: Middleware<
  {},
  App.State,
  Dispatch<App.Action>
> = store => next => action => {
  if (action.type === CommandActionType.EVALUATE) {
    const state = store.getState()
    const input = SmartInputSelector.input(state)

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

    dispatch(CommandActionCreator.error(message))
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
      const account = AccountSelector.findByName(name)(state)

      if (account) {
        action = CommandActionCreator.error(`Account '${name}' is already existed`)
      } else {
        action = EvaluationActionCreator.createAccount(input, name)
      }
      break
    case 'category':
      const category = CategorySelector.findByName(name)(state)

      if (category) {
        action = CommandActionCreator.error(`Category '${name}' is already existed`)
      } else {
        action = EvaluationActionCreator.createCategory(input, name)
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
  const category = CategorySelector.findByName(categoryName)(state)
  const account = AccountSelector.findByName(accountName)(state)

  if (!category) {
    return CommandActionCreator.error(`Category '${categoryName}' not found`)
  }

  if (!account) {
    return CommandActionCreator.error(`Account '${accountName}' not found`)
  }

  return EvaluationActionCreator.expense(input, {
    categoryId: category.id,
    accountId: account.id,
    amount,
  })
}

const evaluateIncome = (
  state: App.State,
  input: string,
  accountName: string,
  amount: number
): App.Action => {
  const account = AccountSelector.findByName(accountName)(state)

  if (!account) {
    return CommandActionCreator.error(`Account '${accountName}' not found`)
  }

  return EvaluationActionCreator.income(input, {
    accountId: account.id,
    amount,
  })
}

const evaluateStatus = (input: string, what: string): App.Action => {
  let entity
  switch (what) {
    case 'categories':
      entity = CommandModel.Entity.CATEGORY
      break
    case 'accounts':
      entity = CommandModel.Entity.ACCOUNT
      break
    default:
      throw new Error(`Unknown entity: ${what}`)
  }

  return EvaluationActionCreator.status(input, { entity })
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
      const account = AccountSelector.findByName(oldName)(state)

      if (!account) {
        action = CommandActionCreator.error(`You do not have '${oldName}' account`)
      } else {
        action = EvaluationActionCreator.renameEntity(input, {
          entity: CommandModel.Entity.ACCOUNT,
          entityId: account.id,
          entityOldName: oldName,
          entityNewName: newName,
        })
      }
      break
    }
    case 'category': {
      const category = CategorySelector.findByName(oldName)(state)

      if (!category) {
        action = CommandActionCreator.error(`You do not have '${oldName}' category`)
      } else {
        action = EvaluationActionCreator.renameEntity(input, {
          entity: CommandModel.Entity.CATEGORY,
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
      const account = AccountSelector.findByName(name)(state)

      if (!account) {
        actions.push(CommandActionCreator.error(`You do not have '${name}' account`))
      } else {
        actions.push(...account.commandIds.map(id => CommandActionCreator.removeCommand(id)))
        actions.push(
          EvaluationActionCreator.deleteEntity(input, {
            entity: CommandModel.Entity.ACCOUNT,
            entityId: account.id,
            entityName: name,
          })
        )
      }
      break
    case 'category':
      const category = CategorySelector.findByName(name)(state)

      if (!category) {
        actions.push(CommandActionCreator.error(`You do not have '${name}' category`))
      } else {
        actions.push(...category.commandIds.map(id => CommandActionCreator.removeCommand(id)))
        actions.push(
          EvaluationActionCreator.deleteEntity(input, {
            entity: CommandModel.Entity.CATEGORY,
            entityId: category.id,
            entityName: name,
          })
        )
      }
      break
    case 'transaction':
      const command = CommandSelector.findById(name)(state)

      if (!command) {
        actions.push(CommandActionCreator.error(`Can't find a transaction with id '${name}'`))
      } else {
        actions.push(CommandActionCreator.removeCommand(command.id))
      }
      break
    default:
      throw new Error(`Unknown entity name: '${entity}'`)
  }

  return actions
}
