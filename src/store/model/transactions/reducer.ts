import { Reducer } from 'redux'
import { App } from 'store/interface'
import { TransactionActionCreator, TransactionActionType } from './actions'
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
      const {
        payload: { transaction },
      } = action as ReturnType<typeof TransactionActionCreator.expense>

      return {
        ...state,
        expenses: {
          ...state.expenses,
          [transaction.id]: transaction,
        },
      }
    }
    case TransactionActionType.INCOME: {
      const {
        payload: { transaction },
      } = action as ReturnType<typeof TransactionActionCreator.income>

      return {
        ...state,
        incomes: {
          ...state.incomes,
          [transaction.id]: transaction,
        },
      }
    }
    case TransactionActionType.TRANSFER: {
      const {
        payload: { transaction },
      } = action as ReturnType<typeof TransactionActionCreator.transfer>

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
