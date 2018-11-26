import { App } from 'store/interface'

export namespace Accounts {
  export interface State {
    readonly byId: {
      [id: string]: Account
    }
    readonly allIds: Array<string>
  }

  export const enum ActionTypes {
    ACCOUNT_REMOVE = '@@account/REMOVE',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Remove = App.Action<Account, ActionTypes>
  }

  export interface Account extends App.Identifiable {
    readonly name: string
    readonly createdAt: number
    readonly createdByCommandId: string
    readonly commandIds: Array<string>
  }
}
