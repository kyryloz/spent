import { compose, setDisplayName, withHandlers, withState, pure } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { Application } from '../../store/interface'
import { addTransaction } from '../../store/transactions/actions'
import { Transactions } from '../../store/transactions/interface'
import { MainPageView } from './MainPageView'

interface OutterProps {}

interface ConnectedProps {
  recentTransactions: Array<Transactions.Transaction>
}

interface InnerProps extends Application.ConnectedComponentProps<ConnectedProps> {
  input: string
  setInput: (input: string) => void
}

interface HandlerProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputSubmit: () => void
}

export type ViewProps = OutterProps & InnerProps & HandlerProps

export const MainPage = compose<ViewProps, OutterProps>(
  withConnectedProps<ConnectedProps>(state => ({
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
  pure,
  setDisplayName('MainPage')
)(MainPageView)
