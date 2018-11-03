import { Action as ReduxAction, Dispatch } from 'redux'
import { Accounts } from './accounts/interface'
import { Categories } from './categories/interface'
import { Transactions } from './transactions/interface'

export namespace Application {
  export interface State {
    readonly transactions: Transactions.State
    readonly accounts: Accounts.State
    readonly categories: Categories.State
  }

  export interface Action<Payload, Type> extends ReduxAction<Type> {
    readonly payload: Payload
  }

  export type ConnectedComponentProps<StateProps> = {
    dispatch: Dispatch<Application.Action<any, any>>
  } & StateProps

  export interface Identifiable {
    id: string
  }
}
