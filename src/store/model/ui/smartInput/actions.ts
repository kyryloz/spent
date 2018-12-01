export const enum SmartInputActionTypes {
  SET_INPUT = '@@smartInput/SET_INPUT',
  SET_FOCUS = '@@smartInput/SET_FOCUS',
}

export type SmartInputActions =
  | ReturnType<typeof SmartInputActionCreator.setInput>
  | ReturnType<typeof SmartInputActionCreator.setFocus>

export namespace SmartInputActionCreator {
  export const setInput = (input: string) => ({
    type: SmartInputActionTypes.SET_INPUT,
    payload: {
      input,
    },
  })

  export const setFocus = (focus: boolean) => ({
    type: SmartInputActionTypes.SET_FOCUS,
    payload: {
      focus,
    },
  })
}
