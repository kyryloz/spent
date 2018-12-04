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
