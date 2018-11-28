import { SmartInput } from './interface'

export namespace smartInputActionCreator {
  export const setInput = (input: string): SmartInput.Actions.SetInput => ({
    type: SmartInput.ActionTypes.SET_INPUT,
    payload: input,
  })

  export const setFocus = (focus: boolean): SmartInput.Actions.SetFocus => ({
    type: SmartInput.ActionTypes.SET_FOCUS,
    payload: focus,
  })

  export const setPrefix = (prefix: string): SmartInput.Actions.SetPrefix => ({
    type: SmartInput.ActionTypes.SET_PREFIX,
    payload: prefix,
  })
}
