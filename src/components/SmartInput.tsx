import { createStyles, InputAdornment, TextField, Theme, withStyles } from '@material-ui/core'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { commandsActionCreator } from 'store/commands/actions'
import { App } from 'store/interface'
import { Classes } from 'utils/styleUtils'

const styles = (_: Theme) =>
  createStyles({
    textField: {
      flexBasis: 200,
    },
    textFieldInput: {
      fontFamily: 'Inconsolata',
    },
  })

interface StyleProps {
  classes: Classes<typeof styles>
}

interface DispatchProps {
  evaluateInput: (input: string) => void
}

interface State {
  input: string
}

class SmartInputCmp extends React.PureComponent<StyleProps & DispatchProps, State> {
  readonly state = {
    input: '',
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    this.setState({ input })
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

export const SmartInput = flow(
  withStyles(styles),
  connect<{}, DispatchProps, {}, App.State>(
    null,
    dispatch => ({
      evaluateInput: (input: string) => dispatch(commandsActionCreator.evaluateInput(input)),
    })
  )
)(SmartInputCmp)
