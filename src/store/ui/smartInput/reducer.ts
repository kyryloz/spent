import { Reducer } from 'redux'
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
    default: {
      return state
    }
  }
}
