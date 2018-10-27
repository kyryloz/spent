import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'
import { ApplicationState } from './interface'

export const configureStore = (history: History): Store<ApplicationState> => {
  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    connectRouter(history)(rootReducer),
    undefined,
    composeEnhancers(applyMiddleware(routerMiddleware(history)))
  )

  return store
}
