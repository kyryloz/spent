import { uuidv4 } from '../../utils/math'
import { Application } from '../interface'
import { Transactions } from './interface'

export const addTransaction = <T extends Transactions.TransactionPayload>(
  rawContent: string,
  data: T
): Application.Action<
  Transactions.Transaction<Transactions.TransactionPayload>,
  Transactions.ActionTypes
> => ({
  type: Transactions.ActionTypes.TRANSACTION_ADD,
  payload: {
    id: uuidv4(),
    rawContent,
    data,
  },
})

export const removeTransaction = (
  id: string
): Application.Action<string, Transactions.ActionTypes> => ({
  type: Transactions.ActionTypes.TRANSACTION_REMOVE,
  payload: id,
})

export const errorTransaction = (
  error: string
): Application.Action<string, Transactions.ActionTypes> => ({
  type: Transactions.ActionTypes.TRANSACTION_PARSE_ERROR,
  payload: error,
})
