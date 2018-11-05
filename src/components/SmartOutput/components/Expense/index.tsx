import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { withConnectedProps } from '../../../../hoc/withConnectedProps'
import { Commands } from '../../../../store/commands/interface'
import { App } from '../../../../store/interface'
import { styles } from './styles'
import { View } from './View'

interface OutterProps {
  command: Commands.Expense
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
  withConnectedProps<ConnectedProps, OutterProps & InnerProps>(() => ({
    accountBalance: 0,
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('Expense')
)(View)
