import { withStyles, WithStyles } from '@material-ui/core'
import { compose, pure, setDisplayName, withHandlers, withState } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { commandsActionCreator } from '../../store/commands/actions'
import { App } from '../../store/interface'
import { View } from './View'
import { styles } from './styles'

interface OutterProps {}

interface ConnectedProps {}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {
  input: string
  setInput: (input: string) => void
}

interface HandlerProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputSubmit: () => void
}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const SmartInput = compose<ViewProps, OutterProps>(
  withStyles(styles),
  withState('input', 'setInput', ''),
  withConnectedProps<ConnectedProps>(() => ({})),
  withHandlers<OutterProps & InnerProps, HandlerProps>({
    handleInputChange: ({ setInput }) => event => {
      setInput(event.target.value)
    },
    handleInputSubmit: ({ dispatch, setInput, input }) => () => {
      dispatch(commandsActionCreator.evaluateInput(input))
      setInput('')
    },
  }),
  pure,
  setDisplayName('SmartInput')
)(View)
