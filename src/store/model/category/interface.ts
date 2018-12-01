import { App } from 'store/interface'

export namespace CategoryModel {
  export interface State {
    readonly byId: {
      [id: string]: Category
    }
    readonly allIds: Array<string>
  }

  export interface Category extends App.Identifiable {
    readonly name: string
    readonly createdAt: number
    readonly createdByCommandId: string
    readonly commandIds: Array<string>
  }
}
