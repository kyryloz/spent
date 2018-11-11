import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { Commands } from 'src/store/commands/interface'
import { withConnectedProps } from '../../../../hoc/withConnectedProps'
import { accountsSelector } from '../../../../store/accounts/selectors'
import { App } from '../../../../store/interface'
import { styles } from './styles'
import { View } from './View'

interface OutterProps {
  command: Commands.StatusData
}

interface ConnectedProps {
  accounts: {
    [name: string]: number
  }
}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const StatusAccounts = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withConnectedProps<ConnectedProps, OutterProps & InnerProps>((state, ownProps) => ({
    accounts: accountsSelector.balances(0, ownProps.command.timestamp)(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('StatusAccounts')
)(View)
