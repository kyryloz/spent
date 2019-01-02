import { AccountModel } from '../account/interface';
import { CategoryModel } from '../category/interface';

export namespace TransactionModel {
  export interface State {
    readonly expenses: {
      [id: string]: Expense
    }
    readonly incomes: {
      [id: string]: Income
    }
    readonly transfers: {
      [id: string]: Transfer
    }
  }

  export interface Expense {
    readonly id: string
    readonly amount: number
    readonly categoryId: string
    readonly accountId: string
    readonly timestamp: number
  }

  export interface ExpenseHydrated {
    readonly id: string
    readonly amount: number
    readonly category: CategoryModel.Category
    readonly account: AccountModel.Account
    readonly timestamp: number
  }

  export interface Income {
    readonly id: string
    readonly accountId: string
    readonly amount: number
    readonly timestamp: number
  }

  export interface IncomeHydrated {
    readonly id: string
    readonly account: AccountModel.Account
    readonly amount: number
    readonly timestamp: number
  }

  export interface Transfer {
    readonly id: string
    readonly fromAccountId: string
    readonly toAccountId: string
    readonly amount: number
    readonly timestamp: number
  }

  export interface TransferHydrated {
    readonly id: string
    readonly fromAccount: AccountModel.Account
    readonly toAccount: AccountModel.Account
    readonly amount: number
    readonly timestamp: number
  }
}
