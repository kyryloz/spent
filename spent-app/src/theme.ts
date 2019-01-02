import { createMuiTheme } from '@material-ui/core'
import { cyan, amber, teal, red, green, grey, orange } from '@material-ui/core/colors'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    colors: {
      category: React.CSSProperties['color']
      account: React.CSSProperties['color']
      expense: React.CSSProperties['color']
      income: React.CSSProperties['color']
      transfer: React.CSSProperties['color']
      number: React.CSSProperties['color']
      date: React.CSSProperties['color']
      info: React.CSSProperties['color']
      error: React.CSSProperties['color']
      actionIcon: React.CSSProperties['color']
    }
  }

  interface ThemeOptions {
    colors: {
      category: React.CSSProperties['color']
      account: React.CSSProperties['color']
      expense: React.CSSProperties['color']
      income: React.CSSProperties['color']
      transfer: React.CSSProperties['color']
      number: React.CSSProperties['color']
      date: React.CSSProperties['color']
      info: React.CSSProperties['color']
      error: React.CSSProperties['color']
      actionIcon: React.CSSProperties['color']
    }
  }
}

export const spentTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ['Inconsolata', 'monospace'].join(','),
    fontSize: 14,
  },
  palette: {
    type: 'dark',
    primary: { main: cyan[500] },
  },
  colors: {
    category: amber[300],
    account: teal[300],
    expense: red[300],
    income: green[300],
    transfer: orange[300],
    number: grey.A100,
    date: grey[700],
    info: grey[500],
    error: red[400],
    actionIcon: grey[100]
  },
})
