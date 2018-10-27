import { combineReducers } from 'redux'
import { ApplicationState } from './interface'
import { transactionListReducer } from './transactionList/reducer'

export const rootReducer = combineReducers<ApplicationState>({
  transactionList: transactionListReducer,
})
