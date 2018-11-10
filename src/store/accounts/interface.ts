import { App } from '../interface'

export namespace Accounts {
  export interface State {
    readonly byId: {
      [id: string]: {
        id: string,
        name: string,
        createdAt: number,
        commandIds: Array<string>
      }
    }
    readonly allIds: Array<string>
  }

  export const enum ActionTypes {
    ACCOUNT_REMOVE = '@@account/REMOVE',
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
