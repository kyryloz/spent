import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { ConnectedRouter } from 'connected-react-router'
import { createHashHistory } from 'history'
import * as React from 'react'
import { Provider } from 'react-redux'
import { Routes } from './routes'
import { configureStore } from './store/configureStore'
import { cyan } from '@material-ui/core/colors'

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

export const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>
)
