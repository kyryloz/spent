import { combineReducers } from 'redux'
import { ApplicationState } from './interface'
import { entriesReducer } from './entries/reducer'

export const rootReducer = combineReducers<ApplicationState>({
  entries: entriesReducer,
})
