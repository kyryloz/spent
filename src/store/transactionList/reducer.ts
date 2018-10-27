import { Reducer } from 'redux'
import { TransactionListActionTypes, TransactionListState } from './interface'

const initialState: TransactionListState = {
  transactions: [],
}

export const transactionListReducer: Reducer<TransactionListState> = (state = initialState, action) => {
  switch (action.type) {
    case TransactionListActionTypes.ENTRY_ADD: {
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      }
    }
    case TransactionListActionTypes.ENTRY_REMOVE: {
      return {
        ...state,
        transactions: state.transactions.filter(entry => entry.id !== action.payload),
      }
    }
    default: {
      return state
    }
  }
}
