import { App } from '../interface'

export namespace Commands {
  export interface State {
    readonly items: Array<CommandData>
    readonly error: {
      human: string
    }
  }

  export const enum ActionTypes {
    COMMAND_EVALUATE = '@@command/EVALUATE',
    COMMAND_ERROR = '@@command/ERROR',
    COMMAND_REMOVE = '@@command/REMOVE',
    COMMAND_EDIT = '@@command/EDIT',
    COMMAND_EXPENSE = '@@command/EXPENSE',
    COMMAND_INCOME = '@@command/INCOME',
    COMMAND_STATUS = '@@command/STATUS',
    COMMAND_DELETE_ENTITY = '@@command/DELETE_ENTITY',
    COMMAND_RENAME_ENTITY = '@@command/RENAME_ENTITY',
    COMMAND_CREATE_ACCOUNT = '@@command/CREATE_ACCOUNT',
    COMMAND_CREATE_CATEGORY = '@@command/CREATE_CATEGORY',
  }

  export type Action<Payload> = App.Action<Payload, ActionTypes>

  export namespace Actions {
    export type Remove = App.Action<App.Identifiable, ActionTypes.COMMAND_REMOVE>
    export type Edit = App.Action<App.Identifiable, ActionTypes.COMMAND_EDIT>
    export type ExpenseCommand = App.Action<ExpenseData, ActionTypes.COMMAND_EXPENSE>
    export type IncomeCommand = App.Action<IncomeData, ActionTypes.COMMAND_INCOME>
    export type StatusCommand = App.Action<StatusData, ActionTypes.COMMAND_STATUS>
    export type DeleteEntityCommand = App.Action<
      DeleteEntityData,
      ActionTypes.COMMAND_DELETE_ENTITY
    >
    export type RenameEntityCommand = App.Action<
      RenameEntityData,
      ActionTypes.COMMAND_RENAME_ENTITY
    >
    export type CreateAccountCommand = App.Action<
      CreateAccountData,
      ActionTypes.COMMAND_CREATE_ACCOUNT
    >
    export type CreateCategoryCommand = App.Action<
      CreateCategoryData,
      ActionTypes.COMMAND_CREATE_CATEGORY
    >
    export type Error = App.Action<ErrorData, ActionTypes.COMMAND_ERROR>
  }

  export const enum DataType {
    EXPENSE = 'EXPENSE',
    INCOME = 'INCOME',
    STATUS = 'STATUS',
    CREATE_ACCOUNT = 'CREATE_ACCOUNT',
    CREATE_CATEGORY = 'CREATE_CATEGORY',
    DELETE_ENTITY = 'DELETE_ENTITY',
    RENAME_ENTITY = 'RENAME_ENTITY',
  }

  export const enum Entity {
    ACCOUNT = 'account',
    CATEGORY = 'category',
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
      readonly id: string
      readonly name: string
    }
  }

  export interface CreateAccountData extends CommandData {
    readonly data: {
      readonly dataType: DataType.CREATE_ACCOUNT
      readonly id: string
      readonly name: string
    }
  }

  export interface StatusData extends CommandData {
    readonly data: {
      readonly dataType: DataType.STATUS
      readonly entity: Entity
    }
  }

  export interface DeleteEntityData extends CommandData {
    readonly data: {
      readonly dataType: DataType.DELETE_ENTITY
      readonly entity: Entity
      readonly entityId: string
      readonly entityName: string
    }
  }

  export interface RenameEntityData extends CommandData {
    readonly data: {
      readonly dataType: DataType.RENAME_ENTITY
      readonly entity: Entity
      readonly entityId: string
      readonly entityOldName: string
      readonly entityNewName: string
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

  export interface ErrorData {
    human: string
  }
}
