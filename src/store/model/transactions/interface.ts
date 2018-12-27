import { App } from 'store/interface'

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

  export interface Expense extends App.Identifiable {
    readonly amount: number
    readonly categoryId: string
    readonly accountId: string
    readonly timestamp: number
  }

  export interface Income extends App.Identifiable {
    readonly accountId: string
    readonly amount: number
    readonly timestamp: number
  }

  export interface Transfer extends App.Identifiable {
    readonly accountFromId: string
    readonly accountToId: string
    readonly amount: number
    readonly timestamp: number
  }
}
