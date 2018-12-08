import { CommandModel } from 'store/model/command/interface'
import { CommandSelector } from 'store/model/command/selectors'

export const calculateBalance = (
  commands: Array<CommandSelector.CommandItem>,
  dataType: CommandModel.DataType,
  timestampFrom: number,
  timestampTo: number,
  inclusive: boolean = true
) => {
  return commands
    .filter(command => command.data.dataType === dataType)
    .map(data => data as CommandSelector.IncomeHydratedData | CommandSelector.ExpenseHydratedData)
    .filter(
      data =>
        data.timestamp >= timestampFrom && inclusive
          ? data.timestamp <= timestampTo
          : data.timestamp < timestampTo
    )
    .reduce((sum, next) => (sum += next.data.amount), 0)
}

export const calculateTransfer = (
  accountId: string,
  commands: Array<CommandSelector.CommandItem>,
  timestampFrom: number,
  timestampTo: number,
  inclusive: boolean = true
) => {
  return commands
    .filter(command => command.data.dataType === CommandModel.DataType.TRANSFER)
    .map(data => data as CommandModel.TransferData)
    .filter(
      data =>
        data.timestamp >= timestampFrom && inclusive
          ? data.timestamp <= timestampTo
          : data.timestamp < timestampTo
    )
    .reduce((sum, next) => {
      if (next.data.accountFromId === accountId) {
        sum -= next.data.amount
      }

      if (next.data.accountToId === accountId) {
        sum += next.data.amount
      }

      return sum
    }, 0)
}
