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

  export const updateExpense = (updateData: {
    transactionId: string
    accountChangeData?: {
      oldAccountId: string
      newAccountId: string
    }
    categoryChangeData?: {
      oldCategoryId: string
      newCategoryId: string
    }
    amountChangeData?: {
      oldAmount: number
      newAmount: number
    }
    dateChangeData?: {
      oldDate: string
      newDate: string
    }
  }) => ({
    type: TransactionActionType.UPDATE_EXPENSE,
    payload: {
      updateData,
    },
  })

  export const updateIncome = (updateData: {
    targetCommandId: string
    accountChangeData?: {
      oldAccountId: string
      newAccountId: string
    }
    amountChangeData?: {
      oldAmount: number
      newAmount: number
    }
    dateChangeData?: {
      oldDate: string
      newDate: string
    }
  }) => ({
    type: TransactionActionType.UPDATE_INCOME,
    payload: {
      updateData,
    },
  })

  export const updateTransfer = (updateData: {
    targetCommandId: string
    accountFromChangeData?: {
      oldAccountId: string
      newAccountId: string
    }
    accountToChangeData?: {
      oldAccountId: string
      newAccountId: string
    }
    amountChangeData?: {
      oldAmount: number
      newAmount: number
    }
    dateChangeData?: {
      oldDate: string
      newDate: string
    }
  }) => ({
    type: TransactionActionType.UPDATE_TRANSFER,
    payload: {
      updateData,
    },
  })
}
