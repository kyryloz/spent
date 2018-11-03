import { uuidv4 } from '../../utils/math'
import { Transactions } from './interface'

export const addTransaction = <T extends Transactions.TransactionDetails>(
  rawContent: string,
  details: T
): Transactions.Actions.Add => ({
  type: Transactions.ActionTypes.TRANSACTION_ADD,
  payload: {
    id: uuidv4(),
    rawContent,
    details,
  },
})

export const removeTransaction = (id: string): Transactions.Actions.Remove => ({
  type: Transactions.ActionTypes.TRANSACTION_REMOVE,
  payload: id,
})

export const errorTransaction = (error: string): Transactions.Actions.ParsingError => ({
  type: Transactions.ActionTypes.TRANSACTION_PARSE_ERROR,
  payload: error,
})
