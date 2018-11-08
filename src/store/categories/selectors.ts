import { createSelector } from 'reselect'
import { App } from '../interface'

export namespace categoriesSelector {
  const byId = (state: App.State) => state.entities.categories.byId

  export const findCategoryByName = (name: string) =>
    createSelector(byId, resultById => {
      return Object.keys(resultById)
        .map(key => resultById[key])
        .find(value => value.name === name)
    })

  export const findById = (id: string) => createSelector(byId, resultById => resultById[id].name)
}
