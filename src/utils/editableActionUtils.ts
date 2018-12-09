import { Dispatch } from 'redux'
import { CommandModel } from 'store/model/command/interface'
import { CommandSelector } from 'store/model/command/selectors'
import { SmartInputActionCreator } from 'store/model/ui/smartInput/actions'

export const dispatchEditAction = (dispatch: Dispatch, command: CommandSelector.CommandItem) => {
  switch (command.data.dataType) {
    case CommandModel.DataType.EXPENSE: {
      const { data } = command as CommandSelector.ExpenseHydratedData

      dispatch(
        SmartInputActionCreator.setInput(
          `update expense '${command.id}' set amount = ${data.amount}, account = '${
            data.account.name
          }', category = '${data.category.name}'`
        )
      )
      break
    }
    case CommandModel.DataType.INCOME: {
      const { data } = command as CommandSelector.IncomeHydratedData

      dispatch(
        SmartInputActionCreator.setInput(
          `update income '${command.id}' set amount = ${data.amount}, account = '${
            data.account.name
          }'`
        )
      )
      break
    }
    case CommandModel.DataType.TRANSFER: {
      const { data } = command as CommandSelector.TransferHydratedData

      dispatch(
        SmartInputActionCreator.setInput(
          `update transfer '${command.id}' set amount = ${data.amount}, from = '${
            data.accountFrom.name
          }', to = '${data.accountTo.name}'`
        )
      )
      break
    }
    default: {
      throw new Error(`Unsupported operation for '${command.data.dataType}'`)
    }
  }

  dispatch(SmartInputActionCreator.setFocus(true))
}

export const dispatchDeleteAction = (dispatch: Dispatch, command: CommandSelector.CommandItem) => {
  dispatch(SmartInputActionCreator.setInput(`delete transaction '${command.id}'`))
  dispatch(SmartInputActionCreator.setFocus(true))
}
