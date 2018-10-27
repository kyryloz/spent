import { Action, AnyAction, Dispatch } from 'redux'
import { EntriesState } from './entries/interface';

export interface ApplicationState {
  entries: EntriesState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}
