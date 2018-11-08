import { App } from '../../interface'

export namespace SmartInput {
  export interface State {
    readonly error: string
  }

  export const enum ActionTypes {
    ACCOUNT_REMOVE = '@@smartInput/REMOVE',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Remove = App.Action<App.Identifiable, ActionTypes>
  }

  export interface AccountPayload extends App.Identifiable {
    readonly name: string
    readonly commandIds: Array<string>
  }
}
