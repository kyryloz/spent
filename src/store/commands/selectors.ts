import { App } from '../interface'

export namespace commandsSelector {
  export const items = (state: App.State) => state.commands.items
}
