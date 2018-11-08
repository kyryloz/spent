import { App } from '../interface'
import { createSelector } from 'reselect'

export namespace accountsSelector {
  const byId = (state: App.State) => state.entities.accounts.byId

  export const findAccountByName = (name: string) =>
    createSelector(byId, resultById => {
      return Object.keys(resultById)
        .map(key => resultById[key])
        .find(value => value.name === name)
    })
}
