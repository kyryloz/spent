import { TextField } from '@material-ui/core'
import * as React from 'react'
import { ViewProps } from '.'

export const SmartInputView: React.SFC<ViewProps> = ({
  input,
  handleInputChange,
  handleInputSubmit,
}) => (
  <TextField
    variant="outlined"
    label="Process money flow"
    fullWidth={true}
    onChange={handleInputChange}
    value={input}
    onKeyPress={event => {
      if (event.key === 'Enter') {
        event.preventDefault()
        handleInputSubmit()
      }
    }}
  />
)
