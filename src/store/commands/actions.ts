import * as moment from 'moment'
import { uuidv4 } from 'utils/mathUtils'
import { Commands } from './interface'

export type CommandsActions =
  | ReturnType<typeof CommandsActionCreator.evaluate>
  | ReturnType<typeof CommandsActionCreator.createAccount>
  | ReturnType<typeof CommandsActionCreator.createCategory>
  | ReturnType<typeof CommandsActionCreator.deleteEntity>
  | ReturnType<typeof CommandsActionCreator.error>
  | ReturnType<typeof CommandsActionCreator.expense>
  | ReturnType<typeof CommandsActionCreator.income>
  | ReturnType<typeof CommandsActionCreator.removeCommand>
  | ReturnType<typeof CommandsActionCreator.renameEntity>
  | ReturnType<typeof CommandsActionCreator.status>

export namespace CommandsActionCreator {
  export const evaluate = () => {
    return {
      type: Commands.ActionTypes.COMMAND_EVALUATE,
      payload: {}
    }
  }

  export const expense = (
    raw: string,
    data: {
      categoryId: string
      accountId: string
      amount: number
    }
  ) => {
    return {
      type: Commands.ActionTypes.COMMAND_EXPENSE,
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
      type: Commands.ActionTypes.COMMAND_INCOME,
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
      type: Commands.ActionTypes.COMMAND_CREATE_ACCOUNT,
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
      type: Commands.ActionTypes.COMMAND_CREATE_CATEGORY,
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
      type: Commands.ActionTypes.COMMAND_STATUS,
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
      type: Commands.ActionTypes.COMMAND_DELETE_ENTITY,
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
      type: Commands.ActionTypes.COMMAND_RENAME_ENTITY,
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

  export const removeCommand = (id: string) => ({
    type: Commands.ActionTypes.COMMAND_REMOVE,
    payload: {
      id,
    },
  })

  export const error = (human: string) => ({
    type: Commands.ActionTypes.COMMAND_ERROR,
    payload: {
      human,
    },
  })
}
