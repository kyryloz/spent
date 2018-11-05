import { App } from '../interface'

export namespace Commands {
  export interface State {
    readonly items: Array<Command>
  }

  export const enum ActionTypes {
    COMMAND_ADD = '@@command/ADD',
    COMMAND_REMOVE = '@@command/REMOVE',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Add = App.Action<Command, ActionTypes>
    export type Remove = App.Action<App.Identifiable, ActionTypes>
  }

  export enum CommandType {
    CREATE_CATEGORY = 'create_category',
    CREATE_ACCOUNT = 'create_account',
    EXPENSE = 'expense',
    INCOME = 'income',
    STATUS = 'status',
  }

  export interface Command extends App.Identifiable {
    readonly commandType: CommandType
    readonly raw: string
    readonly timestamp: number
    readonly data: any
  }

  export interface CreateCategory extends Command {
    readonly commandType: CommandType.CREATE_CATEGORY
    readonly data: {
      readonly name: string
    }
  }

  export interface CreateAccount extends Command {
    readonly commandType: CommandType.CREATE_ACCOUNT
    readonly data: {
      readonly name: string
    }
  }

  export interface Status extends Command {
    readonly commandType: CommandType.STATUS
    readonly data: {
      readonly what: string
    }
  }

  export interface Expense extends Command {
    readonly commandType: CommandType.EXPENSE
    readonly data: {
      readonly categoryName: string
      readonly accountName: string
      readonly amount: number
    }
  }

  export interface Income extends Command {
    readonly commandType: CommandType.INCOME
    readonly data: {
      readonly accountName: string
      readonly amount: number
    }
  }
}
