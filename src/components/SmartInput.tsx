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
import { App } from 'store/interface'
import { CommandActionCreator } from 'store/model/command/actions'
import { CommandModel } from 'store/model/command/interface'
import { CommandSelector } from 'store/model/command/selectors'
import { SmartInputActionCreator } from 'store/model/ui/smartInput/actions'
import { SmartInputSelector } from 'store/model/ui/smartInput/selectors'
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
  error: CommandModel.ErrorData
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
      error: CommandSelector.error(state),
      input: SmartInputSelector.input(state),
      focus: SmartInputSelector.focus(state),
    }),
    dispatch => ({
      evaluateInput: () => dispatch(CommandActionCreator.evaluate()),
      setInput: (input: string) => dispatch(SmartInputActionCreator.setInput(input)),
      setFocus: (focus: boolean) => dispatch(SmartInputActionCreator.setFocus(focus)),
    })
  )
)(SmartInputCmp)
