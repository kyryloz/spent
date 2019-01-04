import { combineReducers } from 'redux'
import { accounts } from './account/reducer'
import { categories } from './category/reducer'
import { transactions } from './transactions/reducer'

export const coreReducer = combineReducers({
  accounts,
  categories,
  transactions,
})
