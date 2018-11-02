import { AnyAction, Dispatch } from 'redux'
import { Transactions } from './transactions/interface'

export namespace Application {
  export interface State {
    readonly transactions: Transactions.State
  }

  export interface Action<Payload, Type> extends AnyAction {
    readonly type: Type
    readonly payload: Payload
  }

  export type ConnectedComponentProps<StateProps> = {
    dispatch: Dispatch<Application.Action<any, any>>
  } & StateProps
}
