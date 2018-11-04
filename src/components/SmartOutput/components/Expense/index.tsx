import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { withConnectedProps } from '../../../../hoc/withConnectedProps'
import { App } from '../../../../store/interface'
import { Transactions } from '../../../../store/transactions/interface'
import { styles } from './styles'
import { View } from './View'

interface OutterProps {
  transaction: Transactions.Transaction<Transactions.Expense>
}

interface ConnectedProps {}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const Expense = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withConnectedProps<ConnectedProps>(() => ({})),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('Expense')
)(View)
