import { App } from '../interface'

export namespace Commands {
  export interface State {
    readonly items: Array<CommandPayload>
  }

  export const enum ActionTypes {
    COMMAND_EVALUATE = '@@command/EVALUATE',
    COMMAND_REMOVE = '@@command/REMOVE',
    COMMAND_ADD_EXPENSE = '@@command/ADD_EXPENSE',
    COMMAND_ADD_INCOME = '@@command/ADD_INCOME',
    COMMAND_ADD_STATUS = '@@command/ADD_STATUS',
    COMMAND_ADD_CREATE_ACCOUNT = '@@command/ADD_CREATE_ACCOUNT',
    COMMAND_ADD_CREATE_CATEGORY = '@@command/ADD_CREATE_CATEGORY',
  }

  export type Action<Payload> = App.Action<Payload, ActionTypes>

  export namespace Actions {
    export type Remove = App.Action<App.Identifiable, ActionTypes>
    export type AddExpenseCommand = App.Action<ExpensePayload, ActionTypes.COMMAND_ADD_EXPENSE>
    export type AddIncomeCommand = App.Action<IncomePayload, ActionTypes.COMMAND_ADD_INCOME>
    export type AddStatusCommand = App.Action<StatusPayload, ActionTypes.COMMAND_ADD_STATUS>
    export type AddCreateAccountCommand = App.Action<
      CreateAccountPayload,
      ActionTypes.COMMAND_ADD_CREATE_ACCOUNT
    >
    export type AddCreateCategoryCommand = App.Action<
      CreateCategoryPayload,
      ActionTypes.COMMAND_ADD_CREATE_CATEGORY
    >
  }

  export const enum CommandType {
    EXPENSE = 'EXPENSE',
    INCOME = 'INCOME',
    STATUS = 'STATUS',
    CREATE_ACCOUNT = 'CREATE_ACCOUNT',
    CREATE_CATEGORY = 'CREATE_CATEGORY',
  }

  export interface CommandPayload extends App.Identifiable {
    readonly raw: string
    readonly timestamp: number
    readonly data: {
      readonly commandType: CommandType
    }
  }

  export interface CreateCategoryPayload extends CommandPayload {
    readonly data: {
      readonly commandType: CommandType.CREATE_CATEGORY
      readonly name: string
    }
  }

  export interface CreateAccountPayload extends CommandPayload {
    readonly data: {
      readonly commandType: CommandType.CREATE_ACCOUNT
      readonly name: string
    }
  }

  export interface StatusPayload extends CommandPayload {
    readonly data: {
      readonly commandType: CommandType.STATUS
      readonly what: string
    }
  }

  export interface ExpensePayload extends CommandPayload {
    readonly data: {
      readonly commandType: CommandType.EXPENSE
      readonly categoryId: string
      readonly accountId: string
      readonly amount: number
    }
  }

  export interface IncomePayload extends CommandPayload {
    readonly data: {
      readonly commandType: CommandType.INCOME
      readonly accountId: string
      readonly amount: number
    }
  }
}
