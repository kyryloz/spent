import { App } from '../interface'
import { createSelector } from 'reselect'

export namespace accountsSelector {
  const byId = (state: App.State) => state.entities.accounts.byId

  export const findByName = (name: string) =>
    createSelector(byId, resultById => {
      return Object.keys(resultById)
        .map(key => resultById[key])
        .find(value => value.name === name)
    })

  export const findById = (id: string) => createSelector(byId, resultById => resultById[id].name)
}
