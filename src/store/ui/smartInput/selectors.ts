import { App } from 'store/interface'

export namespace smartInputSelector {
  export const input = (state: App.State) => state.ui.smartInput
}
