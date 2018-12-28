import * as moment from 'moment'
import { parseGrammar } from 'parser/parser'
import { ExpenseSetters, IncomeSetters, runSemantic, TransferSetters } from 'parser/semantic'
import { Dispatch, Middleware } from 'redux'
import { EvaluationActionCreator } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { AccountSelector } from 'store/model/account/selectors'
import { CategorySelector } from 'store/model/category/selectors'
import { CommandActionCreator, CommandActionType } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'
import { CommandSelector } from 'store/model/command/selectors'
import { TransactionActionCreator } from 'store/model/transactions/actions'
import { SmartInputSelector } from 'store/model/ui/smartInput/selectors'
import { generateId } from 'utils/mathUtils'
import { USER_INPUT_DATE_FORMAT } from 'utils/settings'
import { capitalizeFirstLetter } from 'utils/stringUtils'

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
      evaluateExpense(state, input, category, amount, fromAccount).forEach(dispatch)
    },
    income: (accountName, amount) => {
      evaluateIncome(state, input, accountName, amount).forEach(dispatch)
    },
    transfer: (from, to, amount) => {
      dispatch(evaluateTransfer(state, input, from, to, amount))
    },
    status: what => {
      dispatch(evaluateStatus(input, what))
    },
    remove: (entity, name) => {
      dispatch(evaluateRemove(state, input, entity, name))
    },
    rename: (entity, oldName, newName) => {
      dispatch(evaluateRename(state, input, entity, oldName, newName))
    },
    updateExpense: (id, values) => {
      dispatch(evaluateUpdateExpense(state, input, id, values))
    },
    updateIncome: (id, values) => {
      dispatch(evaluateUpdateIncome(state, input, id, values))
    },
    updateTransfer: (id, values) => {
      dispatch(evaluateUpdateTransfer(state, input, id, values))
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
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  const category = CategorySelector.findByName(categoryName)(state)
  const account = AccountSelector.findByName(accountName)(state)

  if (!category) {
    actions.push(CommandActionCreator.error(`Category '${categoryName}' not found`))
    return actions
  }

  if (!account) {
    actions.push(CommandActionCreator.error(`Account '${accountName}' not found`))
    return actions
  }

  const expense = TransactionActionCreator.expense({
    id: generateId(),
    categoryId: category.id,
    accountId: account.id,
    amount,
    timestamp: moment().unix(),
  })

  actions.push(expense)
  actions.push(CommandActionCreator.addCommand(input, expense))

  return actions
}

const evaluateIncome = (
  state: App.State,
  input: string,
  accountName: string,
  amount: number
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  const account = AccountSelector.findByName(accountName)(state)

  if (!account) {
    actions.push(CommandActionCreator.error(`Account '${accountName}' not found`))
    return actions
  }

  const income = TransactionActionCreator.income({
    id: generateId(),
    accountId: account.id,
    amount,
    timestamp: moment().unix(),
  })

  actions.push(income)
  actions.push(CommandActionCreator.addCommand(input, income))

  return actions
}

const evaluateUpdateIncome = (
  state: App.State,
  input: string,
  targetCommandId: string,
  values: IncomeSetters
): App.Action => {
  let accountChangeData = undefined
  let amountChangeData = undefined
  let dateChangeData = undefined

  const command = CommandSelector.findById(targetCommandId)(
    state
  ) as CommandSelector.ExpenseHydratedData

  if (!command) {
    return CommandActionCreator.error(`Transaction with ID '${targetCommandId}' not found`)
  }

  if (values.account && values.account !== command.data.account.name) {
    const newAccount = AccountSelector.findByName(values.account)(state)

    if (!newAccount) {
      return CommandActionCreator.error(`Account '${values.account}' not found`)
    }

    accountChangeData = {
      oldAccountId: command.data.account.id,
      newAccountId: newAccount.id,
    }
  }

  if (values.amount && values.amount !== command.data.amount) {
    amountChangeData = {
      oldAmount: command.data.amount,
      newAmount: values.amount,
    }
  }

  if (values.date) {
    const newDate = moment(values.date, USER_INPUT_DATE_FORMAT)

    if (newDate.isValid()) {
      if (newDate !== moment(command.data.date)) {
        dateChangeData = {
          oldDate: moment(command.data.date).format(USER_INPUT_DATE_FORMAT),
          newDate: values.date,
        }
      }
    } else {
      return CommandActionCreator.error(
        `Date '${values.date}' is invalid. Valid format is '${USER_INPUT_DATE_FORMAT}'`
      )
    }
  }

  return EvaluationActionCreator.updateIncome(input, {
    targetCommandId,
    accountChangeData,
    amountChangeData,
    dateChangeData,
  })
}

