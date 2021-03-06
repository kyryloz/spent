export type SmartInputAction =
  | ReturnType<typeof SmartInputActionCreator.setInput>
  | ReturnType<typeof SmartInputActionCreator.setFocus>
  | ReturnType<typeof SmartInputActionCreator.historyUp>
  | ReturnType<typeof SmartInputActionCreator.historyDown>
  | ReturnType<typeof SmartInputActionCreator.error>

export const enum SmartInputActionType {
  SET_INPUT = '@@smartInput/SET_INPUT',
  SET_FOCUS = '@@smartInput/SET_FOCUS',
  HISTORY_UP = '@@smartInput/HISTORY_UP',
  HISTORY_DOWN = '@@smartInput/HISTORY_DOWN',
  ERROR = '@@smartInput/ERROR',
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

  export const historyUp = () => ({
    type: SmartInputActionType.HISTORY_UP,
  })

  export const historyDown = () => ({
    type: SmartInputActionType.HISTORY_DOWN,
  })

  export const error = (human: string) => ({
    type: SmartInputActionType.ERROR,
    payload: {
      human,
    },
  })
}
