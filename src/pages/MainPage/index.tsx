import * as React from 'react'
import { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ApplicationState } from '../../store/interface'
import { addTransaction } from '../../store/transactionList/actions'
import { Transaction } from '../../store/transactionList/interface'
import { View } from './View'

interface OwnProps {
  transactions: Array<Transaction>
}

interface StateProps {
  input: string
}

interface DispatchProps {
  addEntry: typeof addTransaction
}

type AllProps = StateProps & DispatchProps & OwnProps

const mapStateToProps = (state: ApplicationState) => ({
  transactions: state.transactionList.transactions,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addEntry: (entry: string) => dispatch(addTransaction(entry)),
})

class MainPageContainer extends React.PureComponent<AllProps> {
  state = {
    input: '',
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: event.target.value,
    })
  }

  handleInputSubmit = () => {
    this.props.addEntry(this.state.input)
    this.setState({
      input: '',
    })
  }

  public render() {
    return (
      <View
        handleInputChange={this.handleInputChange}
        input={this.state.input}
        handleInputSubmit={this.handleInputSubmit}
        transactions={this.props.transactions}
      />
    )
  }
}

export const MainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPageContainer)
