import { combineReducers } from 'redux'
import { Application } from './interface'
import { transactions } from './transactions/reducer'

export const rootReducer = combineReducers<Application.State>({
  transactions,
})