const evaluateUpdateExpense = (
  state: App.State,
  input: string,
  targetCommandId: string,
  values: ExpenseSetters
): App.Action => {
  let accountChangeData = undefined
  let categoryChangeData = undefined
  let amountChangeData = undefined
  let dateChangeData = undefined

  const command = CommandSelector.findById(targetCommandId)(
    state
  ) as CommandSelector.ExpenseHydratedData

  if (!command) {
    return CommandActionCreator.error(`Transaction with ID '${targetCommandId}' not found`)
  }

  if (values.account && values.account !== command.data.account.name) {
    const newAccount = AccountSelector.findByName(values.account)(state)

    if (!newAccount) {
      return CommandActionCreator.error(`Account '${values.account}' not found`)
    }

    accountChangeData = {
      oldAccountId: command.data.account.id,
      newAccountId: newAccount.id,
    }
  }

  if (values.category && values.category !== command.data.category.name) {
    const newCategory = CategorySelector.findByName(values.category)(state)

    if (!newCategory) {
      return CommandActionCreator.error(`Category '${values.category}' not found`)
    }

    categoryChangeData = {
      oldCategoryId: command.data.category.id,
      newCategoryId: newCategory.id,
    }
  }

  if (values.amount && values.amount !== command.data.amount) {
    amountChangeData = {
      oldAmount: command.data.amount,
      newAmount: values.amount,
    }
  }

  if (values.date) {
    const newDate = moment(values.date, USER_INPUT_DATE_FORMAT)

    if (newDate.isValid()) {
      if (newDate !== moment(command.data.date)) {
        dateChangeData = {
          oldDate: moment(command.data.date).format(USER_INPUT_DATE_FORMAT),
          newDate: values.date,
        }
      }
    } else {
      return CommandActionCreator.error(
        `Date '${values.date}' is invalid. Valid format is '${USER_INPUT_DATE_FORMAT}'`
      )
    }
  }

  return EvaluationActionCreator.updateExpense(input, {
    targetCommandId,
    accountChangeData,
    categoryChangeData,
    amountChangeData,
    dateChangeData,
  })
}

const evaluateUpdateTransfer = (
  state: App.State,
  input: string,
  targetCommandId: string,
  values: TransferSetters
): App.Action => {
  let accountFromChangeData = undefined
  let accountToChangeData = undefined
  let amountChangeData = undefined
  let dateChangeData = undefined

  const command = CommandSelector.findById(targetCommandId)(
    state
  ) as CommandSelector.TransferHydratedData

  if (!command) {
    return CommandActionCreator.error(`Transaction with ID '${targetCommandId}' not found`)
  }

  if (values.from && values.from !== command.data.accountFrom.name) {
    const newAccount = AccountSelector.findByName(values.from)(state)

    if (!newAccount) {
      return CommandActionCreator.error(`Account '${values.from}' not found`)
    }

    accountFromChangeData = {
      oldAccountId: command.data.accountFrom.id,
      newAccountId: newAccount.id,
    }
  }

  if (values.to && values.to !== command.data.accountTo.name) {
    const newAccount = AccountSelector.findByName(values.to)(state)

    if (!newAccount) {
      return CommandActionCreator.error(`Account '${values.to}' not found`)
    }

    accountToChangeData = {
      oldAccountId: command.data.accountTo.id,
      newAccountId: newAccount.id,
    }
  }

  if (values.amount && values.amount !== command.data.amount) {
    amountChangeData = {
      oldAmount: command.data.amount,
      newAmount: values.amount,
    }
  }

  if (values.date) {
    const newDate = moment(values.date, USER_INPUT_DATE_FORMAT)

    if (newDate.isValid()) {
      if (newDate !== moment(command.data.date)) {
        dateChangeData = {
          oldDate: moment(command.data.date).format(USER_INPUT_DATE_FORMAT),
          newDate: values.date,
        }
      }
    } else {
      return CommandActionCreator.error(
        `Date '${values.date}' is invalid. Valid format is '${USER_INPUT_DATE_FORMAT}'`
      )
    }
  }

  return EvaluationActionCreator.updateTransfer(input, {
    targetCommandId,
    accountFromChangeData,
    accountToChangeData,
    amountChangeData,
    dateChangeData,
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
): App.Action => {
  let action: App.Action

  switch (entity) {
    case 'account':
      const account = AccountSelector.findByName(name)(state)

      if (!account) {
        action = CommandActionCreator.error(`You do not have '${name}' account`)
      } else {
        action = EvaluationActionCreator.deleteAccount(input, account)
      }
      break
    case 'category':
      const category = CategorySelector.findByName(name)(state)

      if (!category) {
        action = CommandActionCreator.error(`You do not have '${name}' category`)
      } else {
        action = EvaluationActionCreator.deleteCategory(input, category)
      }
      break
    case 'transaction':
      const command = CommandSelector.findById(name)(state)

      if (!command) {
        action = CommandActionCreator.error(`Can't find a transaction with id '${name}'`)
      } else {
        action = EvaluationActionCreator.deleteTransaction(input, command.id)
      }
      break
    default:
      throw new Error(`Unknown entity name: '${entity}'`)
  }

  return action
}

const evaluateTransfer = (
  state: App.State,
  input: string,
  fromAccountName: string,
  toAccountName: string,
  amount: number
) => {
  const fromAccount = AccountSelector.findByName(fromAccountName)(state)

  if (!fromAccount) {
    return CommandActionCreator.error(`Account '${fromAccountName}' not found`)
  }

  const toAccount = AccountSelector.findByName(toAccountName)(state)

  if (!toAccount) {
    return CommandActionCreator.error(`Account '${toAccountName}' not found`)
  }

  return EvaluationActionCreator.transfer(input, {
    accountFromId: fromAccount.id,
    accountToId: toAccount.id,
    amount,
    date: moment().toISOString(),
  })
}
