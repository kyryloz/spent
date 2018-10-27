import { connect } from 'react-redux'
import { compose, withHandlers, withState, setDisplayName } from 'recompose'
import { Dispatch } from 'redux'
import { Application } from '../../store/interface'
import { addTransaction } from '../../store/transactions/actions'
import { Transactions } from '../../store/transactions/interface'
import { View } from './View'

interface OutterProps {}

interface ConnectedReduxProps {
  dispatch: Dispatch<Application.Action>
}

interface InnerProps extends ConnectedReduxProps {
  input: string
  setInput: (input: string) => void
  recentTransactions: Array<Transactions.Transaction>
}

interface HandlerProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputSubmit: () => void
}

export type ViewProps = OutterProps & InnerProps & HandlerProps

const mapStateToProps = (state: Application.State) => ({
  recentTransactions: state.transactions.recent,
})

export const MainPage = compose<InnerProps, OutterProps>(
  connect(mapStateToProps),
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
