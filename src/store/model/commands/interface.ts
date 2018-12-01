import { App } from 'store/interface'

export namespace Commands {
  export interface State {
    readonly items: Array<CommandData>
    readonly error: {
      human: string
    }
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
