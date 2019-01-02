import * as moment from 'moment'
import { parseGrammar } from 'parser/parser'
import { ExpenseSetters, IncomeSetters, runSemantic, TransferSetters } from 'parser/semantic'
import { Dispatch, Middleware } from 'redux'
import { EvaluationActionCreator, EvaluationActionType } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { AccountActionCreator } from 'store/model/account/actions'
import { AccountSelector } from 'store/model/account/selectors'
import { CategoryActionCreator } from 'store/model/category/actions'
import { CategorySelector } from 'store/model/category/selectors'
import { CliModel } from 'store/model/cli/interface'
import { TransactionActionCreator } from 'store/model/transactions/actions'
import { TransactionSelector } from 'store/model/transactions/selectors'
import { SmartInputActionCreator } from 'store/model/ui/cliInput/actions'
import { SmartInputSelector } from 'store/model/ui/cliInput/selectors'
import { generateId } from 'utils/mathUtils'
import { USER_INPUT_DATE_FORMAT } from 'utils/settings'
import { capitalizeFirstLetter } from 'utils/stringUtils'

export const evaluationMiddleware: Middleware<
  {},
  App.State,
  Dispatch<App.Action>
> = store => next => action => {
  if (action.type === EvaluationActionType.EVALUATE) {
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

    // dispatch(CliActionCreator.error(message))
    return
  }

  runSemantic(parseResult.match, {
    create: (entityName, name) => {
      evaluateCreate(state, input, entityName, name).forEach(dispatch)
    },
    expense: (category, amount, fromAccount) => {
      evaluateExpense(state, input, category, amount, fromAccount).forEach(dispatch)
    },
    income: (accountName, amount) => {
      evaluateIncome(state, input, accountName, amount).forEach(dispatch)
    },
    transfer: (from, to, amount) => {
      evaluateTransfer(state, input, from, to, amount).forEach(dispatch)
    },
    status: what => {
      evaluateStatus(input, what).forEach(dispatch)
    },
    remove: (entity, name) => {
      evaluateRemove(state, input, entity, name).forEach(dispatch)
    },
    rename: (entity, oldName, newName) => {
      evaluateRename(state, input, entity, oldName, newName).forEach(dispatch)
    },
    updateExpense: (id, values) => {
      evaluateUpdateExpense(state, input, id, values).forEach(dispatch)
    },
    updateIncome: (id, values) => {
      evaluateUpdateIncome(state, input, id, values).forEach(dispatch)
    },
    updateTransfer: (id, values) => {
      evaluateUpdateTransfer(state, input, id, values).forEach(dispatch)
    },
  })
}

const evaluateCreate = (
  state: App.State,
  input: string,
  entityName: string,
  name: string
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  switch (entityName) {
    case 'account':
      const account = AccountSelector.findByName(name)(state)

      if (account) {
        actions.push(SmartInputActionCreator.error(`Account '${name}' is already existed`))
        return actions
      } else {
        const createAccount = AccountActionCreator.create(name)
        actions.push(createAccount)
        return actions
      }
    case 'category':
      const category = CategorySelector.findByName(name)(state)

      if (category) {
        actions.push(SmartInputActionCreator.error(`Category '${name}' is already existed`))
        return actions
      } else {
        const createCategory = CategoryActionCreator.create(name)
        actions.push(createCategory)
        return actions
      }
    default:
      throw new Error(`Unknown entity name: '${entityName}'`)
  }
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
    actions.push(SmartInputActionCreator.error(`Category '${categoryName}' not found`))
    return actions
  }

  if (!account) {
    actions.push(SmartInputActionCreator.error(`Account '${accountName}' not found`))
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
    actions.push(SmartInputActionCreator.error(`Account '${accountName}' not found`))
    return actions
  }

  const income = TransactionActionCreator.income({
    id: generateId(),
    accountId: account.id,
    amount,
    timestamp: moment().unix(),
  })

  actions.push(income)

  return actions
}

