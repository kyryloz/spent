import { InputAdornment, TextField } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'

export const View: React.SFC<ViewProps> = ({
  input,
  handleInputChange,
  handleInputSubmit,
  classes,
}) => (
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
