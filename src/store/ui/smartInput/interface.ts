import { App } from '../../interface'

export namespace SmartInput {
  export interface State {
    readonly input: string
    readonly focus: boolean
    readonly prefix: string
  }

  export const enum ActionTypes {
    SET_INPUT = '@@smartInput/SET_INPUT',
    SET_FOCUS = '@@smartInput/SET_FOCUS',
    SET_PREFIX = '@@smartInput/SET_PREFIX',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type SetInput = App.Action<string, ActionTypes.SET_INPUT>
    export type SetFocus = App.Action<boolean, ActionTypes.SET_FOCUS>
    export type SetPrefix= App.Action<string, ActionTypes.SET_PREFIX>
  }
}
