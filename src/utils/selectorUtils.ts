import { Commands } from 'store/commands/interface'

export const calculateBalance = (
  commands: Array<Commands.CommandData>,
  dataType: Commands.DataType,
  timestampFrom: number,
  timestampTo: number,
  inclusive: boolean = true
) => {
  return commands
    .filter(command => command.data.dataType === dataType)
    .map(data => data as Commands.IncomeData | Commands.ExpenseData)
    .filter(
      data =>
        data.timestamp >= timestampFrom && inclusive
          ? data.timestamp <= timestampTo
          : data.timestamp < timestampTo
    )
    .reduce((sum, next) => (sum += next.data.amount), 0)
}
