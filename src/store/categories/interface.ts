import { Application } from '../interface'

export namespace Categories {
  export interface State {
    readonly list: Array<Category>
  }

  export const enum ActionTypes {
    CATEGORY_ADD = '@@category/ADD',
    CATEGORY_REMOVE = '@@category/REMOVE',
  }

  export type Action = Application.Action<any, ActionTypes>

  export namespace Actions {
    export type Add = Application.Action<Category, ActionTypes>
    export type Remove = Application.Action<Application.Identifiable, ActionTypes>
  }

  export interface Category extends Application.Identifiable {
    readonly name: string
  }
}
