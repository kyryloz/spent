import { App } from '../interface'

export namespace Categories {
  export interface State {
    readonly byId: {
      [id: string]: Category
    }
    readonly allIds: Array<string>
  }

  export const enum ActionTypes {
    CATEGORY_REMOVE = '@@category/REMOVE',
  }

  export type Action = App.Action<any, ActionTypes>

  export namespace Actions {
    export type Remove = App.Action<Category, ActionTypes>
  }

  export interface Category extends App.Identifiable {
    readonly name: string
    readonly createdAt: number
    readonly createdByCommandId: string
    readonly commandIds: Array<string>
  }
}
