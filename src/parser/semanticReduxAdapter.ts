import { Dispatch } from 'redux'
import { addTransaction } from '../store/transactions/actions'
import { parseGrammar } from './parser'
import { evaluateAction } from './semantic'

// namespace SemanticAdapter {
//   export interface Subscription {
//     unsubscribe: () => void
//   }

//   export interface Stream {
//     processAction: (action: Action) => void
//   }

//   export enum ActionType {
//     CREATE,
//     EXPENSE,
//     INCOME,
//     STATUS,
//   }

//   export interface Action {
//     type: ActionType
//   }
// }

export const parse = (input: string, dispatch: Dispatch) => {
  const match = parseGrammar(input)

  evaluateAction(match, {
    create: (entity, name) => {
      dispatch(
        addTransaction(input, {
          entity,
          name,
        })
      )
    },
    expense: (category, amount, source) => {
      dispatch(
        addTransaction(input, {
          category,
          amount,
          source
        })
      )
    },
    income: (accountName, amount) => {
      dispatch(
        addTransaction(input, {
          accountName,
          amount,
        })
      )
    },
    status: what => {
      dispatch(
        addTransaction(input, {
          what,
        })
      )
    },
  })
}
