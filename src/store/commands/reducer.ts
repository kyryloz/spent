import { Reducer } from 'redux'
import { Commands } from './interface'
import { App } from '../interface'

const initialState: Commands.State = {
  items: [],
}

export const commands: Reducer<Commands.State, App.Action> = (
  state = initialState,
  action
): Commands.State => {
  switch (action.type) {
    case Commands.ActionTypes.COMMAND_ADD_CREATE_ACCOUNT:
    case Commands.ActionTypes.COMMAND_ADD_CREATE_CATEGORY:
    case Commands.ActionTypes.COMMAND_ADD_EXPENSE:
    case Commands.ActionTypes.COMMAND_ADD_INCOME:
    case Commands.ActionTypes.COMMAND_ADD_STATUS: {
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    }
    case Commands.ActionTypes.COMMAND_REMOVE: {
      const payload = (<Commands.Actions.Remove>action).payload

      return {
        ...state,
        items: state.items.filter(entry => entry.id !== payload.id),
      }
    }
    default: {
      return state
    }
  }
}
