import { Reducer } from 'redux'
import { EntriesActionTypes, EntriesState } from './interface'

const initialState: EntriesState = {
  entries: [],
}

export const entriesReducer: Reducer<EntriesState> = (state = initialState, action) => {
  switch (action.type) {
    case EntriesActionTypes.ENTRY_ADD: {
      return {
        ...state,
        entries: [...state.entries, action.payload],
      }
    }
    case EntriesActionTypes.ENTRY_REMOVE: {
      return {
        ...state,
        entries: state.entries.filter(entry => entry.id !== action.payload),
      }
    }
    default: {
      return state
    }
  }
}
