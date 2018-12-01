export type SmartInputAction =
  | ReturnType<typeof SmartInputActionCreator.setInput>
  | ReturnType<typeof SmartInputActionCreator.setFocus>

export const enum SmartInputActionType {
  SET_INPUT = '@@smartInput/SET_INPUT',
  SET_FOCUS = '@@smartInput/SET_FOCUS',
}

export namespace SmartInputActionCreator {
  export const setInput = (input: string) => ({
    type: SmartInputActionType.SET_INPUT,
    payload: {
      input,
    },
  })

  export const setFocus = (focus: boolean) => ({
    type: SmartInputActionType.SET_FOCUS,
    payload: {
      focus,
    },
  })
}
