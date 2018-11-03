import { Application } from '../interface'

export namespace Accounts {
  export interface State {
    readonly accounts: Array<Account>
  }

  export const enum ActionTypes {
    ACCOUNT_ADD = '@@account/ADD',
    ACCOUNT_REMOVE = '@@account/REMOVE',
    ACCOUNT_BALANCE_CHANGE = '@@account/BALANCE_CHANGE',
  }

  export type Action = Application.Action<any, ActionTypes>

  export namespace Actions {
    export type Add = Application.Action<Account, ActionTypes>
    export type Remove = Application.Action<Application.Identifiable, ActionTypes>
    export type BalanceChange = Application.Action<BalanceChangePayload, ActionTypes>
  }

  export interface Account extends Application.Identifiable {
    readonly name: string
    readonly balance: number
  }

  export interface BalanceChangePayload {
    readonly accountName: string,
    readonly amount: number
  }
}
