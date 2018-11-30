import { Reducer } from 'redux'
import { Commands } from 'store/commands/interface'
import { App } from 'store/interface'
import { SmartInputActionCreator } from './actions'
import { SmartInput } from './interface'

const initialState: SmartInput.State = {
  input: '',
  focus: true,
}

export const smartInput: Reducer<SmartInput.State, App.Action> = (
  state = initialState,
  action
): SmartInput.State => {
  switch (action.type) {
    case SmartInput.ActionTypes.SET_INPUT: {
      const {
        payload: { input },
      } = action as ReturnType<typeof SmartInputActionCreator.setInput>

      return {
        ...state,
        input,
      }
    }
    case SmartInput.ActionTypes.SET_FOCUS: {
      const {
        payload: { focus },
      } = action as ReturnType<typeof SmartInputActionCreator.setFocus>

      return {
        ...state,
        focus,
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
      }
    }
    default: {
      return state
    }
  }
}
