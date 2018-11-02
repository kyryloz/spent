export namespace Transactions {
  export interface State {
    readonly recent: Array<Transaction<TransactionPayload>>
  }

  export const enum ActionTypes {
    TRANSACTION_ADD = '@@transaction/ADD',
    TRANSACTION_REMOVE = '@@transaction/REMOVE',
    TRANSACTION_PARSE_ERROR = '@@transaction/PARSE_ERROR',
  }

  export interface Transaction<T extends TransactionPayload> {
    readonly id: string
    readonly rawContent: string
    readonly data: T
  }

  export enum Entity {
    ACCOUNT = 'account',
    CATEGORY = 'category',
  }

  export type TransactionType = 'create' | 'expense' | 'income' | 'status'

  export interface TransactionPayload {
    readonly type: TransactionType
  }

  export interface Create extends TransactionPayload {
    readonly type: 'create'
    readonly entity: Entity
    readonly name: string
  }

  export interface Expense extends TransactionPayload {
    readonly type: 'expense'
    readonly category: string
    readonly amount: number
    readonly fromAccount?: string
  }

  export interface Income extends TransactionPayload {
    readonly type: 'income'
    readonly accountName: string
    readonly amount: number
  }

  export interface Status extends TransactionPayload {
    readonly type: 'status'
    readonly what: string
  }
}
