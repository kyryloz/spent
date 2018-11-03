import { compose, setDisplayName, withHandlers, withState, pure } from 'recompose'
import { withConnectedProps } from '../../hoc/withConnectedProps'
import { Application } from '../../store/interface'
import { Transactions } from '../../store/transactions/interface'
import { MainPageView } from './MainPageView'
import { processInput } from '../../parser/semanticReduxAdapter'
import { Accounts } from '../../store/accounts/interface'
import { Categories } from '../../store/categories/interface'

interface OutterProps {}

interface ConnectedProps {
  transactions: Array<Transactions.Transaction>
  accounts: Array<Accounts.Account>
  categories: Array<Categories.Category>
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
    transactions: state.transactions.recent,
    accounts: state.accounts.list,
    categories: state.categories.list
  })),
  withState('input', 'setInput', ''),
  withHandlers<OutterProps & InnerProps, HandlerProps>({
    handleInputChange: ({ setInput }) => event => {
      setInput(event.target.value)
    },
    handleInputSubmit: ({ dispatch, setInput, input }) => () => {
      processInput(input, dispatch)
      setInput('')
    },
  }),
  pure,
  setDisplayName('MainPage')
)(MainPageView)
