import { App } from '../../interface'

export namespace SmartInput {
  export interface State {
    readonly input: string
  }

  export const enum ActionTypes {
    SET_INPUT = '@@smartInput/SET',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Set = App.Action<SetData, ActionTypes.SET_INPUT>
  }

  export interface SetData {
    readonly input: string
  }
}
