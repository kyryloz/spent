import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers } from 'recompose'
import { Commands } from '../../../../store/commands/interface'
import { App } from '../../../../store/interface'
import { styles } from './styles'
import { View } from './View'

interface OutterProps {
  command: Commands.CreateAccountData
}

interface ConnectedProps {}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {}

interface HandlerProps {}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const CreateAccount = compose<ViewProps, OutterProps>(
  pure,
  withStyles(styles),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  setDisplayName('CreateAccount')
)(View)
