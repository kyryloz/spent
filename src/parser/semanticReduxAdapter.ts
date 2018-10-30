import { Dispatch } from 'redux'
import { addTransaction } from '../store/transactions/actions'
import { parseGrammar } from './parser'
import { evaluateAction } from './semantic'

export const processInput = (input: string, dispatch: Dispatch) => {
  const parseResult = parseGrammar(input)

  if (parseResult.error) {
    dispatch(
      addTransaction(input, {
        error: parseResult.message,
      })
    )
    return
  }

  evaluateAction(parseResult.match, {
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
          source,
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
