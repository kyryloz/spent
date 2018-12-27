import { Reducer } from 'redux'
import { App } from 'store/interface'
import { TransactionActionType } from './actions'
import { TransactionModel } from './interface'

const initialState: TransactionModel.State = {
  expenses: {},
  incomes: {},
  transfers: {},
}

export const transactions: Reducer<TransactionModel.State, App.Action> = (
  state = initialState,
  action
): TransactionModel.State => {
  switch (action.type) {
    case TransactionActionType.EXPENSE: {
      const transaction = action.transaction as TransactionModel.Expense

      return {
        ...state,
        expenses: {
          ...state.expenses,
          [transaction.id]: transaction,
        },
      }
    }
    case TransactionActionType.INCOME: {
      const transaction = action.transaction as TransactionModel.Income

      return {
        ...state,
        incomes: {
          ...state.incomes,
          [transaction.id]: transaction,
        },
      }
    }
    case TransactionActionType.TRANSFER: {
      const transaction = action.transaction as TransactionModel.Transfer

      return {
        ...state,
        transfers: {
          ...state.transfers,
          [transaction.id]: transaction,
        },
      }
    }
    default: {
      return state
    }
  }
}
