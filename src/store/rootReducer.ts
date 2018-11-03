import { combineReducers } from 'redux'
import { accounts } from './accounts/reducer'
import { categories } from './categories/reducer'
import { App } from './interface'
import { transactions } from './transactions/reducer'

export const rootReducer = combineReducers<App.State>({
  transactions,
  accounts,
  categories,
})
