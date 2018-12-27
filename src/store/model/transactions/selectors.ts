import { values } from 'lodash'
import { createSelector } from 'reselect'
import { App } from 'store/interface'

export namespace TransactionSelector {
  export const incomes = (state: App.State) => state.entities.transactions.incomes

  export const expenses = (state: App.State) => state.entities.transactions.expenses

  export const transfers = (state: App.State) => state.entities.transactions.transfers

  export const incomesByAccountId = (accountId: string) =>
    createSelector(
      incomes,
      items => values(items).filter(income => income.accountId === accountId)
    )

  export const expensesByAccountId = (accountId: string) =>
    createSelector(
      expenses,
      items => values(items).filter(expense => expense.accountId === accountId)
    )

  export const transfersByAccountId = (accountId: string) =>
    createSelector(
      transfers,
      items =>
        values(items).filter(
          transfer => transfer.accountFromId === accountId || transfer.accountToId === accountId
        )
    )

  export const totalIncome = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(
      incomesByAccountId(accountId),
      incomes =>
        incomes
          .filter(income => income.timestamp >= timestampFrom && income.timestamp <= timestampTo)
          .reduce((prev, current) => prev + current.amount, 0)
    )

  export const totalExpense = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(
      expensesByAccountId(accountId),
      expenses =>
        expenses
          .filter(expense => expense.timestamp >= timestampFrom && expense.timestamp <= timestampTo)
          .reduce((prev, current) => prev + current.amount, 0)
    )

  export const totalTransfer = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(
      transfersByAccountId(accountId),
      transfers =>
        transfers
          .filter(
            transfer => transfer.timestamp >= timestampFrom && transfer.timestamp <= timestampTo
          )
          .reduce((sum, next) => {
            if (next.accountFromId === accountId) {
              sum -= next.amount
            }

            if (next.accountToId === accountId) {
              sum += next.amount
            }

            return sum
          }, 0)
    )
}
