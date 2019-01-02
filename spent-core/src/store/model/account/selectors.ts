import { fromPairs, values } from 'lodash'
import { createSelector } from 'reselect'
import { App } from 'store/interface'
import { TransactionSelector } from '../transactions/selectors'

export namespace AccountSelector {
  export const items = (state: App.State) => state.entities.accounts.items

  export const findByName = (name: string) =>
    createSelector(
      items,
      items => {
        return values(items).find(value => value.name === name)
      }
    )

  export const findById = (id: string) =>
    createSelector(
      items,
      items => (items[id] ? items[id] : null)
    )

  export const incomesByAccountId = (accountId: string) =>
    createSelector(
      TransactionSelector.incomes,
      items => values(items).filter(income => income.accountId === accountId)
    )

  export const expensesByAccountId = (accountId: string) =>
    createSelector(
      TransactionSelector.expenses,
      items => values(items).filter(expense => expense.accountId === accountId)
    )

  export const transfersByAccountId = (accountId: string) =>
    createSelector(
      TransactionSelector.transfers,
      items =>
        values(items).filter(
          transfer => transfer.fromAccountId === accountId || transfer.toAccountId === accountId
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
            if (next.fromAccountId === accountId) {
              sum -= next.amount
            }

            if (next.toAccountId === accountId) {
              sum += next.amount
            }

            return sum
          }, 0)
    )

  export const balance = (accountId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(
      [
        totalIncome(accountId, timestampFrom, timestampTo),
        totalExpense(accountId, timestampFrom, timestampTo),
        totalTransfer(accountId, timestampFrom, timestampTo),
      ],
      (income, expense, transfer) => income - expense + transfer
    )

  export const balances = (timestampFrom: number, timestampTo: number) => (state: App.State) =>
    createSelector(
      items,
      items => {
        return fromPairs(
          values(items)
            .filter(account => account.createdAt <= timestampTo)
            .map(account => [account.name, balance(account.id, timestampFrom, timestampTo)(state)])
        )
      }
    )(state)
}
