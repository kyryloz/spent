import { Dispatch } from 'redux'
import { CommandSelector } from 'store/model/command/selectors'
import { TransactionActionType } from 'store/model/transactions/actions'
import { SmartInputActionCreator } from 'store/model/ui/smartInput/actions'

export const dispatchEditAction = (dispatch: Dispatch, command: CommandSelector.CommandItem) => {
  switch (command.action.type) {
    case TransactionActionType.EXPENSE: {
      const {
        action: { payload: data },
      } = command as CommandSelector.ExpenseCommand

      dispatch(
        SmartInputActionCreator.setInput(
          `update expense '${command.id}' set amount = ${data.amount}, account = '${
            data.account.name
          }', category = '${data.category.name}', date = '${command.timestamp}'`
        )
      )
      break
    }
    case TransactionActionType.INCOME: {
      const {
        action: { payload: data },
      } = command as CommandSelector.IncomeCommand

      dispatch(
        SmartInputActionCreator.setInput(
          `update income '${command.id}' set amount = ${data.amount}, account = '${
            data.account.name
          }', date = '${command.timestamp}'`
        )
      )
      break
    }
    case TransactionActionType.TRANSFER: {
      const {
        action: { payload: data },
      } = command as CommandSelector.TransferCommand

      dispatch(
        SmartInputActionCreator.setInput(
          `update transfer '${command.id}' set amount = ${data.amount}, from = '${
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

export const dispatchDeleteAction = (dispatch: Dispatch, command: CommandSelector.CommandItem) => {
  dispatch(SmartInputActionCreator.setInput(`delete transaction '${command.id}'`))
  dispatch(SmartInputActionCreator.setFocus(true))
}
