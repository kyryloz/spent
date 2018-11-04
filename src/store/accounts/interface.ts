import { App } from '../interface'

export namespace Accounts {
  export interface State {
    readonly items: Array<Account>
  }

  export const enum ActionTypes {
    ACCOUNT_ADD = '@@account/ADD',
    ACCOUNT_REMOVE = '@@account/REMOVE',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Add = App.Action<Account, ActionTypes>
    export type Remove = App.Action<App.Identifiable, ActionTypes>
  }

  export interface Account extends App.Identifiable {
    readonly name: string
    readonly commandIds: Array<string>
  }
}
