export namespace Transactions {
  export interface State {
    readonly recent: Array<Transaction>
  }

  export const enum ActionTypes {
    TRANSACTION_ADD,
    TRANSACTION_REMOVE,
  }

  export interface Transaction {
    readonly id: string
    readonly rawContent: string
    readonly tree: Tree
  }

  export interface Tree {
    t: any
  }
}
