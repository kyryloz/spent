import { Reducer } from 'redux'
import { Transactions } from './interface'

const initialState: Transactions.State = {
  recent: [],
}

export const transactions: Reducer<Transactions.State, Transactions.Action> = (
  state = initialState,
  action
): Transactions.State => {
  switch (action.type) {
    case Transactions.ActionTypes.TRANSACTION_ADD: {
      const payload = (<Transactions.Actions.Add>action).payload

      return {
        ...state,
        recent: [...state.recent, payload],
      }
    }
    case Transactions.ActionTypes.TRANSACTION_REMOVE: {
      const payload = (<Transactions.Actions.Remove>action).payload

      return {
        ...state,
        recent: state.recent.filter(entry => entry.id !== payload),
      }
    }
    case Transactions.ActionTypes.TRANSACTION_PARSE_ERROR: {
      const payload = (<Transactions.Actions.ParsingError>action).payload

      const errorTransaction: Transactions.Transaction = {
        id: `error_${state.recent.length}`,
        rawContent: payload,
        details: {
          transactionType: Transactions.TransactionType.STATUS,
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
