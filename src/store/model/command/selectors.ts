import { createSelector } from 'reselect'
import { App } from 'store/interface'
import { AccountSelector } from '../account/selectors'
import { CategorySelector } from '../category/selectors'
import { CommandModel } from './interface'

export namespace CommandSelector {
  export type CommandItem =
    | CommandModel.ExpenseHydratedData
    | CommandModel.IncomeHydratedData
    | CommandModel.StatusData
    | CommandModel.CreateAccountData
    | CommandModel.CreateCategoryData
    | CommandModel.DeleteEntityData
    | CommandModel.RenameEntityData

  export const items = (state: App.State): Array<CommandItem> => {
    return state.commands.items.map(item => {
      switch (item.data.dataType) {
        case CommandModel.DataType.EXPENSE: {
          const expenseItem = item as CommandModel.ExpenseData

          const hydratedItem: CommandModel.ExpenseHydratedData = {
            ...item,
            data: {
              dataType: expenseItem.data.dataType,
              amount: expenseItem.data.amount,
              account: AccountSelector.findById(expenseItem.data.accountId)(state),
              category: CategorySelector.findById(expenseItem.data.categoryId)(state),
            },
          }

          return hydratedItem
        }
        case CommandModel.DataType.INCOME: {
          const incomeItem = item as CommandModel.IncomeData

          const hydratedItem: CommandModel.IncomeHydratedData = {
            ...item,
            data: {
              dataType: incomeItem.data.dataType,
              amount: incomeItem.data.amount,
              account: AccountSelector.findById(incomeItem.data.accountId)(state),
            },
          }

          return hydratedItem
        }
      }

      return item as CommandItem
    })
  }

  export const findById = (id: string) =>
    createSelector(items, items => items.find(item => item.id === id))

  export const error = (state: App.State) => state.commands.error
}
