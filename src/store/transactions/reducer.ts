import { Reducer } from 'redux'
import { Application } from '../interface'
import { Transactions } from './interface'

const initialState: Transactions.State = {
  recent: [],
}

export const transactions: Reducer<
  Transactions.State,
  Application.Action<any, Transactions.ActionTypes>
> = (state = initialState, action): Transactions.State => {
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
        recent: state.recent.filter(entry => entry.id !== action.payload.id),
      }
    }
    case Transactions.ActionTypes.TRANSACTION_PARSE_ERROR: {
      const errorTransaction: Transactions.Transaction<any> = {
        id: `error: ${state.recent.length}`,
        rawContent: action.payload,
        data: {
          type: 'error'
        },
      }

      return {
        ...state,
        recent: [...state.recent, errorTransaction],
      }
    }
    default: {
      return state
    }
  }
}
