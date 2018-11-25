import { SmartInput } from './interface'

export namespace smartInputActionCreator {
  export const setInput = (payload: SmartInput.SetData): SmartInput.Actions.Set => ({
    type: SmartInput.ActionTypes.SET_INPUT,
    payload,
  })
}
