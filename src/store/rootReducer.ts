import { combineReducers } from 'redux'
import { accounts } from './accounts/reducer'
import { categories } from './categories/reducer'
import { Application } from './interface'
import { transactions } from './transactions/reducer'

export const rootReducer = combineReducers<Application.State>({
  transactions,
  accounts,
  categories,
})
