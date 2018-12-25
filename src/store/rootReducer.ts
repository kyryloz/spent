import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { accounts } from 'store/model/account/reducer'
import { categories } from 'store/model/category/reducer'
import { commands } from 'store/model/command/reducer'
import { smartInput } from 'store/model/ui/smartInput/reducer'
import { App } from 'store/interface'

export const rootReducer = (history: History) => combineReducers<App.State>({
  router: connectRouter(history),
  entities: combineReducers({
    accounts,
    categories,
  }),
  ui: combineReducers({
    smartInput,
  }),
  commands,
})
