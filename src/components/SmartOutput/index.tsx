import { WithStyles, withStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers, withState } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { App } from '../../store/interface'
import { Transactions } from '../../store/transactions/interface'
import { SmartOutputView } from './SmartOutputView'
import { styles } from './styles'

interface OutterProps {}

interface ConnectedProps {
  transactions: Array<Transactions.Transaction>
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const SmartOutput = compose<ViewProps, OutterProps>(
  withStyles(styles),
  withState('input', 'setInput', ''),
  withConnectedProps<ConnectedProps>(state => ({
    transactions: state.transactions.recent,
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  pure,
  setDisplayName('SmartOuput')
)(SmartOutputView)
