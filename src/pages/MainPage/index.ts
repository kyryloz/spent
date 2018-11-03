import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { Accounts } from '../../store/accounts/interface'
import { Categories } from '../../store/categories/interface'
import { App } from '../../store/interface'
import { Transactions } from '../../store/transactions/interface'
import { MainPageView } from './MainPageView'
import { styles } from './styles'

interface OutterProps {}

interface ConnectedProps {
  transactions: Array<Transactions.Transaction>
  accounts: Array<Accounts.Account>
  categories: Array<Categories.Category>
}

export interface StyledComponentProps {
  classes: WithStyles<typeof styles>
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const MainPage = compose<ViewProps, OutterProps>(
  withStyles(styles),
  withConnectedProps<ConnectedProps>(state => ({
    transactions: state.transactions.recent,
    accounts: state.accounts.list,
    categories: state.categories.list,
  })),
  pure,
  setDisplayName('MainPage')
)(MainPageView)
