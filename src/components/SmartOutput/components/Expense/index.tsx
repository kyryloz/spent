import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { withConnectedProps } from '../../../../hoc/withConnectedProps'
import { App } from '../../../../store/interface'
import { Transactions } from '../../../../store/transactions/interface'
import { styles } from './styles'
import { View } from './View'
import { transactionsSelector } from '../../../../store/transactions/selectors'

interface OutterProps {
  transaction: Transactions.Transaction<Transactions.Expense>
}

interface ConnectedProps {
  accountBalance: number
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const Expense = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withConnectedProps<ConnectedProps, OutterProps & InnerProps>((state, ownProps) => ({
    accountBalance: transactionsSelector.balance(ownProps.transaction.details.fromAccount)(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('Expense')
)(View)
