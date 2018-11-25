import { Reducer } from 'redux'
import { Commands } from 'store/commands/interface'
import { App } from 'store/interface'
import { SmartInput } from './interface'

const initialState: SmartInput.State = {
  input: '',
}

export const smartInput: Reducer<SmartInput.State, App.Action> = (
  state = initialState,
  action
): SmartInput.State => {
  switch (action.type) {
    case SmartInput.ActionTypes.SET_INPUT: {
      const payload = (<SmartInput.Actions.Set>action).payload
      return {
        input: payload.input,
      }
    }
    case Commands.ActionTypes.COMMAND_CREATE_ACCOUNT:
    case Commands.ActionTypes.COMMAND_CREATE_CATEGORY:
    case Commands.ActionTypes.COMMAND_EXPENSE:
    case Commands.ActionTypes.COMMAND_INCOME:
    case Commands.ActionTypes.COMMAND_STATUS: {
      return {
        input: '',
      }
    }
    default: {
      return state
    }
  }
}
