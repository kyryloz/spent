import { App } from '../interface'

export namespace Commands {
  export interface State {
    readonly items: Array<Command>
  }

  export const enum ActionTypes {
    COMMAND_EVALUATE = '@@command/EVALUATE',
    COMMAND_ADD = '@@command/ADD',
    COMMAND_REMOVE = '@@command/REMOVE',
    COMMAND_EXPENSE = '@@command/EXPENSE',
  }

  export type Action<Payload = any> = App.Action<Payload, ActionTypes>

  export namespace Actions {
    export type Add = App.Action<Command, ActionTypes>
    export type Remove = App.Action<App.Identifiable, ActionTypes>
    export type Expense = App.Action<ExpensePayload, ActionTypes.COMMAND_EXPENSE>
  }

  export enum CommandType {
    CREATE_CATEGORY = 'create_category',
    CREATE_ACCOUNT = 'create_account',
    EXPENSE = 'expense',
    INCOME = 'income',
    STATUS = 'status',
  }

  export interface Command extends App.Identifiable {
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

  export interface ExpensePayload extends Command {
    readonly data: {
      readonly categoryId: string
      readonly accountId: string
      readonly amount: number
    }
  }

  export interface Income extends Command {
    readonly commandType: CommandType.INCOME
    readonly data: {
      readonly accountId: string
      readonly amount: number
    }
  }
}
