export namespace AccountModel {
  export interface State {
    readonly items: {
      [id: string]: Account
    }
    readonly byId: {
      [id: string]: Account
    }
    readonly allIds: Array<string>
  }

  export interface Account {
    readonly id: string
    readonly name: string
    readonly createdAt: number
    readonly createdByCommandId: string // deprecated
    readonly commandIds: Array<string> // deprecated
  }
}
