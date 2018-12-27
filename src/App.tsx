import { MuiThemeProvider } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import { createHashHistory } from 'history'
import * as React from 'react'
import { Provider } from 'react-redux'
import { EvaluationActionCreator } from 'store/evaluation/actions'
import { Routes } from './routes'
import { configureStore } from './store/configureStore'
import { spentTheme } from './theme'

const history = createHashHistory()

const store = configureStore(history)

const testAccountAction = EvaluationActionCreator.createAccount('create account wallet', 'wallet')

const testCategoryAction = EvaluationActionCreator.createCategory(
  'create category clothes',
  'clothes'
)

const testIncomeAction = EvaluationActionCreator.income('income 1000 to wallet', {
  accountId: testAccountAction.payload.data.id,
  amount: 1000,
  date: '25.11.2018'
})

const testExpenseAction = EvaluationActionCreator.expense('expense 100 on clothes from wallet', {
  accountId: testAccountAction.payload.data.id,
  categoryId: testCategoryAction.payload.data.id,
  amount: 100,
  date: '25.11.2018'
})

store.dispatch(testAccountAction)
store.dispatch(testCategoryAction)
store.dispatch(testIncomeAction)
store.dispatch(testExpenseAction)

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={spentTheme}>
        <Routes />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
)
