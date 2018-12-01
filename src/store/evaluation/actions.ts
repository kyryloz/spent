import * as moment from 'moment'
import { Commands } from 'store/model/commands/interface'
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
  EVALUATION_EXPENSE = '@@evaluation/EXPENSE',
  EVALUATION_INCOME = '@@evaluation/INCOME',
  EVALUATION_STATUS = '@@evaluation/STATUS',
  EVALUATION_DELETE_ENTITY = '@@evaluation/DELETE_ENTITY',
  EVALUATION_RENAME_ENTITY = '@@evaluation/RENAME_ENTITY',
  EVALUATION_CREATE_ACCOUNT = '@@evaluation/CREATE_ACCOUNT',
  EVALUATION_CREATE_CATEGORY = '@@evaluation/CREATE_CATEGORY',
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
      type: EvaluationActionTypes.EVALUATION_EXPENSE,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: Commands.DataType.EXPENSE,
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
      type: EvaluationActionTypes.EVALUATION_INCOME,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: Commands.DataType.INCOME,
          ...data,
        },
      },
    }
  }

  export const createAccount = (raw: string, name: string) => {
    return {
      type: EvaluationActionTypes.EVALUATION_CREATE_ACCOUNT,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: Commands.DataType.CREATE_ACCOUNT,
          id: uuidv4(),
          name,
        },
      },
    }
  }

  export const createCategory = (raw: string, name: string) => {
    return {
      type: EvaluationActionTypes.EVALUATION_CREATE_CATEGORY,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: Commands.DataType.CREATE_CATEGORY,
          id: uuidv4(),
          name,
        },
      },
    }
  }

  export const status = (
    raw: string,
    data: {
      entity: Commands.Entity
    }
  ) => {
    return {
      type: EvaluationActionTypes.EVALUATION_STATUS,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: Commands.DataType.STATUS,
          ...data,
        },
      },
    }
  }

  export const deleteEntity = (
    raw: string,
    data: {
      entity: Commands.Entity
      entityId: string
      entityName: string
    }
  ) => {
    return {
      type: EvaluationActionTypes.EVALUATION_DELETE_ENTITY,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: Commands.DataType.DELETE_ENTITY,
          ...data,
        },
      },
    }
  }

  export const renameEntity = (
    raw: string,
    data: {
      entity: Commands.Entity
      entityId: string
      entityOldName: string
      entityNewName: string
    }
  ) => {
    return {
      type: EvaluationActionTypes.EVALUATION_RENAME_ENTITY,
      payload: {
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        data: {
          dataType: Commands.DataType.RENAME_ENTITY,
          ...data,
        },
      },
    }
  }
}
