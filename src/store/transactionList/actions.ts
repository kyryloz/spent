import { action } from 'typesafe-actions'
import { uuidv4 } from '../../utils/math'
import { TransactionListActionTypes } from './interface'

export const addTransaction = (content: string) =>
  action(TransactionListActionTypes.ENTRY_ADD, {
    id: uuidv4(),
    content,
  })

export const removeTransaction = (id: string) => action(TransactionListActionTypes.ENTRY_REMOVE, id)
