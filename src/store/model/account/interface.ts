import { App } from 'store/interface'

export namespace AccountModel {
  export interface State {
    readonly byId: {
      [id: string]: Account
    }
    readonly allIds: Array<string>
  }

  export interface Account extends App.Identifiable {
    readonly name: string
    readonly createdAt: number
    readonly createdByCommandId: string
    readonly commandIds: Array<string>
  }
}
