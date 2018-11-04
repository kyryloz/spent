import { App } from '../interface'

export namespace Accounts {
  export interface State {
    readonly items: Array<Account>
  }

  export const enum ActionTypes {
    ACCOUNT_ADD = '@@account/ADD',
    ACCOUNT_REMOVE = '@@account/REMOVE',
    ACCOUNT_BALANCE_CHANGE = '@@account/BALANCE_CHANGE',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Add = App.Action<Account, ActionTypes>
    export type Remove = App.Action<App.Identifiable, ActionTypes>
    export type BalanceChange = App.Action<BalanceChangePayload, ActionTypes>
  }

  export interface Account extends App.Identifiable {
    readonly name: string
    readonly balance: number
  }

  export interface BalanceChangePayload {
    readonly accountName: string,
    readonly amount: number
  }
}
