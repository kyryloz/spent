import * as moment from 'moment'
import { CommandModel } from 'store/model/command/interface'
import { uuidv4 } from 'utils/mathUtils'

export type EvaluationAction =
  | ReturnType<typeof EvaluationActionCreators.createAccount>
  | ReturnType<typeof EvaluationActionCreators.createCategory>
  | ReturnType<typeof EvaluationActionCreators.deleteEntity>
  | ReturnType<typeof EvaluationActionCreators.expense>
  | ReturnType<typeof EvaluationActionCreators.income>
  | ReturnType<typeof EvaluationActionCreators.renameEntity>
  | ReturnType<typeof EvaluationActionCreators.status>

export enum EvaluationActionTypes {
  EXPENSE = '@@evaluation/EXPENSE',
  INCOME = '@@evaluation/INCOME',
  STATUS = '@@evaluation/STATUS',
  DELETE_ENTITY = '@@evaluation/DELETE_ENTITY',
  RENAME_ENTITY = '@@evaluation/RENAME_ENTITY',
  CREATE_ACCOUNT = '@@evaluation/CREATE_ACCOUNT',
  CREATE_CATEGORY = '@@evaluation/CREATE_CATEGORY',
}

export namespace EvaluationActionCreators {
  export const expense = (
    raw: string,
    data: {
      categoryId: string
      accountId: string
      amount: number
    }
  ) => {
    return {
      type: EvaluationActionTypes.EXPENSE,
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
      type: EvaluationActionTypes.INCOME,
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
      type: EvaluationActionTypes.CREATE_ACCOUNT,
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
      type: EvaluationActionTypes.CREATE_CATEGORY,
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
      type: EvaluationActionTypes.STATUS,
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
      type: EvaluationActionTypes.DELETE_ENTITY,
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
      type: EvaluationActionTypes.RENAME_ENTITY,
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
