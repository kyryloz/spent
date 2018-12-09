import * as moment from 'moment';
import { CommandModel } from 'store/model/command/interface';
import { generateId } from 'utils/mathUtils';

export type EvaluationAction =
  | ReturnType<typeof EvaluationActionCreator.createAccount>
  | ReturnType<typeof EvaluationActionCreator.createCategory>
  | ReturnType<typeof EvaluationActionCreator.deleteEntity>
  | ReturnType<typeof EvaluationActionCreator.expense>
  | ReturnType<typeof EvaluationActionCreator.income>
  | ReturnType<typeof EvaluationActionCreator.transfer>
  | ReturnType<typeof EvaluationActionCreator.renameEntity>
  | ReturnType<typeof EvaluationActionCreator.status>
  | ReturnType<typeof EvaluationActionCreator.updateExpense>
  | ReturnType<typeof EvaluationActionCreator.updateIncome>
  | ReturnType<typeof EvaluationActionCreator.updateTransfer>

export enum EvaluationActionType {
  EXPENSE = '@@evaluation/EXPENSE',
  INCOME = '@@evaluation/INCOME',
  TRANSFER = '@@evaluation/TRANSFER',
  STATUS = '@@evaluation/STATUS',
  DELETE_ENTITY = '@@evaluation/DELETE_ENTITY',
  RENAME_ENTITY = '@@evaluation/RENAME_ENTITY',
  CREATE_ACCOUNT = '@@evaluation/CREATE_ACCOUNT',
  CREATE_CATEGORY = '@@evaluation/CREATE_CATEGORY',
  UPDATE_EXPENSE = '@@evaluation/UPDATE_EXPENSE',
  UPDATE_INCOME = '@@evaluation/UPDATE_INCOME',
  UPDATE_TRANSFER = '@@evaluation/UPDATE_TRANSFER',
}

export namespace EvaluationActionCreator {
  export const expense = (
    raw: string,
    data: {
      categoryId: string
      accountId: string
      amount: number
    }
  ) => {
    const payload: CommandModel.ExpenseData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.EXPENSE,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.EXPENSE,
      payload,
    }
  }

  export const income = (
    raw: string,
    data: {
      accountId: string
      amount: number
    }
  ) => {
    const payload: CommandModel.IncomeData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.INCOME,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.INCOME,
      payload,
    }
  }

  export const createAccount = (raw: string, name: string) => {
    const payload: CommandModel.CreateAccountData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.CREATE_ACCOUNT,
        id: generateId(),
        name,
      },
    }

    return {
      type: EvaluationActionType.CREATE_ACCOUNT,
      payload,
    }
  }

  export const createCategory = (raw: string, name: string) => {
    const payload: CommandModel.CreateCategoryData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.CREATE_CATEGORY,
        id: generateId(),
        name,
      },
    }

    return {
      type: EvaluationActionType.CREATE_CATEGORY,
      payload,
    }
  }

  export const status = (
    raw: string,
    data: {
      entity: CommandModel.Entity
    }
  ) => {
    const payload: CommandModel.StatusData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.STATUS,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.STATUS,
      payload,
    }
  }

  export const deleteEntity = (
    raw: string,
    data: {
      entity: CommandModel.Entity
      entityId: string
      entityName: string
    }
  ) => {
    const payload: CommandModel.DeleteEntityData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.DELETE_ENTITY,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.DELETE_ENTITY,
      payload,
    }
  }

  export const renameEntity = (
    raw: string,
    data: {
      entity: CommandModel.Entity
      entityId: string
      entityOldName: string
      entityNewName: string
    }
  ) => {
    const payload: CommandModel.RenameEntityData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.RENAME_ENTITY,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.RENAME_ENTITY,
      payload,
    }
  }

  export const updateExpense = (
    raw: string,
    data: {
      targetCommandId: string
      accountChangeData?: {
        oldAccountId: string
        newAccountId: string
      }
      categoryChangeData?: {
        oldCategoryId: string
        newCategoryId: string
      }
      amountChangeData?: {
        oldAmount: number
        newAmount: number
      }
    }
  ) => {
    const payload: CommandModel.UpdateExpenseData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.UPDATE_EXPENSE,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.UPDATE_EXPENSE,
      payload,
    }
  }

  export const updateIncome = (
    raw: string,
    data: {
      targetCommandId: string
      accountChangeData?: {
        oldAccountId: string
        newAccountId: string
      }
      amountChangeData?: {
        oldAmount: number
        newAmount: number
      }
    }
  ) => {
    const payload: CommandModel.UpdateIncomeData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.UPDATE_INCOME,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.UPDATE_INCOME,
      payload,
    }
  }

  export const updateTransfer = (
    raw: string,
    data: {
      targetCommandId: string
      accountFromChangeData?: {
        oldAccountId: string
        newAccountId: string
      }
      accountToChangeData?: {
        oldAccountId: string
        newAccountId: string
      }
      amountChangeData?: {
        oldAmount: number
        newAmount: number
      }
    }
  ) => {
    const payload: CommandModel.UpdateTransferData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.UPDATE_TRANSFER,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.UPDATE_TRANSFER,
      payload
    }
  }

  export const transfer = (
    raw: string,
    data: {
      accountFromId: string
      accountToId: string
      amount: number
    }
  ) => {
    const payload: CommandModel.TransferData = {
      id: generateId(),
      timestamp: moment().unix(),
      raw,
      data: {
        dataType: CommandModel.DataType.TRANSFER,
        ...data,
      },
    }

    return {
      type: EvaluationActionType.TRANSFER,
      payload,
    }
  }
}
