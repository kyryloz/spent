import { CommandModel } from 'store/model/command/interface'

export const calculateBalance = (
  commands: Array<CommandModel.CommandData>,
  dataType: CommandModel.DataType,
  timestampFrom: number,
  timestampTo: number,
  inclusive: boolean = true
) => {
  return commands
    .filter(command => command.data.dataType === dataType)
    .map(data => data as CommandModel.IncomeData | CommandModel.ExpenseData)
    .filter(
      data =>
        data.timestamp >= timestampFrom && inclusive
          ? data.timestamp <= timestampTo
          : data.timestamp < timestampTo
    )
    .reduce((sum, next) => (sum += next.data.amount), 0)
}
