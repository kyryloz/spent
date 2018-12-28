import { TransactionModel } from './interface'

export type TransactionAction =
  | ReturnType<typeof TransactionActionCreator.expense>
  | ReturnType<typeof TransactionActionCreator.income>
  | ReturnType<typeof TransactionActionCreator.transfer>
  | ReturnType<typeof TransactionActionCreator.updateExpense>
  | ReturnType<typeof TransactionActionCreator.updateIncome>
  | ReturnType<typeof TransactionActionCreator.updateTransfer>
  | ReturnType<typeof TransactionActionCreator.remove>

export const enum TransactionActionType {
  EXPENSE = '@@transaction/EXPENSE',
  INCOME = '@@transaction/INCOME',
  TRANSFER = '@@transaction/TRANSFER',
  UPDATE_EXPENSE = '@@transaction/UPDATE_EXPENSE',
  UPDATE_INCOME = '@@transaction/UPDATE_EXPENSE',
  UPDATE_TRANSFER = '@@transaction/UPDATE_EXPENSE',
  REMOVE = '@@transaction/REMOVE',
}

export namespace TransactionActionCreator {
  export const expense = (transaction: TransactionModel.Expense) => ({
    type: TransactionActionType.EXPENSE,
    payload: {
      transaction,
    },
  })

  export const income = (transaction: TransactionModel.Income) => ({
    type: TransactionActionType.INCOME,
    payload: {
      transaction,
    },
  })

  export const transfer = (transaction: TransactionModel.Transfer) => ({
    type: TransactionActionType.TRANSFER,
    payload: {
      transaction,
    },
  })

  export const remove = (transactionId: string) => ({
    type: TransactionActionType.REMOVE,
    payload: {
      transactionId,
    },
  })

  export const updateExpense = (
    transaction: Partial<TransactionModel.Expense> & { id: string }
  ) => ({
    type: TransactionActionType.UPDATE_EXPENSE,
    payload: {
      transaction,
    },
  })

  export const updateIncome = (transaction: Partial<TransactionModel.Income> & { id: string }) => ({
    type: TransactionActionType.UPDATE_INCOME,
    payload: {
      transaction,
    },
  })

  export const updateTransfer = (
    transaction: Partial<TransactionModel.Transfer> & { id: string }
  ) => ({
    type: TransactionActionType.UPDATE_TRANSFER,
    payload: {
      transaction,
    },
  })
}
