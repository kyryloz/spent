import { Reducer } from 'redux'
import { Commands } from 'store/commands/interface'
import { App } from 'store/interface'
import { SmartInput } from './interface'

const initialState: SmartInput.State = {
  input: '',
  focus: true,
  prefix: '',
}

export const smartInput: Reducer<SmartInput.State, App.Action> = (
  state = initialState,
  action
): SmartInput.State => {
  switch (action.type) {
    case SmartInput.ActionTypes.SET_INPUT: {
      const { payload: input } = action as SmartInput.Actions.SetInput

      return {
        ...state,
        input
      }
    }
    case SmartInput.ActionTypes.SET_FOCUS: {
      const { payload: focus } = action as SmartInput.Actions.SetFocus

      return {
        ...state,
        focus
      }
    }
    case SmartInput.ActionTypes.SET_PREFIX: {
      const { payload: prefix } = action as SmartInput.Actions.SetPrefix

      return {
        ...state,
        prefix
      }
    }
    case Commands.ActionTypes.COMMAND_CREATE_ACCOUNT:
    case Commands.ActionTypes.COMMAND_CREATE_CATEGORY:
    case Commands.ActionTypes.COMMAND_EXPENSE:
    case Commands.ActionTypes.COMMAND_INCOME:
    case Commands.ActionTypes.COMMAND_DELETE_ENTITY:
    case Commands.ActionTypes.COMMAND_RENAME_ENTITY:
    case Commands.ActionTypes.COMMAND_REMOVE:
    case Commands.ActionTypes.COMMAND_STATUS: {
      return {
        input: '',
        focus: false,
        prefix: '',
      }
    }
    default: {
      return state
    }
  }
}
