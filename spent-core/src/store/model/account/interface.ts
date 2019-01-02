export namespace AccountModel {
  export interface State {
    readonly items: {
      [id: string]: Account
    }
  }

  export interface Account {
    readonly id: string
    readonly name: string
    readonly createdAt: number
  }
}
