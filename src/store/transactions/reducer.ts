import { Reducer } from 'redux'
import { Transactions } from './interface'

const initialState: Transactions.State = {
  recent: [],
}

export const transactions: Reducer<Transactions.State> = (
  state = initialState,
  action
): Transactions.State => {
  switch (action.type) {
    case Transactions.ActionTypes.TRANSACTION_ADD: {
      return {
        ...state,
        recent: [...state.recent, action.payload],
      }
    }
    case Transactions.ActionTypes.TRANSACTION_REMOVE: {
      return {
        ...state,
        recent: state.recent.filter(entry => entry.id !== action.payload),
      }
    }
    default: {
      return state
    }
  }
}
