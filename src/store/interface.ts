import { Action as ReduxAction, Dispatch } from 'redux'
import { Transactions } from './transactions/interface'

export namespace Application {
  export interface State {
    readonly transactions: Transactions.State
  }

  export interface Action<Payload, Type> extends ReduxAction<Type> {
    readonly payload: Payload
  }

  export type ConnectedComponentProps<StateProps> = {
    dispatch: Dispatch<Application.Action<any, any>>
  } & StateProps
}
