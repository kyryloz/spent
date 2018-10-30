namespace SemanticAdapter {
  export interface Subscription {
    unsubscribe: () => void
  }

  export interface Stream {
    processAction: (action: Action) => void
  }

  export enum ActionType {
    CREATE, EXPENSE, INCOME, STATUS
  }

  export interface Action {
    type: ActionType
  }
}

// export const parse(input: string): (Promise<SemanticAdapter.Action>) => {
//   return todo
// }
