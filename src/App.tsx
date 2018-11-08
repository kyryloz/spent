import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { cyan } from '@material-ui/core/colors'
import { ConnectedRouter } from 'connected-react-router'
import { createHashHistory } from 'history'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Routes } from './routes'
import { Commands } from './store/commands/interface'
import { configureStore } from './store/configureStore'

const history = createHashHistory()

const store = configureStore(history)

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Inconsolata', 'monospace'].join(','),
  },
  palette: {
    type: 'dark',
    primary: { main: cyan[500] },
  },
})

const createTestAccountAction: Commands.Actions.CreateAccountCommand = {
  type: Commands.ActionTypes.COMMAND_CREATE_ACCOUNT,
  payload: {
    id: 'commandId1',
    raw: 'create account wallet',
    timestamp: 1541701827,
    data: {
      dataType: Commands.DataType.CREATE_ACCOUNT,
      id: 'accountId1',
      name: 'wallet',
    },
  },
}

const createTestCategoryAction: Commands.Actions.CreateCategoryCommand = {
  type: Commands.ActionTypes.COMMAND_CREATE_CATEGORY,
  payload: {
    id: 'commandId2',
    raw: 'create category clothes',
    timestamp: 1541701827,
    data: {
      dataType: Commands.DataType.CREATE_CATEGORY,
      id: 'categoryId1',
      name: 'clothes',
    },
  },
}

const createTestExpenseAction: Commands.Actions.ExpenseCommand = {
  type: Commands.ActionTypes.COMMAND_EXPENSE,
  payload: {
    id: 'commandId3',
    raw: 'expense 100 on clothes from wallet',
    timestamp: 1541701827,
    data: {
      dataType: Commands.DataType.EXPENSE,
      accountId: 'accountId1',
      categoryId: 'categoryId1',
      amount: 100,
    },
  },
}

store.dispatch(createTestAccountAction)
store.dispatch(createTestCategoryAction)
store.dispatch(createTestExpenseAction)

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
)
