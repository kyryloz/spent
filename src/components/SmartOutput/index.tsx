import { WithStyles, withStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers, withState } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { Commands } from '../../store/commands/interface'
import { commandsSelector } from '../../store/commands/selectors'
import { App } from '../../store/interface'
import { SmartOutputView } from './SmartOutputView'
import { styles } from './styles'

interface OutterProps {}

interface ConnectedProps {
  commands: Array<Commands.Command>
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
    commands: commandsSelector.items(state),
  })),
  withHandlers<OutterProps & InnerProps, HandlerProps>({}),
  pure,
  setDisplayName('SmartOuput')
)(SmartOutputView)
