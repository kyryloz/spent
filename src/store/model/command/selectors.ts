import { App } from 'store/interface'
import { createSelector } from 'reselect'

export namespace CommandSelector {
  export const items = (state: App.State) => state.commands.items

  export const findById = (id: string) =>
    createSelector(items, items => items.find(item => item.id === id))

  export const error = (state: App.State) => state.commands.error
}
