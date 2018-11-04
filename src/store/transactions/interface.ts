import { App } from '../interface'

export namespace Transactions {
  export interface State {
    readonly recent: Array<Transaction>
  }

  export const enum ActionTypes {
    TRANSACTION_ADD = '@@transaction/ADD',
    TRANSACTION_REMOVE = '@@transaction/REMOVE',
    TRANSACTION_PARSE_ERROR = '@@transaction/PARSE_ERROR',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Add = App.Action<Transaction, ActionTypes>
    export type Remove = App.Action<string, ActionTypes>
    export type ParsingError = App.Action<string, ActionTypes>
  }

  export interface Transaction<T extends TransactionDetails = TransactionDetails> {
    readonly id: string
    readonly rawContent: string
    readonly details: T
  }

  export enum Entity {
    ACCOUNT = 'account',
    CATEGORY = 'category',
  }

  export enum TransactionType {
    CREATE = 'create',
    EXPENSE = 'expense',
    INCOME = 'income',
    STATUS = 'status',
  }

  export interface TransactionDetails {
    readonly transactionType: TransactionType
  }

  export interface Create extends TransactionDetails {
    readonly transactionType: TransactionType.CREATE
    readonly entity: Entity
    readonly name: string
  }

  export interface Expense extends TransactionDetails {
    readonly transactionType: TransactionType.EXPENSE
    readonly category: string
    readonly amount: number
    readonly fromAccount?: string
  }

  export interface Income extends TransactionDetails {
    readonly transactionType: TransactionType.INCOME
    readonly accountName: string
    readonly amount: number
  }

  export interface Status extends TransactionDetails {
    readonly transactionType: TransactionType.STATUS
    readonly what: string
  }
}
