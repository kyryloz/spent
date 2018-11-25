import { Reducer } from 'redux'
import { Commands } from './interface'
import { App } from '../interface'

const initialState: Commands.State = {
  items: [],
  error: {
    human: ''
  }
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
    case Commands.ActionTypes.COMMAND_STATUS: {
      return {
        ...state,
        items: [...state.items, action.payload],
        error: {
          human: ''
        }
      }
    }
    case Commands.ActionTypes.COMMAND_REMOVE: {
      const payload = (<Commands.Actions.Remove>action).payload

      return {
        ...state,
        items: state.items.filter(entry => entry.id !== payload.id),
      }
    }
    case Commands.ActionTypes.COMMAND_ERROR: {
      const payload = (<Commands.Actions.Error>action).payload

      return {
        ...state,
        error: payload
      }
    }
    default: {
      return state
    }
  }
}
