import { createSelector } from 'reselect'
import { App } from '../interface'
import { Commands } from './interface'

export namespace commandsSelector {
  export const items = (state: App.State) => state.commands.items

  export const balance = (accountId: string) =>
    createSelector(items, items => {
      const totalExpenses = items
        .filter(command => command.data.commandType === Commands.CommandType.EXPENSE)
        .map(command => command as Commands.ExpensePayload)
        .filter(command => command.data.accountId === accountId)
        .reduce((sum, next) => (sum += next.data.amount), 0)

      const totalIncome = items
        .filter(command => command.data.commandType === Commands.CommandType.INCOME)
        .map(data => data as Commands.IncomePayload)
        .filter(data => data.data.accountId === accountId)
        .reduce((sum, next) => (sum += next.data.amount), 0)

      return totalIncome - totalExpenses
    })
}
