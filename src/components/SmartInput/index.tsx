import { TextField } from '@material-ui/core'
import * as React from 'react'
import { ChangeEvent } from 'react'

interface Props {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  input: string
  handleInputSubmit: () => void
}

export const SmartInput: React.SFC<Props> = ({
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
    onKeyPress={ev => {
      if (ev.key === 'Enter') {
        handleInputSubmit()
        ev.preventDefault()
      }
    }}
  />
)
