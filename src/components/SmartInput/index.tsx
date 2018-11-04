import { compose, pure, setDisplayName, withHandlers, withState } from 'recompose'
import { evaluate } from '../../parser/evaluator'
import { App } from '../../store/interface'
import { SmartInputView } from './SmartInputView'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { withStyles, WithStyles } from '@material-ui/core'
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
      evaluate(input, dispatch)
      setInput('')
    },
  }),
  pure,
  setDisplayName('SmartInput')
)(SmartInputView)
