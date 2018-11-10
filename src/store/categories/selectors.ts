import { createSelector } from 'reselect'
import { calculateBalance } from 'src/utils/selectorUtils'
import { Commands } from '../commands/interface'
import { commandsSelector } from '../commands/selectors'
import { App } from '../interface'

export namespace categoriesSelector {
  const byId = (state: App.State) => state.entities.categories.byId

  const commandIds = (categoryId: string) =>
    createSelector([byId, commandsSelector.items], (byId, items) => {
      return byId[categoryId].commandIds.map(
        commandId => items.find(item => item.id === commandId)!
      )
    })

  export const findByName = (name: string) =>
    createSelector(byId, resultById => {
      return Object.keys(resultById)
        .map(key => resultById[key])
        .find(value => value.name === name)
    })

  export const findById = (id: string) => createSelector(byId, resultById => resultById[id].name)

  export const expense = (categoryId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(commandIds(categoryId), commandIds => {
      return calculateBalance(commandIds, Commands.DataType.EXPENSE, timestampFrom, timestampTo)
    })
}
