import { createSelector } from 'reselect'
import { Commands } from '../commands/interface'
import { commandsSelector } from '../commands/selectors'
import { App } from '../interface'

export namespace accountsSelector {
  const byId = (state: App.State) => state.entities.accounts.byId

  export const findByName = (name: string) =>
    createSelector(byId, resultById => {
      return Object.keys(resultById)
        .map(key => resultById[key])
        .find(value => value.name === name)
    })

  export const findById = (id: string) => createSelector(byId, resultById => resultById[id].name)

  export const income = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector([byId, commandsSelector.items], (byId, items) => {
      return byId[accountId].commandIds
        .map(commandId => items.find(item => item.id === commandId)!)
        .filter(command => command.data.dataType === Commands.DataType.INCOME)
        .map(data => data as Commands.IncomeData)
        .filter(data => data.timestamp >= timestampFrom && data.timestamp < timestampTo)
        .reduce((sum, next) => (sum += next.data.amount), 0)
    })

  export const expense = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector([byId, commandsSelector.items], (byId, items) => {
      return byId[accountId].commandIds
        .map(commandId => items.find(item => item.id === commandId)!)
        .filter(command => command.data.dataType === Commands.DataType.EXPENSE)
        .map(data => data as Commands.ExpenseData)
        .filter(data => data.timestamp >= timestampFrom && data.timestamp < timestampTo)
        .reduce((sum, next) => (sum += next.data.amount), 0)
    })

  export const balance = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(
      [
        income(accountId, timestampFrom, timestampTo),
        expense(accountId, timestampFrom, timestampTo),
      ],
      (income, expense) => income - expense
    )
}
