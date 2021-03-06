import { App } from 'store/interface';

export namespace SmartInputSelector {
  export const input = (state: App.State) => state.ui.smartInput.input

  export const focus = (state: App.State) => state.ui.smartInput.focus

  export const error = (state: App.State) => state.ui.smartInput.error
}
