export namespace CategoryModel {
  export interface State {
    readonly items: {
      [id: string]: Category
    }
    readonly byId: {
      [id: string]: Category
    }
    readonly allIds: Array<string>
  }

  export interface Category {
    readonly id: string
    readonly name: string
    readonly createdAt: number
    readonly createdByCommandId: string // deprecated
    readonly commandIds: Array<string> // deprecated
  }
}
