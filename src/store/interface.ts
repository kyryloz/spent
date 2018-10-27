import { Action, AnyAction, Dispatch } from 'redux'
import { TransactionListState } from './transactionList/interface';

export interface ApplicationState {
  transactionList: TransactionListState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}
