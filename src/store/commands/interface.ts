import { App } from '../interface'

export namespace Commands {
  export interface State {
    readonly items: Array<CommandData>
  }

  export const enum ActionTypes {
    COMMAND_EVALUATE = '@@command/EVALUATE',
    COMMAND_REMOVE = '@@command/REMOVE',
    COMMAND_EXPENSE = '@@command/EXPENSE',
    COMMAND_INCOME = '@@command/INCOME',
    COMMAND_STATUS = '@@command/STATUS',
    COMMAND_CREATE_ACCOUNT = '@@command/CREATE_ACCOUNT',
    COMMAND_CREATE_CATEGORY = '@@command/CREATE_CATEGORY',
  }

  export type Action<Payload> = App.Action<Payload, ActionTypes>

  export namespace Actions {
    export type Remove = App.Action<App.Identifiable, ActionTypes>
    export type ExpenseCommand = App.Action<ExpenseData, ActionTypes.COMMAND_EXPENSE>
    export type IncomeCommand = App.Action<IncomeData, ActionTypes.COMMAND_INCOME>
    export type StatusCommand = App.Action<StatusData, ActionTypes.COMMAND_STATUS>
    export type CreateAccountCommand = App.Action<
      CreateAccountData,
      ActionTypes.COMMAND_CREATE_ACCOUNT
    >
    export type CreateCategoryCommand = App.Action<
      CreateCategoryData,
      ActionTypes.COMMAND_CREATE_CATEGORY
    >
  }

  export const enum DataType {
    EXPENSE = 'EXPENSE',
    INCOME = 'INCOME',
    STATUS = 'STATUS',
    CREATE_ACCOUNT = 'CREATE_ACCOUNT',
    CREATE_CATEGORY = 'CREATE_CATEGORY',
  }

  export interface CommandData extends App.Identifiable {
    readonly raw: string
    readonly timestamp: number
    readonly data: {
      readonly dataType: DataType
    }
  }

  export interface CreateCategoryData extends CommandData {
    readonly data: {
      readonly dataType: DataType.CREATE_CATEGORY
      readonly name: string
    }
  }

  export interface CreateAccountData extends CommandData {
    readonly data: {
      readonly dataType: DataType.CREATE_ACCOUNT
      readonly name: string
    }
  }

  export interface StatusData extends CommandData {
    readonly data: {
      readonly dataType: DataType.STATUS
      readonly what: string
    }
  }

  export interface ExpenseData extends CommandData {
    readonly data: {
      readonly dataType: DataType.EXPENSE
      readonly categoryId: string
      readonly accountId: string
      readonly amount: number
    }
  }

  export interface IncomeData extends CommandData {
    readonly data: {
      readonly dataType: DataType.INCOME
      readonly accountId: string
      readonly amount: number
    }
  }
}
