import { compose, setDisplayName, withHandlers, withState } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { Application } from '../../store/interface'
import { addTransaction } from '../../store/transactions/actions'
import { Transactions } from '../../store/transactions/interface'
import { View } from './View'

interface OutterProps {}

interface StateProps {
  recentTransactions: Array<Transactions.Transaction>
}

interface InnerProps extends Application.ConnectedComponentProps<StateProps> {
  input: string
  setInput: (input: string) => void
}

interface HandlerProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputSubmit: () => void
}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const MainPage = compose<InnerProps, OutterProps>(
  withConnectedProps<StateProps>(state => ({
    recentTransactions: state.transactions.recent,
  })),
  withState('input', 'setInput', ''),
  withHandlers<OutterProps & InnerProps, HandlerProps>({
    handleInputChange: ({ setInput }) => event => {
      setInput(event.target.value)
    },
    handleInputSubmit: ({ dispatch, setInput, input }) => () => {
      dispatch(addTransaction(input, { t: null }))
      setInput('')
    },
  }),
  setDisplayName('MainPage')
)(View)
