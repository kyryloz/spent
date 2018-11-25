import { combineReducers } from 'redux'
import { accounts } from './accounts/reducer'
import { categories } from './categories/reducer'
import { commands } from './commands/reducer'
import { App } from './interface'
import { smartInput } from './ui/smartInput/reducer'

export const rootReducer = combineReducers<App.State>({
  entities: combineReducers({
    accounts,
    categories,
  }),
  ui: combineReducers({
    smartInput,
  }),
  commands,
})
