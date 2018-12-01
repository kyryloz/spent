import { fromPairs, values } from 'lodash'
import { createSelector } from 'reselect'
import { Commands } from 'store/model/commands/interface'
import { commandsSelector } from 'store/model/commands/selectors'
import { App } from 'store/interface'
import { calculateBalance } from 'utils/selectorUtils'

export namespace categoriesSelector {
  export const byId = (state: App.State) => state.entities.categories.byId

  export const commandIds = (categoryId: string) =>
    createSelector([byId, commandsSelector.items], (byId, items) => {
      return byId[categoryId].commandIds.map(
        commandId => items.find(item => item.id === commandId)!
      )
    })

  export const findByName = (name: string) =>
    createSelector(byId, resultById => {
      return values(resultById).find(value => value.name === name)
    })

  export const findById = (id: string) => createSelector(byId, resultById => resultById[id].name)

  export const expense = (categoryId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(commandIds(categoryId), commandIds => {
      return calculateBalance(commandIds, Commands.DataType.EXPENSE, timestampFrom, timestampTo)
    })

  export const expenses = (timestampFrom: number, timestampTo: number) => (state: App.State) =>
    createSelector(byId, byId => {
      return fromPairs(
        values(byId)
          .filter(category => category.createdAt <= timestampTo)
          .map(category => [category.name, expense(category.id, timestampFrom, timestampTo)(state)])
      )
    })(state)
}
