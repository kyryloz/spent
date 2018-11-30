export namespace SmartInput {
  export interface State {
    readonly input: string
    readonly focus: boolean
  }

  export const enum ActionTypes {
    SET_INPUT = '@@smartInput/SET_INPUT',
    SET_FOCUS = '@@smartInput/SET_FOCUS',
  }
}
