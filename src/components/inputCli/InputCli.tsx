import * as React from 'react'
import { ChangeEvent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { addEntry } from '../../store/entries/actions'
import { InputCliView } from './InputCliView'

interface StateProps {
  input: string
}

interface DispatchProps {
  addEntry: typeof addEntry
}

type AllProps = DispatchProps

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addEntry: (entry: string) => dispatch(addEntry(entry)),
})

class InputCliContainer extends React.PureComponent<AllProps, StateProps> {
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
  }

  public render() {
    return (
      <InputCliView
        handleInputChange={this.handleInputChange}
        input={this.state.input}
        handleInputSubmit={this.handleInputSubmit}
      />
    )
  }
}

export const InputCli = connect(
  undefined,
  mapDispatchToProps
)(InputCliContainer)
