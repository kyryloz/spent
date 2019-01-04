import {
  AccountModel,
  AccountSelector,
  CategoryModel,
  CategorySelector,
  TransactionActionCreator,
  TransactionActionType,
} from '@spent/core'
import { createSelector } from 'reselect'
import { App } from 'store/interface'
import { CliModel } from 'store/model/cli/interface'
import { coreSelector } from '../../appSelector'

export namespace CliSelector {
  export type CommandItem = ExpenseCommand | IncomeCommand | TransferCommand | CliModel.CliCommand

  export interface ExpenseCommand {
    readonly id: string
    readonly raw: string
    readonly timestamp: number
    readonly action: {
      readonly type: TransactionActionType.EXPENSE
      readonly payload: {
        readonly id: string
        readonly amount: number
        readonly account: AccountModel.Account
        readonly category: CategoryModel.Category
        readonly timestamp: number
      }
    }
  }

  export interface IncomeCommand {
    readonly id: string
    readonly raw: string
    readonly timestamp: number
    readonly action: {
      readonly type: TransactionActionType.INCOME
      readonly payload: {
        readonly id: string
        readonly amount: number
        readonly account: AccountModel.Account
        readonly timestamp: number
      }
    }
  }

  export interface TransferCommand {
    readonly id: string
    readonly raw: string
    readonly timestamp: number
    readonly action: {
      readonly type: TransactionActionType.TRANSFER
      readonly payload: {
        readonly id: string
        readonly amount: number
        readonly fromAccount: AccountModel.Account
        readonly toAccount: AccountModel.Account
        readonly timestamp: number
      }
    }
  }

  export const items = (
    state: App.State
  ): Array<ExpenseCommand | IncomeCommand | TransferCommand | CliModel.CliCommand> => {
    return state.commands.cliActions.map(item => {
      switch (item.action.type) {
        case TransactionActionType.EXPENSE: {
          const expenseAction = item.action as ReturnType<typeof TransactionActionCreator.expense>

          const account = AccountSelector.findById(expenseAction.payload.transaction.accountId)(
            coreSelector(state)
          ) || {
            id: 'deleted',
            name: '<deleted>',
            createdAt: 0,
          }

          const category = CategorySelector.findById(expenseAction.payload.transaction.categoryId)(
            coreSelector(state)
          ) || {
            id: 'deleted',
            name: '<deleted>',
            createdAt: 0,
          }

          const hydratedItem: ExpenseCommand = {
            ...item,
            action: {
              type: TransactionActionType.EXPENSE,
              payload: {
                id: expenseAction.payload.transaction.id,
                amount: expenseAction.payload.transaction.amount,
                account,
                category,
                timestamp: expenseAction.payload.transaction.timestamp,
              },
            },
          }

          return hydratedItem
        }
        case TransactionActionType.INCOME: {
          const incomeAction = item.action as ReturnType<typeof TransactionActionCreator.income>

          const account = AccountSelector.findById(incomeAction.payload.transaction.accountId)(
            coreSelector(state)
          ) || {
            id: 'deleted',
            name: '<deleted>',
            createdAt: 0,
          }

          const hydratedItem: IncomeCommand = {
            ...item,
            action: {
              type: TransactionActionType.INCOME,
              payload: {
                id: incomeAction.payload.transaction.id,
                amount: incomeAction.payload.transaction.amount,
                account,
                timestamp: incomeAction.payload.transaction.timestamp,
              },
            },
          }

          return hydratedItem
        }
        case TransactionActionType.TRANSFER: {
          const transferAction = item.action as ReturnType<typeof TransactionActionCreator.transfer>

          const fromAccount = AccountSelector.findById(
            transferAction.payload.transaction.fromAccountId
          )(coreSelector(state)) || {
            id: 'deleted',
            name: '<deleted>',
            createdAt: 0,
          }

          const toAccount = AccountSelector.findById(
            transferAction.payload.transaction.toAccountId
          )(coreSelector(state)) || {
            id: 'deleted',
            name: '<deleted>',
            createdAt: 0,
          }

          const hydratedItem: TransferCommand = {
            ...item,
            action: {
              type: TransactionActionType.TRANSFER,
              payload: {
                id: transferAction.payload.transaction.id,
                amount: transferAction.payload.transaction.amount,
                fromAccount,
                toAccount,
                timestamp: transferAction.payload.transaction.timestamp,
              },
            },
          }

          return hydratedItem
        }
      }

      return item as CliModel.CliCommand
    })
  }

  export const findById = (id: string) =>
    createSelector(
      items,
      items => items.find(item => item.id === id)
    )
}
