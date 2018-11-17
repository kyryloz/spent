import {
  createStyles,
  InputAdornment,
  TextField,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { commandsActionCreator } from '../store/commands/actions'
import { App } from '../store/interface'

namespace Component {
  export interface Props {
    evaluateInput: (input: string) => void
  }

  export interface State {
    input: string
  }

  export interface Handler {
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleInputSubmit: () => void
  }

  export type ViewProps = Props & State & Handler & WithStyles<typeof styles>
}

const styles = (_: Theme) =>
  createStyles({
    textField: {
      flexBasis: 200,
    },
    textFieldInput: {
      fontFamily: 'Inconsolata',
    },
  })

const View = withStyles(styles)(
  ({ input, handleInputChange, handleInputSubmit, classes }: Component.ViewProps) => (
    <TextField
      className={classes.textField}
      autoFocus
      variant="outlined"
      label="CLI"
      fullWidth
      onChange={handleInputChange}
      value={input}
      InputProps={{
        startAdornment: <InputAdornment position="start">></InputAdornment>,
        className: classes.textFieldInput,
      }}
      onKeyPress={event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          handleInputSubmit()
        }
      }}
    />
  )
)

class SmartInputCmp extends React.PureComponent<Component.Props, Component.State> {
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: event.target.value })
  }

  handleInputSubmit = () => {
    this.props.evaluateInput(this.state.input)
    this.setState({ input: '' })
  }

  render() {
    return (
      <View
        {...this.props}
        {...this.state}
        handleInputChange={this.handleInputChange}
        handleInputSubmit={this.handleInputSubmit}
      />
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch<App.Action>) => ({
  evaluateInput: (input: string) => dispatch(commandsActionCreator.evaluateInput(input)),
})

export const SmartInput = connect(
  null,
  mapDispatchToProps
)(SmartInputCmp)
