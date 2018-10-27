import { AnyAction, Dispatch } from 'redux'
import { Transactions } from './transactions/interface'

export namespace Application {
  export interface State {
    readonly transactions: Transactions.State
  }

  export interface Action<T = any> extends AnyAction {
    readonly payload: T
  }

  export type ConnectedComponentProps<StateProps> = {
    dispatch: Dispatch<Application.Action>
  } & StateProps
}
