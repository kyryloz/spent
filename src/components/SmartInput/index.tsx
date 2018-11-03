import { compose, pure, setDisplayName, withHandlers, withState } from 'recompose'
import { evaluate } from '../../parser/evaluator'
import { Application } from '../../store/interface'
import { SmartInputView } from './SmartInputView'
import { withConnectedProps } from '../../hoc/withConnectedProps'

interface OutterProps {}

interface ConnectedProps {}

interface InnerProps extends Application.ConnectedComponentProps<ConnectedProps> {
  input: string
  setInput: (input: string) => void
}

interface HandlerProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputSubmit: () => void
}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const SmartInput = compose<ViewProps, OutterProps>(
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
