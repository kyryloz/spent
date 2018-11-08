import { combineReducers } from 'redux'
import { accounts } from './accounts/reducer'
import { categories } from './categories/reducer'
import { commands } from './commands/reducer'
import { App } from './interface'

export const rootReducer = combineReducers<App.State>({
  entities: combineReducers({
    accounts,
    categories,
  }),
  commands,
})
