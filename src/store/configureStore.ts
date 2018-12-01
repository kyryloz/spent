import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { evaluationMiddleware } from 'store/evaluation/middleware'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { App } from 'store/interface'
import { rootReducer } from 'store/rootReducer'

export const configureStore = (history: History): Store<App.State> => {
  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    connectRouter(history)(rootReducer),
    undefined,
    composeEnhancers(applyMiddleware(routerMiddleware(history), evaluationMiddleware))
  )

  return store
}
