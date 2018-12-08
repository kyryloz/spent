import { createSelector } from 'reselect'
import { App } from 'store/interface'
import { AccountModel } from 'store/model/account/interface'
import { AccountSelector } from 'store/model/account/selectors'
import { CategoryModel } from 'store/model/category/interface'
import { CategorySelector } from 'store/model/category/selectors'
import { CommandModel } from 'store/model/command/interface'

export namespace CommandSelector {
  export type CommandItem =
    | ExpenseHydratedData
    | IncomeHydratedData
    | TransferHydratedData
    | CommandModel.StatusData
    | CommandModel.CreateAccountData
    | CommandModel.CreateCategoryData
    | CommandModel.DeleteEntityData
    | CommandModel.RenameEntityData
    | CommandModel.UpdateIncomeData
    | CommandModel.UpdateExpenseData

  export interface ExpenseHydratedData extends CommandModel.CommandDataBase {
    readonly data: {
      readonly dataType: CommandModel.DataType.EXPENSE
      readonly amount: number
      readonly account: AccountModel.Account
      readonly category: CategoryModel.Category
    }
  }

  export interface IncomeHydratedData extends CommandModel.CommandDataBase {
    readonly data: {
      readonly dataType: CommandModel.DataType.INCOME
      readonly amount: number
      readonly account: AccountModel.Account
    }
  }

  export interface TransferHydratedData extends CommandModel.CommandDataBase {
    readonly data: {
      readonly dataType: CommandModel.DataType.TRANSFER
      readonly amount: number
      readonly accountFrom: AccountModel.Account
      readonly accountTo: AccountModel.Account
    }
  }

  export const items = (state: App.State): Array<CommandItem> => {
    return state.commands.items.map(item => {
      switch (item.data.dataType) {
        case CommandModel.DataType.EXPENSE: {
          const expenseItem = item as CommandModel.ExpenseData

          const hydratedItem: ExpenseHydratedData = {
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

          const hydratedItem: IncomeHydratedData = {
            ...item,
            data: {
              dataType: incomeItem.data.dataType,
              amount: incomeItem.data.amount,
              account: AccountSelector.findById(incomeItem.data.accountId)(state),
            },
          }

          return hydratedItem
        }
        case CommandModel.DataType.TRANSFER: {
          const transferItem = item as CommandModel.TransferData

          const hydratedItem: TransferHydratedData = {
            ...item,
            data: {
              dataType: transferItem.data.dataType,
              amount: transferItem.data.amount,
              accountFrom: AccountSelector.findById(transferItem.data.accountFromId)(state),
              accountTo: AccountSelector.findById(transferItem.data.accountToId)(state),
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