const evaluateUpdateIncome = (
  state: App.State,
  input: string,
  targetCommandId: string,
  values: IncomeSetters
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  let accountChangeData = undefined
  let amountChangeData = undefined
  let dateChangeData = undefined

  const income = TransactionSelector.incomeById(targetCommandId)(state)

  if (!income) {
    actions.push(SmartInputActionCreator.error(`Income with ID '${targetCommandId}' not found`))
    return actions
  }

  if (values.account && values.account !== income.account.name) {
    const newAccount = AccountSelector.findByName(values.account)(state)

    if (!newAccount) {
      actions.push(SmartInputActionCreator.error(`Account '${values.account}' not found`))
      return actions
    }

    accountChangeData = {
      oldAccountId: income.account.id,
      newAccountId: newAccount.id,
    }
  }

  if (values.amount && values.amount !== income.amount) {
    amountChangeData = {
      oldAmount: income.amount,
      newAmount: values.amount,
    }
  }

  if (values.date) {
    const newDate = moment(values.date, USER_INPUT_DATE_FORMAT)

    if (newDate.isValid()) {
      if (newDate !== moment.unix(income.timestamp)) {
        dateChangeData = {
          oldDate: moment.unix(income.timestamp).format(USER_INPUT_DATE_FORMAT),
          newDate: values.date,
        }
      }
    } else {
      actions.push(
        SmartInputActionCreator.error(
          `Date '${values.date}' is invalid. Valid format is '${USER_INPUT_DATE_FORMAT}'`
        )
      )
      return actions
    }
  }

  const updateIncome = TransactionActionCreator.updateIncome({
    id: targetCommandId,
    accountId: accountChangeData && accountChangeData.newAccountId,
    amount: amountChangeData && amountChangeData.newAmount,
    timestamp: dateChangeData && moment(dateChangeData.newDate, USER_INPUT_DATE_FORMAT).unix(),
  })

  actions.push(updateIncome)

  return actions
}

const evaluateUpdateExpense = (
  state: App.State,
  input: string,
  expenseId: string,
  values: ExpenseSetters
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  let accountChangeData = undefined
  let categoryChangeData = undefined
  let amountChangeData = undefined
  let dateChangeData = undefined

  const expense = TransactionSelector.expenseById(expenseId)(state)

  if (!expense) {
    actions.push(SmartInputActionCreator.error(`Expense with ID '${expenseId}' not found`))
    return actions
  }

  if (values.account && values.account !== expense.account.name) {
    const newAccount = AccountSelector.findByName(values.account)(state)

    if (!newAccount) {
      actions.push(SmartInputActionCreator.error(`Account '${values.account}' not found`))
      return actions
    }

    accountChangeData = {
      oldAccountId: expense.account.id,
      newAccountId: newAccount.id,
    }
  }

  if (values.category && values.category !== expense.category.name) {
    const newCategory = CategorySelector.findByName(values.category)(state)

    if (!newCategory) {
      actions.push(SmartInputActionCreator.error(`Category '${values.category}' not found`))
      return actions
    }

    categoryChangeData = {
      oldCategoryId: expense.category.id,
      newCategoryId: newCategory.id,
    }
  }

  if (values.amount && values.amount !== expense.amount) {
    amountChangeData = {
      oldAmount: expense.amount,
      newAmount: values.amount,
    }
  }

  if (values.date) {
    const newDate = moment(values.date, USER_INPUT_DATE_FORMAT)

    if (newDate.isValid()) {
      if (newDate !== moment.unix(expense.timestamp)) {
        dateChangeData = {
          oldDate: moment.unix(expense.timestamp).format(USER_INPUT_DATE_FORMAT),
          newDate: values.date,
        }
      }
    } else {
      actions.push(
        SmartInputActionCreator.error(
          `Date '${values.date}' is invalid. Valid format is '${USER_INPUT_DATE_FORMAT}'`
        )
      )
      return actions
    }
  }

  const updateExpense = TransactionActionCreator.updateExpense({
    id: expenseId,
    accountId: accountChangeData && accountChangeData.newAccountId,
    categoryId: categoryChangeData && categoryChangeData.newCategoryId,
    amount: amountChangeData && amountChangeData.newAmount,
    timestamp: dateChangeData && moment(dateChangeData.newDate, USER_INPUT_DATE_FORMAT).unix(),
  })

  actions.push(updateExpense)

  return actions
}

