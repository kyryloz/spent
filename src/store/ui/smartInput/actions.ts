import { SmartInput } from './interface'

export namespace SmartInputActionCreator {
  export const setInput = (input: string) => ({
    type: SmartInput.ActionTypes.SET_INPUT,
    payload: {
      input,
    },
  })

  export const setFocus = (focus: boolean) => ({
    type: SmartInput.ActionTypes.SET_FOCUS,
    payload: {
      focus,
    },
  })
}
