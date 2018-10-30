import { uuidv4 } from '../../utils/math'
import { Application } from '../interface'
import { Transactions } from './interface'

export const addTransaction = (
  rawContent: string,
  payload: any
): Application.Action<Transactions.Transaction> => ({
  type: Transactions.ActionTypes.TRANSACTION_ADD,
  payload: {
    id: uuidv4(),
    rawContent,
    payload,
  },
})

export const removeTransaction = (id: string): Application.Action<string> => ({
  type: Transactions.ActionTypes.TRANSACTION_REMOVE,
  payload: id,
})
