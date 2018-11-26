import { Reducer } from 'redux'
import { Commands } from 'store/commands/interface'
import { App } from 'store/interface'
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
      const { payload } = action as SmartInput.Actions.Set

      return payload
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
