import {
  createStyles,
  InputAdornment,
  TextField,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import { flow } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { commandsActionCreator } from 'store/commands/actions'
import { Commands } from 'store/commands/interface'
import { commandsSelector } from 'store/commands/selectors'
import { smartInputSelector } from 'store/ui/smartInput/selectors'
import { App } from 'store/interface'
import { Classes } from 'utils/styleUtils'
import { smartInputActionCreator } from 'store/ui/smartInput/actions';

const styles = (theme: Theme) =>
  createStyles({
    textField: {
      flexBasis: 200,
    },
    textFieldInput: {
      fontFamily: 'Inconsolata',
    },
    errorWrapper: {
      display: 'flex',
      height: 30,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    error: {
      color: theme.colors.error,
    },
  })

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  input: string
  error: Commands.ErrorData
}

interface DispatchProps {
  evaluateInput: (input: string) => void
  setInput: (input: string) => void
}

class SmartInputCmp extends React.PureComponent<StyleProps & StateProps & DispatchProps> {

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    this.props.setInput(input)
  }

  handleInputSubmit = () => {
    this.props.evaluateInput(this.props.input)
  }

  render() {
    const { classes, input, error } = this.props

    return (
      <React.Fragment>
        <div className={classes.errorWrapper}>
          <Typography className={classes.error}>{error.human}</Typography>
        </div>
        <TextField
          className={classes.textField}
          autoFocus
          variant="outlined"
          label="CLI"
          fullWidth
          onChange={this.handleInputChange}
          value={input}
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
      </React.Fragment>
    )
  }
}

export const SmartInput = flow(
  withStyles(styles),
  connect<StateProps, DispatchProps, {}, App.State>(
    state => ({
      error: commandsSelector.error(state),
      input: smartInputSelector.input(state),
    }),
    dispatch => ({
      evaluateInput: (input: string) => dispatch(commandsActionCreator.evaluateInput(input)),
      setInput: (input: string) => dispatch(smartInputActionCreator.setInput({ input }))
    })
  )
)(SmartInputCmp)
