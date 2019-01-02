import { routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { evaluationMiddleware } from 'store/evaluation/middleware'
import { App } from 'store/interface'
import { rootReducer } from 'store/rootReducer'
import { cliMiddleware } from './model/cli/middleware'

export const configureStore = (history: History): Store<App.State> => {
  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    rootReducer(history),
    undefined,
    composeEnhancers(
      applyMiddleware(routerMiddleware(history), evaluationMiddleware, cliMiddleware)
    )
  )

  return store
}
