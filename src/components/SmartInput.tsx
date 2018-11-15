import {
  createStyles,
  InputAdornment,
  TextField,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core'
import * as React from 'react'
import { compose, pure, setDisplayName, withHandlers, withState } from 'recompose'
import { withConnectedProps } from '../hoc/withConnectedProps'
import { commandsActionCreator } from '../store/commands/actions'
import { App } from '../store/interface'

interface OutterProps {}

interface ConnectedProps {}

interface InnerProps
  extends App.ConnectedComponentProps<ConnectedProps>,
    WithStyles<typeof styles> {
  input: string
  setInput: (input: string) => void
}

interface HandlerProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleInputSubmit: () => void
}

type ViewProps = OutterProps & InnerProps & HandlerProps

const styles = (_: Theme) =>
  createStyles({
    textField: {
      flexBasis: 200,
    },
    textFieldInput: {
      fontFamily: 'Inconsolata',
    },
  })

const View: React.SFC<ViewProps> = ({ input, handleInputChange, handleInputSubmit, classes }) => (
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

export const SmartInput = compose<ViewProps, OutterProps>(
  withStyles(styles),
  withState('input', 'setInput', ''),
  withConnectedProps<ConnectedProps>(() => ({})),
  withHandlers<OutterProps & InnerProps, HandlerProps>({
    handleInputChange: ({ setInput }) => event => {
      setInput(event.target.value)
    },
    handleInputSubmit: ({ dispatch, setInput, input }) => () => {
      dispatch(commandsActionCreator.evaluateInput(input))
      setInput('')
    },
  }),
  pure,
  setDisplayName('SmartInput')
)(View)