const evaluateUpdateTransfer = (
  state: App.State,
  input: string,
  targetCommandId: string,
  values: TransferSetters
): Array<App.Action> => {
  const actions: Array<App.Action> = []

  let accountFromChangeData = undefined
  let accountToChangeData = undefined
  let amountChangeData = undefined
  let dateChangeData = undefined

  const transfer = TransactionSelector.transferById(targetCommandId)(state)

  if (!transfer) {
    actions.push(SmartInputActionCreator.error(`Transfer with ID '${targetCommandId}' not found`))
    return actions
  }

  if (values.from && values.from !== transfer.fromAccount.name) {
    const newAccount = AccountSelector.findByName(values.from)(state)

    if (!newAccount) {
      actions.push(SmartInputActionCreator.error(`Account '${values.from}' not found`))
      return actions
    }

    accountFromChangeData = {
      oldAccountId: transfer.fromAccount.id,
      newAccountId: newAccount.id,
    }
  }

  if (values.to && values.to !== transfer.toAccount.name) {
    const newAccount = AccountSelector.findByName(values.to)(state)

    if (!newAccount) {
      actions.push(SmartInputActionCreator.error(`Account '${values.to}' not found`))
      return actions
    }

    accountToChangeData = {
      oldAccountId: transfer.toAccount.id,
      newAccountId: newAccount.id,
    }
  }

  if (values.amount && values.amount !== transfer.amount) {
    amountChangeData = {
      oldAmount: transfer.amount,
      newAmount: values.amount,
    }
  }

  if (values.date) {
    const newDate = moment(values.date, USER_INPUT_DATE_FORMAT)

    if (newDate.isValid()) {
      if (newDate !== moment.unix(transfer.timestamp)) {
        dateChangeData = {
          oldDate: moment.unix(transfer.timestamp).format(USER_INPUT_DATE_FORMAT),
          newDate: values.date,
        }
      }
    } else {
      actions.push(
        SmartInputActionCreator.error(
          `Date '${values.date}' is invalid. Valid format is '${USER_INPUT_DATE_FORMAT}'`
        )
      )
      return actions
    }
  }

  const updateTransfer = TransactionActionCreator.updateTransfer({
    id: targetCommandId,
    fromAccountId: accountFromChangeData && accountFromChangeData.newAccountId,
    toAccountId: accountToChangeData && accountToChangeData.newAccountId,
    amount: amountChangeData && amountChangeData.newAmount,
    timestamp: dateChangeData && moment(dateChangeData.newDate, USER_INPUT_DATE_FORMAT).unix(),
  })

  actions.push(updateTransfer)

  return actions
}

const evaluateStatus = (input: string, what: string): Array<App.Action> => {
  const actions: Array<App.Action> = []

  let entity
  switch (what) {
    case 'categories':
      entity = CliModel.Entity.CATEGORY
      break
    case 'accounts':
      entity = CliModel.Entity.ACCOUNT
      break
    default:
      throw new Error(`Unknown entity: ${what}`)
  }

  const status = EvaluationActionCreator.status(entity)

  actions.push(status)

  return actions
}

const evaluateRename = (
  state: App.State,
  input: string,
  entity: string,
  oldName: string,
  newName: string
) => {
  const actions: Array<App.Action> = []

  switch (entity) {
    case 'account': {
      const account = AccountSelector.findByName(oldName)(state)

      if (!account) {
        actions.push(SmartInputActionCreator.error(`You do not have '${oldName}' account`))
        return actions
      } else {
        const renameAccount = AccountActionCreator.update(account.id, newName)
        actions.push(renameAccount)
        return actions
      }
    }
    case 'category': {
      const category = CategorySelector.findByName(oldName)(state)

      if (!category) {
        actions.push(SmartInputActionCreator.error(`You do not have '${oldName}' category`))
        return actions
      } else {
        const renameCategory = AccountActionCreator.update(category.id, newName)
        actions.push(renameCategory)
        return actions
      }
    }
    default: {
      throw new Error(`Unknown entity name: '${entity}'`)
    }
  }
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
        actions.push(SmartInputActionCreator.error(`You do not have '${name}' account`))
        return actions
      } else {
        const deleteAccount = AccountActionCreator.remove(account.id)
        actions.push(deleteAccount)
        return actions
      }
      break
    case 'category':
      const category = CategorySelector.findByName(name)(state)

      if (!category) {
        actions.push(SmartInputActionCreator.error(`You do not have '${name}' category`))
        return actions
      } else {
        const deleteCategory = CategoryActionCreator.remove(category.id)
        actions.push(deleteCategory)
        return actions
      }
      break
    case 'transaction':
      const command = TransactionSelector.findById(name)(state)

      if (!command) {
        actions.push(SmartInputActionCreator.error(`Can't find a transaction with id '${name}'`))
        return actions
      } else {
        const deleteTransactions = TransactionActionCreator.remove(command.id)
        actions.push(deleteTransactions)
        return actions
      }
      break
    default:
      throw new Error(`Unknown entity name: '${entity}'`)
  }
}

const evaluateTransfer = (
  state: App.State,
  input: string,
  fromAccountName: string,
  toAccountName: string,
  amount: number
) => {
  const actions: Array<App.Action> = []

  const fromAccount = AccountSelector.findByName(fromAccountName)(state)

  if (!fromAccount) {
    actions.push(SmartInputActionCreator.error(`Account '${fromAccountName}' not found`))
    return actions
  }

  const toAccount = AccountSelector.findByName(toAccountName)(state)

  if (!toAccount) {
    actions.push(SmartInputActionCreator.error(`Account '${toAccountName}' not found`))
    return actions
  }

  const transfer = TransactionActionCreator.transfer({
    id: generateId(),
    fromAccountId: fromAccount.id,
    toAccountId: toAccount.id,
    amount,
    timestamp: moment().unix(),
  })

  actions.push(transfer)

  return actions
}
