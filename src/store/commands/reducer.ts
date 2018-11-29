import { includes } from 'lodash'
import { Reducer } from 'redux'
import { Accounts } from 'store/accounts/interface'
import { Categories } from 'store/categories/interface'
import { App } from '../interface'
import { Commands } from './interface'
import { CommandsActionCreator } from './actions'

const initialState: Commands.State = {
  items: [],
  error: {
    human: '',
  },
}

export const commands: Reducer<Commands.State, App.Action> = (
  state = initialState,
  action
): Commands.State => {
  switch (action.type) {
    case Commands.ActionTypes.COMMAND_CREATE_ACCOUNT:
    case Commands.ActionTypes.COMMAND_CREATE_CATEGORY:
    case Commands.ActionTypes.COMMAND_EXPENSE:
    case Commands.ActionTypes.COMMAND_INCOME:
    case Commands.ActionTypes.COMMAND_DELETE_ENTITY:
    case Commands.ActionTypes.COMMAND_RENAME_ENTITY:
    case Commands.ActionTypes.COMMAND_STATUS: {
      return {
        ...state,
        items: [...state.items, action.payload],
        error: {
          human: '',
        },
      }
    }
    case Commands.ActionTypes.COMMAND_REMOVE: {
      const {
        payload: { id },
      } = action as ReturnType<typeof CommandsActionCreator.removeCommand>

      return {
        ...state,
        items: state.items.filter(item => item.id !== id),
        error: {
          human: '',
        },
      }
    }
    case Commands.ActionTypes.COMMAND_ERROR: {
      const payload = (<Commands.Actions.Error>action).payload

      return {
        ...state,
        error: payload,
      }
    }
    default: {
      return state
    }
  }
}
