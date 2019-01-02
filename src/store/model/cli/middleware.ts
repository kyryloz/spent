import { Dispatch, Middleware } from 'redux'
import { App } from 'store/interface'
import { AccountActionType } from 'store/model/account/actions'
import { CategoryActionType } from 'store/model/category/actions'
import { CliActionCreator } from 'store/model/cli/actions'
import { TransactionActionType } from 'store/model/transactions/actions'
import { SmartInputSelector } from 'store/model/ui/cliInput/selectors'

export const cliMiddleware: Middleware<
  {},
  App.State,
  Dispatch<App.Action>
> = store => next => action => {
  switch (action.type) {
    case AccountActionType.CREATE:
    case AccountActionType.UPDATE:
    case AccountActionType.REMOVE:
    case CategoryActionType.CREATE:
    case CategoryActionType.UPDATE:
    case CategoryActionType.REMOVE:
    case TransactionActionType.EXPENSE:
    case TransactionActionType.INCOME:
    case TransactionActionType.TRANSFER:
    case TransactionActionType.UPDATE_EXPENSE:
    case TransactionActionType.UPDATE_INCOME:
    case TransactionActionType.UPDATE_TRANSFER:
    case TransactionActionType.REMOVE: {
      const state = store.getState()
      const input = SmartInputSelector.input(state)

      next(CliActionCreator.addCommand(input, action))
    }
    default: {
      next(action)
    }
  }
}
