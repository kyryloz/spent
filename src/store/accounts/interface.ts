namespace Accounts {
  export interface State {
    readonly accounts: Array<Account>
  }

  export const enum ActionTypes {
    ACCOUNT_ADD = '@@account/ADD',
    ACCOUNT_REMOVE = '@@account/REMOVE',
    ACCOUNT_BALANCE_CHANGE = '@@account/BALANCE_CHANGE',
  }

  export interface Account {
    readonly name: string
    readonly balance: number
  }
}
