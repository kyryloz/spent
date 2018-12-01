import * as moment from 'moment'
import { CommandModel } from 'store/model/command/interface'
import { uuidv4 } from 'utils/mathUtils'

export type EvaluationAction =
  | ReturnType<typeof EvaluationActionCreator.createAccount>
  | ReturnType<typeof EvaluationActionCreator.createCategory>
  | ReturnType<typeof EvaluationActionCreator.deleteEntity>
  | ReturnType<typeof EvaluationActionCreator.expense>
  | ReturnType<typeof EvaluationActionCreator.income>
  | ReturnType<typeof EvaluationActionCreator.renameEntity>
  | ReturnType<typeof EvaluationActionCreator.status>

export enum EvaluationActionType {
  EXPENSE = '@@evaluation/EXPENSE',
  INCOME = '@@evaluation/INCOME',
  STATUS = '@@evaluation/STATUS',
  DELETE_ENTITY = '@@evaluation/DELETE_ENTITY',
  RENAME_ENTITY = '@@evaluation/RENAME_ENTITY',
  CREATE_ACCOUNT = '@@evaluation/CREATE_ACCOUNT',
  CREATE_CATEGORY = '@@evaluation/CREATE_CATEGORY',
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
    return {
      type: EvaluationActionType.EXPENSE,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: CommandModel.DataType.EXPENSE,
          ...data,
        },
      },
    }
  }

  export const income = (
    raw: string,
    data: {
      accountId: string
      amount: number
    }
  ) => {
    return {
      type: EvaluationActionType.INCOME,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: CommandModel.DataType.INCOME,
          ...data,
        },
      },
    }
  }

  export const createAccount = (raw: string, name: string) => {
    return {
      type: EvaluationActionType.CREATE_ACCOUNT,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: CommandModel.DataType.CREATE_ACCOUNT,
          id: uuidv4(),
          name,
        },
      },
    }
  }

  export const createCategory = (raw: string, name: string) => {
    return {
      type: EvaluationActionType.CREATE_CATEGORY,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: CommandModel.DataType.CREATE_CATEGORY,
          id: uuidv4(),
          name,
        },
      },
    }
  }

  export const status = (
    raw: string,
    data: {
      entity: CommandModel.Entity
    }
  ) => {
    return {
      type: EvaluationActionType.STATUS,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: CommandModel.DataType.STATUS,
          ...data,
        },
      },
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
    return {
      type: EvaluationActionType.DELETE_ENTITY,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: CommandModel.DataType.DELETE_ENTITY,
          ...data,
        },
      },
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
    return {
      type: EvaluationActionType.RENAME_ENTITY,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: CommandModel.DataType.RENAME_ENTITY,
          ...data,
        },
      },
    }
  }
}
