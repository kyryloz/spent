import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { App } from 'store/interface'
import { accounts } from 'store/model/account/reducer'
import { categories } from 'store/model/category/reducer'
import { cli } from 'store/model/cli/reducer'
import { transactions } from 'store/model/transactions/reducer'
import { smartInput } from 'store/model/ui/smartInput/reducer'

export const rootReducer = (history: History) =>
  combineReducers<App.State>({
    router: connectRouter(history),
    entities: combineReducers({
      accounts,
      categories,
      transactions,
    }),
    ui: combineReducers({
      smartInput,
    }),
    commands: cli,
  })
