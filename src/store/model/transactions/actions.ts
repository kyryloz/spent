import { TransactionModel } from './interface'

export type TransactionAction =
  | ReturnType<typeof TransactionActionCreator.expense>
  | ReturnType<typeof TransactionActionCreator.income>
  | ReturnType<typeof TransactionActionCreator.transfer>

export const enum TransactionActionType {
  EXPENSE = '@@transaction/EXPENSE',
  INCOME = '@@transaction/INCOME',
  TRANSFER = '@@transaction/TRANSFER',
}

export namespace TransactionActionCreator {
  export const expense = (transaction: TransactionModel.Expense) => ({
    type: TransactionActionType.EXPENSE,
    transaction,
  })

  export const income = (transaction: TransactionModel.Income) => ({
    type: TransactionActionType.INCOME,
    transaction,
  })

  export const transfer = (transaction: TransactionModel.Transfer) => ({
    type: TransactionActionType.TRANSFER,
    transaction,
  })
}
