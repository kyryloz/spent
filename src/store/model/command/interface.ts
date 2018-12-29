import { EvaluationAction } from 'store/evaluation/actions'
import { App } from 'store/interface'
import { AccountAction } from '../account/actions'
import { AccountModel } from '../account/interface'
import { CategoryAction } from '../category/actions'
import { CategoryModel } from '../category/interface'
import { TransactionAction } from '../transactions/actions'

export namespace CommandModel {
  export interface State {
    readonly items: Array<CommandDataBase>
    readonly cliActions: Array<CliAction>
    readonly error: {
      human: string
    }
  }

  export const enum DataType {
    EXPENSE = 'EXPENSE', // extracted
    INCOME = 'INCOME', // extracted
    TRANSFER = 'TRANSFER', // extracted
    STATUS = 'STATUS',
    CREATE_ACCOUNT = 'CREATE_ACCOUNT', // extracted
    CREATE_CATEGORY = 'CREATE_CATEGORY', // extracted
    DELETE_ACCOUNT = 'DELETE_ACCOUNT', // extracted
    DELETE_CATEGORY = 'DELETE_CATEGORY', // extracted
    DELETE_TRANSACTION = 'DELETE_TRANSACTION', // extracted
    RENAME_ENTITY = 'RENAME_ENTITY', // extraced
    UPDATE_EXPENSE = 'UPDATE_EXPENSE', // extracted
    UPDATE_INCOME = 'UPDATE_INCOME', // extracted
    UPDATE_TRANSFER = 'UPDATE_TRANSFER', // extracted
  }

  export const enum Entity {
    ACCOUNT = 'account',
    CATEGORY = 'category',
    TRANSACTION = 'transaction',
  }

  export interface CliAction {
    readonly id: string
    readonly raw: string
    readonly timestamp: number
    readonly action: EvaluationAction | TransactionAction | CategoryAction | AccountAction
  }

  export interface CommandDataBase extends App.Identifiable {
    readonly raw: string
    readonly timestamp: number
    readonly data: {
      readonly dataType: DataType
    }
  }

  export interface CreateCategoryData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.CREATE_CATEGORY
      readonly id: string
      readonly name: string
    }
  }

  export interface CreateAccountData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.CREATE_ACCOUNT
      readonly id: string
      readonly name: string
    }
  }

  export interface StatusData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.STATUS
      readonly entity: Entity
    }
  }

  export interface DeleteAccountData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.DELETE_ACCOUNT
      readonly account: AccountModel.Account
    }
  }

  export interface DeleteCategoryData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.DELETE_CATEGORY
      readonly category: CategoryModel.Category
    }
  }

  export interface DeleteTransactionData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.DELETE_TRANSACTION
      readonly commandId: string
    }
  }

  export interface RenameEntityData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.RENAME_ENTITY
      readonly entity: Entity
      readonly entityId: string
      readonly entityOldName: string
      readonly entityNewName: string
    }
  }

  export interface ExpenseData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.EXPENSE
      readonly amount: number
      readonly categoryId: string
      readonly accountId: string
      readonly date: string
    }
  }

  export interface IncomeData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.INCOME
      readonly accountId: string
      readonly amount: number
      readonly date: string
    }
  }

  export interface UpdateExpenseData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.UPDATE_EXPENSE
      readonly targetCommandId: string
      readonly accountChangeData?: {
        readonly oldAccountId: string
        readonly newAccountId: string
      }
      readonly categoryChangeData?: {
        readonly oldCategoryId: string
        readonly newCategoryId: string
      }
      readonly amountChangeData?: {
        readonly oldAmount: number
        readonly newAmount: number
      }
      readonly dateChangeData?: {
        readonly oldDate: string
        readonly newDate: string
      }
    }
  }

  export interface UpdateIncomeData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.UPDATE_INCOME
      readonly targetCommandId: string
      readonly accountChangeData?: {
        readonly oldAccountId: string
        readonly newAccountId: string
      }
      readonly amountChangeData?: {
        readonly oldAmount: number
        readonly newAmount: number
      }
      readonly dateChangeData?: {
        readonly oldDate: string
        readonly newDate: string
      }
    }
  }

  export interface UpdateTransferData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.UPDATE_TRANSFER
      readonly targetCommandId: string
      readonly accountFromChangeData?: {
        readonly oldAccountId: string
        readonly newAccountId: string
      }
      readonly accountToChangeData?: {
        readonly oldAccountId: string
        readonly newAccountId: string
      }
      readonly amountChangeData?: {
        readonly oldAmount: number
        readonly newAmount: number
      }
      readonly dateChangeData?: {
        readonly oldDate: string
        readonly newDate: string
      }
    }
  }

  export interface TransferData extends CommandDataBase {
    readonly data: {
      readonly dataType: DataType.TRANSFER
      readonly accountFromId: string
      readonly accountToId: string
      readonly amount: number
      readonly date: string
    }
  }

  export interface ErrorData {
    human: string
  }
}
