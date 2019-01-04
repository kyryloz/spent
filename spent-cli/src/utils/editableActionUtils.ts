import { Dispatch } from 'redux'
import { CliSelector } from 'store/model/cli/selectors'
import { TransactionActionType } from 'store/model/transactions/actions'
import { SmartInputActionCreator } from 'store/model/ui/cliInput/actions'

export const dispatchEditAction = (dispatch: Dispatch, command: CliSelector.CommandItem) => {
  switch (command.action.type) {
    case TransactionActionType.EXPENSE: {
      const {
        action: { payload: data },
      } = command as CliSelector.ExpenseCommand

      dispatch(
        SmartInputActionCreator.setInput(
          `update expense '${data.id}' set amount = ${data.amount}, account = '${
            data.account.name
          }', category = '${data.category.name}', date = '${command.timestamp}'`
        )
      )
      break
    }
    case TransactionActionType.INCOME: {
      const {
        action: { payload: data },
      } = command as CliSelector.IncomeCommand

      dispatch(
        SmartInputActionCreator.setInput(
          `update income '${data.id}' set amount = ${data.amount}, account = '${
            data.account.name
          }', date = '${command.timestamp}'`
        )
      )
      break
    }
    case TransactionActionType.TRANSFER: {
      const {
        action: { payload: data },
      } = command as CliSelector.TransferCommand

      dispatch(
        SmartInputActionCreator.setInput(
          `update transfer '${data.id}' set amount = ${data.amount}, from = '${
            data.fromAccount.name
          }', to = '${data.toAccount.name}', date = '${command.timestamp}'`
        )
      )
      break
    }
    default: {
      throw new Error(`Unsupported operation for '${command.action.type}'`)
    }
  }

  dispatch(SmartInputActionCreator.setFocus(true))
}

export const dispatchDeleteAction = (dispatch: Dispatch, command: CliSelector.CommandItem) => {
  dispatch(SmartInputActionCreator.setInput(`delete transaction '${command.id}'`))
  dispatch(SmartInputActionCreator.setFocus(true))
}
