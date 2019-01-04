import { fromPairs, values } from 'lodash'
import { createSelector } from 'reselect'
import { CoreState } from '../..'
import { TransactionSelector } from '../transactions/selectors'

export namespace CategorySelector {
  export const items = (state: CoreState) => state.categories.items

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

  export const expensesByCategoryId = (categoryId: string) =>
    createSelector(
      TransactionSelector.expenses,
      items => values(items).filter(expense => expense.categoryId === categoryId)
    )

  export const totalExpense = (categoryId: string, timestampFrom: number, timestampTo: number) =>
    createSelector(
      expensesByCategoryId(categoryId),
      expenses =>
        expenses
          .filter(expense => expense.timestamp >= timestampFrom && expense.timestamp <= timestampTo)
          .reduce((prev, current) => prev + current.amount, 0)
    )

  export const expenses = (timestampFrom: number, timestampTo: number) => (state: CoreState) =>
    createSelector(
      items,
      byId => {
        return fromPairs(
          values(byId)
            .filter(category => category.createdAt <= timestampTo)
            .map(category => [
              category.name,
              totalExpense(category.id, timestampFrom, timestampTo)(state),
            ])
        )
      }
    )(state)
}
