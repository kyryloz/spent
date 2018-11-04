import { Action as ReduxAction, Dispatch } from 'redux'
import { Accounts } from './accounts/interface'
import { Categories } from './categories/interface'
import { Commands } from './commands/interface'
import { Transactions } from './transactions/interface'

export namespace App {
  export interface State {
    readonly commands: Commands.State
    readonly transactions: Transactions.State
    readonly accounts: Accounts.State
    readonly categories: Categories.State
  }

  export interface Action<Payload = any, Type = any> extends ReduxAction<Type> {
    readonly payload: Payload
  }

  export type ConnectedComponentProps<StateProps> = {
    dispatch: Dispatch<App.Action<any, any>>
  } & StateProps

  export interface Identifiable {
    id: string
  }
}
