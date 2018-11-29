import {
  createStyles,
  InputAdornment,
  TextField,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core'
import { flow, isEmpty } from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import { CommandsActionCreator } from 'store/commands/actions'
import { Commands } from 'store/commands/interface'
import { commandsSelector } from 'store/commands/selectors'
import { App } from 'store/interface'
import { smartInputActionCreator } from 'store/ui/smartInput/actions'
import { smartInputSelector } from 'store/ui/smartInput/selectors'
import { Classes } from 'utils/styleUtils'

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
    adornment: {
      color: theme.colors.info,
    },
  })

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  input: string
  focus: boolean
  error: Commands.ErrorData
}

interface DispatchProps {
  evaluateInput: () => void
  setInput: (input: string) => void
  setFocus: (focus: boolean) => void
}

type Props = StyleProps & StateProps & DispatchProps

class SmartInputCmp extends React.PureComponent<Props> {
  private textInput: React.RefObject<HTMLInputElement>

  constructor(props: Props) {
    super(props)
    this.textInput = React.createRef()
  }

  componentDidUpdate({ focus: prevFocus }: Props) {
    const focus = this.props.focus

    if (focus !== prevFocus) {
      if (focus) {
        const node = this.textInput.current
        if (node) {
          node.focus()
        }
      }
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    this.props.setInput(input)
  }

  handleInputSubmit = () => {
    this.props.evaluateInput()
  }

  handleFocusChange = (focus: boolean) => {
    this.props.setFocus(focus)
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
          onFocus={() => this.handleFocusChange(true)}
          onBlur={() => this.handleFocusChange(false)}
          InputProps={{
            inputRef: this.textInput,
            startAdornment: (
              <InputAdornment className={classes.adornment} position="start">
                >
              </InputAdornment>
            ),
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
      focus: smartInputSelector.focus(state),
    }),
    dispatch => ({
      evaluateInput: () => dispatch(CommandsActionCreator.evaluate()),
      setInput: (input: string) => dispatch(smartInputActionCreator.setInput(input)),
      setFocus: (focus: boolean) => dispatch(smartInputActionCreator.setFocus(focus)),
    })
  )
)(SmartInputCmp)
