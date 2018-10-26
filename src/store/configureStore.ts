import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { Action, applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

interface IApplicationState {
  value: 42
}

const rootReducer = (state: IApplicationState, _: Action) => state

export const configureStore = (history: History): Store<IApplicationState> => {
  const composeEnhancers = composeWithDevTools({})

  const store = createStore(
    connectRouter(history)(rootReducer),
    undefined,
    composeEnhancers(applyMiddleware(routerMiddleware(history)))
  )

  return store
}
