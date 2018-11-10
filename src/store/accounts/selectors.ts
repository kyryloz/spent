import { fromPairs, values } from 'lodash'
import { createSelector } from 'reselect'
import { calculateBalance } from 'src/utils/selectorUtils'
import { Commands } from '../commands/interface'
import { commandsSelector } from '../commands/selectors'
import { App } from '../interface'

export namespace accountsSelector {
  const byId = (state: App.State) => state.entities.accounts.byId

  const commandIds = (accountId: string) =>
    createSelector([byId, commandsSelector.items], (byId, items) => {
      return byId[accountId].commandIds.map(commandId => items.find(item => item.id === commandId)!)
    })

  export const findByName = (name: string) =>
    createSelector(byId, resultById => {
      return values(resultById).find(value => value.name === name)
    })

  export const findById = (id: string) => createSelector(byId, resultById => resultById[id].name)

  export const income = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(commandIds(accountId), commandIds => {
      return calculateBalance(commandIds, Commands.DataType.INCOME, timestampFrom, timestampTo)
    })

  export const expense = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(commandIds(accountId), commandIds => {
      return calculateBalance(commandIds, Commands.DataType.EXPENSE, timestampFrom, timestampTo)
    })

  export const balance = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(
      [
        income(accountId, timestampFrom, timestampTo),
        expense(accountId, timestampFrom, timestampTo),
      ],
      (income, expense) => income - expense
    )

  export const balances = (timestampFrom: number, timestampTo: number) => (state: App.State) =>
    createSelector(byId, byId => {
      return fromPairs(
        values(byId)
          .filter(account => account.createdAt <= timestampTo)
          .map(account => [account.name, balance(account.id, timestampFrom, timestampTo)(state)])
      )
    })(state)
}
