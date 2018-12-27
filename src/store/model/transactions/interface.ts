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

  export interface Income {
    readonly id: string
    readonly accountId: string
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
}
