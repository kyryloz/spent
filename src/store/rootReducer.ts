import { combineReducers } from 'redux'
import { accounts } from 'store/model/accounts/reducer'
import { categories } from 'store/model/categories/reducer'
import { commands } from 'store/model/commands/reducer'
import { smartInput } from 'store/model/ui/smartInput/reducer'
import { App } from 'store/interface'

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
