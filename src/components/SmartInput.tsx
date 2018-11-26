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
import { App } from 'store/interface'
import { smartInputActionCreator } from 'store/ui/smartInput/actions'
import { SmartInput as SmartInputInterface } from 'store/ui/smartInput/interface'
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
  })

interface StyleProps {
  classes: Classes<typeof styles>
}

interface StateProps {
  inputData: SmartInputInterface.SetData
  error: Commands.ErrorData
}

interface DispatchProps {
  evaluateInput: (input: string) => void
  setInput: (input: string, focus?: boolean) => void
}

type Props = StyleProps & StateProps & DispatchProps

class SmartInputCmp extends React.PureComponent<Props> {
  private textInput: React.RefObject<HTMLInputElement>

  constructor(props: Props) {
    super(props)
    this.textInput = React.createRef()
  }

  componentDidUpdate({ inputData: { focus: prevFocus } }: Props) {
    const focus = this.props.inputData.focus

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
    this.props.evaluateInput(this.props.inputData.input)
  }

  handleFocusChange = (focus: boolean) => {
    this.props.setInput(this.props.inputData.input, focus)
  }

  render() {
    const { classes, inputData, error } = this.props

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
          value={inputData.input}
          onFocus={() => this.handleFocusChange(true)}
          onBlur={() => this.handleFocusChange(false)}
          InputProps={{
            inputRef: this.textInput,
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
      inputData: smartInputSelector.input(state),
    }),
    dispatch => ({
      evaluateInput: (input: string) => dispatch(commandsActionCreator.evaluateInput(input)),
      setInput: (input: string, focus: boolean) =>
        dispatch(smartInputActionCreator.setInput({ input, focus })),
    })
  )
)(SmartInputCmp)
