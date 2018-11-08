import { App } from '../interface'
import { createSelector } from 'reselect'

export namespace categoriesSelector {
  const byId = (state: App.State) => state.entities.categories.byId

  export const findCategoryByName = (name: string) =>
    createSelector(byId, resultById => {
      return Object.keys(resultById)
        .map(key => resultById[key])
        .find(value => value.name === name)
    })
}
