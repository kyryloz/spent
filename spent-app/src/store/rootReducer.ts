import { coreReducer } from '@spent/core'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import { combineReducers } from 'redux'
import { App } from 'store/interface'
import { cli } from 'store/model/cli/reducer'
import { smartInput } from 'store/model/ui/cliInput/reducer'

export const rootReducer = (history: History) =>
  combineReducers<App.State>({
    router: connectRouter(history),
    core: coreReducer,
    ui: combineReducers({
      smartInput,
    }),
    commands: cli,
  })
