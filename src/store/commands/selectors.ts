import { App } from '../interface'
import { createSelector } from 'reselect'

export namespace commandsSelector {
  export const items = (state: App.State) => state.commands.items

  export const findById = (id: string) =>
    createSelector(items, items => items.find(item => item.id === id))

  export const error = (state: App.State) => state.commands.error
}
