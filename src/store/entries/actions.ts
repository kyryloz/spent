import { action } from 'typesafe-actions'
import { EntriesActionTypes } from './interface'

export const addEntry = (content: string) => action(EntriesActionTypes.ENTRY_ADD, content)

export const removeEntry = (id: string) => action(EntriesActionTypes.ENTRY_REMOVE, id)
