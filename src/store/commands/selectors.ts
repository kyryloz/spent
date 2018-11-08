import { createSelector } from 'reselect'
import { App } from '../interface'
import { Commands } from './interface'

export namespace commandsSelector {
  export const items = (state: App.State) => state.commands.items

  export const balance = (accountId: string) =>
    createSelector(items, items => {
      const totalExpenses = items
        .filter(command => command.data.dataType === Commands.DataType.EXPENSE)
        .map(command => command as Commands.ExpenseData)
        .filter(command => command.data.accountId === accountId)
        .reduce((sum, next) => (sum += next.data.amount), 0)

      const totalIncome = items
        .filter(command => command.data.dataType === Commands.DataType.INCOME)
        .map(data => data as Commands.IncomeData)
        .filter(data => data.data.accountId === accountId)
        .reduce((sum, next) => (sum += next.data.amount), 0)

      return totalIncome - totalExpenses
    })
}
