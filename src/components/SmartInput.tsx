import { createStyles, InputAdornment, TextField, Theme, withStyles } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { compose, Dispatch } from 'redux'
import { Classes } from 'src/utils/styleUtils'
import { commandsActionCreator } from '../store/commands/actions'
import { App } from '../store/interface'

const styles = (_: Theme) =>
  createStyles({
    textField: {
      flexBasis: 200,
    },
    textFieldInput: {
      fontFamily: 'Inconsolata',
    },
  })

interface Props {
  classes: Classes<typeof styles>
  evaluateInput: (input: string) => void
}

interface State {
  input: string
}

class SmartInputCmp extends React.PureComponent<Props, State> {
  readonly state = {
    input: '',
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value })
  }

  handleInputSubmit = () => {
    this.props.evaluateInput(this.state.input)
    this.setState({ input: '' })
  }

  render() {
    const { classes } = this.props

    return (
      <TextField
        className={classes.textField}
        autoFocus
        variant="outlined"
        label="CLI"
        fullWidth
        onChange={this.handleInputChange}
        value={this.state.input}
        InputProps={{
          startAdornment: <InputAdornment position="start">></InputAdornment>,
          className: classes.textFieldInput,
        }}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            event.preventDefault()
            this.handleInputSubmit()
          }
        }}
      />
    )
  }
}

export const SmartInput = compose(
  connect(
    null,
    (dispatch: Dispatch<App.Action>) => ({
      evaluateInput: (input: string) => dispatch(commandsActionCreator.evaluateInput(input)),
    })
  ),
  withStyles(styles),
)(SmartInputCmp)
