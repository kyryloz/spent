import { App } from 'store/interface'

export namespace smartInputSelector {
  export const input = (state: App.State) => state.ui.smartInput.input

  export const focus = (state: App.State) => state.ui.smartInput.focus

  export const prefix = (state: App.State) => state.ui.smartInput.prefix
}
