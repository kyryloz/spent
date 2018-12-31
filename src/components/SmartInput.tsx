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
import { CommandActionCreator } from 'store/model/cli/actions'
import { CommandSelector } from 'store/model/cli/selectors'
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
  error: {
    human: string
  }
}

interface DispatchProps {
  evaluateInput: () => void
  historyUp: () => void
  historyDown: () => void
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

  handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'Enter': {
        event.preventDefault()
        this.props.evaluateInput()
        break
      }
    }
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowUp': {
        event.preventDefault()
        this.props.historyUp()
        break
      }
      case 'ArrowDown': {
        event.preventDefault()
        this.props.historyDown()
        break
      }
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    this.props.setInput(input)
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
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
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
      historyUp: () => dispatch(SmartInputActionCreator.historyUp()),
      historyDown: () => dispatch(SmartInputActionCreator.historyDown()),
      setInput: (input: string) => dispatch(SmartInputActionCreator.setInput(input)),
      setFocus: (focus: boolean) => dispatch(SmartInputActionCreator.setFocus(focus)),
    })
  )
)(SmartInputCmp)
