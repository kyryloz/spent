import { createSelector } from 'reselect'
import { CoreState } from '../..'
import { AccountSelector } from '../account/selectors'
import { CategorySelector } from '../category/selectors'
import { TransactionModel } from './interface'

export namespace TransactionSelector {
  export const incomes = (state: CoreState) => state.transactions.incomes

  export const expenses = (state: CoreState) => state.transactions.expenses

  export const transfers = (state: CoreState) => state.transactions.transfers

  export const findById = (transactionId: string) =>
    createSelector(
      incomes,
      expenses,
      transfers,
      (incomes, expenses, transfers) => ({ ...incomes, ...expenses, ...transfers }[transactionId])
    )

  export const incomeById = (incomeId: string) => (
    state: CoreState
  ): TransactionModel.IncomeHydrated =>
    createSelector(
      incomes,
      AccountSelector.items,
      (incomes, accounts) => {
        const income = incomes[incomeId]

        return {
          id: income.id,
          amount: income.amount,
          timestamp: income.timestamp,
          account: accounts[income.accountId],
        }
      }
    )(state)

  export const expenseById = (expenseId: string) => (
    state: CoreState
  ): TransactionModel.ExpenseHydrated =>
    createSelector(
      expenses,
      AccountSelector.items,
      CategorySelector.items,
      (expenses, accounts, categories) => {
        const expense = expenses[expenseId]

        return {
          id: expense.id,
          amount: expense.amount,
          timestamp: expense.timestamp,
          account: accounts[expense.accountId],
          category: categories[expense.categoryId],
        }
      }
    )(state)

  export const transferById = (transferId: string) => (
    state: CoreState
  ): TransactionModel.TransferHydrated =>
    createSelector(
      transfers,
      AccountSelector.items,
      (transfers, accounts) => {
        const transfer = transfers[transferId]

        return {
          id: transfer.id,
          amount: transfer.amount,
          timestamp: transfer.timestamp,
          fromAccount: accounts[transfer.fromAccountId],
          toAccount: accounts[transfer.toAccountId],
        }
      }
    )(state)
}
