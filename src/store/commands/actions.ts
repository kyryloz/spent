import { Commands } from './interface'
import { uuidv4 } from 'utils/mathUtils'
import * as moment from 'moment'

export namespace CommandsActionCreator {
  export const evaluate = () => {
    return {
      type: Commands.ActionTypes.COMMAND_EVALUATE,
    }
  }

  export const expense = (
    raw: string,
    data: {
      dataType: Commands.DataType.EXPENSE
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
        data,
      },
    }
  }

  export const income = (
    raw: string,
    data: {
      dataType: Commands.DataType.INCOME
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
        data,
      },
    }
  }

  export const createAccount = (
    raw: string,
    command: {
      id: string
      name: string
    }
  ) => {
    return {
      type: Commands.ActionTypes.COMMAND_CREATE_ACCOUNT,
      payload: {
        dataType: Commands.DataType.CREATE_ACCOUNT,
        id: uuidv4(),
        timestamp: moment().unix(),
        raw,
        ...command,
      },
    }
  }

  export const addCreateCategoryCommand = (
    payload: Commands.CreateCategoryData
  ): Commands.Actions.CreateCategoryCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_CREATE_CATEGORY,
      payload,
    }
  }

  export const addStatusCommand = (
    payload: Commands.StatusData
  ): Commands.Actions.StatusCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_STATUS,
      payload,
    }
  }

  export const addDeleteEntityCommand = (
    payload: Commands.DeleteEntityData
  ): Commands.Actions.DeleteEntityCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_DELETE_ENTITY,
      payload,
    }
  }

  export const addRenameEntityCommand = (
    payload: Commands.RenameEntityData
  ): Commands.Actions.RenameEntityCommand => {
    return {
      type: Commands.ActionTypes.COMMAND_RENAME_ENTITY,
      payload,
    }
  }

  export const removeCommand = (payload: { id: string }) => ({
    type: Commands.ActionTypes.COMMAND_REMOVE,
    payload,
  })

  export const edit = (id: string): Commands.Actions.Edit => ({
    type: Commands.ActionTypes.COMMAND_EDIT,
    payload: {
      id,
    },
  })

  export const error = (payload: Commands.ErrorData): Commands.Actions.Error => ({
    type: Commands.ActionTypes.COMMAND_ERROR,
    payload,
  })
}
