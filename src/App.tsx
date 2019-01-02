import { MuiThemeProvider } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import { createHashHistory } from 'history'
import * as React from 'react'
import { Provider } from 'react-redux'
import { EvaluationActionCreator } from 'store/evaluation/actions'
import { SmartInputActionCreator } from 'store/model/ui/cliInput/actions'
import { Routes } from './routes'
import { configureStore } from './store/configureStore'
import { spentTheme } from './theme'

const history = createHashHistory()

const store = configureStore(history)

store.dispatch(SmartInputActionCreator.setInput('create account wallet'))
store.dispatch(EvaluationActionCreator.evaluate())

store.dispatch(SmartInputActionCreator.setInput('create category clothes'))
store.dispatch(EvaluationActionCreator.evaluate())

store.dispatch(SmartInputActionCreator.setInput('income 1000 to wallet'))
store.dispatch(EvaluationActionCreator.evaluate())

store.dispatch(SmartInputActionCreator.setInput('expense 100 on clothes from wallet'))
store.dispatch(EvaluationActionCreator.evaluate())

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={spentTheme}>
        <Routes />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
)
