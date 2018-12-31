export namespace CategoryModel {
  export interface State {
    readonly items: {
      [id: string]: Category
    }
  }

  export interface Category {
    readonly id: string
    readonly name: string
    readonly createdAt: number
  }
}
