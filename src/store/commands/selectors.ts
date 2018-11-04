import { App } from '../interface'

export namespace commandsSelector {
  export const items = (state: App.State) => state.commands.items

  // export const balance = (accountName: string) =>
  // createSelector(items, items => {
  //   const totalExpenses = items
  //     .map(item => item.details)
  //     .filter(details => details.transactionType === Transactions.TransactionType.EXPENSE)
  //     .map(details => details as Transactions.Expense)
  //     .filter(details => details.fromAccount === accountName)
  //     .reduce((sum, next) => (sum += next.amount), 0)

  //   const totalIncome = items
  //     .map(item => item.details)
  //     .filter(details => details.transactionType === Transactions.TransactionType.INCOME)
  //     .map(details => details as Transactions.Income)
  //     .filter(details => details.accountName === accountName)
  //     .reduce((sum, next) => (sum += next.amount), 0)

  //   return totalIncome - totalExpenses
  // })
}
