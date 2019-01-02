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
    case TransactionActionType.UPDATE_EXPENSE: {
      const {
        payload: { transaction: newTransaction },
      } = action as ReturnType<typeof TransactionActionCreator.updateExpense>

      const oldTransaction = state.expenses[newTransaction.id]

      return {
        ...state,
        expenses: {
          ...state.expenses,
          [newTransaction.id]: {
            id: oldTransaction.id,
            accountId: newTransaction.accountId
              ? newTransaction.accountId
              : oldTransaction.accountId,
            categoryId: newTransaction.categoryId
              ? newTransaction.categoryId
              : oldTransaction.categoryId,
            amount: newTransaction.amount ? newTransaction.amount : oldTransaction.amount,
            timestamp: newTransaction.timestamp
              ? newTransaction.timestamp
              : oldTransaction.timestamp,
          },
        },
      }
    }
    case TransactionActionType.UPDATE_INCOME: {
      const {
        payload: { transaction: newTransaction },
      } = action as ReturnType<typeof TransactionActionCreator.updateIncome>

      const oldTransaction = state.incomes[newTransaction.id]

      return {
        ...state,
        incomes: {
          ...state.incomes,
          [newTransaction.id]: {
            id: oldTransaction.id,
            accountId: newTransaction.accountId
              ? newTransaction.accountId
              : oldTransaction.accountId,
            amount: newTransaction.amount ? newTransaction.amount : oldTransaction.amount,
            timestamp: newTransaction.timestamp
              ? newTransaction.timestamp
              : oldTransaction.timestamp,
          },
        },
      }
    }
    case TransactionActionType.UPDATE_TRANSFER: {
      const {
        payload: { transaction: newTransaction },
      } = action as ReturnType<typeof TransactionActionCreator.updateTransfer>

      const oldTransaction = state.transfers[newTransaction.id]

      return {
        ...state,
        transfers: {
          ...state.transfers,
          [newTransaction.id]: {
            id: oldTransaction.id,
            fromAccountId: newTransaction.fromAccountId
              ? newTransaction.fromAccountId
              : oldTransaction.fromAccountId,
            toAccountId: newTransaction.toAccountId
              ? newTransaction.toAccountId
              : oldTransaction.toAccountId,
            amount: newTransaction.amount ? newTransaction.amount : oldTransaction.amount,
            timestamp: newTransaction.timestamp
              ? newTransaction.timestamp
              : oldTransaction.timestamp,
          },
        },
      }
    }
    case TransactionActionType.REMOVE: {
      const {
        payload: { transactionId },
      } = action as ReturnType<typeof TransactionActionCreator.remove>

      const { [transactionId]: _removed_0, ...incomes } = state.incomes
      const { [transactionId]: _removed_1, ...expenses } = state.expenses
      const { [transactionId]: _removed_2, ...transfers } = state.transfers

      return {
        ...state,
        incomes,
        expenses,
        transfers,
      }
    }
    default: {
      return state
    }
  }
}
