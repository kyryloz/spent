import { App } from '../interface'

export namespace Categories {
  export interface State {
    readonly items: Array<Category>
  }

  export const enum ActionTypes {
    CATEGORY_ADD = '@@category/ADD',
    CATEGORY_REMOVE = '@@category/REMOVE',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Add = App.Action<Category, ActionTypes>
    export type Remove = App.Action<App.Identifiable, ActionTypes>
  }

  export interface Category extends App.Identifiable {
    readonly name: string
  }
}
